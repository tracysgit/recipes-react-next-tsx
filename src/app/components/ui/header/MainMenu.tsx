'use client';

import NavLink from "@/app/components/ui/links/NavLink";
import { MouseEvent, Suspense, useEffect, useState } from 'react';
import { getCategories } from '@/app/api/apis';
import { capFirstLetters } from '@/app/utils/utils';
import { clsx } from 'clsx';

/**
 * This is the main menu component.
 * @constructor
 */
export default function MainMenu() {
  const [categories, setCategories] = useState(['']);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  /* Listen for screen resizing, and serve content accordingly */
  useEffect(() => {
    const handleListFormat = () => {
      const isMobile = window.innerWidth <= 768;

      if (!isMobile) {
        setIsMenuOpen(true);
      } else {
        setIsMenuOpen(false);
      }
    };

    handleListFormat();
    window.addEventListener('resize', handleListFormat);

    return () => {
      window.removeEventListener('resize', handleListFormat);
    };
  }, []);
  
  //Get categories
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getCategories();
        if (!response) {
          throw new Error(`HTTP error! status: ${response}`);
        }
        setCategories(response);
      } catch (err) {
        console.log(err);
      } 
    }

    fetchData();
  }, []);

  //Toggle the mobile nav button
  const handleToggleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav 
      id="mainnav" 
      role="navigation"
      aria-label="Main Menu" 
      className="flex flex-col justify-start items-stretch"
    >
      <button 
        id="mainmenu-toggle" 
        aria-label={isMenuOpen ? 'Close Menu' : 'Open Menu'}
        title="Main menu toggle" 
        aria-expanded={isMenuOpen} 
        aria-controls="mainmenu" 
        className="mainmenu-toggle w-[44px] h-[44px] md:hidden flex flex-col justify-center items-center" 
        onClick={handleToggleClick}
      >
        <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-9 rounded-sm ${isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-2'}`}></span>
        <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-9 rounded-sm my-0.5 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
        <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-9 rounded-sm ${isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-2'}`}></span>   
      </button>
      <ul 
        id="mainmenu"
        className={clsx('mainmenu md:flex-row flex-wrap justify-center gap-2 md:justify-start -ml-3 py-2', isMenuOpen ? 'flex' : 'hidden')}
      >
        <li>
          <NavLink href="/">Home</NavLink>
        </li>
        <Suspense>
        {categories && categories.map((category) => 
          <li key={category}>
            <NavLink href={`/${category}`}>{capFirstLetters(category)}</NavLink>
          </li>
        )}
        </Suspense>
      </ul>
    </nav>
  )
}