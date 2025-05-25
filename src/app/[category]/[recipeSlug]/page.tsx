import parse from 'html-react-parser';
import { notFound } from 'next/navigation';
import { getRecipeByNameSlug } from '@/app/api/apis';
import { capFirstLetters } from '@/app/utils/utils';
import { IRecipe } from '@/app/utils/types/types';
import Image from 'next/image';
import HeaderPage from '@/app/components/ui/header/PageHeader';
import DynamicHeading from '@/app/components/ui/headline/DynamicHeading';

export const dynamic = "auto";

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ recipeSlug: string }> 
}) {
  const { recipeSlug } = await params;
  const recipe = await getRecipeByNameSlug(recipeSlug);
  
  if (!recipe) {
    notFound();
  }

  return {
    title: recipe.name
  };
}

/**
 * The Individual Recipe Page.
 * @constructor
 */
export default async function RecipePage({ params }: { params: Promise<{ recipeSlug: string }> }) {
  const { recipeSlug } = await params;
  const recipe: IRecipe | undefined = await getRecipeByNameSlug(recipeSlug);
  let ingredients_edited:string = ''; 
  let directions_edited:string = ''; 
  let tags_array: Array<string> = [];

  if (recipe) {
    if ('ingredients' in recipe) {
      ingredients_edited = recipe.ingredients?.replace(/\n/g, `</li><li>`) ?? '';
      ingredients_edited = ingredients_edited !== '' ? `<li>${ingredients_edited}</li>` : '';
    }
    if ('directions' in recipe) {
      directions_edited = recipe.directions?.replace(/<br \/><br \/>/g, `</p><p>`) ?? '';
      directions_edited = directions_edited !== '' ? `<p>${directions_edited}</p>` : '';
    }
    if ('tags' in recipe && recipe.tags !== '') {
      tags_array = (recipe.tags)?.split(',') ?? [''];
    }
  }

  return (
    <>
      {recipe && 
        <>
          <HeaderPage hasBreadcrumbs={true} hasSearch={false}>
            <DynamicHeading level="h1" id="headline-recipe">{recipe.name}</DynamicHeading>
          </HeaderPage>
          
          <section aria-labelledby="headline-recipe" className="recipe__wrapper grid md:grid-cols-1 gap-8">
            <div className="recipe__intro grid md:grid-cols-2 gap-4">
              <div className="recipe__title flex flex-col order-last md:order-first"> 
                {recipe.servings && <p className="text-lg mt-2 md:mt-0"><span className="font-semibold">Servings: </span>{recipe.servings}</p>}
                {recipe.category && <p className="text-lg"><span className="font-semibold">Category: </span>{capFirstLetters(recipe.category)}</p>}
                {recipe.source && 
                  <p className="text-lg"><span className="font-semibold">Source: </span>
                    {recipe.source_link ? (
                      <a href={recipe.source_link} target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">{recipe.source} <span className="sr-only">: opens in a new window</span></a>
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
                        className="mb-1 mr-2 mt-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-900"
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
                alt={recipe.image ? 'A dish of ' + recipe.name : ''}
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
                    height: 'auto',
                  }}
                />
              </div>
            ) : (
              <>
                {ingredients_edited && 
                <div className="recipe__ingredients lg:max-w-[80%] text-lg">
                  <h2 className="headline__plain">Ingredients</h2>
                  <ul className="[&>li]:mt-2">
                    {parse(ingredients_edited)}
                  </ul>
                </div>
                }
                {directions_edited &&
                <div className="recipe__directions lg:max-w-[80%] text-lg [&>p]:mt-6">
                  <h2 className="headline__plain">Directions</h2>
                  {parse(directions_edited)}
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
