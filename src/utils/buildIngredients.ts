import type { MealDetail } from '../types/meal'

export const buildIngredients = (meal?: MealDetail) => {
	if (!meal) return []

	return Array.from({ length: 20 }, (_, index) => index + 1)
		.map((num) => {
			const ingredient = meal[`strIngredient${num}` as keyof MealDetail]
			const measure = meal[`strMeasure${num}` as keyof MealDetail]

			if (!ingredient || typeof ingredient !== 'string' || ingredient.trim() === '') {
				return null
			}

			return {
				name: ingredient,
				measure: typeof measure === 'string' ? measure : '',
			}
		})
		.filter((item): item is { name: string; measure: string } => item !== null)
}