import { RESPONSE_MESSAGES } from "./constants";

const handleResponse = (data, pageTitle, navigate) => {
  if (!data.msg) {
    alert(data.errs);
  } else if (
    data.msg === RESPONSE_MESSAGES.REGISTER.SUCCESS ||
    data.msg === RESPONSE_MESSAGES.LOGIN.SUCCESS
  ) {
    if (data.msg === "Created!") {
      alert(`${pageTitle} Success!`);
      if (pageTitle === "Register") {
        navigate("/login");
      } else {
        navigate("/");
        window.location.reload();
      }
    }
  } else {
    alert(data.msg);
  }
  const noneFirefox = "noneFirefox";
  if (data[noneFirefox] && pageTitle === "Login") {
    localStorage.setItem(noneFirefox, data[noneFirefox]);
  }
};

export default handleResponse;
