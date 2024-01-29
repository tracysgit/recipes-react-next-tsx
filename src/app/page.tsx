import { Metadata } from 'next';
import Link from 'next/link';
import { getCategories, getRecipes } from '@/app/lib/localdata';
import { capFirstLetter, sortArrayOfObjAsc } from "@/app/utils/utils";
import CardImageTop from './components/cards/card-imagetop';
import H1Headline from './components/headlines/h1Headline';
import Search from './components/search/search';
import HeaderPage from './components/header-page/header-page';

export const metadata: Metadata = {
  title: 'Home | Recipes',
};

export default async function HomePage() {
  const categories = getCategories();
  const recipes = await getRecipes();
  const recipesAscending = sortArrayOfObjAsc(recipes, 'name');

  return (
    <>
      <HeaderPage h1Id="header-page__headline" h1Text="All Recipes" hasBreadcrumbs={false} hasSearch={false} />
      {categories.map((category) => 
        <section key={category} id={`section--${category}`} aria-labelledby={`headline--${category}`} className="">
          <h2 id={`headline--${category}`} className="mt-2 pt-2 text-4xl lg:text-5xl text-blue-800 dark:text-blue-300 font-sacramento">
            <Link href={`/${category.toLowerCase()}`} className="hover:underline">
              {capFirstLetter(category)}
            </Link>
          </h2>
          <ul className="deck--grid-card-image-upper mb-10 mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {recipesAscending
              .filter((recipe) =>
                recipe.category
                  .toLowerCase()
                  .includes(category.toLowerCase()),
              )
              .map((recipe, index) => {
                return (
                  <li key={index}>
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
