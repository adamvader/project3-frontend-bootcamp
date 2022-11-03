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

  const listingPreviews = listings.map((properties) => (
    <Grid item xs={2} sm={4} md={4}>
      <Link to={`/properties/${properties.id}`} key={properties.id}>
        <PropertyListingPreview data={properties} />
      </Link>
    </Grid>
  ));

  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {listings.map((properties) => (
        <Grid item xs={2} sm={4} md={4}>
          <PropertyListingPreview data={properties} />
        </Grid>
      ))}
    </Grid>
  );
};

export default PropertyListingPreviewList;
