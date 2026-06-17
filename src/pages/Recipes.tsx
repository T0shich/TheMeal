import { motion } from 'motion/react'
import { Filter } from '../components/Filter'
import { DynamicDishGrid } from '../modules/Category/DynamicDishGrid'
import { useFilterStore } from '../store/useStore'

const Recipes = () => {
	const option = useFilterStore(state => state.filter)

	const getHeadingText = () => {
		switch (option) {
			case 'Страны':
				return 'Каталог по странам'
			case 'Ингридиент':
				return 'Каталог по ингредиентам'
			case 'Категории':
			default:
				return 'Полный каталог рецептов'
		}
	}

	return (
		<motion.div
			className="grow flex flex-col w-full"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5, ease: 'easeOut' }}
		>
			<main className="grow flex flex-col w-full relative bg-linear-to-br from-stone-100 via-orange-50 to-amber-100 pt-10 pb-24">
				<div className="absolute inset-0 bg-white/40 pointer-events-none" />

				<div className="relative z-10 mx-auto w-full max-w-7xl px-4 md:px-8">
					<div className="mb-8 p-2 md:p-4">
						<h1 className="text-3xl font-black tracking-tight text-stone-900 md:text-5xl">
							{getHeadingText()}
						</h1>
						<p className="mt-3 text-sm text-stone-600 md:text-base">
							Рабочая зона поиска: выбирайте фильтр, листайте категории и находите нужное блюдо под конкретную задачу.
						</p>
						<Filter Options={['Категории', 'Страны', 'Ингридиент']} className="mt-6" />
					</div>

					<DynamicDishGrid filterType={option} />
				</div>
			</main>
		</motion.div>
	)
}

export default Recipes
