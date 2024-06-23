import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/layout/Layout";
import AddProduct from "./pages/addProduct/AddProduct";
import Register from "./pages/registerLogin/register/Register";

import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [{ index: true, element: <Register /> }],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
