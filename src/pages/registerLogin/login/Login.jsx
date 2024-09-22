import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import Form from "../form/Form";
import { PAGE_TITLE } from "../../../utils/constants";
import fetchLogin from "../../../utils/fetchLogin";
import handleNavigate from "../../../utils/handleNavigate";

const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    fetchLogin()
      .then((loggedInState) => {
        if (loggedInState) {
          handleNavigate.toHomePage(navigate);
        }
      })
      .catch((err) => {});
  }, []);
  return <Form pageTitle={PAGE_TITLE.LOGIN} />;
};
export default Login;
