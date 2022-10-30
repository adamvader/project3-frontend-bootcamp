import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import PropertyListingPreview from "./PropertyListingPreview";
import { BACKEND_URL } from "../constants.js";
import { useAuth0 } from "@auth0/auth0-react";

const PropertyListingPreviewList = () => {
  const [listings, setListings] = useState([]);
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
            setListings(response.data);
          });
      };

      getProperties();
    }
  }, [user]);

  // useEffect(() => {
  //   axios.get(`${BACKEND_URL}/properties`).then((response) => {
  //     setListings(response.data);
  //   });
  //   // Only run this effect on component mount
  // }, []);

  const listingPreviews = listings.map((properties) => (
    <Grid item xs={2} sm={4} md={3}>
      <Link to={`/properties/${properties.id}`} key={properties.id}>
        <PropertyListingPreview data={properties} />
      </Link>
    </Grid>
  ));

  return (
    <Box
      sx={{
        flexGrow: 1,
        height: "100vh",
      }}
    >
      <Grid container spacing={3}>
        {listingPreviews}
      </Grid>
    </Box>
  );
};

export default PropertyListingPreviewList;
