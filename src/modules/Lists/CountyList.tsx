import { flag } from 'country-emoji'
import { TemplateList } from '../../components/TemplateList'
import { useStore } from '../../store/useStore'
import { CategoryButton } from '../../ui/CategoryButton'
import ErrorCard from '../../ui/ErrorCard'
import Loader from '../../ui/Loader'
import { useAreas } from '../../utils/useCategories'
export const CountyList = () => {

	const setArea = useStore((state) => state.setSelectArea)
	const selectArea = useStore((state) => state.selectArea)
	const { data, isLoading, error } = useAreas()

	if (isLoading) return <Loader />

	if (error) return (
		<div className="w-full flex justify-center">
			<ErrorCard title="Loading Error" message={`Failed to load countries: ${error.message}`} actionLabel="Retry" onAction={() => window.location.reload()} />
		</div>
	)

	return (
		<TemplateList>
			<ul className='flex gap-4 no-scrollbar scroll-smooth' >
				{data?.map((area: string) => (
					<li key={area} className='flex w-full justify-center'>
						<CategoryButton categoryName={area}  setFunction={setArea} filterType={selectArea}>
							{flag(area)} {area}
						</CategoryButton>
					</li>
				))}
			</ul>
		</TemplateList>
	)
}
