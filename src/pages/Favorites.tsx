import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { MealGrid } from '../components/MealGrid'
import { useFollowStore } from '../store/useStore'

export const Favorites = () => {
	const followedMeals = useFollowStore((state) => state.followedMeals)

	return (
		<motion.div
			className="flex-grow flex flex-col w-full"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.6, ease: 'easeOut' }}
		>
			<main className="flex-grow flex flex-col w-full relative bg-linear-to-br from-stone-100 via-orange-50 to-amber-100 pt-10 pb-24">
				<div className="absolute inset-0 bg-white/40 pointer-events-none" />

				<motion.div
					className="relative z-10 mx-auto w-full max-w-7xl px-4 md:px-8"
					initial={{ opacity: 0, y: 40 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
				>
					<div className="relative flex flex-col items-center mb-10 md:mb-16 mt-8">
						<h1 className="text-4xl md:text-5xl font-black text-stone-900 tracking-tight drop-shadow-sm text-center px-12">
							Избранные рецепты
						</h1>
						<div className="w-24 h-1 bg-amber-500 mt-6 rounded-full opacity-80" />
					</div>

					{followedMeals.length > 0 ? (
						<div className="max-w-6xl justify-center mx-auto">
							<MealGrid dishes={followedMeals} categoryName="Избранные" />
						</div>
					) : (
						<div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white/60 backdrop-blur-md rounded-3xl shadow-lg border border-white/70 max-w-2xl mx-auto">
							<span className="text-7xl mb-6">🍽️</span>
							<h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
								В избранном пока ничего нет
							</h2>
							<p className="text-gray-600 mb-8 max-w-md text-lg">
								Отмечайте понравившиеся рецепты сердечком, чтобы они всегда были под рукой.
							</p>
							<Link
								to="/"
								className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-full transition-colors shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
							>
								Найти вкусненькое
							</Link>
						</div>
					)}
				</motion.div>
			</main>
		</motion.div>
	)
}
