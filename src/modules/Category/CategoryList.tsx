import type { Category } from '../../types/meal'
import { useCategories } from '../../utils/useCategories'


export const CategoryList = () => {

	const { data, isLoading, error } = useCategories()

	if (isLoading) return <span>Загрузка...</span>;
	
	 if (error) return <span>Ошибка: {error.message}</span>;
	
	return (
    <ul>
      {data?.map((cat: Category) => <li key={cat.idCategory}>{cat.strCategory}</li>)}
    </ul>
  );
}
