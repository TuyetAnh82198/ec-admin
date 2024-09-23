import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import fetchCart from "../../utils/fetchCart";
import CirProgress from "../../components/circularProgress/CircularProgress";
import { API, LOCAL_STORAGE } from "../../utils/constants";
import UserInfor from "./userInfor/UserInfor";
import TableDetail from "./tableDetail/TableDetail";

const HistoryDetail = () => {
  const [cart, setCart] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isErr, setIsErr] = useState(false);
  const params = useParams();
  const id = params.id;
  const [endpoint, setEndpoint] = useState(API.CART.HISTORY_DETAIL + id);

  useEffect(() => {
    const headers = { "Content-Type": "application/json" };
    const body = { token: localStorage.getItem(LOCAL_STORAGE.TOKEN) };

    setIsLoading(true);
    setIsErr(false);
    fetchCart({ endpoint, method: "POST", headers, body, setIsLoading })
      .then((data) => {
        setCart(data.cart);
      })
      .catch((err) => {
        setIsErr(true);
      });
  }, []);
  return (
    <>
      <Box
        sx={{
          padding: "1rem",
        }}
      >
        {isLoading && !isErr && <CirProgress />}
        {!cart._id && (
          <p style={{ textAlign: "center" }}>The invoice has no information.</p>
        )}
        {cart._id && (
          <>
            <h2>INFORMATION ORDER</h2>
            <UserInfor user={cart?.user} totalAmount={cart.totalAmount || 0} />
            <TableDetail products={cart?.products} />
          </>
        )}
      </Box>
    </>
  );
};

export default HistoryDetail;
