/**
 * Capitalize the first letters of each word.
 * @constructor
 */
export const capFirstLetters = (string: string): string => {
  return string.split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
};