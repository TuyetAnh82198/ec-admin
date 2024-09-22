import { API, RESPONSE_MESSAGES, LOCAL_STORAGE } from "./constants";

const fetchLogin = () => {
  const fetchUrl = process.env.REACT_APP_SERVER + API.USER.CHECK_LOGIN;
  let fetchObj = {
    method: "POST",
    credentials: "include",
  };

  let token;
  const expiry = localStorage.getItem("expiry");
  const now = new Date();
  if (now.getTime() > expiry) {
    localStorage.removeItem("expiry");
    token = "";
  } else {
    token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
  }

  if (token) {
    fetchObj = {
      ...fetchObj,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
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
