import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import History from "../pages/History";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
    ],
  },
  {
    path: "/history",
    element: <App />,
    children: [
      { path: "/history", element: <History /> },
    ],
  },
]);