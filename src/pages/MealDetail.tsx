
import { Link, useParams } from 'react-router-dom'
import { useMealById } from '../utils/useCategories'

const MealDetail: React.FC = () => {
	const params = useParams()
	const id = params.id

	const {data , isLoading, error} = useMealById(id!)

	if (isLoading) {
		return <div>Loading...</div>
	}

	if (error) {
		return <div>Error loading meal details</div>
	}	

	return (
		<div className="p-6">
			<Link to="/" className="text-blue-600 underline">Back</Link>
			<h1 className="text-2xl font-bold mt-4">Meal detail</h1>
			<p className="mt-2">ID: {id}</p>
		</div>
	)
}

export default MealDetail
