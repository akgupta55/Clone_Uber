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
import { useNavigate } from "react-router-dom";
import api from "../../Services/api";

const Login = () => {
  const navigate = useNavigate();

  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/users/login", {
        email: registerData.email,
        password: registerData.password,
      });
      navigate("/dashboard");
      console.log("Login successful:", response.data);
    } catch (err) {
      console.log("Login failed:", err.response?.data || err.message);
    }
  };

  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
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
          Login
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
          <FormControl
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <FormLabel>Email</FormLabel>
            <TextField
              type="email"
              onChange={handleChange}
              name="email"
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
              type="password"
              onChange={handleChange}
              name="password"
              required
              fullWidth
              id="password"
              placeholder="Password"
            />
          </FormControl>
          <Button type="submit" fullWidth variant="contained" size="large">
            Submit
          </Button>
        </Box>
      </Card>
    </Box>
  );
};
export default Login;
