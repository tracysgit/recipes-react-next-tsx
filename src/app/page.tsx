import { Metadata } from 'next';
import { getCategories, getRecipes } from '@/app/lib/localdata';
import { sortArrayOfObjAsc } from "@/app/utils/utils";
import HeaderPage from '@/app/components/header-page/header-page';
import RecipesByCategory from '@/app/components/recipes/recipes-by-category.tsx';
import { TCategories, TRecipes } from '@/app/lib/definitions';

export const metadata: Metadata = {
  title: 'Home | Recipes',
};

export default async function HomePage() {
  const categories: TCategories = getCategories();
  const recipes: TRecipes = await getRecipes();
  const recipesAscending: TRecipes = sortArrayOfObjAsc(recipes, 'name');
  
  return (
    <>
      <HeaderPage h1Id="header-page__headline" h1Text="All Recipes" hasBreadcrumbs={false} hasSearch={false} hasFormatToggle={false} />

      <RecipesByCategory categories={categories} recipes={recipesAscending} deckClasses="mb-2 md:mb-4 lg:mb-6" showFormatToggle={true} formatToggleClasses="mt-2 mb-2 md:mb-4 lg:mb-6" />
    </>
  )
}
