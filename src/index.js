import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
  Route,
  useNavigate,
} from "react-router-dom";
import "./index.css";
import App from "./routes/App";
import ErrorPage from "./error-page";
import Reservations from "./routes/Reservations";

import PropertiesMain from "./routes/PropertiesMain";
import NewPropertyForm from "./components/NewPropertyForm";
import PropertyListing from "./components/PropertyListing";

// import ProfileForm from "./components/ProfileForm";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Auth0Provider, withAuthenticationRequired } from "@auth0/auth0-react";

const ProtectedApp = withAuthenticationRequired(App);

const Auth0ProviderWithRedirectCallback = ({ children, ...props }) => {
  const navigate = useNavigate();

  const onRedirectCallback = () => {
    navigate("/PropertiesMain");
  };

  return (
    <Auth0Provider onRedirectCallback={onRedirectCallback} {...props}>
      {children}
    </Auth0Provider>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Auth0ProviderWithRedirectCallback
        domain={process.env.REACT_APP_DOMAIN}
        clientId={process.env.REACT_APP_CLIENT_ID}
        redirectUri={window.location.origin}
        audience={process.env.REACT_APP_AUDIENCE}
        scope="read:current_user update:current_user_metadata"
      >
        <ProtectedApp />
      </Auth0ProviderWithRedirectCallback>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "PropertiesMain",
        element: <PropertiesMain />,
      },
      {
        path: "properties/:propertyName",
        element: <PropertyListing />,
      },
      {
        path: "PropertiesListing/new",
        element: <NewPropertyForm />,
      },
      // {
      //   path: "ProfileForm",
      //   element: <ProfileForm />,
      // },
      {
        path: "Reservations",
        element: <Reservations />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
