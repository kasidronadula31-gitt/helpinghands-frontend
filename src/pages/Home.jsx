import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
// import BloodMarquee from "../components/BloodMarquee";

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

      {/* HERO */}
      <section className="hero-section">
        <span style={{ fontSize: "60px" }}>🩸</span>
        <h1>Welcome to Helping Hands !</h1>
        <p>Connect with blood donors near you instantly.</p>
      </section>

      {/* SEARCH */}
      <div style={{ padding: "0 20px" }}>
        <div className="search-card">

          <h3 style={{ paddingLeft: "30px" }}>"The blood you donate gives someone another chance at life."</h3>
        </div>
      </div>
      {/* <BloodMarquee /> */}
      
      {/* STATS */}
      <div className="stats-bar" style={{ marginTop:"70px" }}>
        <div><h2>100+</h2><p>Donors</p></div>
        <div><h2>8</h2><p>Blood Groups</p></div>
        <div><h2>24/7</h2><p>Available</p></div>
        <div><h2>Free</h2><p>No Cost</p></div>
      </div>


    </div>
  );
};

export default Home;