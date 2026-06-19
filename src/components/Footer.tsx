import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Footer = () => {
	return (
		<footer className="app-footer py-12 px-6 md:px-16 mt-auto w-full shadow-inner">
			<div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
				<div className="col-span-1 md:col-span-2">
					<h2 className="text-2xl font-bold text-white mb-4">The Modern Kitchen</h2>
					<p className="text-stone-400 max-w-sm leading-relaxed">
						Откройте для себя тысячи вкуснейших рецептов со всего мира. Готовьте с любовью, пробуйте новое и наслаждайтесь каждым кусочком.
					</p>
				</div>
				<div>
					<h3 className="text-lg font-semibold text-white mb-4">Навигация</h3>
					<ul className="space-y-2">
						<li><Link to="/" className="hover:text-amber-500 transition-colors duration-300">Главная</Link></li>
						<li><a href="#" className="hover:text-amber-500 transition-colors duration-300">Рецепты</a></li>
						<li><a href="#" className="hover:text-amber-500 transition-colors duration-300">Мастер-классы</a></li>
						<li><a href="#" className="hover:text-amber-500 transition-colors duration-300">О нас</a></li>
					</ul>
				</div>
				<div>
					<h3 className="text-lg font-semibold text-white mb-4">Мы в соцсетях</h3>
					<div className="flex gap-4">
						<a href="#" aria-label="Instagram" className="text-2xl hover:text-amber-500 transition-transform duration-300 hover:-translate-y-1"><FaInstagram /></a>
						<a href="#" aria-label="Facebook" className="text-2xl hover:text-amber-500 transition-transform duration-300 hover:-translate-y-1"><FaFacebook /></a>
						<a href="#" aria-label="Twitter" className="text-2xl hover:text-amber-500 transition-transform duration-300 hover:-translate-y-1"><FaTwitter /></a>
						<a href="#" aria-label="YouTube" className="text-2xl hover:text-amber-500 transition-transform duration-300 hover:-translate-y-1"><FaYoutube /></a>
					</div>
				</div>
			</div>

			<div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-stone-800 flex flex-col md:flex-row items-center justify-between text-sm text-stone-500">
				<p>&copy; {new Date().getFullYear()} The Modern Kitchen. </p>

			</div>
		</footer>
	)
}

export default Footer