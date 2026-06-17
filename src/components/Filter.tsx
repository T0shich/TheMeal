import { motion } from "motion/react"
import { useFilterStore } from '../store/useStore'

interface FilterProps {
	Options: string[]
	className?: string
}

export const Filter = ({ Options, className }: FilterProps) => {
	const filter = useFilterStore((state) => state.filter)
	const setFilter = useFilterStore((state) => state.setFilter)

	const handleOptionClick = (option: string) => {
		setFilter(option)
	}

	const activeOption = filter || Options[0]

	return (
		<div className={className}>
			<ul className="flex flex-wrap justify-center gap-3 md:gap-4">
				{Options.map((option) => {
					const isActive = option === activeOption

					return (
						<li key={option}>
							<motion.button
								type="button"
								onClick={() => handleOptionClick(option)}
								className={`rounded-full border px-5 py-2 text-sm font-semibold tracking-wide shadow-sm transition cursor-pointer md:text-base ${isActive
									? 'border-amber-500 bg-amber-500 text-white'
									: 'border-white/80 bg-white/80 text-stone-700 hover:border-amber-300 hover:text-amber-700'
									}`}
								whileHover={{ y: -2 }}
								whileTap={{ scale: 0.98 }}
							>
								{option}
							</motion.button>
						</li>
					)
				})}
			</ul>
		</div>

	)
}
