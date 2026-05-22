import { motion } from "motion/react"
import { Link } from 'react-router-dom'
import type { Meal } from '../types/meal'

const Card = (props: Meal) => {
	return (
		
			<Link to={`/meal/${props.idMeal}`}>
				<motion.div className='bg-white rounded-2xl shadow-lg overflow-hidden w-[357px] h-[420px] flex flex-col'
					whileHover={{ scale: 1.07 }}
					whileTap={{scale: 1}}
				>
					<div className="h-[288px] w-full shrink-0">
						<img className='w-full h-full object-cover' src={props.strMealThumb} alt={props.strMeal} />
					</div>
					<div className="flex flex-col flex-grow justify-center items-center p-6 text-center">
						<h2 className="text-xl font-bold">{props.strMeal}</h2>
					</div>
				</motion.div>
			</Link>
	)
}

export default Card
