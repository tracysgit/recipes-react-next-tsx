'use client';

import { useState } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
// import { useDebouncedCallback } from 'use-debounce';
import Link from 'next/link';
import { TRecipes } from '@/app/lib/definitions';

type SearchProps = {
  recipes?: TRecipes;
  searchClasses?: string;
  children?: React.ReactNode;
};

export default function Search({ recipes }: SearchProps) {
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchResults, setSearchResults] = useState<TRecipes>();

  const handleReset = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault;
    setSearchInput('');
  };
  
  // const handleSearch = useDebouncedCallback((term:string) => {
  const handleSearch = (term:string) => {
    setSearchInput(term);

    //Search names, tags, and ingredients
    setSearchResults(recipes?.filter((recipe) => recipe.name.toLowerCase().includes(term.toLowerCase()) || recipe.ingredients?.toLowerCase().includes(term.toLowerCase()) || recipe.tags?.toLowerCase().includes(term.toLowerCase())));

  // }, 300);
  };

  const filteredRecipes = searchResults?.map((recipe, index) =>
    <li key={index} className="text-lg mb-[5px]">
      <Link href={`/${recipe.category}/${recipe.name_slug}`} className="underline hover:text-gray-600">{recipe.name}</Link> ({recipe.category})
    </li>
  );


  return (
    <div className="search__wrapper w-full flex flex-col content-end mb-6 md:mb-8 lg:mb-10">
      <div className="search__form flex flex-row justify-end">
        <div className="relative flex flex-1 flex-shrink-0">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <input
            className="peer block w-full rounded-s-md border-2 border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
            placeholder="Search recipes..."
            value={searchInput}
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
          />
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" focusable="false" />
          <button 
            id="reset-search"
            type="reset"
            //-ml-0.5
            className="inline-block rounded-e-md border-2 border-primary px-2 pb-[6px] pt-2 outline-2 hover:border-primary-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-primary-600 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500 active:border-primary-700"
            onClick={handleReset}
            >
            <span className="sr-only">Reset search</span>
            <XMarkIcon className="h-[20px] w-[20px] text-lg text-gray-500 peer-focus:text-gray-900" focusable="false" />
          </button>
        </div>
      </div>
      {searchInput && 
        <div className="search__results bg-neutral-100 rounded-lg border border-neutral-200 p-4 md:p-6 w-full mt-4">
          <p className="text-lg font-semibold text-gray-900 dark:text-white">Search Results:</p>
          {searchResults && searchResults.length > 0 ? (
              <ul className="list-disc columns-1 md:columns-2 gap-8 ml-6 mt-4">
                {filteredRecipes}
              </ul>
          ) : (
            <p className="mt-4">No recipes found.</p>
          )}
        </div>
      }  
    </div>
  )
}