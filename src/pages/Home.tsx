import Header from '../components/Header'
import Search from '../modules/Search/Search'
import DishList from '../modules/Category/DishList'
import { motion } from 'motion/react'
const Home = () => {
	return (
		<motion.div className="min-h-screen flex flex-col "
			initial={{ opacity: 0, y: 16 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.35 }}	>
			<Header />
			<div className="items-center justify-center bg-linear-to-br from-stone-100 via-orange-50 to-amber-100">
				<Search />
				<DishList />
			</div>
		</motion.div>
	)
}

export default Home
