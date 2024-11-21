// import parse from 'html-react-parser';
import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import HeaderPage from '@/app/components/header-page/header-page';
import { getRecipe } from '@/app/lib/localdata';
import { capFirstLetter } from '@/app/utils/utils';
import { TRecipe } from '@/app/lib/definitions';

export async function generateMetadata({ params }: { params: { recipeSlug: string } }) {
  const recipeSlug: string = params.recipeSlug;
  const recipe = await getRecipe(recipeSlug);
  
  if (!recipe) {
    notFound();
  }

  return {
    title: recipe.name
  };
}

export default async function RecipeSlugPage({ params }: { params: { recipeSlug: string } }) {
  const recipeSlug: string = params.recipeSlug;
  const recipe = await getRecipe<TRecipe>(recipeSlug);
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
          
          <section aria-labelledby="headline-recipe" className="recipe__wrapper grid md:grid-cols-1 gap-8 dark:text-white">
            <div className="recipe__intro grid md:grid-cols-2 gap-4">
              <div className="recipe__title flex flex-col order-last md:order-first"> 
                {recipe.servings && <p className="text-lg text-gray-900 dark:text-white mt-2 md:mt-0"><span className="font-semibold">Servings: </span>{recipe.servings}</p>}
                {recipe.category && <p className="text-lg text-gray-900 dark:text-white"><span className="font-semibold">Category: </span>{capFirstLetter(recipe.category)}</p>}
                {recipe.source && 
                  <p className="text-lg text-gray-900 dark:text-white"><span className="font-semibold">Source: </span>
                    {recipe.source_link ? (
                      <a href={recipe.source_link} target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-600 dark:hover:text-gray-400">{recipe.source} <span className="sr-only">: opens in a new window</span></a>
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
                        className="mb-1 mr-2 mt-2 inline-block rounded-full bg-gray-200 dark:bg-gray-700 px-3 py-1 text-sm font-semibold text-gray-900 dark:text-white"
                      >
                        #{tag.trim()}
                      </span>
                    );
                  })}
                </div>
                }
              </div>
              {recipe.image && <Image
                src={`/images/${recipe.image ? recipe.image : 'image_placeholder'}`}
                width={400}
                height={250}
                className="recipe__image w-full h-64 rounded-lg"
                alt={recipe.image ? 'Image of ' + recipe.name : ''}
                priority
                style={{
                  objectFit: 'cover',
                }}
              />}
            </div>
            {recipe['image_fullrecipe'] ? (
              <div className="recipe__directions">
                <Image
                  src={`/images/${recipe['image_fullrecipe']}`}
                  width={1100}
                  height={400}
                  className="w-full border border-gray-400 h-auto mx-auto"
                  alt={`Image of ${recipe.name} recipe`}
                  priority
                  quality={100}
                  style={{
                    // objectFit: 'contain',
                    // width: 'auto',
                    height: 'auto',
                  }}
                />
              </div>
            ) : (
              <>
                {ingredients_edited && 
                <div className="recipe__ingredients lg:max-w-[80%]">
                  <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
                  <div className="space-y-1 list-disc list-inside">
                    <p className="leading-8 text-lg" dangerouslySetInnerHTML={{__html: ingredients_edited}}></p>
                    {/* <p className="leading-8 text-lg">{parse(recipe.ingredients_edited)}</p> */}
                  </div>
                </div>
                }
                {directions_edited &&
                <div className="recipe__directions lg:max-w-[80%] space-y-1 list-disc list-inside">
                  <h2 className="text-2xl font-semibold mb-4">Directions</h2>
                  <p className="text-lg" dangerouslySetInnerHTML={{__html: directions_edited}}></p>
                  {/* <p className="text-lg">{parse(recipe.directions_edited)}</p> */}
                </div>
                }
              </>
            )}
          </section>
        </>
      }
    </>
  );
}
