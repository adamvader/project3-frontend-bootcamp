import React, { useState, useRef } from "react";
import { push, ref as databaseRef, set } from "firebase/database";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage, ref as storageRef } from "firebase/storage";
import { database, storage } from "../firebase";

const PROFILE_FOLDER_NAME = "profiles";

function ProfileForm(props) {
  const nameRef = useRef("");
  const countryRef = useRef("");
  const summaryRef = useRef("");

  const [inputs, setInputs] = useState({
    name: "",
    country: "",
    summary: "",
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

    const profile = {
      name: nameRef.current.value,
      country: countryRef.current.value,
      summary:summaryRef.current.value,
    };
    props.onAddProfile(profile);
  };

  return (
    <div>
      <hr class="hr-text" data-content="FORM" />
      <h5 class="mt-3 mb-3">Enter the details of your profile:</h5>
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
            Country
          </span>
          <input
            type="text"
            id="country"
            ref={countryRef}
            class="form-control"
            // name="country"
            // value={inputs.country || ""}
            // onChange={handleChange}
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
          />
        </div>
        <div class="input-group mt-3 mb-3">
          <span class="input-group-text" id="inputGroup-sizing-default">
            Summary of yourself
          </span>
          <input
            type="text"
            id="summary"
            ref={summaryRef}
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

export default ProfileForm;
