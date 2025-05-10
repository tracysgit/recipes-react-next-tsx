'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { clsx } from 'clsx';

interface INavLinkProps {
  href: string;
  id?: string;
  className?: string;
  children?: React.ReactNode;
}

/**
 * This is a NavLink element.
 * @constructor
 */
export default function NavLink({
  href,
  id,
  children,
}: INavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link 
      id={id ? id : undefined}
      href={href}
      aria-current={isActive ? 'page' : undefined}
      className={clsx('mainmenu__link font-semibold mx-1 px-2 py-2 border border-transparent rounded hover:border-white', {
        'active': isActive,
        'underline': isActive
      })}
    >
      {children}
    </Link>
  )
}