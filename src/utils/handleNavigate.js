import { PAGE_PATH } from "./constants";

const handleNavigate = {
  serverErr: (navigate) => {
    return navigate("/server-error");
  },
  toHomePage: (navigate) => {
    return navigate(PAGE_PATH.HOMEPAGE);
  },
};

export default handleNavigate;
