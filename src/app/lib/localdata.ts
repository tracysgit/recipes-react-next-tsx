import data from '@/app/json/data.json';
import { Categories, Recipes } from './definitions';

export function getCategories <Categories> () {
  // await new Promise((resolve) => setTimeout(resolve, 0));
  return data.categories;
}

export async function getRecipes <Recipes> () {
  await new Promise((resolve) => setTimeout(resolve, 0));
  return data.recipes;
}

export async function getRecipesByCategory <Recipes> (category: string) {
  const recipes = await getRecipes();
  const filteredRecipes = (recipes).filter((recipe) =>
    recipe.category
      .toLowerCase()
      .includes(category.toLowerCase())
  ); 
  return filteredRecipes;
}

export async function getRecipe <Recipes> (slug: string) {
  // const recipes: Recipes = await getRecipes;
  const recipes = await getRecipes();
  const filteredRecipes = recipes.filter(recipe => recipe['name_slug'] === slug);

  if (filteredRecipes) {
    return filteredRecipes[0];
  } else {
    return null;
  }
}