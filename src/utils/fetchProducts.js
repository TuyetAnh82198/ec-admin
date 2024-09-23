const fetchProducts = (endpoint, setIsLoading) => {
  const fetchUrl = process.env.REACT_APP_SERVER + endpoint;
  let fetchObj = {
    method: "GET",
    credentials: "include",
  };
  return new Promise((resolve, reject) => {
    fetch(fetchUrl, fetchObj)
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        if (data) {
          resolve(data);
        } else {
          reject(data);
        }
      })
      .catch((err) => reject(err));
  });
};

export default fetchProducts;
