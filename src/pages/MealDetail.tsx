import { flag } from 'country-emoji'
import { motion } from 'motion/react'
import { Link, useParams } from 'react-router-dom'
import type { MealDetail } from '../types/meal'
import { useMealById } from '../utils/useCategories'

const buildIngredients = (meal?: MealDetail) => {
	if (!meal) return []

	return Array.from({ length: 20 }, (_, index) => index + 1)
		.map((num) => {
			const ingredient = meal[`strIngredient${num}` as keyof MealDetail]
			const measure = meal[`strMeasure${num}` as keyof MealDetail]

			if (!ingredient || typeof ingredient !== 'string' || ingredient.trim() === '') {
				return null
			}

			return {
				name: ingredient,
				measure: typeof measure === 'string' ? measure : '',
			}
		})
		.filter((item): item is { name: string; measure: string } => item !== null)
}

const MealDetail = () => {
	const params = useParams()
	const id = params.id

	const { data, isLoading, error } = useMealById(id!)

	if (isLoading) {
		return <div>Loading...</div>
	}

	if (error) {
		return (
			<div className="min-h-screen bg-linear-to-br from-stone-100 via-orange-50 to-amber-100 flex items-center justify-center p-6">
				<div className="rounded-3xl bg-white/85 backdrop-blur-md border border-white/60 shadow-xl px-6 py-5 text-center text-gray-700">
					Error loading meal details
				</div>
			</div>
		)
	}

	const ingredients = buildIngredients(data)

	return (
		<div className="min-h-screen bg-linear-to-br from-stone-100 via-orange-50 to-amber-100">
			<div className="mx-auto max-w-7xl px-4 py-6 md:px-8 md:py-10">
				<div className="mb-6 flex items-center justify-between">
					<Link
						to="/"
						className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/80 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md"
					>
						← Back
					</Link>
				</div>

				<motion.div
					initial={{ opacity: 0, y: 16 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.35 }}
					className="grid gap-8 xl:grid-cols-[420px_minmax(0,1fr)]"
				>
					<div className="xl:sticky xl:top-6 h-fit overflow-hidden rounded-4xl border border-white/70 bg-white/85 shadow-2xl backdrop-blur">
						<div className="relative">
							<img
								src={data?.strMealThumb}
								alt={data?.strMeal || 'Meal image'}
								className="h-80 w-full object-cover md:h-105"
							/>
							<div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />
						</div>

						<div className="space-y-5 p-5 md:p-6">
							<div>
								<div className="mb-3 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
									<span className="rounded-full bg-amber-100 px-3 py-1 text-amber-700">{data?.strCategory}</span>
									<span className="rounded-full bg-gray-100 px-3 py-1 text-gray-700">{data?.strArea} {flag(data?.strCountry)}</span>
								</div>
								<h1 className="text-3xl font-black leading-tight text-gray-900 md:text-4xl">
									{data?.strMeal}
								</h1>
								{data?.strTags && (
									<p className="mt-3 text-sm text-gray-600">
										Tags: <span className="font-medium text-gray-800">{data.strTags}</span>
									</p>
								)}
							</div>

							<motion.a
								href={data?.strYoutube}
								target="_blank"
								rel="noreferrer"
								className="inline-flex w-full items-center justify-center rounded-2xl bg-linear-to-r from-amber-500 to-orange-500 px-5 py-3 font-semibold text-white shadow-lg shadow-amber-500/25 transition hover:shadow-xl"
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
							>
								Watch The Video Recipe
							</motion.a>
						</div>
					</div>

					<div className="space-y-6">
						<section className="rounded-4xl border border-white/70 bg-white/80 p-6 shadow-xl backdrop-blur">
							<div className="mb-4 flex items-center justify-between gap-4">
								<div>
									<p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-600">Instructions</p>
									<h2 className="mt-1 text-2xl font-bold text-gray-900">How to cook it</h2>
								</div>
							</div>
							<p className="whitespace-pre-line text-sm leading-7 text-gray-700 md:text-base">
								{data?.strInstructions}
							</p>
						</section>

						<section className="rounded-4xl border border-white/70 bg-white/80 p-6 shadow-xl backdrop-blur">
							<div className="mb-4 flex items-center justify-between gap-4">
								<div>
									<p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-600">Ingredients</p>
									<h2 className="mt-1 text-2xl font-bold text-gray-900">What you need</h2>
								</div>
								<span className="rounded-full bg-amber-50 px-3 py-1 text-sm font-medium text-amber-700">
									{ingredients.length} items
								</span>
							</div>

							<div className="grid gap-3 sm:grid-cols-2">
								{ingredients.map((item) => (
									<div
										key={`${item.name}-${item.measure}`}
										className="rounded-2xl border border-gray-100 bg-linear-to-br from-white to-stone-50 px-4 py-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
									>
										<p className="font-medium text-gray-900">{item.name}</p>
										{item.measure && (
											<p className="mt-1 text-sm text-gray-500">{item.measure}</p>
										)}
									</div>
								))}
							</div>
						</section>
					</div>
				</motion.div>
			</div>
		</div>
	)
}

export default MealDetail
