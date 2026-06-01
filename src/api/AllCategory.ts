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

export const getAllAreas = async () => {
	try {
		const response = await axios.get(
			'https://www.themealdb.com/api/json/v1/1/list.php?a=list',
		)
		if (response.status === 200) {
			return response.data.meals
		}
	} catch (error) {
		console.error('Failed to load areas:', error)
	}
}

export const getAllIngredients = async () => {
	try {
		const response = await axios.get(
			'https://www.themealdb.com/api/json/v1/1/list.php?i=list',
		)
		if (response.status === 200) {
			return response.data.meals
		}
	} catch (error) {
		console.error('Failed to load ingredients:', error)
	}
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getDishesByFilter = async (category: string) => {
	const currentCategory = category || 'Beef'

	const response = await axios.get(
		`https://www.themealdb.com/api/json/v1/1/filter.php?c=${currentCategory}`,
	)

	await delay(1000);

	if (response.status === 200) {
		return response.data.meals
	}

	throw new Error('Network response was not ok')
}

export const getDishesByArea = async (area: string) => {
	const currentArea = area || 'American'

	const response = await axios.get(
		`https://www.themealdb.com/api/json/v1/1/filter.php?a=${currentArea}`,
	)

	await delay(1000);

	if (response.status === 200) {
		return response.data.meals
	}

	throw new Error('Network response was not ok')
}

export const getDishesByIngredient = async (ingredient: string) => {
	const currentIngredient = ingredient || 'Chicken'

	const response = await axios.get(
		`https://www.themealdb.com/api/json/v1/1/filter.php?i=${currentIngredient}`,
	)

	await delay(1000);

	if (response.status === 200) {
		return response.data.meals
	}

	throw new Error('Network response was not ok')
}

export const getMealById = async (id: string) => {
	const response = await axios.get(
		`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
	)

	await delay(1000);
	if (response.status === 200) {
		return response.data.meals[0]
	}

	throw new Error('Network response was not ok')
}