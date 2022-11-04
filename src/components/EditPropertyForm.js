import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Box from "@mui/material/Box";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import { ref as databaseRef, set } from "firebase/database";
import { storage } from "../firebase";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

import { BACKEND_URL } from "../constants";
import { async } from "@firebase/util";

const UPLOAD_IMAGES_FOLDER_NAME = "images";

const EditPropertyForm = (props) => {
  const [home_name, setHomeName] = useState(props.props.home_name);
  const [image_url, setHomeImage] = useState("");
  const [home_type, setHomeType] = useState(props.props.home_type);
  const [total_occupancy, setTotalOccupancy] = useState(
    props.props.total_occupancy
  );
  const [total_bedrooms, setTotalBedrooms] = useState(
    props.props.total_bedrooms
  );
  const [total_bathrooms, setTotalBathrooms] = useState(
    props.props.total_bathrooms
  );
  const [summary, setSummary] = useState(props.props.summary);
  const [address, setAddress] = useState(props.props.address);
  const [has_tv, setHasTV] = useState(props.props.has_tv);
  const [has_kitchen, setHasKitchen] = useState(props.props.has_kitchen);
  const [has_aircon, setHasAircon] = useState(props.props.has_aircon);
  const [has_internet, setHasInternet] = useState(props.props.has_internet);
  const [price, setPrice] = useState(props.props.price);
  const navigate = useNavigate();
  console.log("property data in edit form");
  console.log(props.props.id);
  console.log(home_name);
  const [imageUpload, setImageUpload] = useState({
    imageInputValue: "",
    imageInputFile: null,
  });

  const handleChange = (event) => {
    switch (event.target.name) {
      case "home_name":
        setHomeName(event.target.value);
        break;
      case "home_type":
        setHomeType(event.target.value);
        break;
      case "total_occupancy":
        setTotalOccupancy(event.target.value);
        break;
      case "total_bedrooms":
        setTotalBedrooms(event.target.value);
        break;
      case "total_bathrooms":
        setTotalBathrooms(event.target.value);
        break;
      case "summary":
        setSummary(event.target.value);
        break;
      case "address":
        setAddress(event.target.value);
        break;
      case "has_tv":
        setHasTV(event.target.checked);
        break;
      case "has_kitchen":
        setHasKitchen(event.target.checked);
        break;
      case "has_aircon":
        setHasAircon(event.target.checked);
        break;
      case "has_internet":
        setHasInternet(event.target.checked);
        break;
      case "price":
        setPrice(event.target.value);
        break;
      default:
    }
  };

  const handleImageUpload = (event) => {
    setImageUpload({
      imageInputValue: event.target.value,
      imageInputFile: event.target.files[0],
    });
  };

  const handleSubmit = async (id) => {
    // Prevent default form redirect on submission
    // event.preventDefault();

    if (imageUpload.imageInputFile === null) {
      await axios
        .put(`${BACKEND_URL}/properties/${id}`, {
          home_name,
          home_type,
          total_occupancy,
          total_bedrooms,
          total_bathrooms,
          summary,
          address,
          has_tv,
          has_kitchen,
          has_aircon,
          has_internet,
          price,
        })
        .then(() => {
          navigate("/PropertiesMain");
        });
    } else {
      const fileRef = storageRef(
        storage,
        `${UPLOAD_IMAGES_FOLDER_NAME}/${imageUpload.imageInputFile.name}`
      );
      uploadBytes(fileRef, imageUpload.imageInputFile).then(() => {
        getDownloadURL(fileRef).then((downloadUrl) => {
          axios
            .put(`${BACKEND_URL}/properties/${id}`, {
              home_name,
              image_url: downloadUrl,
              home_type,
              total_occupancy,
              total_bedrooms,
              total_bathrooms,
              summary,
              address,
              has_tv,
              has_kitchen,
              has_aircon,
              has_internet,
              price,
            })
            .then(() => {
              setImageUpload({ imageInputValue: "", imageInputFile: null });
              navigate("/PropertiesMain");
            });
        });
      });
    }
  };

  return (
    <Box
      className="overflow-auto"
      sx={{ maxHeight: "100vh", width: "100vw", pt: "10%" }}
    >
      <Form>
        <Form.Group className="input-group mt-3 mb-3">
          <Form.Label class="input-group-text" id="inputGroup-sizing-default">
            Property Name
          </Form.Label>
          <Form.Control
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            type="text"
            name="home_name"
            value={home_name}
            onChange={handleChange}
            // placeholder={home_name}
          />
          <Form.Group className="input-group mt-3 mb-3">
            <Form.Label class="input-group-text" id="inputGroup-sizing-default">
              Image
            </Form.Label>
            <Form.Control
              type="file"
              name="price"
              value={imageUpload.imageInputValue}
              onChange={handleImageUpload}
            />
          </Form.Group>
        </Form.Group>
        <Form.Group className="input-group mt-3 mb-3">
          <Form.Label class="input-group-text" id="inputGroup-sizing-default">
            Home Type
          </Form.Label>
          <Form.Control
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            type="text"
            name="home_type"
            value={home_type}
            onChange={handleChange}
            placeholder="Apartment, Castle, Farmhouse, Houseboat etc"
          />
        </Form.Group>
        <Form.Group className="input-group mt-3 mb-3">
          <Form.Label class="input-group-text" id="inputGroup-sizing-default">
            Total Occupancy
          </Form.Label>
          <Form.Control
            type="text"
            name="total_occupancy"
            value={total_occupancy}
            onChange={handleChange}
            placeholder="No. of max occupants allowed"
          />
        </Form.Group>
        <Form.Group className="input-group mt-3 mb-3 form-inline">
          <Form.Label
            className="input-group-text"
            id="inputGroup-sizing-default"
          >
            Total Bedrooms
          </Form.Label>
          <Form.Control
            type="text"
            name="total_bedrooms"
            value={total_bedrooms}
            onChange={handleChange}
            placeholder="No. of bedrooms"
          />
          <Form.Label class="input-group-text" id="inputGroup-sizing-default">
            Total Bathrooms
          </Form.Label>
          <Form.Control
            type="text"
            name="total_bathrooms"
            value={total_bathrooms}
            onChange={handleChange}
            placeholder="No. of bathrooms"
          />
        </Form.Group>
        <Form.Group className="input-group mt-3 mb-3">
          <Form.Label
            className="input-group-text"
            id="inputGroup-sizing-default"
          >
            Summary
          </Form.Label>
          <Form.Control
            type="text"
            name="summary"
            value={summary}
            onChange={handleChange}
            placeholder="Short description here"
          />
        </Form.Group>
        <Form.Group className="input-group mt-3 mb-3">
          <Form.Label
            className="input-group-text"
            id="inputGroup-sizing-default"
          >
            Address
          </Form.Label>
          <Form.Control
            type="text"
            name="address"
            value={address}
            onChange={handleChange}
            placeholder="Enter address here"
          />
        </Form.Group>
        <Form className="input-group mt-3 mb-3">
          {["checkbox"].map((type) => (
            <div key={`inline-${type}`} className="mb-3">
              <Form.Check
                inline
                label="Has TV"
                name="has_tv"
                value={has_tv}
                checked={has_tv}
                type={"checkbox"}
                onChange={handleChange}
              />
              <Form.Check
                inline
                label="Has kitchen"
                value={has_kitchen}
                checked={has_kitchen}
                name="has_kitchen"
                type={"checkbox"}
                onChange={handleChange}
              />
              <Form.Check
                inline
                label="Has Aircon"
                value={has_aircon}
                checked={has_aircon}
                name="has_aircon"
                type={"checkbox"}
                onChange={handleChange}
              />
              <Form.Check
                inline
                label="Has Internet"
                value={has_internet}
                checked={has_internet}
                name="has_internet"
                type={"checkbox"}
                onChange={handleChange}
              />
            </div>
          ))}
        </Form>
        <Form.Group className="input-group mt-3 mb-3">
          <Form.Label
            className="input-group-text"
            id="inputGroup-sizing-default"
          >
            Price ($)
          </Form.Label>
          <Form.Control
            type="text"
            name="price"
            value={price}
            onChange={handleChange}
            placeholder="2000"
          />
        </Form.Group>

        <Button variant="primary" onClick={() => handleSubmit(props.props.id)}>
          Save Changes
        </Button>
      </Form>
    </Box>
  );
};

export default EditPropertyForm;
