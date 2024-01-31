'use client';

import { useState } from 'react';
import { capFirstLetter } from "../utils/utils";
// import { getRecipes } from '@/app/lib/localdata';
import { Recipes } from '../lib/definitions';

type TestComponentProps = {
  id?: string;
  children?: React.ReactNode;
};

export default function TestComponent({ id, children }: TestComponentProps) {
  const [format, setFormat] = useState('cards');

  const handleChildClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log("clicked handleChildClick", event.target);
  };

  return (
    <>
      <button 
        type="button" 
        id={id}
        className="w-[110px] px-3 py-2 text-md text-center inline-flex justify-center items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mr-4"  
        onClick={handleChildClick}
      >
        {capFirstLetter(format)} View
      </button>
      {/* <p>Child Component Recipes: {JSON.stringify(data)}</p> */}
    </>
  )
}
