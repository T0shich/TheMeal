import { TemplateDishList } from '../../components/TemplateDishList'
import { useCardGridByArea } from '../../utils/useCardGrid'
import { useStore } from '../../store/useStore'

export const CountyGrid = () => {
	const selectArea = useStore((state) => state.selectArea)
	return (
		<TemplateDishList queryFunction={useCardGridByArea} activeFilter={selectArea} />
	)
}
