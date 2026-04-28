import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const Home = () => {
  const [bloodGroup, setBloodGroup] = useState("");
  const [distance, setDistance] = useState("");

  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const handleSearch = (e) => {
    e.preventDefault();

    if (!bloodGroup || !distance || distance <= 0) {
      alert("Please enter valid inputs");
      return;
    }

    navigate(
      `/search?bloodGroup=${encodeURIComponent(bloodGroup)}&distance=${distance}`
    );
  };

  return (
    <div>

      <section className="hero-section">
        <span style={{ fontSize: "60px" }}>🩸</span>
        <h1>Welcome to Helping Hands !</h1>
        <p>Connect with blood donors near you instantly.</p>
      </section>

      <div className="search-card">
        <div>
          <h3>"The blood you donate gives someone another chance at life."</h3>
          </div>
      </div>
      
      <div className="stats-bar" style={{ marginTop:"100px" }}>
        <div><h2>100+</h2><p>Donors</p></div>
        <div><h2 style={{paddingLeft:"40px"}}>8</h2><p>Blood Groups</p></div>
        <div><h2>24/7</h2><p>Available</p></div>
        <div><h2>Free</h2><p>No Cost</p></div>
      </div>


    </div>
  );
};

export default Home;