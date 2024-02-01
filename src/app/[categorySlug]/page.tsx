import { getRecipesByCategory } from '@/app/lib/localdata';
import { capFirstLetter, sortArrayOfObjAsc } from "@/app/utils/utils";
import RecipesByCategory from '../components/recipes/recipes-by-category.tsx';
import { notFound } from 'next/navigation';
import HeaderPage from '../components/header-page/header-page';
import { TRecipes } from '../lib/definitions';

export async function generateMetadata({ params }: { params: { categorySlug: string } }) {
  const category: string = params.categorySlug;
  
  if (!category) {
    notFound();
  }

  return {
    title: capFirstLetter(category)
  };
}

export default async function CategorySlugPage({ params }: { params: { categorySlug: string } }) {
  const category: string = params.categorySlug;
  const categories: Array<string> = [category];
  const recipes: TRecipes = await getRecipesByCategory(category);
  const recipesAscending: TRecipes = sortArrayOfObjAsc(recipes, 'name');

  return (
    <>
      <HeaderPage h1Id="header-page__headline" h1Text="All Recipes" hasBreadcrumbs={false} hasSearch={false} hasFormatToggle={false} />

      <RecipesByCategory categories={categories} recipes={recipesAscending} deckClasses="mb-2 md:mb-4 lg:mb-6" showFormatToggle={true} formatToggleClasses="mt-2 mb-2 md:mb-4 lg:mb-6" />
    </>
  );
}