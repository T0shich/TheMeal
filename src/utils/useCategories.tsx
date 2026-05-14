import { useQuery } from '@tanstack/react-query'
import { getAllCategories } from '../api/AllCategory'

export const useCategories = () => {
	return useQuery({
		queryKey: ['categories'],
		queryFn: getAllCategories
	})

}