import { create } from 'zustand'

interface CategoryState {
	selectCategory: string
	setSelectCategory: (category: string) => void
}

interface FilterState {
	filter: string
	setFilter: (filter: string) => void
}


export const useStore = create<CategoryState>(set => ({
	selectCategory: 'Beef',
	setSelectCategory: (category: string) => set({ selectCategory: category }),
}))

export const useFilterStore = create<FilterState>(set => ({
	filter: '',
	setFilter: (filter: string) => set({ filter }),
}))
