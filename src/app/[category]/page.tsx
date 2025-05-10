import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import RecipesByCategory from '@/app/components/ui/recipes/RecipesByCategory';
import { capFirstLetters } from '@/app/utils/utils';
import { IRecipe } from '@/app/utils/types/types';
import { getCategories, getRecipesByCategory } from '@/app/api/apis';

export const dynamic = "force-dynamic";

export async function generateMetadata({ 
  params
}: { 
  params: Promise<{ category: string }>
}) {
  const { category } = await params;
  const categories = await getCategories();
  
  if (!categories.includes(category)) {
    notFound();
  }

  return {
    title: capFirstLetters(category)
  };
} 

/**
 * The Category Page.
 * @constructor
 */
export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const recipes: IRecipe[] = await getRecipesByCategory(category);
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RecipesByCategory categories={[category]} recipes={recipes} />
    </Suspense>
  );
}