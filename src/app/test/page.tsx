import { Metadata } from 'next';
import Link from 'next/link';
import { getCategories, getRecipes } from '@/app/lib/localdata';
import { capFirstLetter, sortArrayOfObjAsc } from "@/app/utils/utils";
import CardImageTop from '@/app/components/cards/card-imagetop';
import HeaderPage from '@/app/components/header-page/header-page';
import RecipesByCategory from '@/app/components/recipes/recipes-by-category.tsx';
import { Recipes } from '@/app/lib/definitions';
import H1Headline from '@/app/components/headlines/h1Headline';

export const metadata: Metadata = {
  title: 'Home | Recipes',
};

export default async function TestPage() {
  const categories: string[] = getCategories();
  const recipes: {}[] = await getRecipes<Recipes>();
  const recipesAscending: {}[] = sortArrayOfObjAsc(recipes, 'name');

  

  // const recipes: {}[] = await getRecipes();
  // const recipesByCategory: {}[] = await getRecipesByCategory('entrees');

  const handleParentClick = async () => {
    console.log("clicked handleParentClick");
  };
  
  return (
    <>
      <HeaderPage h1Id="header-page__headline" h1Text="All Recipes" hasBreadcrumbs={false} hasSearch={false} hasFormatToggle={false} />

      <RecipesByCategory categories={categories} recipes={recipesAscending}deckClasses="mb-2 md:mb-4 lg:mb-6" showFormatToggle={true} formatToggleClasses="mb-2 md:mb-4 lg:mb-6" />
          
      
      <h1 className="mb-6">TestPage</h1>
      {/* <p>Quotes: {JSON.stringify(quotes.quotes[0])}</p> */}
      {/* <p className="mb-4">Parent Component Recipes: {JSON.stringify(recipes)}</p> */}
      {/* <TestComponent id="myId" />
      <button type="button" className="w-[110px] px-3 py-2 text-md text-center inline-flex justify-center items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Parent button</button> */}
      {/* <p className="mb-4">Parent Recipes by Category: {JSON.stringify(recipesByCategory)}</p>
      <RecipesByCategory category={'entrees'} numbers={numbers} data={recipesByCategory} recipes={recipes} />  */}
    </>
  )
}
