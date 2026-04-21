import type{ LiHTMLAttributes } from 'react'
interface Props extends LiHTMLAttributes<HTMLLIElement> {
	children: React.ReactNode
	className?: string
	isIcon?: boolean
}

const HeaderLi = (props: Props) => {
	const styleForText:string = 'active:text-[#9A442D] active:border-b active:font-bold hover:text-[#9A442D] hover:border-b hover:font-bold'
	const styleForIcon:string = 'active:text-[#9A442D]   hover:text-[#9A442D] '
	return (
		<div className={`${props.isIcon ? styleForIcon : styleForText} ${props.className || ''}`}>
			{props.children}
		</div>
	)
}

export default HeaderLi
