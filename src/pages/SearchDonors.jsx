import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import API from "../services/api";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const SearchDonors = () => {

  const [searchParams, setSearchParams] = useSearchParams();

  const [bloodGroup, setBloodGroup] = useState("");
  const [distance, setDistance] = useState("");

  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const getLocation = () =>
    new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (pos) =>
          resolve({
            lat: pos.coords.latitude,
            lon: pos.coords.longitude
          }),
        () => reject("Location permission denied")
      );
    });

  const runSearch = async (bg, dist) => {

    if (!bg || !dist || dist <= 0) {
      alert("Enter valid details");
      return;
    }

    try {
      setLoading(true);

      const location = await getLocation();

      const res = await API.get(
        `/donors/nearby?lat=${location.lat}&lon=${location.lon}&blood=${encodeURIComponent(bg)}&range=${dist}`
      );

      setDonors(res.data);
      setSearched(true);

    } catch (err) {
      console.log(err);
      alert(typeof err === "string" ? err : "Error fetching donors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const bg = searchParams.get("bloodGroup");
    const dist = searchParams.get("distance");

    if (bg && dist) {
      setBloodGroup(bg);
      setDistance(dist);
      runSearch(bg, Number(dist));
    }
  }, [searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();

    setSearchParams({ bloodGroup, distance });
    runSearch(bloodGroup, Number(distance));
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "30px",
      minHeight: "100vh",
      background: "#fefcfb"
    }}>

      <div style={{
        width: "400px",
        background: "#fff",
        padding: "25px",
        borderRadius: "12px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
      }}>

        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Find Blood Donor
        </h2>

        <form
          onSubmit={handleSearch}
          style={{ display: "flex", flexDirection: "column", gap: "15px" }}
        >

          <select
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            style={{
              padding: "12px",
              borderRadius: "6px",
              border: "1px solid #ccc"
            }}
          >
            <option value="">Select Blood Group</option>
            <option value="ALL">Any</option>

            {BLOOD_GROUPS.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Enter Distance (KM)"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            style={{
              padding: "12px",
              borderRadius: "6px",
              border: "1px solid #ccc"
            }}
          />

          <button
            disabled={loading}
            style={{
              padding: "12px",
              background: "#e53935",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            {loading ? "Searching..." : "Search Donors"}
          </button>

        </form>

        {loading && (
          <p style={{ textAlign: "center", marginTop: "10px" }}>
            Loading...
          </p>
        )}

        {searched && donors.length === 0 && (
          <p style={{ textAlign: "center", marginTop: "10px" }}>
            No donors found
          </p>
        )}

      </div>

      {donors.length > 0 && (
        <div style={{
          marginTop: "30px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          width: "100%",
          maxWidth: "900px"
        }}>

          {donors.map((donor, index) => (
            <div key={index} style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
            }}>
              <h3>{donor.name}</h3>
              <p><strong>{donor.bloodGroup}</strong></p>
              <p>{donor.distance.toFixed(2)} km away</p>

              <p>📞 {donor.phone}</p>
              <p>✉️ {donor.email}</p>
            </div>
          ))}

        </div>
      )}

    </div>
  );
};

export default SearchDonors;