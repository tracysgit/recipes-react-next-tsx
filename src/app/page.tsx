import { Metadata } from 'next';
import { getCategories, getRecipes, getRecipesByCategory } from '@/app/lib/localdata';
import { capFirstLetter, sortArrayOfObjAsc } from "@/app/utils/utils";
import CardImageTop from './components/cards/card-imagetop';

export const metadata: Metadata = {
  title: 'Home | Recipes',
};

export default async function HomePage() {
  const categories = getCategories();
  const recipes = await getRecipes();
  const recipesAscending = sortArrayOfObjAsc(recipes, 'name');

  return (
    <>
      <header className="header-page">
        <div className="header-page__top">
          <p>future breadcrumbs</p>
          <p>future search</p>
        </div>
        <h1 id="header-page__headline">All Recipes</h1>
      </header>
      {categories.map((category) => 
        <section key={category} id={`section--${category}`} aria-labelledby={`headline--${category}`} className="">
          <h2 id={`headline--${category}`} className="mt-2 pt-2 text-4xl lg:text-5xl text-blue-800 dark:text-white font-sacramento">{capFirstLetter(category)}</h2>
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
                    {/* <CardImageTop
                      linkRoute={`/${recipe.category}/`}
                      card={recipe}
                      className=""
                    >                      
                    </CardImageTop> */}
                    <p>{recipe.name}</p>
                  </li>
                );
              })}
          </ul>
        </section>
      )}
      
    </>
  );
}
