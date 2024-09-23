const handlePrice = (price) => {
  return price ? price.toLocaleString("en-US") : 0;
};
export default handlePrice;
