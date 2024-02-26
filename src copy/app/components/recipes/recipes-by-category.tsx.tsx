'use client';

import { MouseEvent, useState } from 'react';
import CardImageTop from '../cards/card-imagetop';
import { capFirstLetter } from "@/app/utils/utils";
import { TCategories, TRecipes } from '@/app/lib/definitions';
import Link from 'next/link';
import H1Headline from '../headlines/h1Headline';

type RecipesByCategoryProps = {
  recipes?: TRecipes;
  categories: TCategories;
  showH2Headline?: boolean;
  showFormatToggle: boolean;
  formatToggleClasses?: string;
  deckClasses?: string;
  cardClasses?: string;
  children?: React.ReactNode;
};

export default function RecipesByCategory({ showH2Headline, showFormatToggle, formatToggleClasses, categories, recipes, deckClasses, cardClasses }: RecipesByCategoryProps) {
  const [format, setFormat] = useState('list');

  const handleFormatSelect = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault;

    let myFormat: string | null = e.currentTarget.getAttribute('data-format')
    setFormat(myFormat || 'list');
  }

  const btnClassesBase = "inline-flex items-center px-4 py-2 text-sm font-medium text-blue-700 bg-white border-2 hover:bg-gray-100 hover:text-blue-700 focus:ring-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white";
  const btnClassesActive = "border-blue-700"
  const iconCard = (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 me-2" aria-hidden="true" focusable="false">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
    </svg>
  );
  const iconList = (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 me-2" aria-hidden="true" focusable="false">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
    </svg>
  );

  return (
    <>
      <header className="format-toggle__wrapper flex flex-col md:flex-row justify-between mb-6 md:mb-8 lg:mb-10 border-0">
        <H1Headline id="header-page__headline" extraclasses="">{categories.length === 1 ? capFirstLetter(categories[0]) : 'All Recipes'}</H1Headline>
        {showFormatToggle && 
          <div className={`inline-flex rounded-md mt-4 md:mt-0 ${formatToggleClasses}`} role="group">
            <button 
              id="btn-list"
              type="button" 
              className={`${btnClassesBase} rounded-s-lg ${format === 'list' ? btnClassesActive : null}`}
              data-format="list"
              onClick={handleFormatSelect}
            >
            {iconList}
            List
            </button>
            <button 
              id="btn-cards"
              type="button" 
              className={`${btnClassesBase} rounded-e-lg ${format === 'cards' ? btnClassesActive : null}`}
              data-format="cards"
              onClick={handleFormatSelect}
            >
              {iconCard}
              Cards
            </button>
          </div>
        }
      </header>

      {categories.map((category) => 
        <section key={category} id={`section--${category}`} aria-labelledby={`headline--${category}`} className="">
          {showH2Headline && <h2 id={`headline--${category}`} className="text-4xl lg:text-5xl text-blue-800 dark:text-blue-300 font-sacramento mb-0">
            <Link href={`/${category.toLowerCase()}`} className="hover:underline">
              {capFirstLetter(category)}
            </Link>
          </h2>}
          
          {format === 'list' &&
            <ul className={`deck--list list-disc mb-10 ml-6 mt-4 ${deckClasses}`}>
              {recipes && recipes
                .filter((recipe) =>
                  recipe.category
                    .toLowerCase()
                    .includes(category.toLowerCase()),
                )
                .map((recipe, index) => {
                  return (
                    <li key={index} className="text-lg mb-[5px]">
                      <Link href={`/${recipe.category}/${recipe.name_slug}`} className="underline hover:text-gray-600">{recipe.name}</Link>
                    </li>
                  );
                })}
            </ul>
          }
          {format === 'cards' &&
            <ul className={`deck--grid-card mb-10 mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ${deckClasses}`}>
              {recipes && recipes
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
          }
        </section>
      )}
    </>
  )
}