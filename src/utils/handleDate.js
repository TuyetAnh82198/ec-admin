const handleDate = (string) => {
  if (!string) {
    return "";
  }
  const newDate = new Date(string);
  return `${newDate.getFullYear()}/${
    newDate.getMonth() + 1
  }/${newDate.getDate()}`;
};

export default handleDate;
