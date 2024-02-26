import Search from "../components/search/search";
import { getRecipes } from '@/app/lib/localdata';
import { sortArrayOfObjAsc } from "../utils/utils";
import { TRecipes } from "../lib/definitions";
import H1Headline from "../components/headlines/h1Headline";


export default async function TestPage() {
  const recipes: TRecipes = await getRecipes();
  const recipesAscending: TRecipes = sortArrayOfObjAsc(recipes, 'name');

  return (
    <>
      <Search recipes={recipesAscending} />
      <H1Headline>Test Page</H1Headline>
      {/* <p>{JSON.stringify(recipes)}</p> */}
    </>
  
  )
}
