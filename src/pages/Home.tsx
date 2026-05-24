import { motion } from 'motion/react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import DishList from '../modules/Category/DishList'
import Search from '../modules/Search/Search'

const Home = () => {
	return (
		<motion.div
			className="min-h-screen flex flex-col font-sans text-stone-900 bg-stone-50"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.6, ease: 'easeOut' }}
		>
			<div className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-stone-200/50 shadow-sm transition-all duration-300">
				<Header />
			</div>

			<main className="flex-grow flex flex-col w-full">
				<section className="w-full relative shadow-2xl z-10">
					<Search />
				</section>

				<section className="w-full flex-grow relative bg-linear-to-br from-stone-100 via-orange-50 to-amber-100 pt-16 pb-24">
					<div className="absolute inset-0 bg-white/40 pointer-events-none" />

					<motion.div
						className="relative z-10 mx-auto w-full max-w-7xl px-4 md:px-8"
						initial={{ opacity: 0, y: 40 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: '-50px' }}
						transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
					>
						<div className="text-center mb-10 md:mb-14">
							<h2 className="text-4xl md:text-5xl font-black text-stone-900 tracking-tight drop-shadow-sm">Популярные категории</h2>
							<div className="w-24 h-1 bg-amber-500 mx-auto mt-6 rounded-full opacity-80" />
						</div>

						<DishList />
					</motion.div>
				</section>
			</main>

			<Footer />
		</motion.div>
	)
}

export default Home
