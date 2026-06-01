import { TemplateList } from '../../components/TemplateList'
import { useStore } from '../../store/useStore'
import { CategoryButton } from '../../ui/CategoryButton'
import ErrorCard from '../../ui/ErrorCard'
import Loader from '../../ui/Loader'
import { useIngredients } from '../../utils/useCategories'

export const IngridientList = () => {
	const setIngredient = useStore((state) => state.setSelectIngredient)
	const selectIngredient = useStore((state) => state.selectIngredient)
	const { data, isLoading, error } = useIngredients()

	if (isLoading) return <Loader />

	if (error) return (
		<div className="w-full flex justify-center">
			<ErrorCard title="Ошибка загрузки" message={`Не удалось загрузить ингредиенты: ${error.message}`} actionLabel="Повторить" onAction={() => window.location.reload()} />
		</div>
	)

	return (
		<TemplateList>
			<ul className='flex gap-4 no-scrollbar scroll-smooth' >
				{data?.map((ingredient: any) => (
					<li key={ingredient.idIngredient} className='flex w-full justify-center'>
						<CategoryButton categoryName={ingredient.strIngredient} setFunction={setIngredient} filterType={selectIngredient}>
							{ingredient.strIngredient}
						</CategoryButton>
					</li>
				))}
			</ul>
		</TemplateList>
	)
}
