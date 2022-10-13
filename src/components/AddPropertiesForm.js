import React, { useState, useRef } from "react";
//import { push, ref as databaseRef, set } from "firebase/database";
// import { initializeApp } from "firebase/app";
// import { getDatabase} from "firebase/database";
// import { getStorage, ref as storageRef } from "firebase/storage";
// import { database, storage} from "../firebase";

function Form(props) {
  const nameRef = useRef("");
  const licenseplateRef = useRef("");
  const dateRef = useRef("");
  const timeRef = useRef("");
  const amountRef = useRef("");

  const [inputs, setInputs] = useState({
    name: "",
    licenseplate: "",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
    event.preventDefault();
  };

  const handleSubmit = (event) => {
    console.log("Submit button click formjs");
    event.preventDefault();

    const property = {
      name: nameRef.current.valueOf,
      licenseplate: licenseplateRef.current.valueOf,
      date: dateRef.current.valueOf,
      time: timeRef.current.valueOf,
      amount: amountRef.current.valueOf,
    };

    props.onAddTicket(property);
  };

  return (
    <div>
      <hr class="hr-text" data-content="FORM" />
      <h5 class="mt-3 mb-3">Enter the details of your property:</h5>
      <form onSubmit={handleSubmit}>
        <div class="input-group mt-3 mb-3">
          <span class="input-group-text" id="inputGroup-sizing-default">
            Name
          </span>
          <input
            type="text"
            id="name"
            ref={nameRef}
            class="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
          />
        </div>
        <div class="input-group mt-3 mb-3">
          <span class="input-group-text" id="inputGroup-sizing-default">
            License plate
          </span>
          <input
            type="text"
            id="licenseplate"
            ref={licenseplateRef}
            class="form-control"
            name="licenseplate"
            value={inputs.licenseplate || ""}
            onChange={handleChange}
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
          />
        </div>
        <div class="mt-3 mb-3">
          <label for="date">Date</label>
          <input
            id="date"
            ref={dateRef}
            class="form-control"
            name="date"
            value={inputs.date || ""}
            onChange={handleChange}
            type="date"
          />
          <span id="startDateSelected"></span>
        </div>
        <div class="mt-3 mb-3">
          <label for="time">Time</label>
          <input
            id="time"
            ref={timeRef}
            class="form-control"
            name="time"
            value={inputs.time || ""}
            onChange={handleChange}
            type="time"
          />
          <span id="startDateSelected"></span>
        </div>
        <div class="input-group mt-3 mb-3">
          <span class="input-group-text" id="inputGroup-sizing-default">
            Amount
          </span>
          <input
            type="text"
            id="amount"
            ref={amountRef}
            class="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
          />
        </div>
        <button type="submit" class="btn btn-dark btn-lg mb-5">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;
