import { create } from 'zustand'

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
