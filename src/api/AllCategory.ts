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
