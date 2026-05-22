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
			<div className="mx-auto max-w-xl p-6 rounded-3xl bg-white/90 backdrop-blur-md border border-white/60 shadow-xl text-center">
				<div className="text-6xl mb-3">⚠️</div>
				<h3 className="text-xl font-semibold text-gray-900">{title}</h3>
				<p className="mt-2 text-sm text-gray-600">{message}</p>

				<div className="mt-5 flex justify-center gap-3">
					{actionTo ? (
						<Link to={actionTo} className="px-4 py-2 rounded-full bg-amber-500 text-white font-medium shadow-sm hover:brightness-95">
							{actionLabel}
						</Link>
					) : (
						<button onClick={onAction} className="px-4 py-2 rounded-full bg-amber-500 text-white font-medium shadow-sm hover:brightness-95">
							{actionLabel}
						</button>
					)}
					<Link to="/" className="px-4 py-2 rounded-full border border-gray-200 text-sm text-gray-700">Go home</Link>
				</div>
			</div>
		</section>
	)
}

export default ErrorCard
