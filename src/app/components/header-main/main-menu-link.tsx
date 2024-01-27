'use client';

import type { Route } from 'next';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function MainMenuLink({ href, children }) {
  const path = usePathname();
  const baseClasses = `mainmenu__link mx-1 px-2 py-2 border border-transparent rounded hover:border-white dark:hover:underline`;
  const activeClasses = `active underline`;
  
  let isActiveLink = false;
  if (path === '/' && path === href) {
    isActiveLink = true;
  } else if (href !== '/' && path.startsWith(href)) {
    isActiveLink = true;
  } 

  return (
    <>
      {isActiveLink ? (
        <Link 
          href={href} 
          className={`${baseClasses} ${activeClasses}`}
          aria-current="page">
            {children}
        </Link>
      ) : (
        <Link 
          href={href} 
          className={`${baseClasses}`}>
            {children}
        </Link>
      )}
    </>
    // <Link href={href} aria-current="page" className="mainmenu__link active">{children}</Link>
    // <Link href="/CATEGORIES" className="mainmenu__link">CATEGORIES</Link></li>
  )
}
