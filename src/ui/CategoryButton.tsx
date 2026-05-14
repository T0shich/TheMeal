import { useStore } from '../store/useStore'


interface CategoryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode
	className?: string
	categoryName: string
}

export const CategoryButton = (props: CategoryButtonProps) => {

	const setCategory = useStore((state) => state.setSelectCategory)
	const selectCategory = useStore((state) => state.selectCategory)
	const isSelected = selectCategory === props.categoryName

	const handleSelect = () => {
		if (!isSelected) {
			setCategory(props.categoryName)
		} else {
			setCategory('')
		}
	}


	const style = 'px-4 py-2 rounded-full border border-transparent text-gray-800 transition-colors duration-300 hover:bg-gray-300'

	return (
		<button onClick={() => handleSelect()} {...props} className={` ${props.className || ''} ${style} ${isSelected ? 'bg-orange-500 border-gray-200' : ''} `} > {props.children}</button>

	)
}
