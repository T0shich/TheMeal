import {create} from 'zustand'

export const useStore = create((set) => ({
	selectCategory : '',
	setSelectCategory: (category: string) => set({selectCategory : category})

}))

