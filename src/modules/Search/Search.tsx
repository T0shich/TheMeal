import axios from 'axios'
import { Command } from 'cmdk'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Container from '../../assets/main_bg.png'
type Meal = {
	idMeal: string
	strMeal: string
}

const Search = () => {
	const navigate = useNavigate()
	const [query, setQuery] = useState<string>('')
	const [meals, setMeals] = useState<Meal[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)
	useEffect(() => {
		const trimmedQuery = query.trim()
		const searchMealsByName = async () => {
			try {
				setIsLoading(true)
				setError(null)
				if (trimmedQuery === '') {
					setMeals([])
					return
				}

				const response = await axios.get(
					`https://www.themealdb.com/api/json/v1/1/search.php?s=${trimmedQuery}`
				)
				if (response.status === 200) {
					setMeals(response.data.meals ?? [])
				} else {
					setMeals([])
				}

			} catch (error) {
				console.error('Error fetching meals:', error)
				setMeals([])
				setError('Failed to fetch meals. Please try again later.')
			} finally {
				setIsLoading(false)
			}
		}

		const timer = setTimeout(() => {
			searchMealsByName()
		}, 500)

		return () => clearTimeout(timer)
	}, [query])
	return (
		<>
			<motion.div
				className="relative flex min-h-[calc(100vh-5rem)] w-full items-center justify-center bg-center bg-cover bg-no-repeat"
				style={{ backgroundImage: `url(${Container})` }}
			>
				<div className="absolute inset-0 bg-black/40" />
				<div className="relative z-10 flex w-full max-w-3xl flex-col items-center px-4">
					<div className="mb-10 text-center">
						<motion.h1
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.7 }}
							className="mb-4 text-4xl font-black tracking-tight text-white drop-shadow-lg sm:text-5xl lg:text-6xl"
						>
							Что приготовим сегодня?
						</motion.h1>
						<motion.p
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.7, delay: 0.1 }}
							className="mx-auto max-w-2xl text-lg font-medium text-white/90 drop-shadow-md sm:text-xl"
						>
							Откройте для себя тысячи вкуснейших рецептов со всего мира
						</motion.p>
					</div>

					<Command className="relative mx-auto w-full overflow-visible" shouldFilter={false}>
						<div className="relative">
							<div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-amber-700">
								<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
									<path d="M21 21L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
									<path d="M11 19A8 8 0 1 1 11 3a8 8 0 0 1 0 16z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
								</svg>
							</div>

							<Command.Input
								value={query}
								onValueChange={setQuery}
								placeholder='Найдите рецепт...'
								className='w-full rounded-3xl border border-amber-200 bg-white/90 pl-14 pr-6 py-4 text-base outline-none placeholder:text-gray-400 shadow-lg'
							/>
						</div>

						<AnimatePresence>
							{query && (
								<motion.div
									initial={{ opacity: 0, y: -8 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -8 }}
									transition={{ duration: 0.18 }}
								>
									<Command.List className="absolute left-0 top-full z-30 mt-3 max-h-70 w-full overflow-y-auto rounded-2xl border border-amber-100 bg-white p-2 shadow-2xl shadow-black/10">
										{isLoading && <Command.Loading className="p-4 text-center text-sm text-gray-500">Загрузка...</Command.Loading>}
										{error && <div className="p-4 text-center text-sm text-red-600">{error}</div>}
										{!isLoading && query.trim() !== '' && meals.length === 0 && (
											<div className="p-4 text-center text-sm text-gray-500">Ничего не найдено</div>
										)}

										{meals.map(meal => (
											<Command.Item
												key={meal.idMeal}
												value={meal.strMeal}
												onSelect={() => navigate(`/meal/${meal.idMeal}`)}
												className="cursor-pointer flex items-center gap-3 rounded-xl px-3 py-2 text-left text-sm text-gray-800 outline-none hover:bg-amber-50"
											>
												{(meal as Meal & { strMealThumb: string }).strMealThumb ? (
													<img src={(meal as Meal & { strMealThumb: string }).strMealThumb} alt={meal.strMeal} className="h-12 w-12 rounded-md object-cover" />
												) : (
													<div className="h-12 w-12 rounded-md bg-amber-50 flex items-center justify-center text-amber-600">🍽️</div>
												)}
												<div className="flex-1">
													<div className="font-medium">{meal.strMeal}</div>
												</div>
											</Command.Item>
										))}
									</Command.List>
								</motion.div>
							)}
						</AnimatePresence>
					</Command>

				</div>
			</motion.div>
		</>
	)
}

export default Search
