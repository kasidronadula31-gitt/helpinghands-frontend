import {Container,TextField,Button,Typography} from "@mui/material";
import {useState} from "react";

import API from "../services/api";
// import DonorCard from "../components/DonorCard";
// import GoogleMapView from "../components/GoogleMapView";

import {getUserLocation} from "../utils/location";
import {calculateDistance} from "../utils/distance";

function Dashboard(){

const[blood,setBlood]=useState("");
const[range,setRange]=useState("");

const[donors,setDonors]=useState([]);
const[userLocation,setUserLocation]=useState(null);

const search=async()=>{

const location=await getUserLocation();

setUserLocation(location);

const res=await API.get(

`/donors/nearby?lat=${location.lat}&lon=${location.lon}&blood=${blood}&range=${range}`

);

setDonors(res.data);

}

return(

<Container sx={{mt:5}}>

<Typography variant="h4">
Find Blood Donor
</Typography>

<TextField label="Blood Group" fullWidth margin="normal"
onChange={(e)=>setBlood(e.target.value)}
/>

<TextField label="Distance (KM)" fullWidth margin="normal"
onChange={(e)=>setRange(e.target.value)}
/>

<Button variant="contained" sx={{mt:2}} onClick={search}>
Search Donor
</Button>

{
userLocation &&

<GoogleMapView
donors={donors}
userLocation={{lat:userLocation.lat,lng:userLocation.lon}}
/>

}

{
donors.map((d)=>{

const dist=calculateDistance(
userLocation.lat,
userLocation.lon,
d.latitude,
d.longitude
);

return(
<DonorCard key={d.id} donor={d} distance={dist}/>
)

})
}

</Container>

)

}

export default Dashboard;