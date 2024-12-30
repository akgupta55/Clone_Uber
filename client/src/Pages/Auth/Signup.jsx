import React from "react";
import {
  Box,
  Button,
  Card,
  FormControl,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import api from "../../Services/api";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [registerData, setRegisterData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/users/register", {
        fullname: {
          firstname: registerData.firstname,
          lastname: registerData.lastname,
        },
        email: registerData.email,
        password: registerData.password,
      });
      navigate("/login");
      console.log("Signup successful:", response.data);
    } catch (err) {
      setErrorMsg(
        err.response?.data.error || "Signup failed. Please try again."
      );
      console.log("Signup failed:", err.response?.data);
    }
  };

  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      color="error"
    >
      <Card
        variant="outlined"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 4,
          padding: 4,
          flexDirection: "column",
          width: "50%",
        }}
      >
        <Typography
          component="h1"
          variant="h4"
          sx={{
            display: "flex",
            alignItems: "center",
            textAlign: "center",
            fontSize: "clamp(2rem, 10vw, 2.15rem)",
          }}
        >
          Sign Up
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            marginTop: 2,
          }}
        >
          <FormControl sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <FormLabel>First Name</FormLabel>
              <TextField
                name="firstname"
                onChange={handleChange}
                required
                fullWidth
                id="firstname"
                placeholder="First Name"
              />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <FormLabel>Last Name</FormLabel>
              <TextField
                name="lastname"
                onChange={handleChange}
                required
                fullWidth
                id="lastname"
                placeholder="Last Name"
              />
            </Box>
          </FormControl>
          <FormControl
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <FormLabel>Email</FormLabel>
            <TextField
              name="email"
              type="email"
              onChange={handleChange}
              required
              fullWidth
              id="email"
              placeholder="Email"
            />
          </FormControl>
          <FormControl
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <FormLabel>Password</FormLabel>
            <TextField
              name="password"
              type="password"
              onChange={handleChange}
              required
              fullWidth
              id="password"
            />
            {errorMsg && (
              <Typography color="error" variant="body2">
                {errorMsg}
              </Typography>
            )}
          </FormControl>
          <Button type="submit" fullWidth variant="contained" size="large">
            Register
          </Button>
        </Box>
      </Card>
    </Box>
  );
};
export default Signup;
