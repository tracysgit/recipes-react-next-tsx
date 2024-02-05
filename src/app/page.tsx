import { Metadata } from 'next';
import { getCategories, getRecipes } from '@/app/lib/localdata';
import { sortArrayOfObjAsc } from "@/app/utils/utils";
// import HeaderPage from '@/app/components/header-page/header-page';
import Search from '@/app/components/search/search';
import RecipesByCategory from '@/app/components/recipes/recipes-by-category.tsx';
import { TCategories, TRecipes } from '@/app/lib/definitions';
import H1Headline from './components/headlines/h1Headline';

export const metadata: Metadata = {
  title: 'Home | Recipes',
};

export default async function HomePage() {
  const categories: TCategories = getCategories();
  const recipes: TRecipes = await getRecipes();
  const recipesAscending: TRecipes = sortArrayOfObjAsc(recipes, 'name');
  
  return (
    <>
      <header>
        {/* <Search recipes={recipesAscending} /> */}
        <H1Headline id="header-page__headline">All Recipes</H1Headline>
      </header>
      {/* <HeaderPage h1Id="header-page__headline" h1Text="All Recipes" hasBreadcrumbs={false} hasSearch={false} /> */}

      <RecipesByCategory categories={categories} recipes={recipesAscending} deckClasses="mb-4 md:mb-8 lg:mb-10 mt-[5px]" showH2Headline={true} showFormatToggle={true} formatToggleClasses="mt-2 mb-6 md:mb-8 lg:mb-10" />
    </>
  )
}
