import { Suspense } from 'react';
import Breadcrumbs from './Breadcrumbs';
import Search from '../search/Search';

interface IPageHeaderProps {
  hasBreadcrumbs?: boolean;
  hasSearch?: boolean;
  children?: React.ReactNode;
};

const baseClasses = "header-page flex flex-col flex-nowrap justify-between gap-4 mb-6 md:mb-8 lg:mb-10 border-0";

/**
 * This is the page header component.
 * @constructor
 * @param {string} hasBreadcrumbs - If the header contains breadcrumbs.
 * @param {string} hasSearch - If the header contains a search bar.
 * @param {string} children - Children.
 */
export default function PageHeader({ hasBreadcrumbs = false, hasSearch = false, children }:IPageHeaderProps) {

  return (
    <div className={baseClasses}>
      <Suspense>
        {hasSearch && <Search />}
        {hasBreadcrumbs && <Breadcrumbs />}
      </Suspense>
      {children}
    </div>
  )
}