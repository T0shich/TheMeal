import type { Meal } from '../types/meal'



const Card = (props: Meal) => {
	return (
		<div className='bg-white rounded-2xl shadow-lg overflow-hidden w-[357px] h-[420px] flex flex-col'>
			<div className="h-[288px] w-full shrink-0">
				<img className='w-full h-full object-cover' src={props.strMealThumb} alt={props.strMeal} />
			</div>
			<div className="flex flex-col flex-grow justify-center items-center p-6 text-center">
				<h2 className="text-xl font-bold">{props.strMeal}</h2>
			</div>
		</div>
	)
}

export default Card
