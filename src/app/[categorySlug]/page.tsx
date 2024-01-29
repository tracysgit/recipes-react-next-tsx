import { Metadata } from 'next';
import { getRecipesByCategory } from '@/app/lib/localdata';
import { capFirstLetter, sortArrayOfObjAsc } from "@/app/utils/utils";
import CardImageTop from '@/app/components/cards/card-imagetop';
import H1Headline from '@/app/components/headlines/h1Headline';
import { notFound } from 'next/navigation';
import Search from '../components/search/search';
import HeaderPage from '../components/header-page/header-page';


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
      <HeaderPage h1Id="header-page__headline" h1Text={capFirstLetter(category)} hasBreadcrumbs={true} hasSearch={false} />
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
