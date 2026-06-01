import { TemplateList } from '../../components/TemplateList'
import ErrorCard from '../../ui/ErrorCard'
import { useCategories } from '../../utils/useCategories'
import Loader from '../../ui/Loader'
import type { Category } from '../../types/meal'
import { CategoryButton } from '../../ui/CategoryButton'
import { useStore } from '../../store/useStore'
export const CategoryList = () => {

	const setCategory = useStore((state) => state.setSelectCategory)
	const selectCategory = useStore((state) => state.selectCategory)
	const { data, isLoading, error } = useCategories()




	if (isLoading) return <Loader />

	if (error) return (
		<div className="w-full flex justify-center">
			<ErrorCard title="Ошибка загрузки" message={`Не удалось загрузить категории: ${error.message}`} actionLabel="Повторить" onAction={() => window.location.reload()} />
		</div>
	)

	return (
		<TemplateList>
			<ul className='flex gap-4 no-scrollbar scroll-smooth' >
				{data?.map((cat: Category) => (
					<li key={cat.idCategory} className='flex w-full justify-center'>
						<CategoryButton categoryName={cat.strCategory} setFunction={setCategory} filterType={selectCategory}>
							{cat.strCategory}
						</CategoryButton>
					</li>
				))}
			</ul>
		</TemplateList>
	)
}
