'use client';

import { MouseEvent, useState } from 'react';
import { Recipes } from '@/app/lib/definitions';
// import { getRecipes, getRecipesByCategory } from '@/app/lib/localdata';
import { capFirstLetter, sortArrayOfObjAsc } from "@/app/utils/utils";
import Link from 'next/link';

type RecipesByCategoryProps = {
  recipes: {}[];
  categories: string[];
  showFormatToggle: boolean;
  formatToggleClasses?: string;
  deckClasses?: string;
  cardClasses?: string;
  children?: React.ReactNode;
};

export default function RecipesByCategory({ deckClasses, showFormatToggle, formatToggleClasses, categories }: RecipesByCategoryProps) {
  const [format, setFormat] = useState('cards');

  const handleFormatSelect = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault;

    let myFormat: string | null = e.currentTarget.getAttribute('data-format')
    setFormat(myFormat || 'cards');
  }

  const btnClassesBase = "inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white";
  const iconCards = '<p>WOW</p>';

  return (
    <>
      {showFormatToggle && 
        <div className={`inline-flex rounded-md shadow-sm ${formatToggleClasses}`} role="group">
          <button 
            type="button" 
            className={`${btnClassesBase} rounded-s-lg`}
            data-format="cards"
            onClick={handleFormatSelect}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 me-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
            </svg>
            Cards
          </button>
          <button 
            type="button" 
            className={`${btnClassesBase} rounded-e-lg`}
            data-format="list"
            onClick={handleFormatSelect}
          >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 me-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>List
          </button>
        </div>
      }
      {/* {iconCards} */}
      {categories.map((category) => 
        <section key={category} id={`section--${category}`} aria-labelledby={`headline--${category}`} className="">
          <h2 id={`headline--${category}`} className="mt-2 pt-2 text-4xl lg:text-5xl text-blue-800 dark:text-blue-300 font-sacramento">
            <Link href={`/${category.toLowerCase()}`} className="hover:underline">
              {capFirstLetter(category)}
            </Link>
          </h2>
        </section>
      )}

      <section>
        <p>Format: {format}</p>
      </section>
      {/* Recipes render
      <p>Category: {category}</p>
      <p>Numbers: {numbers}</p>
      <p>Child Recipes by Category: {JSON.stringify(data)}</p> */}
    </>
  )
}

{/*

  // const btnClassesBase = "px-3 py-2 text-md font-medium text-center inline-flex items-center rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300";
  // const btnClassesActive = "text-white bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800";
  // const btnClassesInactive = "text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white";
*/}
  {/* <ul className="button-group flex flex-row">
        <li className="button-group__item">
          <button 
            type="button" 
            className={
              `${btnClassesBase} ${format === 'cards' ? btnClassesActive : btnClassesInactive}`
            }
          >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 me-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
          </svg>
          Cards
          </button>
        </li>
        <li className="button-group__item">
          <button 
            type="button" 
            className={
              `${btnClassesBase} ${format === 'list' ? btnClassesActive : btnClassesInactive}`
            }
          >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 me-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
          </svg>List
          </button>
        </li>
      </ul> */}

    