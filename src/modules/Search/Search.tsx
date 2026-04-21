import axios from 'axios'
import { useEffect, useState } from 'react'

type Meal = {
	idMeal: string
	strMeal: string
}

const Search = () => {
	const [query, setQuery] = useState<string>('')
	const [meals, setMeals] = useState<Meal[]>([])
	const [isSeccess, setIsSuccess] = useState<boolean>(false)
	useEffect(() => {
		const searchMealsByName = async () => {
			try {
				if(query === '') {
					setMeals([])
					setIsSuccess(true)
					return
				}
				const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
				if (response.status === 200) {
					setMeals(response.data.meals ?? [])
					setIsSuccess(true)
				} 
				else {
					setMeals([])
					setIsSuccess(false)
				}

			} catch (error) {
				console.error('Error fetching meals:', error)
				setMeals([])
				setIsSuccess(false)
			}
		}

		searchMealsByName()
	}, [query])
	return (
		<div>
			<input className='bg-amber-500 p-10 rounded-full outline-none' type="text" placeholder="Search recipes..."
				value={query}
				onChange={e => setQuery(e.target.value)}
			/>

			{isSeccess ? (
				<ul>
					{meals.map(meal => (
						<li key={meal.idMeal}>{meal.strMeal}</li>
					))}
				</ul>
			) : (
				<p>No meals found.</p>
			)}
		</div>

	)
}

export default Search
