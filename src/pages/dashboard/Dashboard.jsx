import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import fetchLogin from "../../utils/fetchLogin";

const Dashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    fetchLogin()
      .then((loggedInState) => {
        setIsLoggedIn(loggedInState);
      })
      .catch((err) => {
        console.log(err);
        navigate("/login");
      });
  }, []);

  return <>{isLoggedIn && <div>Dashboard Page</div>}</>;
};

export default Dashboard;
