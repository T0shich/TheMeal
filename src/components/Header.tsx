import { useState } from 'react'
import { FaRegUser, FaSearch, FaBars, FaTimes } from "react-icons/fa"
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import HeaderLi from "../ui/HeaderLi"

const Header = () => {
	const navigate = useNavigate()
	const [isOpen, setIsOpen] = useState(false)

	const handleSearchClick = () => {
		navigate('/')
		window.scrollTo({ top: 0, behavior: 'smooth' })
		setIsOpen(false)
	}

	return (
		<header className='h-20 w-full flex items-center justify-between px-4 sm:px-6 lg:px-12 relative'>
			<div className="shrink-0 app-brand text-lg sm:text-xl lg:text-2xl">
				<Link to="/" className="app-brand-link" onClick={() => setIsOpen(false)}>
					<h2>The Modern Kitchen</h2>
				</Link>
			</div>

			{/* Desktop Menu */}
			<nav className='hidden md:flex flex-1 overflow-x-auto no-scrollbar justify-center'>
				<ul className='mx-auto flex w-max items-center gap-5 whitespace-nowrap text-sm text-stone-600 sm:text-base md:gap-8 lg:gap-10'>
					<HeaderLi to="/">Home</HeaderLi>
					<HeaderLi to="/recipes">Catalog</HeaderLi>
					<HeaderLi to="/favorites">Favorites</HeaderLi>
				</ul>
			</nav>

			{/* Actions & Hamburger Toggle */}
			<div className="flex items-center gap-4 sm:gap-6">
				{/* Actions (always visible and accessible) */}
				<ul className='flex gap-4 sm:gap-6'>
					<HeaderLi isIcon onClick={handleSearchClick}>
						<FaSearch className='text-[17px] cursor-pointer' />
					</HeaderLi>
				
				</ul>

				{/* Hamburger Button */}
				<button
					onClick={() => setIsOpen(!isOpen)}
					className="md:hidden flex items-center justify-center p-2 rounded-full hover:bg-stone-100 transition-colors cursor-pointer text-stone-600 hover:text-stone-900 focus:outline-none"
					aria-label="Toggle menu"
				>
					{isOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
				</button>
			</div>

			{/* Mobile Dropdown Panel */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: 'auto' }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.25, ease: 'easeInOut' }}
						className="absolute top-20 left-0 w-full bg-white/95 backdrop-blur-md border-b border-stone-200/60 shadow-lg flex flex-col md:hidden z-40 overflow-hidden"
					>
						<ul className="flex flex-col py-4 px-6 gap-2">
							<li>
								<Link
									to="/"
									onClick={() => setIsOpen(false)}
									className="block py-3 px-4 rounded-xl text-stone-700 hover:bg-orange-50 hover:text-orange-700 transition-all font-semibold"
								>
									Home
								</Link>
							</li>
							<li>
								<Link
									to="/recipes"
									onClick={() => setIsOpen(false)}
									className="block py-3 px-4 rounded-xl text-stone-700 hover:bg-orange-50 hover:text-orange-700 transition-all font-semibold"
								>
									Catalog
								</Link>
							</li>
							<li>
								<Link
									to="/favorites"
									onClick={() => setIsOpen(false)}
									className="block py-3 px-4 rounded-xl text-stone-700 hover:bg-orange-50 hover:text-orange-700 transition-all font-semibold"
								>
									Favorites
								</Link>
							</li>
						</ul>
					</motion.div>
				)}
			</AnimatePresence>
		</header>
	)
}

export default Header
