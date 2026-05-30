import { AnimatePresence, motion } from "motion/react"
import { useState } from 'react'
import { IoFilterSharp } from "react-icons/io5"

export const Filter = () => {
	const [isOpen, setIsOpen] = useState(false)


	return (
		<div className="relative">
			<motion.button
				className={`text-2xl rounded-full p-3 hover:bg-gray-300 transition-colors ${isOpen ? 'bg-amber-400' : ''}`}
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.9 }}
				animate={{ rotate: isOpen ? 360 : 0 }}
				transition={{ duration: 0.4, ease: "easeInOut" }}
				onClick={() => setIsOpen(!isOpen)}
			><IoFilterSharp /> </motion.button>
			<AnimatePresence>
				{isOpen && (
					<motion.ul
						className="absolute flex gap-5 top-16 right-0 mt-2 w-fit rounded-lg p-4 z-10 max-w-6xl"
						initial={{ opacity: 0, x: 50 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: 50 }}
						transition={{ ease: "easeOut" }}
					>
						<li className="px-4 py-2 hover:bg-gray-100 rounded-2xl cursor-pointer shadow-md">Option</li>
						<li className="px-5 py-2 hover:bg-gray-100 rounded-2xl cursor-pointer shadow-md">Option</li>
						<li className="px-4 py-2 hover:bg-gray-100 rounded-2xl cursor-pointer shadow-md">Option</li>


					</motion.ul>
				)}
			</AnimatePresence>
		</div>

	)
}
