import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategoriesTagsThunk } from '@/store/slices/categoriesTagsSlice';
import { useRouter } from 'next/navigation';

const CategoriesList = () => {
  const dispatch = useDispatch();
  const { categories, isLoading, error } = useSelector((state) => state.categoriesTags);
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchCategoriesTagsThunk());
  }, [dispatch]);

  if (isLoading) return <p>Carregando categorias...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div className='h-[400px] overflow-y-auto'>
      <h3 className='font-bold mb-6 text-xl text-center'>Categorias</h3>
      <ul className='columns-4 gap-4'>
        {Object.entries(categories).map(([category, count]) => (
          <li
            key={category}
            className='cursor-pointer hover:text-blue-500'
          >
            <a href={`articles/keys/?category=${encodeURIComponent(category)}`}>
                {category} ({count})
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesList;
