import data from '@/app/json/data.json';

export function getCategories() {
  // await new Promise((resolve) => setTimeout(resolve, 0));
  return data.categories;
}

export async function getRecipes() {
  await new Promise((resolve) => setTimeout(resolve, 0));
  return data.recipes;
}

export async function getRecipesByCategory(category: string) {
  const recipes = await getRecipes();
  const filteredRecipes = (recipes).filter((recipe) =>
    recipe.category
      .toLowerCase()
      .includes(category.toLowerCase())
  ); 
  return filteredRecipes;
}

export async function getRecipe(slug: string) {
  const recipes = await getRecipes();
  const filteredRecipes = recipes.filter(recipe => recipe['name_slug'] === slug);

  if (filteredRecipes) {
    return filteredRecipes[0];
  } else {
    return null;
  }
}