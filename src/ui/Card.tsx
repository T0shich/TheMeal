import { motion } from "motion/react"
import { FaHeart, FaRegHeart } from "react-icons/fa"
import { Link } from 'react-router-dom'
import { useFollowStore } from '../store/useStore'
import type { Meal } from '../types/meal'

const Card = (props: Meal) => {
	const { followedMeals, addFollowedMeal, removeFollowedMeal } = useFollowStore()
	const isFollowed = followedMeals.some((meal) => meal.idMeal === props.idMeal)

	const handleFollowClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
		event.stopPropagation()

		if (isFollowed) {
			removeFollowedMeal(props)
			return
		}

		addFollowedMeal(props)
	}

	return (
		<Link to={`/meal/${props.idMeal}`}>
			<motion.article
				className='bg-white rounded-2xl shadow-lg overflow-hidden w-89.25 h-105 flex flex-col border border-white/70'
				whileHover={{ y: -6 }}
				whileTap={{ scale: 0.99 }}
			>
				<div className="h-72 relative w-full shrink-0">
					<button
						type="button"
						onClick={handleFollowClick}
						aria-label="Toggle favorite"
						className="absolute right-3 top-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/85 text-stone-500 shadow-md backdrop-blur transition hover:text-red-500"
					>
						{isFollowed ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
					</button>
					<img className='w-full h-full object-cover' src={props.strMealThumb} alt={props.strMeal} />
					<div className="absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-transparent" />
				</div>
				<div className="flex flex-col grow justify-between p-6">
					<div className="mb-4 flex items-center gap-2 overflow-hidden whitespace-nowrap text-xs font-semibold uppercase tracking-[0.18em]">
						<span className="max-w-[58%] truncate rounded-full bg-amber-100 px-3 py-1 text-amber-700">
							{props.strCategory || 'Recipe'}
						</span>
						{props.strArea && (
							<span className="max-w-[42%] truncate rounded-full bg-stone-100 px-3 py-1 text-stone-600">
								{props.strArea}
							</span>
						)}
					</div>
					<h2 className=" text-xl font-bold text-stone-900 leading-tight">{props.strMeal}</h2>
				</div>
			</motion.article>
		</Link>
	)
}

export default Card
