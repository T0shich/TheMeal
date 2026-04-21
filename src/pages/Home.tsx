import Header from '../components/Header'
import Search from '../modules/Search/Search'
const Home = () => {
	return (
		<div className="min-h-screen flex flex-col">
			<Header />
			<div className="flex flex-1 items-center justify-center ">
				<Search  />
			</div>
		</div>
	)
}

export default Home
