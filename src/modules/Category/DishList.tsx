import { useState } from 'react'
import { useStore } from '../../store/useStore'
import type { Meal } from '../../types/meal'
import Card from '../../ui/Card'
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
			<h2 className='text-2xl font-bold pb-6'>Блюда из категории: {selectCategory || 'Все'}</h2>
			<ul className=' grid  max-w-6xl grid-cols-1 justify-items-center gap-10 md:grid-cols-2 xl:grid-cols-3'>
				{dishesToRender?.map((dish: Meal) =>
					<li key={dish.idMeal} className='flex w-full justify-center'>
						<Card {...dish} />
					</li>
				)}
			</ul>
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
