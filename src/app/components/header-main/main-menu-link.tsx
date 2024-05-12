'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface MainMenuLinkProps {
  href: string;
  children: React.ReactNode;
}

export default function MainMenuLink({ href, children }: MainMenuLinkProps) {
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
      <Link 
        href={href} 
        className={`${baseClasses}${isActiveLink ? ' ' + activeClasses : ''}`}
        aria-current={isActiveLink ? 'page' : undefined}
      >
        {children}
      </Link>
    </>
  )
}
