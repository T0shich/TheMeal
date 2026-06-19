import { Command } from 'cmdk'
import { AnimatePresence, motion } from 'motion/react'
import { useMemo, useState } from 'react'
import { TemplateList } from '../../components/TemplateList'
import { useStore } from '../../store/useStore'
import type { Ingredient } from '../../types/meal'
import ErrorCard from '../../ui/ErrorCard'
import Loader from '../../ui/Loader'
import { useIngredients } from '../../utils/useCategories'

export const IngridientList = () => {

	const [query, setQuery] = useState('')
	const setIngredient = useStore((state) => state.setSelectIngredient)
	const { data, isLoading, error } = useIngredients()

	const filteredIngredients = useMemo(() => {
		if (!data) return []
		const lowerCaseQuery = query.toLowerCase()
		return data.filter((ingredient: Ingredient) => ingredient.strIngredient.toLowerCase().includes(lowerCaseQuery))
	}, [data, query])

	if (isLoading) return <Loader />

	if (error) return (
		<div className="w-full flex justify-center">
			<ErrorCard title="Loading Error" message={`Failed to load ingredients: ${error.message}`} actionLabel="Retry" onAction={() => window.location.reload()} />
		</div>
	)

	return (
		<TemplateList withScroll={false}>
			<Command className="relative mx-auto w-full overflow-visible" shouldFilter={false}>
				<div className="relative">
					<div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-amber-700">
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
							<path d="M21 21L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
							<path d="M11 19A8 8 0 1 1 11 3a8 8 0 0 1 0 16z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
						</svg>
					</div>

					<Command.Input
						value={query}
						onValueChange={setQuery}
						placeholder='Search ingredients...'
						className='w-full rounded-3xl border border-amber-200 bg-white/90 pl-14 pr-6 py-4 text-base outline-none placeholder:text-gray-400 shadow-lg'
					/>
				</div>

				<AnimatePresence>
					{query && (
						<motion.div
							initial={{ opacity: 0, y: -8 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -8 }}
							transition={{ duration: 0.18 }}
						>
							<Command.List className="absolute left-0 top-full z-30 mt-3 max-h-70 w-full overflow-y-auto rounded-2xl border border-amber-100 bg-white p-2 shadow-xl shadow-black/10">
								{isLoading && <Command.Loading className="p-4 text-center text-sm text-gray-500">Loading...</Command.Loading>}
								{error && <div className="p-4 text-center text-sm text-red-600">{error}</div>}
								{!isLoading && query.trim() !== '' && filteredIngredients.length === 0 && (
									<div className="p-4 text-center text-sm text-gray-500">No ingredients found</div>
								)}

								{filteredIngredients.map((ingredient: Ingredient) => (
									<Command.Item
										key={ingredient.strIngredient}
										value={ingredient.strIngredient}
										onSelect={() => {
											setIngredient(ingredient.strIngredient)
											setQuery('')
										}}
										className="cursor-pointer flex items-center gap-3 rounded-xl px-3 py-2 text-left text-sm text-gray-800 outline-none hover:bg-amber-50"
									>

										<div className="flex-1">
											<div className="font-medium">{ingredient.strIngredient}</div>
										</div>
									</Command.Item>
								))}
							</Command.List>
						</motion.div>
					)}
				</AnimatePresence>

			</Command>
		</TemplateList>
	)
}
