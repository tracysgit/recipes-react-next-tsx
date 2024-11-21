import { getRecipes, getRecipesByCategory } from '@/app/lib/localdata';
import { capFirstLetter, sortArrayOfObjAsc } from "@/app/utils/utils";
import RecipesByCategory from '@/app/components/recipes/recipes-by-category';
import { notFound } from 'next/navigation';
import Search from '@/app/components/search/search';
import { TRecipes } from '@/app/lib/definitions';

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
  const allRecipes: TRecipes = await getRecipes();
  const allRecipesAscending: TRecipes = sortArrayOfObjAsc(allRecipes, 'name');

  return (
    <>
      {/* <HeaderPage h1Id="header-page__headline" h1Text={capFirstLetter(category)} hasBreadcrumbs={false} hasSearch={false} hasFormatToggle={false} /> */}
      <section className="search__container" aria-label="Search for Recipes">
        <Search recipes={allRecipesAscending} />
      </section>

      <RecipesByCategory categories={categories} recipes={recipesAscending} deckClasses="mb-2 md:mb-4 lg:mb-6" showH2Headline={false} showFormatToggle={true} formatToggleClasses="" />
    </>
  );
}