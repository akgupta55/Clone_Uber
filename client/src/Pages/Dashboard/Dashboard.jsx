import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Card, CircularProgress, Typography } from "@mui/material";
import api from "../../Services/api";

const Dashboard = () => {
  const [rows, setRows] = useState([]); // To store API data as rows
  const [loading, setLoading] = useState(true); // To show loading spinner

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstname", headerName: "First Name", width: 350 },
    { field: "lastname", headerName: "Last Name", width: 350 },
    { field: "email", headerName: "Email", width: 400 },
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/users/getuserdetails");
        // console.log("Data fetched:", response.data);
        const apiRows = response.data.map((item, index) => ({
          id: item.id || index + 1, // Ensure unique ID
          firstname: item.firstname,
          lastname: item.lastname,
          email: item.email,
        }));
        // console.log("Rows:", apiRows);

        setRows(apiRows);
        setLoading(false);
      } catch (err) {
        console.log("Error fetching data:", err.response?.data || err.message);
      }
    };
    fetchUsers();
  }, []);

  return (
    <Box>
      <Card variant="outlined" sx={{ padding: 2, margin: 2 }}>
        <Typography component="h1" variant="h4" sx={{ textAlign: "center" }}>
          {rows.length > 0
            ? `${rows[0].firstname} ${rows[0].lastname}`
            : "Loading..."}
        </Typography>
      </Card>
      <Card variant="outlined" sx={{ padding: 2, margin: 2, height: "100%" }}>
        <Card sx={{ height: 400, width: "100%", marginTop: 2 }}>
          {loading ? (
            // Show spinner while loading data
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            // Render DataGrid with rows and columns
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              //   checkboxSelection
            />
          )}
        </Card>
      </Card>
    </Box>
  );
};

export default Dashboard;
