import { clsx } from 'clsx';

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface DynamicHeadingProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  level: HeadingLevel;
}

/**
 * Dynamically generates a headline.
 * @constructor
 * @param {string} children - The children of the component.
 * @param {string} className - The className of the heading.
 * @param {string} id - The ID of the heading.
 * @param {string} level - The level of the heading.
 */
function DynamicHeading({ 
  children,
  className,
  id,
  level, 
}: DynamicHeadingProps) {
  const HeadingTag = level;

  return <HeadingTag 
    id={id} 
    className={clsx({
      'text-3xl lg:text-4xl font-semibold text-pretty': level === "h1",
      'text-blue-800 font-semibold font-sacramento text-pretty mb-3': level === "h2",
      },
      className)}
    >{children}</HeadingTag>;
}

export default DynamicHeading;