// import slugify from 'slugify';

export const capFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// export const slugifyString = (string) => {
//   return slugify(string, { lower: true });
// };