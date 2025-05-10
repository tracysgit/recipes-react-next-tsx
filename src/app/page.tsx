import { Metadata } from "next";
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import RecipesByCategory from "@/app/components/ui/recipes/RecipesByCategory";
import { getCategories, getRecipes } from '@/app/api/apis';
import { IRecipe } from '@/app/utils/types/types';

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Recipes | Home',
};

/**
 * The Home Page.
 * @constructor
 */
export default async function HomePage() {
  const recipes: IRecipe[] = await getRecipes();
  const categories: string[] = await getCategories();

  if (!recipes) {
    notFound();
  }

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <RecipesByCategory categories={categories} recipes={recipes} />
      </Suspense> 
    </>  
  );
}
