import React from "react";

//mport classes from "./App.css";

function Property(props) {
  function handleClick() {
    props.onDelete(props.id);
  }

  return (
    <div className="note">
      <h4>Name: {props.name}</h4>
      <p>License Plate: {props.licenseplate}</p>
      <p>Date: {props.date}</p>
      <p>Time: {props.time}</p>
      <p>Amount: ${props.amount}</p>
      <button onClick={handleClick}>DELETE</button>
    </div>
  );
}

export default Property;
