import React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Container from "@mui/material/Container";
// import { Form } from "react-router-dom";

import PropertyListingPreviewList from "../components/PropertyListingPreviewList";

export default function PropertiesMain() {
  return (
    <Container
      className="overflow-auto"
      sx={{ pt: "13%", height: "90vh", width: "100vw" }}
    >
      
        <PropertyListingPreviewList />
      
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
    </Container>
  );
}
