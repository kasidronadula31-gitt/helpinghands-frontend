import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../services/api";

// ✅ Static blood groups
const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const AddDonor = () => {

  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    bloodGroup: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // 🔒 Not logged in
  if (!isLoggedIn) {
    return (
      <div className="page-wrapper">
        <h2>Please login to continue</h2>
        <button onClick={() => navigate("/login")}>Login</button>
      </div>
    );
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ GET USER LOCATION
  const getLocation = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          resolve({
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
          });
        },
        (err) => reject(err)
      );
    });
  };

  // ✅ SUBMIT TO BACKEND
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!form.name || !form.email || !form.phone || !form.bloodGroup) {
      setError("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const location = await getLocation();

      await API.post("/donors/add", {
        name: form.name,
        email: form.email,
        phone: form.phone,
        bloodGroup: form.bloodGroup,
        latitude: location.lat,
        longitude: location.lon,
      });

      setSuccess(true);

    } catch (err) {
      console.log(err);
      setError("Failed to add donor");
    } finally {
      setLoading(false);
    }
  };

  // ✅ SUCCESS UI
  if (success) {
    return (
      <div className="page-wrapper">
        <h2>✅ You are now a donor!</h2>

        <button onClick={() => navigate("/search")}>
          View Donors
        </button>

        <button onClick={() => navigate("/")}>
          Home
        </button>
      </div>
    );
  }

  return (
    <div className="page-wrapper">

      <h1>Become a Blood Donor</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />

        <input
          type="text"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone"
          required
        />

        <select
          name="bloodGroup"
          value={form.bloodGroup}
          onChange={handleChange}
          required
        >
          <option value="">Select Blood Group</option>

          {BLOOD_GROUPS.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>

        <br /><br />

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Register"}
        </button>

      </form>

    </div>
  );
};

export default AddDonor;