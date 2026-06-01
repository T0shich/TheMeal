import { useQuery } from '@tanstack/react-query'
import { getAllCategories, getAllAreas , getAllIngredients } from '../api/AllCategory'
import { getMealById } from '../api/AllCategory'
export const useCategories = () => {
	return useQuery({
		queryKey: ['categories'],
		queryFn: getAllCategories
	})

}

export const useAreas = () => {
	return useQuery({
		queryKey: ['areas'],
		queryFn: getAllAreas
	})
}

export const useIngredients = () => {
	return useQuery({
		queryKey: ['ingredients'],
		queryFn: getAllIngredients
	})
}

export const useMealById = (id: string) => {
	return useQuery({
		queryKey: ['meal', id],
		queryFn: () => getMealById(id)
	})
}
