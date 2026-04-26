// import {Container,TextField,Button,Typography} from "@mui/material";
// import {useState} from "react";
// import {useNavigate} from "react-router-dom";
// import API from "../services/api";

// function Login(){

// const navigate=useNavigate();

// const[email,setEmail]=useState("");
// const[password,setPassword]=useState("");
// const login = async () => {

// try{

// const res = await API.post("/auth/login",{
// email,
// password
// });

// console.log(res.data);

// navigate("/dashboard");

// }catch(error){

// console.log(error);

// alert("Login Failed");

// }

// }

// return(

// <Container maxWidth="sm" sx={{mt:5}}>

// <Typography variant="h4">Login</Typography>

// <TextField
// label="Email"
// fullWidth
// margin="normal"
// onChange={(e)=>setEmail(e.target.value)}
// />

// <TextField
// label="Password"
// type="password"
// fullWidth
// margin="normal"
// onChange={(e)=>setPassword(e.target.value)}
// />

// <Button
// variant="contained"
// fullWidth
// sx={{mt:2}}
// onClick={login}
// >
// Login
// </Button>

// </Container>

// )

// }

// export default Login;