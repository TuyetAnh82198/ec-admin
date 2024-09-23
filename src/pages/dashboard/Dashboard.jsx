import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

import fetchLogin from "../../utils/fetchLogin";
import { PAGE_PATH, API, LOCAL_STORAGE } from "../../utils/constants";
import Figures from "./figures/Figures";
import CircularProgress from "../../components/circularProgress/CircularProgress";
import fetchCart from "../../utils/fetchCart";
import Invoices from "./table/Invoices";

const Dashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [data, setData] = useState({
    users: 0,
    newOrders: 0,
    earningsOfMonth: 0,
    totalEarnings: 0,
  });
  const [cart, setCart] = useState([]);
  const [endpoint, setEndpoint] = useState(API.CART.GET);
  const [isLoading, setIsLoading] = useState(false);
  const [isErr, setIsErr] = useState(false);

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

  const fetchData = useCallback(() => {
    const headers = { "Content-Type": "application/json" };
    const body = { token: localStorage.getItem(LOCAL_STORAGE.TOKEN) };
    return fetchCart({ endpoint, method: "POST", headers, body, setIsLoading });
  }, [endpoint]);

  useEffect(() => {
    setIsLoading(true);
    setIsErr(false);
    fetchData()
      .then((data) => {
        const totalAmountOfMonth = data.cartOfMonth
          .filter((c) => c.status === "Paid")
          .reduce((acc, c) => acc + c.totalAmount, 0);
        const totalAmount = data.cart
          .filter((c) => c.status === "Paid")
          .reduce((acc, c) => acc + c.totalAmount, 0);
        setData((prev) => {
          return {
            ...prev,
            users: data.numberOfUsers,
            newOrders: data.cartOfMonth.length,
            earningsOfMonth: totalAmountOfMonth,
            totalEarnings: totalAmount,
          };
        });
        setCart(data.cart);
      })
      .catch((err) => {
        setIsErr(true);
      });
  }, []);

  const handleView = (id) => {
    navigate(PAGE_PATH.HISTORY_DETAIL.slice(0, -3) + id);
  };

  return (
    <>
      {isLoggedIn && (
        <Box sx={{ padding: "1rem" }}>
          <Figures
            users={data.users}
            newOrders={data.newOrders}
            earningsOfMonth={data.earningsOfMonth}
            totalEarnings={data.totalEarnings}
          />
          {isLoading && !isErr && <CircularProgress />}
          {cart.length > 0 && (
            <Box>
              <p style={{ color: "gray", fontSize: "1.2rem" }}>
                Latest Transactions
              </p>
              <Invoices items={cart} handleView={handleView} />
            </Box>
          )}
        </Box>
      )}
    </>
  );
};

export default Dashboard;
