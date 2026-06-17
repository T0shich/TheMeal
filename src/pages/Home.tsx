import { motion } from 'motion/react'
import { Filter } from '../components/Filter'
import { DynamicDishGrid } from '../modules/Category/DynamicDishGrid'
import Search from '../modules/Search/Search'
import { useFilterStore } from '../store/useStore'
const Home = () => {
	const option = useFilterStore(state => state.filter)

	const getHeadingText = () => {
		switch (option) {
			case 'Страны':
				return 'Блюда со всего мира'
			case 'Ингридиент':
				return 'Блюда по ингредиенту'
			case 'Категории':
			default:
				return 'Популярные категории блюд'
		}
	}

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
						<div className="relative flex flex-col items-center mb-10 md:mb-16">
							<h2 className="text-4xl md:text-5xl font-black text-stone-900 tracking-tight drop-shadow-sm text-center px-12">
								{getHeadingText()}
							</h2>
							<div className="w-24 h-1 bg-amber-500 mt-6 rounded-full opacity-80" />
							<Filter
								Options={['Категории', 'Страны', 'Ингридиент']}
								className="mt-8"
							/>
						</div>

						<DynamicDishGrid filterType={option} />
					</motion.div>
				</section>
			</main>
		</motion.div>
	)
}

export default Home
