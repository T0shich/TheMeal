import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import type { Meal } from '../../types/meal'
import Card from '../../ui/Card'
import { CategoryList } from './CategoryList'
import {useStore} from '../../store/useStore'
const DishList = () => {
	const [data, setData] = useState<Meal[]>([])

	const selectCategory = useStore((state) => state.selectCategory)

	useEffect(() => {

		const fetchCategory = async () => {
			try {
				const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectCategory}`)
				if (response.status === 200) {
					setData(response.data.meals.slice(0, 9) ?? [])
				}
			} catch (error) {
				console.error('Failed to load dishes:', error)
			}
		}
		fetchCategory()
	}, [selectCategory])

	return (
		<div>
			<CategoryList />
			<div className='w-full px-4 py-10'>
				<ul className='mx-auto grid w-full max-w-6xl grid-cols-1 justify-items-center gap-10 md:grid-cols-2 xl:grid-cols-3'>
					{data.map(item =>
						<li key={item.idMeal} className='flex w-full justify-center'>
							<Card {...item} />
						</li>
					)}
				</ul>
			</div>
		</div>
	)
}

export default DishList
