import { useState } from 'react'
import type { UseQueryResult } from '@tanstack/react-query'
import Loader from '../ui/Loader'
import ErrorCard from '../ui/ErrorCard'
import { MealGrid } from './MealGrid'
import type { Meal } from '../types/meal'
import { motion } from 'motion/react'

interface TemplateDishListProps {
	queryFunction: (filter: string) => UseQueryResult<Meal[], Error>
	activeFilter: string
}

export const TemplateDishList = ({ queryFunction, activeFilter }: TemplateDishListProps) => {
	const { data: dishes, isLoading, isError } = queryFunction(activeFilter)
	const [visibleCount, setVisibleCount] = useState(9)
	const dishesToRender = dishes?.slice(0, visibleCount) ?? []
	const hasMore = dishes ? dishes.length > dishesToRender.length : false
	const handleAddDishes = () => {
		if (hasMore) {
			setVisibleCount(prev => prev + 9)
		}
	}

	if (isLoading) return <Loader />
	if (isError) return (
		<div className="h-screen flex items-center justify-center">
			<ErrorCard title="Loading Error" message="Failed to load dishes." actionLabel="Retry" onAction={() => window.location.reload()} />
		</div>
	)

	return (
		<div className='max-w-6xl justify-center mx-auto px-4 py-10'>
			<MealGrid dishes={dishesToRender} categoryName={activeFilter} />
			{hasMore && (
				<div className="flex justify-center mt-8">
					<motion.button onClick={() => handleAddDishes()}
						className="app-button "
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
					>
						Load More
					</motion.button>
				</div>
			)}
		</div>
	)
}
