import axios from 'axios'

export const getAllCategories = async () => {
	try {
		const response = await axios.get(
			'https://www.themealdb.com/api/json/v1/1/categories.php',
		)
		if (response.status === 200) {
			return response.data.categories
		}
	} catch (error) {
		console.error('Failed to load categories:', error)
	}
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getDishesByCategory = async (category: string) => {
	const currentCategory = category || 'Beef'

	const response = await axios.get(
		`https://www.themealdb.com/api/json/v1/1/filter.php?c=${currentCategory}`,
	)

	await delay(1000);

	if (response.status === 200) {
		return response.data.meals?.slice(0, 9) ?? []
	}

	throw new Error('Network response was not ok')
}
