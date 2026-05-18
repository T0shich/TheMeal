import { useQuery } from '@tanstack/react-query'
import { getDishesByCategory } from '../api/AllCategory'

export const useCardGrid = (category: string) =>{
	return useQuery({
		queryKey: ['Dishes', category],
		queryFn: () => getDishesByCategory(category)
	})
}