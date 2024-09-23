const fetchCart = ({ endpoint, method, headers, body, setIsLoading }) => {
  const fetchUrl = process.env.REACT_APP_SERVER + endpoint;
  const fetchObj = {
    method,
    credentials: "include",
  };
  if (method === "POST") {
    fetchObj.headers = headers;
    fetchObj.body = JSON.stringify(body);
  }
  return new Promise((resolve, reject) => {
    fetch(fetchUrl, fetchObj)
      .then((response) => response.json())
      .then((data) => {
        setIsLoading && setIsLoading(false);
        if (data) {
          resolve(data);
        } else {
          reject(data);
        }
      })
      .catch((err) => reject(err));
  });
};

export default fetchCart;
