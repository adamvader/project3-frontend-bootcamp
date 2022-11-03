import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
// ----- imports from local files -----
import { BACKEND_URL } from "../constants.js";
// ----- imports from MUI -----
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import TextField from "@mui/material/TextField";

export default function Dashboard() {
  const [properties, setProperties] = useState([]);
  const { getAccessTokenSilently, user } = useAuth0();

  useEffect(() => {
    if (user) {
      const getProperties = async () => {
        const accessToken = await getAccessTokenSilently({
          audience: "https://stayhere/api",
          scope: "read:current_user",
        });
        console.log(user);
        axios
          .get(`${BACKEND_URL}/properties`, {
            params: {
              ownerEmail: user.email,
            },
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((response) => {
            setProperties(response.data);
          });
      };

      getProperties();
    }
  }, [user]);

  console.log(properties);
  // useEffect(() => {
  //   axios.get(`${BACKEND_URL}/properties`).then((response) => {
  //     setProperties(response.data);
  //   });
  //   // Only run this effect on component mount
  // }, []);

  return (
    <Box sx={{ display: "flex", height: "60vh" }}>
      <Typography
        variant="h5"
        sx={{
          position: "absolute",
          fontFamily: "Roboto",
          fontWeight: 600,
          p: 5,
          left: 250,
          top: 10,
        }}
      >
        Dashboard
      </Typography>
      <ImageList
        sx={{
          width: "60vw",
          pt: 20,
          left: 250,
        }}
        cols={3}
      >
        {properties.map((prop) => (
          <ImageListItem key={prop.id}>
            <img
              src={`${prop.image_url}?w=248&fit=crop&auto=format`}
              srcSet={`${prop.image_url}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={prop.home_name}
              loading="lazy"
            />
            <ImageListItemBar
              title={prop.home_name}
              subtitle={<span>by: {prop.owner.name}</span>}
              position="below"
              sx={{ background: "#FFFFFF" }}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}
