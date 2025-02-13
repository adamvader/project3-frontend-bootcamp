import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Popover from "@mui/material/Popover";
import EditPropertyForm from "./EditPropertyForm.js";

import { BACKEND_URL } from "../constants.js";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used

const PropertyListing = () => {
  const [propertyName, setpropertyName] = useState();
  const [property, setProperty] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // If there is a listingId, retrieve the listing data
    if (propertyName) {
      axios
        .get(`${BACKEND_URL}/properties/${propertyName}`)
        .then((response) => {
          setProperty(response.data);
        });
    }
    // Only run this effect on change to listingId
  }, [propertyName]);

  // Update listing ID in state if needed to trigger data retrieval
  const params = useParams();
  if (propertyName !== params.propertyName) {
    setpropertyName(params.propertyName);
  }
  console.log(property);

  // Store a new JSX element for each property in listing details
  // const propertyDetails = [];
  // if (property) {
  //   for (const key in property) {
  //     propertyDetails.push(
  //       <Card.Text key={key.id}>{`${key}: ${property[key]}`}</Card.Text>
  //     );
  //   }
  // }

  const propertyFacilities = [];
  if (property.has_tv === true) {
    propertyFacilities.push(
      <p>
        <FontAwesomeIcon
          key={property.id}
          icon={icon({ name: "tv", style: "solid" })}
        />{" "}
        TV
      </p>
    );
  }
  if (property.has_kitchen === true) {
    propertyFacilities.push(
      <p>
        <FontAwesomeIcon
          key={property.id}
          icon={icon({ name: "kitchen-set", style: "solid" })}
        />{" "}
        Kitchen
      </p>
    );
  }
  if (property.has_aircon === true) {
    propertyFacilities.push(
      <p>
        <FontAwesomeIcon
          key={property.id}
          icon={icon({ name: "temperature-arrow-down", style: "solid" })}
        />{" "}
        Air-con
      </p>
    );
  }
  if (property.has_internet === true) {
    propertyFacilities.push(
      <p>
        <FontAwesomeIcon
          key={property.id}
          icon={icon({ name: "wifi", style: "solid" })}
        />{" "}
        Wifi
      </p>
    );
  }

  // Functions for Edit button Popover
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  // Function for Delete Button
  const handleDelete = async (id, home_name) => {
    await axios.delete(`${BACKEND_URL}/properties/${id}`);
    console.log(`${home_name} successfully deleted.`);
    navigate("/PropertiesMain");
  };

  return (
    property && (
      <Card className="overflow-auto" sx={{ maxHeight: "100vh", pt: "10%" }}>
        <Card.Body>
          <img
            src={`${property.image_url}`}
            // srcSet={`${property.image_url}?w=248&fit=crop&auto=format&dpr=2`}
            width="50%"
            alt={property.home_name}
            loading="lazy"
          />
          <h1>{property.home_name}</h1>
          <p>Host: {property?.user?.name}</p>
          <p>
            {property.total_occupancy} guests · {property.total_bedrooms}{" "}
            bedrooms · {property.total_bathrooms} bath · {property.price} yen
            per night
          </p>
          <hr
            style={{
              background: "#f0f0f0",
              float: "center",
            }}
          />
          <h5>{property.summary}</h5>
          <p>{property.address}</p>
          <hr
            style={{
              background: "#f0f0f0",
              float: "center",
            }}
          />
          <h3>What this place offers</h3>
          {propertyFacilities}
        </Card.Body>
        <Button variant="primary" onClick={handleClick}>
          <EditIcon sx={{ mr: 1 }} />
          Edit
        </Button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
        >
          <EditPropertyForm props={property} />
        </Popover>
        <Button
          variant="danger"
          onClick={() => handleDelete(property.id, property.home_name)}
        >
          <DeleteIcon sx={{ mr: 1 }} />
          Delete
        </Button>
      </Card>
    )
  );
};

export default PropertyListing;
