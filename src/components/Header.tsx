import { FaRegUser, FaSearch } from "react-icons/fa"
import { Link, useNavigate } from 'react-router-dom'
import HeaderLi from "../ui/HeaderLi"

const Header = () => {
	const navigate = useNavigate()

	const handleSearchClick = () => {
		navigate('/')
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	return (
		<header className='h-20 w-full flex items-center gap-3 px-4 sm:px-6 lg:px-12'>
			<div className="shrink-0 app-brand text-lg sm:text-xl lg:text-2xl">
				<Link to="/" className="app-brand-link"><h2>The Modern Kitchen</h2></Link>
			</div>
			<nav className='flex-1 overflow-x-auto no-scrollbar'>
				<ul className='mx-auto flex w-max items-center gap-5 whitespace-nowrap text-sm text-stone-600 sm:text-base md:gap-8 lg:gap-10'>
					<HeaderLi to="/">Главная</HeaderLi>
					<HeaderLi to="/recipes">Каталог</HeaderLi>
					<HeaderLi to="/favorites">Избранное</HeaderLi>
					<HeaderLi to="/pantry">Мои продукты</HeaderLi>
				</ul>
			</nav>
			<div className="hidden shrink-0 sm:block">
				<ul className='flex gap-6 '>
					<HeaderLi isIcon onClick={handleSearchClick}><FaSearch className='text-[17px]' /></HeaderLi>
					<HeaderLi isIcon to="/profile"><FaRegUser className='text-[17px]' /></HeaderLi>
				</ul>
			</div>
		</header>
	)
}

export default Header
