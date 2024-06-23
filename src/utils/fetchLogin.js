import { API } from "./constants";

const fetchLogin = () => {
  const fetchUrl = process.env.REACT_APP_SERVER + API.USER.CHECK_LOGIN;
  const fetchObj = {
    method: "GET",
    credentials: "include",
  };
  return new Promise((resolve, reject) => {
    fetch(fetchUrl, fetchObj)
      .then((response) => response.json())
      .then((data) => {
        if (data.msg === "You are logged in") {
          resolve(true);
        } else {
          reject(false);
        }
      })
      .catch((err) => reject(err));
  });
};

export default fetchLogin;
