import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import HeaderPage from '@/app/components/header-page/header-page';
import { getRecipe } from '@/app/lib/localdata';

export async function generateMetadata({ params }: { params: { recipeSlug: string } }) {
  const recipeSlug = params.recipeSlug;
  const recipe = await getRecipe(recipeSlug);
  
  if (!recipe) {
    notFound();
  }

  return {
    title: recipe.name
  };
}

export default async function RecipeSlugPage({ params }: { params: { recipeSlug: string } }) {
  const recipeSlug = params.recipeSlug;
  const recipe = await getRecipe(recipeSlug);

  return (
    <>
      <HeaderPage h1Id="header-page__headline" h1Text={'RECIPE NAME'} hasBreadcrumbs={true} hasSearch={false} />
      <p>recipe</p>
    </>
  );
}
