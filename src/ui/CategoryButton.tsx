import { motion } from "motion/react"
import type { ComponentProps } from "react"

interface CategoryButtonProps extends ComponentProps<typeof motion.button> {
	children: React.ReactNode
	className?: string
	categoryName: string
	setFunction?: (list: string) => void
	filterType?: string
}

export const CategoryButton = (props: CategoryButtonProps) => {

	const isSelected = props.filterType === props.categoryName
	const { categoryName, children, className, ...buttonProps } = props
	const handleSelect = () => {
		if (!isSelected) {
			props.setFunction?.(props.categoryName)
		} else {
			props.setFunction?.('')
		}
	}


	const style = 'px-4 py-2 rounded-full border border-transparent text-gray-800 transition-colors duration-300 hover:bg-gray-300 shadow-sm my-2 mx-1 cursor-pointer whitespace-nowrap flex items-center justify-center gap-2'

	return (
		<motion.button
			onClick={() => handleSelect()}
			{...buttonProps}
			className={` ${props.className || ''} ${style} ${isSelected ? 'bg-amber-400 border-gray-200' : ''} `}
			whileHover={{ scale: 1.1 }}
			whileTap={{ scale: 0.9 }}
		>{props.children}</motion.button> 

	)
}
