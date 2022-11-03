import React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
// import { Form } from "react-router-dom";

import PropertyListingPreviewList from "../components/PropertyListingPreviewList";

export default function PropertiesMain() {
  return (
    <Box>
      <Box sx={{ flexGrow: 1, pt: "13%", width: "70vw" }}>
        <PropertyListingPreviewList />
      </Box>
      <Fab
        variant="extended"
        color="primary"
        aria-label="add"
        sx={{
          position: "absolute",
          bottom: "10%",
          right: "10%",
          float: "right",
        }}
        component={Link}
        to="/PropertiesListing/new"
      >
        <AddIcon sx={{ mr: 1 }} />
        Add New Listing
      </Fab>
    </Box>
  );
}
