import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Profile = () => {

  const { user, logout, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  if (!isLoggedIn || !user) {
    return (
      <div className="page-wrapper">
        <div className="center-box">
          <h2>Not Logged In</h2>
          <p>Please login to view your profile.</p>

          <button onClick={() => navigate("/login")}>
            Login
          </button>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="page-wrapper">

      <h1>My Profile</h1>

      <div className="profile-card">

        <div className="profile-header">
          <div style={{ fontSize: "50px" }}>👤</div>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>

        <div className="profile-body">

          <div className="profile-row">
            <strong>Name:</strong> {user.name}
          </div>

          <div className="profile-row">
            <strong>Email:</strong> {user.email}
          </div>

          {user.phone && (
            <div className="profile-row">
              <strong>Phone:</strong> {user.phone}
            </div>
          )}

          {user.bloodGroup && (
            <div className="profile-row">
              <strong>Blood Group:</strong> {user.bloodGroup}
            </div>
          )}

        </div>

        <div style={{ marginTop: "20px" }}>

          <button
            onClick={() => navigate("/become-donor")}
            className="btn btn-primary"
          >
            Become a Donor
          </button>

          <button
            onClick={handleLogout}
            className="btn btn-outline"
            style={{ marginLeft: "10px" }}
          >
            Logout
          </button>

        </div>

      </div>

    </div>
  );
};

export default Profile;