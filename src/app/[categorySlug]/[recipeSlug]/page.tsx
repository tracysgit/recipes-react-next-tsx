import { Metadata } from 'next';
import { notFound } from 'next/navigation';

// export async function generateMetadata({ params }: { params: { recipeSlug: string } }) {
//   const recipe = params.recipeSlug;
  
//   if (!recipe) {
//     notFound();
//   }

//   return {
//     title: recipe.name
//   };
// }

export default function RecipeSlugPage() {
  //const recipe = params.recipeSlug;

  return (
    <>
      {/* <h1>{recipe.name}</h1> */}
      <p>recipe</p>
    </>
  );
}
