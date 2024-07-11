import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { NAVBAR } from "./utils/constants";
import { handlePath } from "./utils/handlePath";
import Layout from "./components/layout/Layout";
import AddProduct from "./pages/addProduct/AddProduct";
import Register from "./pages/registerLogin/register/Register";
import Login from "./pages/registerLogin/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";

import "./App.css";

const NAVBAR_MAIN = NAVBAR[0].MAIN;
const NAVBAR_NEW = NAVBAR[2].NEW;
const NAVBAR_USER = NAVBAR[3].USER;

const router = createBrowserRouter([
  {
    path: handlePath(NAVBAR_MAIN, "DASHBOARD"),
    element: <Layout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: handlePath(NAVBAR_USER, "REGISTER"), element: <Register /> },
      { path: handlePath(NAVBAR_USER, "LOGIN"), element: <Login /> },
      { path: handlePath(NAVBAR_NEW, "ADD_PRODUCT"), element: <AddProduct /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
