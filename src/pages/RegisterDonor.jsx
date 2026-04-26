import React, { useState } from "react";

const RegisterDonor = () => {
  const [form, setForm] = useState({
    name: "",
    bloodGroup: "",
    phone: "",
    email: "",
    latitude: "",
    longitude: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form); // later connect API
    alert("Donor registered!");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Register Donor</h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "300px" }}>
        <input name="name" placeholder="Name" onChange={handleChange} />
        <input name="bloodGroup" placeholder="Blood Group" onChange={handleChange} />
        <input name="phone" placeholder="Phone" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="latitude" placeholder="Latitude" onChange={handleChange} />
        <input name="longitude" placeholder="Longitude" onChange={handleChange} />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterDonor;