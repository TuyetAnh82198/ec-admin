import {
  RESPONSE_MESSAGES,
  PAGE_TITLE,
  LOCAL_STORAGE,
  PAGE_PATH,
} from "./constants";

const handleResponse = (data, pageTitle, navigate) => {
  if (!data.msg) {
    if (data.errs) {
      alert(data.errs);
    }
    return;
  } else if (
    data.msg === RESPONSE_MESSAGES.REGISTER.SUCCESS ||
    data.msg === RESPONSE_MESSAGES.LOGIN.SUCCESS
  ) {
    if (data.msg === "Created!") {
      alert(`${pageTitle} Success!`);
      if (pageTitle === PAGE_TITLE.REGISTER && !data.noneFirefox) {
        navigate(PAGE_PATH.LOGIN);
      } else {
        navigate(PAGE_PATH.HOMEPAGE);
        window.location.reload();
      }
    }
  } else {
    alert(data.msg);
  }
  const noneFirefox = LOCAL_STORAGE.TOKEN;
  if (data[noneFirefox] && pageTitle === PAGE_TITLE.LOGIN) {
    localStorage.setItem(noneFirefox, data[noneFirefox]);

    const now = new Date();
    const oneDay = 1000 * 60 * 60 * 24;
    const expiry = now.getTime() + oneDay;
    localStorage.setItem("expiry", expiry);
  }
};

export default handleResponse;
