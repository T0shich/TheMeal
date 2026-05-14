import { useRef, useState } from 'react'
import type { Category } from '../../types/meal'
import { CategoryButton } from '../../ui/CategoryButton'
import { useCategories } from '../../utils/useCategories'

export const CategoryList = () => {
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
			const scrollAmount = 300

			scrollRef.current.scrollBy({
				left: direction === 'left' ? -scrollAmount : scrollAmount,
				behavior: 'smooth',
			})
		}
	}


	const { data, isLoading, error } = useCategories()



	if (isLoading) return <span>Загрузка...</span>

	if (error) return <span>Ошибка: {error.message}</span>

	return (
		<div className='flex items-center justify-center gap-4'>
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
				<ul className='flex gap-4 no-scrollbar scroll-smooth' >
					{data?.map((cat: Category) => <li key={cat.idCategory}><CategoryButton>{cat.strCategory}</CategoryButton></li>)}
				</ul>
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
		</div>
	)
}
