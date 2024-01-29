import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import HeaderPage from '@/app/components/header-page/header-page';
import H1Headline from '@/app/components/headlines/h1Headline';
import { getRecipe } from '@/app/lib/localdata';
import { capFirstLetter } from '@/app/utils/utils';
import { Recipes } from '@/app/lib/definitions';

export async function generateMetadata({ params }: { params: { recipeSlug: string } }) {
  const recipeSlug = params.recipeSlug;
  const recipe = await getRecipe(recipeSlug);
  
  if (!recipe) {
    notFound();
  }

  return {
    title: recipe.name
  };
}

export default async function RecipeSlugPage({ params }: { params: { recipeSlug: string } }) {
  const recipeSlug = params.recipeSlug;
  const recipe = await getRecipe<Recipes>(recipeSlug);
  let ingredients_edited:string = ''; 
  let directions_edited:string = ''; 
  let tags_array: Array<string> = [];

  if (recipe && 'ingredients' in recipe) {
    ingredients_edited = recipe.ingredients.replace(/\n/g, `<br />`);
  }
  if (recipe && 'directions' in recipe) {
    directions_edited = recipe.directions.replace(/\n/g, `<br /><br />`);
  }
  if (recipe && 'tags' in recipe && recipe.tags !== '') {
    tags_array = (recipe.tags).split(',');
  }

  return (
    <>
      {recipe && 
        <>
          <HeaderPage h1Id="header-page__headline" h1Text={recipe.name} hasBreadcrumbs={true} hasSearch={false} />
          
          <section aria-labelledby="headline-recipe" className="recipe__wrapper bg-white grid md:grid-cols-1 gap-8">
            <div className="recipe__intro grid md:grid-cols-2 gap-8">
              <div className="recipe__title flex flex-col order-last md:order-first"> 
              {recipe.servings && <p className="text-lg text-gray-900 dark:text-white mt-2 md:mt-0"><span className="font-semibold">Servings: </span>{recipe.servings}</p>}
              {recipe.category && <p className="text-lg text-gray-900 dark:text-white"><span className="font-semibold">Category: </span>{capFirstLetter(recipe.category)}</p>}
              {recipe.source && 
                <p className="text-lg text-gray-900 dark:text-white"><span className="font-semibold">Source: </span>
                  {recipe.source_link ? (
                    <a href={recipe.source_link} target="_blank" className="underline">{recipe.source}</a>
                  ) : (
                    <>{recipe.source}</>
                  )}
                </p>
              }
              {tags_array && <div className="recipe__tags pt-4 md:pt-6">
                {tags_array.map((tag, index) => {
                  return (
                    <span
                      key={index}
                      className="mb-1 mr-2 mt-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700"
                    >
                      #{tag.trim()}
                    </span>
                  );
                })}
              </div>}
            </div>
            </div>
          </section>
          
          
        </>
      }
    </>
  );
}
