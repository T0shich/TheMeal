import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'

export const Layout = () => {
	return (
		<div className="app-shell">
			<div className="app-topbar sticky top-0 z-50 transition-all duration-300">
				<Header />
			</div>

			<div className="grow flex flex-col w-full relative">
				<Outlet />
			</div>

			<Footer />
		</div>
	)
}