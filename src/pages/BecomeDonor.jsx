import { Container, TextField, Button, Typography, MenuItem } from "@mui/material";
import { useState } from "react";
import API from "../services/api";

// ✅ Fixed blood groups
const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

function BecomeDonor(){

  const [name,setName] = useState("");
  const [bloodGroup,setBloodGroup] = useState("");
  const [phone,setPhone] = useState("");
  const [email,setEmail] = useState("");

  const [loading,setLoading] = useState(false);

  const registerDonor = async () => {

    // ✅ validation
    if(!name || !bloodGroup || !phone || !email){
      alert("Please fill all fields");
      return;
    }

    try{
      setLoading(true);

      navigator.geolocation.getCurrentPosition(
        async(position)=>{

          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          await API.post("/donors/add",{
            name,
            bloodGroup,
            phone,
            email,
            latitude: lat,
            longitude: lon
          });

          alert("✅ Donor added successfully");

          // clear form
          setName("");
          setBloodGroup("");
          setPhone("");
          setEmail("");

          setLoading(false);

        },
        (error)=>{
          console.log(error);
          alert("Location permission denied");
          setLoading(false);
        }
      );

    }catch(err){
      console.log(err);
      alert("Error adding donor");
      setLoading(false);
    }
  };

  return(
    <Container maxWidth="sm" sx={{ mt:5 }}>

      <Typography variant="h4" gutterBottom>
        Become a Donor
      </Typography>

      <TextField
        label="Name"
        fullWidth
        margin="normal"
        value={name}
        onChange={(e)=>setName(e.target.value)}
      />

      {/* ✅ Dropdown instead of text */}
      <TextField
        select
        label="Blood Group"
        fullWidth
        margin="normal"
        value={bloodGroup}
        onChange={(e)=>setBloodGroup(e.target.value)}
      >
        {BLOOD_GROUPS.map((g)=>(
          <MenuItem key={g} value={g}>{g}</MenuItem>
        ))}
      </TextField>

      <TextField
        label="Phone"
        fullWidth
        margin="normal"
        value={phone}
        onChange={(e)=>setPhone(e.target.value)}
      />

      <TextField
        label="Email"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
      />

      <Button
        variant="contained"
        fullWidth
        sx={{ mt:2 }}
        onClick={registerDonor}
        disabled={loading}
      >
        {loading ? "Submitting..." : "Register as Donor"}
      </Button>

    </Container>
  );
}

export default BecomeDonor;