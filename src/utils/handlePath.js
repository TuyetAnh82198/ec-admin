export const handlePath = (category, subCategory) => {
  const foundSubCategory = category.find((c) => c.hasOwnProperty(subCategory));
  return foundSubCategory[subCategory].PATH;
};
