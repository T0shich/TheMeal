import { useRef, useState } from 'react'

interface TemplateListProps {
	children?: React.ReactNode
}

export const TemplateList = ({ children }: TemplateListProps) => {
	const [isAtStart, setIsAtStart] = useState(true)
	const [isAtEnd, setIsAtEnd] = useState(false)
	const scrollRef = useRef<HTMLDivElement>(null)


	const updateArrows = () => {
		if (scrollRef.current) {
			const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
			const maxScrollLeft = scrollWidth - clientWidth
			const hasHorizontalOverflow = maxScrollLeft > 1

			setIsAtStart(scrollLeft <= 1)
			setIsAtEnd(!hasHorizontalOverflow || scrollLeft >= maxScrollLeft - 1)
		}
	}

	const handleScroll = (direction: 'left' | 'right') => {
		if (scrollRef.current) {
			const scrollAmount = 500

			scrollRef.current.scrollBy({
				left: direction === 'left' ? -scrollAmount : scrollAmount,
				behavior: 'smooth',
			})
		}
	}


	return (
		<section className='flex items-center justify-center gap-4'>
			<div className='flex h-10 w-10 flex-none items-center justify-center'>
				<button
					onClick={() => handleScroll('left')}
					aria-hidden={isAtStart}
					tabIndex={isAtStart ? -1 : 0}
					className={`transition-opacity duration-200 ${isAtStart ? 'pointer-events-none opacity-0' : 'opacity-100'}`}
				>
					{'<'}
				</button>
			</div>
			<div className="max-w-6xl overflow-hidden mx-4" ref={scrollRef} onScroll={updateArrows}>
				{children}
			</div>
			<div className='flex h-10 w-10 flex-none items-center justify-center'>
				<button
					onClick={() => handleScroll('right')}
					aria-hidden={isAtEnd}
					tabIndex={isAtEnd ? -1 : 0}
					className={`transition-opacity duration-200 ${isAtEnd ? 'pointer-events-none opacity-0' : 'opacity-100'}`}
				>
					{'>'}
				</button>
			</div>
		</section>
	)
}
