import { useCardGrid, useCardGridByArea, useCardGridByIngredient } from '../../utils/useCardGrid'
import { TemplateDishList } from '../../components/TemplateDishList'
import { CategoryList } from '../Lists/CategoryList'
import { CountyList } from '../Lists/CountyList'
import { IngridientList } from '../Lists/IngridientList'
import { useStore } from '../../store/useStore'

interface DynamicDishGridProps {
	filterType: string
}

export const DynamicDishGrid = ({ filterType }: DynamicDishGridProps) => {
	const selectCategory = useStore((state) => state.selectCategory)
	const selectArea = useStore((state) => state.selectArea)
	const selectIngredient = useStore((state) => state.selectIngredient)

	switch (filterType) {
		case 'Категории':
		case '':
			return (
				<>
					<CategoryList />
					<TemplateDishList queryFunction={useCardGrid} activeFilter={selectCategory} />
				</>
			)
		case 'Страны':
			return (
				<>
					<CountyList />
					<TemplateDishList queryFunction={useCardGridByArea} activeFilter={selectArea} />
				</>
			)
		case 'Ингридиент':
			return (
				<>
					<IngridientList />
					<TemplateDishList queryFunction={useCardGridByIngredient} activeFilter={selectIngredient} />
				</>
			)
		default:
			return null
	}
}