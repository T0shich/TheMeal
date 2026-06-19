import { motion } from 'motion/react'
import { Filter } from '../components/Filter'
import { DynamicDishGrid } from '../modules/Category/DynamicDishGrid'
import { useFilterStore } from '../store/useStore'
import { useEffect } from 'react'

const Recipes = () => {
	const option = useFilterStore(state => state.filter)

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	const getHeadingText = () => {
		switch (option) {
			case 'Countries':
				return 'Catalog by Countries'
			case 'Ingredients':
				return 'Catalog by Ingredients'
			case 'Categories':
			default:
				return 'Full Recipe Catalog'
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
						<h1 className="text-3xl font-black text-center tracking-tight text-stone-900 md:text-5xl">
							{getHeadingText()}
						</h1>

						<Filter Options={['Categories', 'Countries', 'Ingredients']} className="mt-6" />
					</div>

					<DynamicDishGrid filterType={option} />
				</div>
			</main>
		</motion.div>
	)
}

export default Recipes
