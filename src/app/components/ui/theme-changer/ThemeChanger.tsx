'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import IconMoon from '@/app/components/ui/icons/IconMoon';
import IconSun from '@/app/components/ui/icons/IconSun';

/**
 * This is a theme provider button.
 * @constructor
 */
export default function ThemeChanger() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const btnClasses = "flex w-[44px] h-[44px] inline-flex justify-center items-center shrink-0 text-sm font-medium border-2 rounded-lg text-blue-700 bg-white hover:bg-gray-100 hover:text-blue-700 focus-visible:ring-2 focus-visible:ring-blue-600";
  
  return (
    <button 
      type="button"
      data-theme={theme}
      className={btnClasses}
      onClick={() => {
        setTheme(theme === 'light' ? 'dark' : 'light')
      }}
    >
      {theme === 'dark' ? (
        <span><IconSun /></span>
      ) : (
        <span><IconMoon /></span>
      )} 
      <span className="sr-only">{`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}</span>
    </button>
  )
}
