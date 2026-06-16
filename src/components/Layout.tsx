import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'

export const Layout = () => {
	return (
		<div className="min-h-screen flex flex-col font-sans text-stone-900 bg-stone-50">
			<div className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-stone-200/50 shadow-sm transition-all duration-300">
				<Header />
			</div>

			<div className="flex-grow flex flex-col w-full relative">
				<Outlet />
			</div>

			<Footer />
		</div>
	)
}