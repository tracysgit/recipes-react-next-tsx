import { IRecipe } from "../utils/types/types";

//TODO This must be altered for Dev and Published
// const API_URL = "http://localhost:3000/api";
const API_URL = "https://recipes-react-next-tsx.vercel.app/api";

/**
 * GetCategories
 * @constructor
 * @param {string} query - A query string for filtering.
 */
export async function getCategories(query?: string) {
  const categories = await fetch(`${API_URL}/category`).then((res) => res.json() as Promise<string[]>)

  if (query) {
    return categories.filter((category) => 
      category.toLowerCase().includes(query.toLowerCase())
    );
  }

  return categories;
};

/**
 * GetCategory
 * @constructor
 * @param {string} query - A query string for filtering.
 */
export async function getCategory(query: string) {
  const categories = await getCategories();

  return categories.find((category) => category === query);
};


/**
 * GetRecipes
 * @constructor
 * @param {string} query - A query string for filtering.
 */
export async function getRecipes(query?: string) {
  const recipes = await fetch(`${API_URL}/recipe`).then((res) => res.json() as Promise<IRecipe[]>);

  const sortedRecipes = recipes.sort((a,b) => {
    const x = a.name.toLowerCase();
    const y = b.name.toLowerCase();
    if(x>y){return 1;}
    if(x<y){return -1;}
    return 0;
  });
  
  if (query) {
    return sortedRecipes.filter((recipe) => 
      recipe.name_slug.toLowerCase().includes(query.toLowerCase())
    );
  }
  
  return sortedRecipes;
};


/**
 * getRecipesByCategory
 * @constructor
 * @param {string} category - A string for filtering.
 */
export async function getRecipesByCategory(category: string): Promise<IRecipe[]> {
  const recipes: IRecipe[] = await getRecipes();

  const filteredRecipes = recipes.filter((recipe) => {
    return recipe.category.toLowerCase().includes(category.toLowerCase());
  });

  return filteredRecipes;
};


/**
 * getRecipeByNameSlug
 * @constructor
 * @param {string} query - A string for filtering.
 */
export async function getRecipeByNameSlug(query: string) {
  const recipes = await getRecipes();

  return recipes.find((recipe) => recipe.name_slug === query);
};