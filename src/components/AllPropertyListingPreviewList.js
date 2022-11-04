import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { BACKEND_URL } from "../constants.js";
import { useAuth0 } from "@auth0/auth0-react";
import AllPropertyListingPreview from "./AllPropertyListingPreview.js";

const AllPropertyListingPreviewList = () => {
  const [listings, setListings] = useState([]);
  const { getAccessTokenSilently, user } = useAuth0();

  useEffect(() => {
    if (user) {
      const getProperties = async () => {
        axios.get(`${BACKEND_URL}/properties/all/all`, {}).then((response) => {
          setListings(response.data);
        });
      };
      getProperties();
    }
  }, [user]);

  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {listings.map((properties) => (
        <Grid item key={properties.id} xs={2} sm={4} md={4}>
          <AllPropertyListingPreview data={properties}/>
        </Grid>
      ))}
    </Grid>
  );
};

export default AllPropertyListingPreviewList;
