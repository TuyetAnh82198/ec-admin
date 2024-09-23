import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { PAGE_PATH } from "./utils/constants";
import Layout from "./components/layout/Layout";
import AddProduct from "./pages/addProduct/AddProduct";
import Register from "./pages/registerLogin/register/Register";
import Login from "./pages/registerLogin/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import Page404 from "./pages/404/Page404";
import Page500 from "./pages/500/Page500";
import HistoryDetail from "./pages/historyDetail/HistoryDetail";
import Products from "./pages/products/Products";

const router = createBrowserRouter([
  {
    path: PAGE_PATH.HOMEPAGE,
    element: <Layout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: PAGE_PATH.REGISTER, element: <Register /> },
      { path: PAGE_PATH.LOGIN, element: <Login /> },
      { path: PAGE_PATH.PRODUCTS.ADD, element: <AddProduct /> },
      { path: PAGE_PATH.HISTORY_DETAIL, element: <HistoryDetail /> },
      { path: PAGE_PATH.PRODUCTS.VIEW, element: <Products /> },
    ],
  },
  { path: PAGE_PATH.SERVER_ERROR, element: <Page500 /> },
  { path: "/*", element: <Page404 /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
