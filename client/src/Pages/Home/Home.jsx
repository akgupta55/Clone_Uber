import React from "react";
import "./Home.css";
import img1 from "../../assets/logo.jpg";
import Button from "@mui/material/Button";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
  };

  const goToSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="home">
      <h1 className="homeHeading">EXPENSES TRACKER APP</h1>
      <img src={img1} alt="" />
      <div className="btns">
        <Button
          variant="contained"
          size="large"
          endIcon={<AppRegistrationIcon />}
          onClick={goToSignup}
        >
          SIGN-UP
        </Button>
        <Button
          variant="contained"
          size="large"
          endIcon={<LockOpenIcon />}
          onClick={goToLogin}
        >
          LOGIN
        </Button>
      </div>
    </div>
  );
};

export default Home;
