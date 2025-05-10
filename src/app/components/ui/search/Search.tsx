'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import DynamicHeading from '../headline/DynamicHeading';
import { IRecipe } from '@/app/utils/types/types';
import { getRecipes } from '@/app/api/apis';
import { useDebouncedCallback } from 'use-debounce';

type SearchProps = {
  children?: React.ReactNode;
};

/**
 * The Search component.
 * @constructor
 */
export default function Search({}: SearchProps) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [recipes, setRecipes] = useState<IRecipe[]>([]);
  const [searchResults, setSearchResults] = useState<IRecipe[]>();

  //Fetch recipes on page load
  useEffect(() => {
    async function fetchRecipes() {
      const fetchedRecipes = await getRecipes();
      setRecipes(fetchedRecipes);
    }
    fetchRecipes()
  }, [])

  //Handle the key down
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' ) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const handleSearch = useDebouncedCallback((term:string) => {
    setSearchTerm(term);

    //Search names, tags, and ingredients
    setSearchResults(recipes?.filter((recipe) => recipe.name.toLowerCase().includes(term.toLowerCase()) || recipe.ingredients?.toLowerCase().includes(term.toLowerCase()) || recipe.tags?.toLowerCase().includes(term.toLowerCase()) || recipe.category?.toLowerCase().includes(term.toLowerCase()) ));
  }, 100);
  
  return (
    <section id="search__wrapper" aria-label="Recipe Search" className="md:mb-6">
      <form 
        role="search" 
      >
        <div className="searchbox__wrapper relative w-full text-gray-900">
          <label htmlFor="searchbox" className="sr-only">
            Search recipes
          </label>
          <div className="icon__magnifying-glass absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
            <svg className="w-4 h-4" role="img" focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
          </div>
          <input 
            id="searchbox"
            name="searchbox"
            type="search"
            placeholder="Search recipes..."
            autoComplete="off"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e)}
            className="block w-full min-h-11 text-md border border-gray-300 rounded-lg placeholder:text-gray-800 focus:ring-blue-500 focus:border-blue-500 pl-10 pr-4"
            
          />
        </div>
      </form>
      <SearchResultsView searchResults={searchResults ?? []} searchTerm={searchTerm ?? ''} />
    </section>
  )
}

function SearchResultsView({ 
  searchResults, 
  searchTerm 
}:{
  searchResults: IRecipe[];
  searchTerm: string;
}) {
  
  if (searchTerm === '') {
    return;
  }

  const renderedRecipes = searchResults?.map((recipe, index) =>
    <li key={index} className="text-lg mb-[5px]">
      <Link href={`/${recipe.category}/${recipe.name_slug}`} className="underline hover:text-gray-600">{recipe.name}</Link> ({recipe.category})
    </li>
  );

  return (
    <section role="alert" aria-labelledby="search__results__headline" className="search__results text-black rounded-lg border border-gray-300 p-4 w-full mt-4">
      {searchResults?.length === 0 ? (
      <p>No recipes found.</p>
    ) : (
      <>
        <DynamicHeading level="h2" id="search__results__headline" className="headline__plain text-xl">Showing {searchResults?.length} search results</DynamicHeading>
        <ul role="list" className="list-disc columns-1 md:columns-2 gap-8 ml-6 mt-4">
        {renderedRecipes}
        </ul>
      </>
    )}
    </section>
  );
}