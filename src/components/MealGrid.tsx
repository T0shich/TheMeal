import type { Meal } from '../types/meal'
import Card from '../ui/Card'
interface MealGridProps {
	dishes: Meal[],
	categoryName: string,
}

export const MealGrid = ({ dishes, categoryName }: MealGridProps) => {
	return (
		<>
			<h2 className='text-2xl font-bold pb-6'>Блюда из категории: {categoryName || 'Все'}</h2>
			<ul className=' grid  max-w-6xl grid-cols-1 justify-items-center gap-10 md:grid-cols-2 xl:grid-cols-3'>
				{dishes?.map((dish: Meal) =>
					<li key={dish.idMeal} className='flex w-full justify-center'>
						<Card {...dish} />
					</li>
				)}
			</ul>
		</>

	)
}
