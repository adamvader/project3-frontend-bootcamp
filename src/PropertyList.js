import React from "react";

import Property from "./Property";

const PropertyList = (props) => {
  // function deleteTicket(id) {
  //   setTicket(prevNotes => {
  //     return prevNotes.filter((noteItem, index) => {
  //       return index !== id;
  //     });
  //   });
  // }

  return (
    <ul className="list-group list-group-numbered mb-3">
      {props.tickets.map((property) => (
        <Property
          key={property.id}
          name={property.name}
          licenseplate={property.licenseplate}
          date={property.date}
          time={property.time}
          amount={property.amount}
          // onDelete={deleteTicket}
        />
      ))}
    </ul>
  );
};

export default PropertyList;
