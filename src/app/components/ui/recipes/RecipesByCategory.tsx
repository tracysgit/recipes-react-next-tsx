'use client';

import { useEffect, useState } from 'react';
import { capFirstLetters } from '@/app/utils/utils';
import { IRecipe } from '@/app/utils/types/types';
import PageHeader from "@/app/components/ui/header/PageHeader";
import DynamicHeading from "@/app/components/ui/headline/DynamicHeading";
import Link from 'next/link';
import FormatChanger from '../format-changer/FormatChanger';
import RecipeCard from './RecipeCard';

type RecipesByCategoryProps = {
  categories: string[];
  recipes?: IRecipe[];
};

const ulClassesList = 'deck--list list-disc mb-10 ml-6 mt-4 grid grid-cols-1 lg:grid-cols-2';
const liClassesList = 'text-lg mb-[5px] mr-2 dark:text-white';
const ulClassesCards = 'deck--grid-card grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-4 md:mb-8 lg:mb-10 mt-[5px]';

/**
 * The RecipesByCategory component generates a recipe list or deck grouped by category.
 * @constructor
 * @param {string} categories - The recipe categories.
 * @param {string} recipes - The recipes.
 */
export default function RecipesByCategory({ categories, recipes }: RecipesByCategoryProps) {
  const hasMultipleCategories = categories.length > 1;
  const [format, setFormat] = useState('list');
  
  /* Listen for screen resizing, and serve content accordingly */
  useEffect(() => {
    const handleListFormat = () => {
      const isMobile = window.innerWidth <= 768;

      if (isMobile) {
        setFormat('list');
      } else {
        setFormat('cards');
      }
    };

    handleListFormat();
    window.addEventListener('resize', handleListFormat);

    return () => {
      window.removeEventListener('resize', handleListFormat);
    };
  }, []);

  //Handle the format button click
  const handleChildClick = () => {
    setFormat(prevVal => prevVal === 'list' ? 'cards' : 'list');
  }

  return (
    <>
      <PageHeader hasBreadcrumbs={false} hasSearch={true}>
        <div className="flex flex-col-reverse md:flex-row md:justify-between">
          <DynamicHeading level="h1">{categories.length === 1 ? capFirstLetters(categories[0]) : 'All Recipes'}</DynamicHeading>
          <FormatChanger onButtonClick={handleChildClick} buttonLabel={format} />
        </div>
      </PageHeader>

      {categories.map((category) => 
        <section key={category} aria-label={`Recipes about ${category}`}>
          {hasMultipleCategories  && <DynamicHeading level="h2" className="text-4xl lg:text-5xl">
            <Link href={`/${category.toLowerCase()}`} className="hover:underline">
              {capFirstLetters(category)}
            </Link>
          </DynamicHeading>}

          <ul className={format === 'list' ? ulClassesList : ulClassesCards}>
          {recipes && recipes
            .filter((recipe) =>
              recipe.category
                .toLowerCase()
                .includes(category.toLowerCase()),
            )
            .map((recipe, index) => {
              return (
                <li 
                  key={`${category}-${index.toString().padStart(3, '0')}`} 
                  id={`${category}-${index.toString().padStart(3, '0')}`} 
                  className={format === 'list' ? liClassesList : undefined}>
                
                  {format === 'list' ? (       
                  <Link href={`/${recipe.category}/${recipe.name_slug}`} className="underline hover:no-underline">{recipe.name}</Link>
                  ) : (
                    <RecipeCard recipe={recipe} category={recipe.category} index={index} />
                  )}
                </li>
              )
            })}
          </ul>
        </section>
      )}
    </>
  )
}