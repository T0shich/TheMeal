import { Link } from 'react-router-dom'

type ErrorCardProps = {
	title?: string
	message?: string
	actionLabel?: string
	actionTo?: string
	onAction?: () => void
}

const ErrorCard = ({ title = 'Something went wrong', message = 'There was an error loading data. Please try again later.', actionLabel = 'Refresh', actionTo, onAction }: ErrorCardProps) => {
	return (
		<section className='flex flex-col min-h-screen items-center justify-center'>
			<div className="app-panel mx-auto max-w-xl p-6 rounded-3xl text-center">
				<div className="text-6xl mb-3">⚠️</div>
				<h3 className="text-xl font-semibold text-stone-900">{title}</h3>
				<p className="mt-2 text-sm text-stone-600">{message}</p>

				<div className="mt-5 flex justify-center gap-3">
					{actionTo ? (
						<Link to={actionTo} className="app-button">
							{actionLabel}
						</Link>
					) : (
						<button onClick={onAction} className="app-button">
							{actionLabel}
						</button>
					)}
					<Link to="/" className="app-button-secondary text-sm">Go home</Link>
				</div>
			</div>
		</section>
	)
}

export default ErrorCard
