
interface CategoryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode
	className?: string
}

export const CategoryButton = (props: CategoryButtonProps) => {

	const style = 'px-4 py-2 rounded-full bg-white text-gray-800 hover:bg-gray-300 transition-colors duration-300'

	return (
		<button {...props} className={` ${props.className || ''} ${style}`}>{props.children}</button>
	)
}
