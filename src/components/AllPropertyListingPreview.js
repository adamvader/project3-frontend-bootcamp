import React from "react";
import { Link } from "react-router-dom";
// ----- imports from Mui -----
// import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
// import Button from "@mui/material/Button";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used

const AllPropertyListingPreview = (props) => {
  const propertyFacilities = [];
  if (props.data.has_tv === true) {
    propertyFacilities.push(
      <p>
        <FontAwesomeIcon
          key={props.data.id}
          icon={icon({ name: "tv", style: "solid" })}
        />{" "}
        TV
      </p>
    );
  }
  if (props.data.has_kitchen === true) {
    propertyFacilities.push(
      <p>
        <FontAwesomeIcon
          key={props.data.id}
          icon={icon({ name: "kitchen-set", style: "solid" })}
        />{" "}
        Kitchen
      </p>
    );
  }
  if (props.data.has_aircon === true) {
    propertyFacilities.push(
      <p>
        <FontAwesomeIcon
          key={props.data.id}
          icon={icon({ name: "temperature-arrow-down", style: "solid" })}
        />{" "}
        Air-con
      </p>
    );
  }
  if (props.data.has_internet === true) {
    propertyFacilities.push(
      <p>
        <FontAwesomeIcon
          key={props.data.id}
          icon={icon({ name: "wifi", style: "solid" })}
        />{" "}
        Wifi
      </p>
    );
  }
  console.log(props.data);

  return (
    <Card style={{ maxWidth: 345, height: 1000 }}>
      <Card.Body>
        <img
          src={`${props.data.image_url}`}
          // srcSet={`${property.image_url}?w=248&fit=crop&auto=format&dpr=2`}
          width="100%"
          alt={props.data.home_name}
        />
        <h1>{props.data.home_name}</h1>
        <p>Host: {props.data?.user?.name}</p>
        <p>Contact: {props.data?.user?.email}</p>
        <p>
          {props.data.total_occupancy} guests · {props.data.total_bedrooms}{" "}
          bedrooms · {props.data.total_bathrooms} bath · {props.data.price} yen
          per night
        </p>
        <hr
          style={{
            background: "#f0f0f0",
            float: "center",
          }}
        />
        <h5>{props.data.summary}</h5>
        <p>{props.data.address}</p>
        <hr
          style={{
            background: "#f0f0f0",
            float: "center",
          }}
        />
        {propertyFacilities.length !== 0 ? (
          <h3>What this place offers</h3>
        ) : (
          <h3>Just a simple room</h3>
        )}
        {propertyFacilities}
      </Card.Body>
    </Card>
  );
};

export default AllPropertyListingPreview;
