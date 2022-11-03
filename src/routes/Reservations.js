import axios from "axios";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { useAuth0 } from "@auth0/auth0-react";

// ----- Constant Variable -----
const BACKEND_URL = "http://localhost:8080";

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const { getAccessTokenSilently, user } = useAuth0();

  useEffect(() => {
    if (user) {
      const getReservations = async () => {
        const accessToken = await getAccessTokenSilently({
          audience: "https://stayhere/api",
          scope: "read:current_user",
        });
        console.log(user);
        axios
          .get(`${BACKEND_URL}/Reservations`, {
            params: {
              ownerEmail: user.email,
            },
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((response) => {
            setReservations(response.data);
          });
      };

      getReservations();
    }
  }, [user]);

  // useEffect(() => {
  //   axios.get(`${BACKEND_URL}/Reservations`).then((response) => {
  //     setReservations(response.data);
  //   });
  // }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "customer_name",
      headerName: "Visitor Name",
      width: 150,
      valueGetter: (params) => {
        return params.row.customer.name;
      },
    },
    {
      field: "properties_home_name",
      headerName: "Home Name",
      width: 150,
      valueGetter: (params) => {
        return params.row.properties.home_name;
      },
    },
    {
      field: "start_date",
      headerName: "Check In",
      type: "date",
      width: 150,
      editable: true,
    },
    {
      field: "end_date",
      headerName: "Check Out",
      type: "date",
      width: 150,
      editable: true,
    },
  ];

  const rows = [...reservations];

  return (
    <Box
      sx={{
        mt: 18,
        height: "60vh",
        width: "70vw",
        backgroundColor: "#FFFFFF",
        borderRadius: 1,
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        // checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
};

export default Reservations;
