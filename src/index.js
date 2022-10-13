import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import "./index.css";
import App from "./routes/App";
import ErrorPage from "./error-page";
import Reservations from "./routes/reservations";
import PropertiesPage from "./routes/PropertiesPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "properties",
        element: <PropertiesPage />,
      },
      {
        path: "reservations",
        element: <Reservations />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
