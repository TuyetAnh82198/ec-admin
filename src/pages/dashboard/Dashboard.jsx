import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import fetchLogin from "../../utils/fetchLogin";
import { PAGE_PATH } from "../../utils/constants";

const Dashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    fetchLogin()
      .then((loggedInState) => {
        setIsLoggedIn(loggedInState);
      })
      .catch((err) => {
        navigate(PAGE_PATH.LOGIN);
      });
  }, []);

  return <>{isLoggedIn && <div>Dashboard Page</div>}</>;
};

export default Dashboard;
