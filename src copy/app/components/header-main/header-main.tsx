import MainMenu from "@/app/components/header-main/main-menu";
// import Search from "@/app/components/search/search";
// import { getRecipes } from "@/app/lib/localdata";
// import { sortArrayOfObjAsc } from "@/app/utils/utils";
// import { TRecipes } from '@/app/lib/definitions';

export default async function HeaderMain() {
  // const recipes: TRecipes = await getRecipes();
  // const recipesAscending: TRecipes = sortArrayOfObjAsc(recipes, 'name');

  return (
    <header className="header-main bg-blue-800 text-white">
      <div className="max-w-[1100px] px-4 md:px-6 mx-auto">
        <MainMenu />
        {/* <Search recipes={recipesAscending} /> */}
      </div>
    </header> 
  )
}
