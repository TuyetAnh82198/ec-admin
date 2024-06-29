import { API, RESPONSE_MESSAGES } from "./constants";

const fetchLogin = () => {
  const fetchUrl = process.env.REACT_APP_SERVER + API.USER.CHECK_LOGIN;
  let fetchObj = {
    method: "POST",
    credentials: "include",
  };
  const token = localStorage.getItem("noneFirefox");
  if (token) {
    fetchObj = {
      ...fetchObj,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: token }),
    };
  }
  return new Promise((resolve, reject) => {
    fetch(fetchUrl, fetchObj)
      .then((response) => response.json())
      .then((data) => {
        if (data.msg === RESPONSE_MESSAGES.LOGIN.SUCCESS) {
          resolve(true);
        } else {
          reject(false);
        }
      })
      .catch((err) => reject(err));
  });
};

export default fetchLogin;
