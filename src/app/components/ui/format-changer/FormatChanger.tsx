'use client';

import { MouseEvent} from 'react';
import IconList from '@/app/components/ui/icons/IconList';
import IconCard from '@/app/components/ui/icons/IconCard';

/**
 * The FormatChanger provides a button that lets the user select the recipe display format.
 * @constructor
 * @param {string} buttonLabel - The label that appears on the format changer button.
 * @param {string} onButtonClick - The button click handler.
 */
export default function FormatChanger({
  buttonLabel,
  onButtonClick,
}:{
  buttonLabel: string;
  onButtonClick(e: MouseEvent<HTMLButtonElement>): void;
}) {
  const btnClasses = "w-fit h-[44px] inline-flex justify-center items-center text-sm font-medium border-2 rounded-lg text-blue-700 bg-white hover:bg-gray-100 hover:text-blue-700 focus-visible:ring-3 focus-visible:ring-blue-600 px-2 mb-6 md:mb-0";

  return (
    <button
      id="format-toggle"
      type="button"
      value={buttonLabel}
      className={btnClasses}
      onClick={onButtonClick}
    >
      {buttonLabel === 'list' ? (
        <span className="mr-1"><IconCard /></span>
      ) : (
        <span className="mr-1"><IconList /></span>
      )} 
      <span className="sr-only">Switch to </span>
      {buttonLabel === 'list' ? 'cards' : 'list'}
      <span className="sr-only">layout</span>
    </button>
  )
}
