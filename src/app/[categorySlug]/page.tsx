import { Metadata } from 'next';
import { capFirstLetter } from '../utils/utils';

export async function generateMetadata({ params }: { params: { categorySlug: string } }) {
  const category = params.categorySlug;
  
  if (!category) {
    notFound();
  }

  return {
    title: capFirstLetter(category)
  };
}

export default function CategorySlugPage({ params }: { params: { categorySlug: string } }) {
  const category = params.categorySlug;


  return (
    <>
      <h1>{capFirstLetter(category)} Page</h1>
    </>
  );
}
