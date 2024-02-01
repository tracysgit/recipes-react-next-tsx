import data from '@/app/json/data.json';
import { TCategories, TRecipes } from './definitions';

export function getCategories <TCategories> () {
  // await new Promise((resolve) => setTimeout(resolve, 0));
  return data.categories;
}

export async function getRecipes <TRecipes> () {
  await new Promise((resolve) => setTimeout(resolve, 0));
  return data.recipes;
}

export async function getRecipesByCategory <TRecipes> (category: string) {
  const recipes = await getRecipes();
  const filteredRecipes = (recipes).filter((recipe) =>
    recipe.category
      .toLowerCase()
      .includes(category.toLowerCase())
  ); 
  return filteredRecipes;
}

export async function getRecipe <TRecipes> (slug: string) {
  // const recipes: Recipes = await getRecipes;
  const recipes = await getRecipes();
  const filteredRecipes = recipes.filter(recipe => recipe['name_slug'] === slug);

  if (filteredRecipes) {
    return filteredRecipes[0];
  } else {
    return null;
  }
}