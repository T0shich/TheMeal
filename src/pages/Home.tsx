import Header from '../components/Header'
import Search from '../modules/Search/Search'
import DishList from '../modules/Category/DishList'
const Home = () => {
	return (
		<div className="min-h-screen flex flex-col">
			<Header />
			<div className="items-center justify-center ">
				<Search  />
				<DishList/>
			</div>
		</div>
	)
}

export default Home
