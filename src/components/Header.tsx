import { FaRegUser } from "react-icons/fa"
import { FaSearch } from "react-icons/fa"
import HeaderLi from "../ui/HeaderLi"
const Header = () => {
	return (
		<header className=' h-20 w-full flex items-center justify-between px-16'>
			<div className="text-2xl font-bold text-[#1C1917]">
				<h2>The Modern Kitchen</h2>
			</div>
			<div className="">
				<ul className='flex gap-10 text-[#78716C] text-base'>
					<HeaderLi><a href="">Browse Recipes</a></HeaderLi>
					<HeaderLi><a href="">Masterclasses</a></HeaderLi>
					<HeaderLi><a href="">Stories</a></HeaderLi>
					<HeaderLi><a href="">Panty</a></HeaderLi>
				</ul>
			</div>
			<div className="">
				<ul className='flex gap-6 '>
					<HeaderLi isIcon><FaSearch className='text-[15px]'/></HeaderLi>
					<HeaderLi isIcon><FaRegUser className='text-[15px]'/></HeaderLi>
				</ul>
			</div>
		</header>
	)
}

export default Header
