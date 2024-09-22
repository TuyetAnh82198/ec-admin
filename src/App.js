import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { PAGE_PATH } from "./utils/constants";
import Layout from "./components/layout/Layout";
import AddProduct from "./pages/addProduct/AddProduct";
import Register from "./pages/registerLogin/register/Register";
import Login from "./pages/registerLogin/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";

import "./App.css";

const router = createBrowserRouter([
  {
    path: PAGE_PATH.HOMEPAGE,
    element: <Layout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: PAGE_PATH.REGISTER, element: <Register /> },
      { path: PAGE_PATH.LOGIN, element: <Login /> },
      { path: PAGE_PATH.PRODUCTS.ADD, element: <AddProduct /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
