import React, { useState } from "react";
import { Link } from "react-router-dom";
// ----- imports from Mui -----
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
// import axios from "axios";

const PropertyListingPreview = (props) => {
  console.log(props);
  console.log(props.data.id);

  return (
    <Card sx={{ maxWidth: 345, height: 350 }}>
      <Link to={`/properties/${props.data.id}`} key={props.data.id}>
        <CardMedia
          component="img"
          height="140"
          image={props.data.image_url}
          alt="property image"
        />
      </Link>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.data.home_name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.data.summary}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          component={Link}
          to={`/properties/${props.data.id}`}
        >
          More Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default PropertyListingPreview;
