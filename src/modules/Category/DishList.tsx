import { useStore } from '../../store/useStore'
import type { Meal } from '../../types/meal'
import Card from '../../ui/Card'
import Loader from '../../ui/Loader'
import { useCardGrid } from '../../utils/useCardGrid'
import { CategoryList } from './CategoryList'
const DishList = () => {
	const selectCategory = useStore((state) => state.selectCategory)

	const { data: dishes, isLoading, isError } = useCardGrid(selectCategory)


	if (isLoading) return <div className="h-screen flex justify-center m-auto">
		<Loader />
	</div>
	if (isError) return <div className="h-screen flex justify-center m-auto">Ошибка загрузки блюд...</div>

	return (
		<div className='max-w-6xl  flex flex-col justify-center mx-auto'>
			<CategoryList />
			<div className='w-full px-4 py-10'>
				<h2 className='text-2xl font-bold pb-6'>Блюдо из категории: {selectCategory}</h2>
				<ul className='mx-auto grid w-full max-w-6xl grid-cols-1 justify-items-center gap-10 md:grid-cols-2 xl:grid-cols-3'>
					{dishes?.map((dish: Meal) =>
						<li key={dish.idMeal} className='flex w-full justify-center'>
							<Card {...dish} />
						</li>
					)}
				</ul>
			</div>
		</div>
	)
}

export default DishList
