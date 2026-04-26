// import {Container,TextField,Button,Typography} from "@mui/material";
// import {useState} from "react";
// import API from "../services/api";

// function Register(){

// const[name,setName]=useState("");
// const[email,setEmail]=useState("");
// const[password,setPassword]=useState("");

// const register = async () => {

// try{

// await API.post("/auth/register",{
// name,
// email,
// password
// });

// alert("Registered Successfully");

// }catch(error){

// console.log(error);

// alert("Registration Failed");

// }

// }

// return(

// <Container maxWidth="sm" sx={{mt:5}}>

// <Typography variant="h4">Register</Typography>

// <TextField label="Name" fullWidth margin="normal"
// onChange={(e)=>setName(e.target.value)}
// />

// <TextField label="Email" fullWidth margin="normal"
// onChange={(e)=>setEmail(e.target.value)}
// />

// <TextField label="Password" type="password"
// fullWidth margin="normal"
// onChange={(e)=>setPassword(e.target.value)}
// />

// <Button variant="contained" fullWidth sx={{mt:2}}
// onClick={register}
// >
// Register
// </Button>

// </Container>

// )

// }

// export default Register;