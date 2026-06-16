import { FaRegUser, FaSearch } from "react-icons/fa"
import { Link } from 'react-router-dom'
import HeaderLi from "../ui/HeaderLi"
const Header = () => {
	return (
		<header className=' h-20 w-full flex items-center justify-between px-16'>
			<div className="text-2xl font-bold text-[#1C1917]">
				<Link to="/"><h2>The Modern Kitchen</h2></Link>
			</div>
			<div className="">
				<ul className='flex gap-10 text-[#78716C] text-base'>
					<HeaderLi><Link to="/">Главная</Link></HeaderLi>
					<HeaderLi><Link to="/">Рецепты</Link></HeaderLi>
					<HeaderLi><Link to="/favorites">Избранное</Link></HeaderLi>
					<HeaderLi><Link to="/pantry">Мои продукты</Link></HeaderLi>
				</ul>
			</div>
			<div className="">
				<ul className='flex gap-6 '>
					<HeaderLi isIcon><FaSearch className='text-[15px]' /></HeaderLi>
					<HeaderLi isIcon><FaRegUser className='text-[15px]' /></HeaderLi>
				</ul>
			</div>
		</header>
	)
}

export default Header
