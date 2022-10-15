import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import HeaderBar from "../components/Header";
import PermanentDrawerLeft from "../components/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../components/LoginButton";
import LogoutButton from "../components/LogOutButton";

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState();
  const { isAuthenticated, user, loginWithRedirect, isLoading } = useAuth0();

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     console.log(isAuthenticated);
  //     return;
  //   } else if (!isAuthenticated) {
  //     console.log(isAuthenticated);
  //     loginWithRedirect();
  //     console.log(isAuthenticated);
  //   }
  // }, []);

  const main = (
    <div className="App">
      <HeaderBar />
      <PermanentDrawerLeft />
      <Box component="div" sx={{ position: "relative", top: "20%" }}>
        <LogoutButton />
        <Outlet />
      </Box>
    </div>
  );

  const loadMainPage = <div>{isAuthenticated ? main : <LoginButton />}</div>;

  return (
    <div className="App">
      {/* <div className="App">
        <HeaderBar />
        <PermanentDrawerLeft />
        <Box component="div" sx={{ position: "relative", top: "20%" }}>
          <LogoutButton />
          <Outlet />
        </Box>
      </div> */}
      {loadMainPage}
    </div>
  );
};

export default App;
