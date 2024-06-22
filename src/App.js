import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/layout/Layout";

import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    // children: [

    //   { index: true, element: <HomePage /> },
    // ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
