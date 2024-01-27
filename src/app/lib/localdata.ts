import data from '@/app/json/data.json';

export function getCategories() {
  console.log("inside getCategories");
  // await new Promise((resolve) => setTimeout(resolve, 0));
  return data.categories;
}

export async function getRecipes() {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return data.recipes;
}