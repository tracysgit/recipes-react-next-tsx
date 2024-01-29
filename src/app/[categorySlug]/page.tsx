import { Metadata } from 'next';
import { getRecipesByCategory } from '@/app/lib/localdata';
import { capFirstLetter, sortArrayOfObjAsc } from "@/app/utils/utils";
import CardImageTop from '@/app/components/cards/card-imagetop';
import H1Headline from '@/app/components/headlines/h1Headline';
import { notFound } from 'next/navigation';


export async function generateMetadata({ params }: { params: { categorySlug: string } }) {
  const category = params.categorySlug;
  
  if (!category) {
    notFound();
  }

  return {
    title: capFirstLetter(category)
  };
}

export default async function CategorySlugPage({ params }: { params: { categorySlug: string } }) {
  const category = params.categorySlug;
  const recipes = await getRecipesByCategory(category);
  const recipesAscending = sortArrayOfObjAsc(recipes, 'name');

  return (
    <>
      <header className="header-page">
        <div className="header-page__top">
          <p>future breadcrumbs</p>
          <p>future search</p>
        </div>
        <H1Headline id="header-page__headline">{capFirstLetter(category)}</H1Headline>
      </header>
      <section id={`section--${category}`} aria-label={`${capFirstLetter(category)} Recipes`} className="">
        <ul className="deck--grid-card-image-upper mb-10 mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {recipesAscending.map((recipe) =>
            <li key={recipe.name}>
              <CardImageTop linkRoute={`/${recipe.category}`} card={recipe} />
            </li>
          )}
        </ul>
      </section>
    </>
  );
}
