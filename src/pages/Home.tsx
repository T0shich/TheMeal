import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { MealGrid } from '../components/MealGrid'
import Search from '../modules/Search/Search'
import type { Meal } from '../types/meal'
import ErrorCard from '../ui/ErrorCard'
import Loader from '../ui/Loader'
import { useCardGrid } from '../utils/useCardGrid'

const Home = () => {
	const { data: comfortMeals, isLoading: isComfortLoading, isError: isComfortError } = useCardGrid('Chicken')
	const { data: sweetMeals, isLoading: isSweetLoading, isError: isSweetError } = useCardGrid('Dessert')

	const comfortShowcase =
		comfortMeals?.slice(0, 6).map((meal: Meal) => ({ ...meal, strCategory: 'Быстрый ужин' })) ?? []
	const sweetShowcase =
		sweetMeals?.slice(0, 6).map((meal: Meal) => ({ ...meal, strCategory: 'Что-то к чаю' })) ?? []

	return (
		<motion.div
			className="grow flex flex-col w-full"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.6, ease: 'easeOut' }}
		>
			<main className="grow flex flex-col w-full">
				<section className="w-full relative shadow-2xl z-10">
					<Search />
				</section>

				<section className="w-full grow relative bg-linear-to-br from-stone-100 via-orange-50 to-amber-100 pt-16 pb-24">
					<div className="absolute inset-0 bg-white/40 pointer-events-none" />

					<motion.div
						className="relative z-10 mx-auto w-full max-w-7xl px-4 md:px-8"
						initial={{ opacity: 0, y: 40 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: '-50px' }}
						transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
					>
						<div className="relative flex flex-col items-center mb-10 md:mb-14">
							<h2 className="text-4xl md:text-5xl font-black text-stone-900 tracking-tight drop-shadow-sm text-center px-12">
								Что приготовить сегодня
							</h2>
							<div className="w-24 h-1 bg-amber-500 mt-6 rounded-full opacity-80" />
							<p className="mt-6 max-w-2xl text-center text-stone-600">
								На главной только подборки, а полный фильтруемый каталог вынесен на отдельную страницу.
							</p>
							<Link
								to="/recipes"
								className="mt-7 inline-flex items-center rounded-full bg-amber-500 px-7 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-amber-600"
							>
								Открыть каталог рецептов
							</Link>
						</div>

						{(isComfortLoading || isSweetLoading) && <Loader />}

						{(isComfortError || isSweetError) && (
							<div className="pb-10">
								<ErrorCard
									title="Не удалось загрузить подборки"
									message="Попробуйте обновить страницу или откройте каталог рецептов."
									actionLabel="Обновить"
									onAction={() => window.location.reload()}
								/>
							</div>
						)}

						{!isComfortLoading && !isSweetLoading && !isComfortError && !isSweetError && (
							<div className="space-y-14">
								<div>
									<MealGrid dishes={comfortShowcase} title="Быстрые идеи для ужина" />
								</div>
								<div>
									<MealGrid dishes={sweetShowcase} title="Сладкое настроение" />
								</div>
							</div>
						)}
					</motion.div>
				</section>
			</main>
		</motion.div>
	)
}

export default Home
