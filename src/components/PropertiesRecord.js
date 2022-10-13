import { React, useState, useCallback } from "react";
import PropertyList from "../PropertyList";

function PropertiesRecord() {
  // console.log("TicketsRecord")
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPropertiesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://parking-app-ba14d-default-rtdb.asia-southeast1.firebasedatabase.app/tickets.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      const loadedProperties = [];

      for (const key in data) {
        loadedProperties.push({
          id: key,
          name: data[key].name,
          licenseplate: data[key].licenseplate,
          date: data[key].date,
          time: data[key].time,
          amount: data[key].amount,
        });
      }

      setProperties(loadedProperties);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  let content = "";

  if (properties.length > 0) {
    content = <PropertyList properties={properties} />;
  } else if (properties.length === 0) {
    content = <p></p>;
  }
  //WHY DOESNT THIS WORK???

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <div>
      <button class="btn btn-dark btn-lg mb-1" onClick={fetchPropertiesHandler}>
        See Properties
      </button>
      {content}
    </div>
  );
}

export default PropertiesRecord;
