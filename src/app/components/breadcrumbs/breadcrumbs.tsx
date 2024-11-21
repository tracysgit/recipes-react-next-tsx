'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
// import { capFirstLetter } from '@/app/utils/utils';


export default function Breadcrumbs() {
  const paths = usePathname();
  const pathNames = paths.split('/').filter( path => path );
  const separatorSymbol = "/"
  const listItemClasses = 'inline';
  const linkClasses = 'underline';
  const activeClasses = 'text-blue-800 underline font-bold';

  return (
    <>
      <nav aria-label="breadcrumbs" className={`breadcrumbs text-md`}>
        <ol className={`list-breadcrumbs block`}>
          <li className={`breadcrumb inline`}>
            <Link href={'/'} className={`${listItemClasses} underline`}>
              Home
            </Link>
            {pathNames.length > 0 && 
              <span 
                aria-hidden="true" 
              >&nbsp;{separatorSymbol}&nbsp;</span>
            }
          </li>
          {pathNames.map( (link, index) => {
            let href = `/${pathNames.slice(0, index + 1).join('/')}`;
            let itemClasses = paths === href ? `${linkClasses} ${activeClasses}` : linkClasses;
            
            return (
              <li key={index} className={`breadcrumb ${listItemClasses}`}>
                <Link href={href} className={`${itemClasses} dark:text-white`}>
                  {link}
                </Link>
                {pathNames.length !== index + 1 && 
                  <span aria-hidden="true">&nbsp;{separatorSymbol}&nbsp;</span>
                }
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  )
}
