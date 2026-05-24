import { useState } from 'react'
import { useStore } from '../../store/useStore'
import { MealGrid } from '../../components/MealGrid'
import ErrorCard from '../../ui/ErrorCard'
import Loader from '../../ui/Loader'
import { useCardGrid } from '../../utils/useCardGrid'


const DishList = () => {
	const selectCategory = useStore((state) => state.selectCategory)
	const { data: dishes, isLoading, isError } = useCardGrid(selectCategory)
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
			<ErrorCard title="Ошибка загрузки" message="Не удалось загрузить блюда этой категории." actionLabel="Повторить" onAction={() => window.location.reload()} />
		</div>
	)

	return (
		<div className='max-w-6xl justify-center mx-auto px-4 py-10'>
			<MealGrid dishes={dishesToRender} categoryName={selectCategory} />
			{hasMore && (
				<div className="flex justify-center mt-8">
					<button onClick={() => handleAddDishes()}
						className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-full transition-colors shadow-md">
						Загрузить ещё
					</button>
				</div>
			)}
		</div>
	)
}

export default DishList
