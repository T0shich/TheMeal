import { useQuery } from '@tanstack/react-query'
import { getDishesByFilter , getDishesByArea , getDishesByIngredient } from '../api/AllCategory'

export const useCardGrid = (category: string) =>{
	return useQuery({
		queryKey: ['Dishes', category],
		queryFn: () => getDishesByFilter(category)
	})
}

export const useCardGridByArea = (area: string) =>{
	return useQuery({
		queryKey: ['Dishes', area],
		queryFn: () => getDishesByArea(area)
	})
}

export const useCardGridByIngredient = (ingredient: string) =>{
	return useQuery({
		queryKey: ['Dishes', ingredient],
		queryFn: () => getDishesByIngredient(ingredient)
	})
}