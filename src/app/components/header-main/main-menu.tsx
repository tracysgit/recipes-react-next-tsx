'use client';

import { MouseEvent, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { TCategories } from "@/app/lib/definitions";
import MainMenuLink from "./main-menu-link";
import { getCategories } from "@/app/lib/localdata";
import { capFirstLetter } from "@/app/utils/utils";

import styles from './main-menu.module.scss';

export default function MainMenu() {
    const [openMainmenu, setopenMainmenu] = useState(false);
    const categories: TCategories = getCategories();
    const path = usePathname();
    
    // Hide the mobile main menu upon page load
    useEffect(() => {
      setopenMainmenu(false);
    }, [path]);

    const handleToggleClick = (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setopenMainmenu(!openMainmenu);
    };

    return (
    <nav id="mainnav" className={`${styles.mainnav} flex flex-col items-center md:items-start`} aria-label="Main Menu">
      <button className={`${styles['mainmenu-toggle']}`} id="mainmenu-toggle" aria-label="Main menu toggle" title="Main menu toggle" aria-expanded={openMainmenu} aria-controls="mainmenu" onClick={handleToggleClick}><span className={`${styles.navicon}`}></span></button>
      <ul id="mainmenu" className={`${styles.mainmenu} ${ openMainmenu ? '' : styles['mobile-hidden'] } flex flex-row flex-wrap justify-center md:justify-start my-0 md:my-3 -ml-3`}>
        <li className="mainmenu__item my-1" key={'home'}><MainMenuLink href="/">Home</MainMenuLink></li>
        {categories.map((category) => (
          <li className="mainmenu__item my-1" key={category}>
            <MainMenuLink href={`/${category}`}>{capFirstLetter(category)}</MainMenuLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}