import { NavLink } from 'react-router-dom'

interface Props {
	to?: string
	children: React.ReactNode
	className?: string
	isIcon?: boolean
	onClick?: () => void
}

const HeaderLi = (props: Props) => {
	const baseStyle = 'transition-all duration-200 cursor-pointer flex items-center h-full py-1 border-b-2'

	const content = props.to ? (
		<NavLink
			to={props.to}
			end={props.to === '/'}
			className={({ isActive }) =>
				`${baseStyle} ${props.isIcon ? 'app-nav-icon border-transparent' : 'app-nav-link'} ${isActive && !props.isIcon ? 'app-nav-link-active' : ''}`
			}
		>
			{props.children}
		</NavLink>
	) : (
		<button onClick={props.onClick} className={`${baseStyle} bg-transparent border-transparent ${props.isIcon ? 'app-nav-icon' : 'app-nav-link'}`}>
			{props.children}
		</button>
	)

	return (
		<li className={`flex items-center ${props.className || ''}`}>
			{content}
		</li>
	)
}

export default HeaderLi
