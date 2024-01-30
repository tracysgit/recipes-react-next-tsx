import { Metadata } from 'next';
import Link from 'next/link';
import { getCategories, getRecipes } from '@/app/lib/localdata';
import { capFirstLetter, sortArrayOfObjAsc } from "@/app/utils/utils";
import CardImageTop from './components/cards/card-imagetop';
import HeaderPage from './components/header-page/header-page';
import { Recipes } from './lib/definitions';

export const metadata: Metadata = {
  title: 'Home | Recipes',
};

export default async function HomePage() {
  const categories = getCategories();
  const recipes = await getRecipes<Recipes>();
  const recipesAscending = sortArrayOfObjAsc(recipes, 'name');

  return (
    <>
      <HeaderPage h1Id="header-page__headline" h1Text="All Recipes" hasBreadcrumbs={false} hasSearch={false} hasFormatToggle={false} />
      {categories.map((category) => 
        <section key={category} id={`section--${category}`} aria-labelledby={`headline--${category}`} className="">
          <h2 id={`headline--${category}`} className="mt-2 pt-2 text-4xl lg:text-5xl text-blue-800 dark:text-blue-300 font-sacramento">
            <Link href={`/${category.toLowerCase()}`} className="hover:underline">
              {capFirstLetter(category)}
            </Link>
          </h2>
          {/* <ul className="deck--list list-disc mb-10 ml-6 mt-3">
            {recipesAscending
              .filter((recipe) =>
                recipe.category
                  .toLowerCase()
                  .includes(category.toLowerCase()),
              )
              .map((recipe, index) => {
                return (
                  <li key={index}>
                    <Link href={`/${recipe.category}/${recipe.name_slug}`} className="underline hover:text-gray-600">{recipe.name}</Link>
                  </li>
                );
              })}
          </ul> */}
          <ul className="deck--grid-card mb-10 mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {recipesAscending
              .filter((recipe) =>
                recipe.category
                  .toLowerCase()
                  .includes(category.toLowerCase()),
              )
              .map((recipe) => {
                return (
                  <li key={recipe.name}>
                    <CardImageTop linkRoute={`/${recipe.category}`} card={recipe} />
                  </li>
                );
              })}
          </ul>
        </section>
      )}
      
    </>
  );
}
