import { useQuery } from '@tanstack/react-query'
import { getAllCategories } from '../api/AllCategory'
import { getMealById } from '../api/AllCategory'
export const useCategories = () => {
	return useQuery({
		queryKey: ['categories'],
		queryFn: getAllCategories
	})

}

export const useMealById = (id: string) => {
	return useQuery({
		queryKey: ['meal', id],
		queryFn: () => getMealById(id)
	})
}
