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
								className={`app-chip cursor-pointer md:text-base ${isActive ? 'app-chip-active' : 'app-chip-soft'}`}
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
