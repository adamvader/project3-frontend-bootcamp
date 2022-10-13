// import "../App.css";
// import "../index.css";
// import { useEffect, useState } from "react";
import * as React from "react";
import * as ReactDOM from "react-dom";

import { Col } from "react-bootstrap";
import Header from "../components/Header";
import Form from "../components/AddPropertiesForm";
import PropertiesRecord from "../components/PropertiesRecord";

const PropertiesPage = () => {

  async function addPropertyHandler(property) {
    console.log("Submit button click appjs");
    const response = await fetch(
      "https://parking-app-ba14d-default-rtdb.asia-southeast1.firebasedatabase.app/tickets.json",
      {
        method: "POST",
        body: JSON.stringify(property),
      }
    );
    const data = await response.json();
    console.log(data);
  }

  return (
    <div>
      <Header />
      <div class="container">
        <div class="row">
          <Col xs={12} sm={12} md={12}>
            <PropertiesRecord />
            <Form onAddProperty={addPropertyHandler} />
          </Col>
        </div>
      </div>
    </div>
  );
};

export default PropertiesPage;
