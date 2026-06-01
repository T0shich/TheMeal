import { TemplateDishList } from '../../components/TemplateDishList'
import { useCardGridByArea } from '../../utils/useCardGrid'
export const CountyGrid = () => {
	return (
		<TemplateDishList queryFunction={useCardGridByArea} />
	)
}
