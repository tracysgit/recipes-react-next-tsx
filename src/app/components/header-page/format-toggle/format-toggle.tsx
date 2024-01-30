'use client';

import { useEffect, useRef, useState } from "react";
import { capFirstLetter } from "@/app/utils/utils";

interface FormatToggleProps {
  handleFormat?: void;
  children?: React.ReactNode;
}

export default function FormatToggle({  }: FormatToggleProps) {
  const [format, setFormat] = useState('cards');
  const [elToHide, setElToHide] = useState(null);

  // useEffect(() => {
  //   const deckList = document.querySelector('.deck--list');
  //   const deckGridCard = document.querySelector('.deck--grid-card');

  //   if (format === 'cards') {
  //     deckGridCard?.classList.add('grid');
  //     deckList?.classList.add('hidden');
  //   } else {
  //     deckGridCard?.classList.remove('grid');
  //     deckGridCard?.classList.add('hidden');
  //     deckList?.classList.remove('hidden');
  //     deckList?.classList.add('block');
  //   }

  //   console.log("use effect format", format);
    
    
  // }, []);

  const handleFormat = () => {

    if (format === 'cards') {
      setFormat('list');
      // deckGridCard?.classList.add('WOW');
      // console.log("deckGridCard", format);
      
    } else {
      setFormat('cards');
    }
  };

  return (
    <>
      <div className="button-group">
        <button type="button" className="w-[110px] px-3 py-2 text-md text-center inline-flex justify-center items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" value={format} onClick={handleFormat}><span className="sr-only">Show items in </span>{capFirstLetter(format)} View</button>
      </div>
    </>
    
  )
}
