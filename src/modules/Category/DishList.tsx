import { useState } from 'react'
import { useStore } from '../../store/useStore'
import type { Meal } from '../../types/meal'
import Card from '../../ui/Card'
import ErrorCard from '../../ui/ErrorCard'
import Loader from '../../ui/Loader'
import { useCardGrid } from '../../utils/useCardGrid'
import { CategoryList } from './CategoryList'


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
		<div className='max-w-6xl justify-center mx-auto mt-5'>
			<CategoryList />
			<div className='px-4 py-10'>
				<h2 className='text-2xl font-bold pb-6'>Блюдо из категории: {selectCategory}</h2>
				<ul className=' grid  max-w-6xl grid-cols-1 justify-items-center gap-10 md:grid-cols-2 xl:grid-cols-3'>
					{dishesToRender?.map((dish: Meal) =>
						<li key={dish.idMeal} className='flex w-full justify-center'>
							<Card {...dish} />
						</li>
					)}
				</ul>
				{hasMore && (
					<div className="flex justify-center mt-6">
						<button onClick={() => handleAddDishes()}
							className="p-4 hover:bg-amber-500 rounded-full">
							Загрузить ещё
						</button>
					</div>
				)}
			</div>
		</div>
	)
}

export default DishList

