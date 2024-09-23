import { Box, Button } from "@mui/material";
import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import fetchProduct from "../../utils/fetchProducts";
import { API, LOCAL_STORAGE, PAGE_PATH } from "../../utils/constants";
import Pagination from "../../components/pagination/Pagination";
import CircularProgress from "../../components/circularProgress/CircularProgress";
import ProductList from "../../components/productList/ProductList";
import handleResponse from "../../utils/handleResponse";
import fetchCart from "../../utils/fetchCart";
import fetchLogin from "../../utils/fetchLogin";
import { socket } from "../../socket";
import {
  handleSocketConnect2,
  handleSocketAction,
} from "../../utils/handleSocket";

const Products = () => {
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

  const category = "all";
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isErr, setIsErr] = useState(false);
  const [endpoint, setEndpoint] = useState(
    API.PRODUCTS.GET.DETAIL + category + "/1"
  );
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [deleteEnpoint, setDeleteEndpoint] = useState(API.PRODUCTS.DELETE);
  const [ids, setIds] = useState([]);

  const fetchPd = useCallback(() => {
    return fetchProduct(endpoint, setIsLoading);
  }, [endpoint]);

  useEffect(() => {
    setEndpoint(API.PRODUCTS.GET.DETAIL + category + "/" + page);
  }, [page]);

  useEffect(() => {
    setIsLoading(true);
    setIsErr(false);
    fetchPd()
      .then((data) => {
        setProducts(data.relatedProducts);
        setTotalPage(data.totalPage);
      })
      .catch((err) => {
        setIsErr(true);
      });
  }, [endpoint]);

  const handlePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPage) {
      setPage((prev) => prev + 1);
    }
  };

  const handleCheck = (productId) => {
    const index = ids.findIndex((id) => id === productId);
    let subArr;
    if (index !== -1) {
      subArr = [...ids];
      subArr.splice(index, 1);
      setIds(subArr);
    } else {
      if (ids.length > 0) {
        subArr = [...ids, productId];
        setIds(subArr);
      } else {
        subArr = [productId];
        setIds(subArr);
      }
    }
  };

  const handleDelete = ({ ids, id }) => {
    const isConfirm = window.confirm("Are you sure?");
    if (!isConfirm) {
      return;
    }
    const headers = { "Content-Type": "application/json" };
    const productId = ids ? ids : [id];

    const body = {
      productId,
      token: localStorage.getItem(LOCAL_STORAGE.TOKEN),
      page,
    };
    fetchCart({ endpoint: deleteEnpoint, method: "POST", headers, body })
      .then((data) => {
        handleResponse(data, null, navigate);
      })
      .catch((err) => {
        console.log(err);
      });
    setIds([]);
  };

  const styledTitle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  useEffect(() => handleSocketConnect2(socket), []);
  useEffect(() => handleSocketAction.products.delete(socket, setProducts), []);
  return (
    <>
      {isLoggedIn && (
        <Box sx={{ margin: "0 1rem" }}>
          <Box sx={styledTitle}>
            <h3 style={{ fontSize: "1.2rem", fontWeight: "490" }}>PRODUCTS</h3>
            {ids.length > 0 && (
              <Button
                onClick={() => {
                  handleDelete({ ids });
                }}
                sx={{ textTransform: "none", height: "2rem" }}
                variant="contained"
                color="error"
              >
                Delete many
              </Button>
            )}
          </Box>
          {isLoading && !isErr && <CircularProgress />}
          {products.length > 0 ? (
            <Box sx={{ marginTop: "0.5rem" }}>
              <ProductList
                products={products}
                handleCheck={handleCheck}
                handleDelete={handleDelete}
              />
            </Box>
          ) : (
            <Box>Found no products.</Box>
          )}
          {products && (
            <Pagination
              page={page}
              totalPage={totalPage}
              handlePrev={handlePrev}
              handleNext={handleNext}
            />
          )}
        </Box>
      )}
    </>
  );
};

export default Products;
