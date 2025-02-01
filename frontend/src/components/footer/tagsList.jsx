
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategoriesTagsThunk } from '@/store/slices/categoriesTagsSlice';
import { useRouter } from 'next/navigation';

const TagsList = () => {
  const dispatch = useDispatch();
  const { tags, isLoading, error } = useSelector((state) => state.categoriesTags);
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchCategoriesTagsThunk());
  }, [dispatch]);

  if (isLoading) return <p>Carregando tags...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div className='h-[300px] overflow-y-auto'>
      <h3 className='font-bold mb-6 text-center text-xl'>Tags</h3>
      <ul className='columns-2 gap-4'>
        {Object.entries(tags).map(([tag, count]) => (
          <li
            key={tag}
            className='cursor-pointer hover:text-blue-500'
          >
            <a href={`articles/keys/?category=${encodeURIComponent(tag)}`}>
                {tag} ({count})
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TagsList;
