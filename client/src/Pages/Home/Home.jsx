import React from "react";
import "./Home.css";
import img1 from "../../assets/travel.jpeg";

const Home = () => {
  return (
    <div className="home">
      <h1 className="homeHeading">NANO TRAVELS</h1>
      <img src={img1} alt="" />
      <div className="btns">
        <button className="signUp">SIGN-UP</button>
        <button className="login">LOGIN</button>
      </div>
    </div>
  );
};

export default Home;
