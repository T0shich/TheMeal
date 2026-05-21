import axios from 'axios'
import { Command } from 'cmdk'
import { useEffect, useState } from 'react'
import Container from '../../assets/Container.svg'
import { motion, AnimatePresence } from 'motion/react'
type Meal = {
	idMeal: string
	strMeal: string
}

const Search = () => {
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
			<div
				className="flex min-h-[calc(100vh-5rem)] w-full items-center justify-center bg-center bg-cover bg-no-repeat"
				style={{ backgroundImage: `url(${Container})` }}
			>
				<div className="w-full max-w-3xl">
					<Command className="relative mx-auto w-full overflow-visible rounded-full" shouldFilter={false}>
						<Command.Input
							value={query}
							onValueChange={setQuery}
							placeholder='Найдите рецепт...'
							className='w-full rounded-full border border-amber-500/20 bg-amber-500 px-6 py-5 text-base outline-none placeholder:text-amber-950/60 shadow-lg shadow-amber-500/10'
						/>

						<AnimatePresence>
							{query && (
								<motion.div
									initial={{ opacity: 0, y: -10 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -10 }}
									transition={{ duration: 0.2 }}
								>
									<Command.List className="absolute left-0 top-full z-20 mt-3 max-h-80 w-full overflow-y-auto rounded-3xl border border-amber-500/10 bg-white p-2 shadow-2xl shadow-black/10">
										{isLoading && <Command.Loading className="p-4 text-center text-sm text-gray-500">Загрузка...</Command.Loading>}
										{error && <Command.Empty className="p-4 text-center text-sm text-red-500">{error}</Command.Empty>}
										{!isLoading && query.trim() !== '' && meals.length === 0 && (
											<Command.Empty className="p-4 text-center text-sm text-gray-500">Ничего не найдено</Command.Empty>
										)}

										{meals.map(meal => (
											<Command.Item
												key={meal.idMeal}
												value={meal.strMeal}
												className="cursor-pointer rounded-2xl px-4 py-3 text-left text-sm text-gray-800 outline-none hover:bg-amber-500 hover:text-white"
											>
												{meal.strMeal}
											</Command.Item>
										))}
									</Command.List>
								</motion.div>
							)}
						</AnimatePresence>
					</Command>
				</div>
			</div>
		</>
	)
}

export default Search
