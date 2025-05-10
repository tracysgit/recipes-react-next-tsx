'use client';

import Link from 'next/link';
import { usePathname } from "next/navigation";
import { capFirstLetters } from '@/app/utils/utils';

/**
 * This is the breadcrumbs component.
 * @constructor
 */
export default function Breadcrumbs() {
  const paths = usePathname();
  const pathNames = paths.split('/').filter( path => path );
  const separatorSymbol = "/"
  const listItemClasses = 'inline';
  const linkClasses = 'underline hover:no-underline';
  const activeClasses = 'underline font-bold';

  return (
    <nav aria-label="breadcrumbs" className="breadcrumbs text-md mb-2 md:mb-4">
      <ol className={`list-breadcrumbs block`}>
        <li className={`breadcrumb inline`}>
          <Link href={'/'} className={`${listItemClasses} underline hover:no-underline`}>
            Home
          </Link>
          {pathNames.length > 0 && 
            <span 
              aria-hidden="true" 
            >&nbsp;{separatorSymbol}&nbsp;</span>
          }
        </li>
        {pathNames.map( (link, index) => {
          const href = `/${pathNames.slice(0, index + 1).join('/')}`;
          const itemClasses = paths === href ? `${linkClasses} ${activeClasses}` : linkClasses;
          
          return (
            <li key={index} className={`breadcrumb ${listItemClasses}`}>
              <Link href={href} className={`${itemClasses}`}>
                {pathNames.length !== index + 1 ? capFirstLetters(link) : link}
              </Link>
              {pathNames.length !== index + 1 && 
                <span aria-hidden="true">&nbsp;{separatorSymbol}&nbsp;</span>
              }
            </li>
          );
        })}
      </ol>
    </nav>
  )
}
