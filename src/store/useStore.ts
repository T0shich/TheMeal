import {create} from 'zustand'

interface CategoryState {
  selectCategory: string
  setSelectCategory: (category: string) => void
}

export const useStore = create<CategoryState>((set) => ({
	selectCategory : 'Beef',
	setSelectCategory: (category: string) => set({selectCategory : category})

}))

