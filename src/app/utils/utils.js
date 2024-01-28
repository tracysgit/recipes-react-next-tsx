
export const capFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const sortArrayOfObjAsc = (array, key) => {
  const arrayAscending = [...array].sort((a, b) => {
    const nameA = a[key].toUpperCase(); // ignore upper and lowercase
    const nameB = b[key].toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });

  return arrayAscending;
  
};