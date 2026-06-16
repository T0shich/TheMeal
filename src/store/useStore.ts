import { create } from 'zustand'
import type { Meal } from '../types/meal'

interface CategoryState {
	selectCategory: string
	setSelectCategory: (category: string) => void
	selectArea: string
	setSelectArea: (area: string) => void
	selectIngredient: string
	setSelectIngredient: (ingredient: string) => void
}

interface FilterState {
	filter: string
	setFilter: (filter: string) => void
}

interface FollowState {
	followedMeals: Meal[]
	addFollowedMeal: (meal: Meal) => void
	removeFollowedMeal: (meal: Meal) => void
}

export const useStore = create<CategoryState>(set => ({
	selectCategory: 'Beef',
	setSelectCategory: (category: string) => set({ selectCategory: category }),
	selectArea: 'Russian',
	setSelectArea: (area: string) => set({ selectArea: area }),
	selectIngredient: 'Chicken',
	setSelectIngredient: (ingredient: string) => set({ selectIngredient: ingredient }),
}))

export const useFilterStore = create<FilterState>(set => ({
	filter: '',
	setFilter: (filter: string) => set({ filter }),
}))


export const useFollowStore = create<FollowState>((set) => ({
	followedMeals: [],
	addFollowedMeal: (meal: Meal) => set((state) => ({ followedMeals: [...state.followedMeals, meal] })),
	removeFollowedMeal: (meal: Meal) => set((state) => ({ followedMeals: state.followedMeals.filter((m) => m.idMeal !== meal.idMeal) })),
}))
