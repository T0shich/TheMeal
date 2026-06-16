import { flag } from 'country-emoji'
import { motion } from 'motion/react'
import { useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Footer from '../components/Footer'
import type { MealDetail } from '../types/meal'
import ErrorCard from '../ui/ErrorCard'
import Loader from '../ui/Loader'
import { buildIngredients } from '../utils/buildIngredients'
import { useMealById } from '../utils/useCategories'
import { FaRegHeart } from "react-icons/fa6";
import { useFollowStore } from '../store/useStore'

const MealDetail = () => {
	const params = useParams()
	const id = params.id
	const navigate = useNavigate()
	const { data, isLoading, error } = useMealById(id!)
	const videoSectionRef = useRef<HTMLDivElement | null>(null)
	const wasFullscreenRef = useRef(false)
	const { followedMeals, addFollowedMeal, removeFollowedMeal } = useFollowStore()

	const isFollowed = followedMeals.includes(id!)

	const handleFollowClick = () => {
		if (isFollowed) {
			removeFollowedMeal(id!)
		} else {
			addFollowedMeal(id!)
		}
	}



	useEffect(() => {
		const handleFullscreenChange = () => {
			if (document.fullscreenElement) {
				wasFullscreenRef.current = true
				return
			}

			if (wasFullscreenRef.current) {
				wasFullscreenRef.current = false
				window.requestAnimationFrame(() => {
					videoSectionRef.current?.scrollIntoView({
						behavior: 'smooth',
						block: 'center',
					})
				})
			}
		}

		document.addEventListener('fullscreenchange', handleFullscreenChange)

		return () => {
			document.removeEventListener('fullscreenchange', handleFullscreenChange)
		}
	}, [])

	if (isLoading) return (<Loader />)

	if (error) {
		return (
			<ErrorCard title="Ошибка загрузки" message={`Не удалось загрузить данные блюда:${error.message}`} actionLabel="Повторить" onAction={() => window.location.reload()} />
		)
	}

	const ingredients = buildIngredients(data)

	return (
		<article className="min-h-screen flex flex-col bg-linear-to-br from-stone-100 via-orange-50 to-amber-100">
			<div className="mx-auto w-full flex-grow max-w-7xl px-4 py-6 md:px-8 md:py-10">
				<div className="mb-6 flex items-center justify-between">
					<button
						onClick={() => navigate(-1)}
						className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/80 px-6 py-2 text-md font-medium text-gray-700 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md cursor-pointer"
					>
						← Back
					</button>

					<motion.button
						whileHover={{ y: -5 }}
						onClick={handleFollowClick}
						className={`inline-flex items-center justify-center rounded-full border border-white/70 bg-white/80 w-11 h-11 text-stone-400 shadow-sm backdrop-blur hover:shadow-md hover:text-red-500 cursor-pointer`}
						aria-label="Add to favorites"
					>
						<FaRegHeart className={`text-xl ${isFollowed ? 'text-red-500' : ''}`} />
					</motion.button>
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
							<section>
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
							</section>


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
						<section ref={videoSectionRef}>
							<span className='p-3 font-semibold uppercase text-2xl text-amber-600'>The Video Recipe</span>
							<iframe
								className='w-full aspect-video rounded-2xl mt-1 shadow-2xl'
								src={data?.strYoutube?.replace('watch?v=', 'embed/')}
								title="YouTube video player"
								allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
								allowFullScreen
							>
							</iframe>
						</section>
					</div>
				</motion.div>
			</div>
			<Footer />
		</article>
	)
}

export default MealDetail
