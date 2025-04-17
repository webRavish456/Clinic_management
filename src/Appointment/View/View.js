import React from "react"
import { Box, Grid,  useMediaQuery} from "@mui/material";

const ViewAppointment =({viewData})=>
{
    const isSmScreen = useMediaQuery("(max-width:768px)");

     return (
        <>
          <Grid container columnSpacing={2} rowSpacing={1}>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>
            
            <Grid item xs={6}>
            <Box className="pageTitle">Paient Name:</Box> 
            </Grid>  
            <Grid item xs={6}>
            <Box className="pageDescription">{viewData.patientName}</Box>
            </Grid>

            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

            <Grid item xs={6}>
            <Box className="pageTitle">Doctor:</Box>    
            </Grid>
            <Grid item xs={6}>
            <Box className="pageDescription">{viewData.doctor}</Box>
            </Grid>
            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

            <Grid item xs={6}>
            <Box className="pageTitle">Gender:</Box> 
            </Grid>   
            <Grid item xs={6}>
            <Box className="pageDescription">{viewData.gender}</Box>
            </Grid>

            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

            <Grid item xs={6}>
            <Box className="pageTitle"> Date:</Box>
            </Grid>

            <Grid item xs={6}>
            <Box className="pageDescription">{viewData.date}</Box>
            </Grid>

            

            </Grid>

            


            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

            <Grid item xs={6}>
            <Box className="pageTitle">Mobile:</Box>
            </Grid>

            <Grid item xs={6}>
            <Box className="pageDescription">{viewData.mobile}</Box>
            </Grid>

            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

            <Grid item xs={6}>
            <Box className="pageTitle">Email:</Box>
            </Grid>

            <Grid item xs={6}>
            <Box className="pageDescription">{viewData.email}</Box>
            </Grid>



            </Grid>

<Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

<Grid item xs={6}>
<Box className="pageTitle">Appointment Status:</Box>
</Grid>

<Grid item xs={6}>
<Box className="pageDescription">{viewData.appointmentstatus}</Box>
</Grid></Grid>

<Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

<Grid item xs={6}>
<Box className="pageTitle">Visit Type:</Box>
</Grid>

<Grid item xs={6}>
<Box className="pageDescription">{viewData.visitType}</Box>
</Grid>
            </Grid>

            
            </Grid>



          

        </>
     )
}

export default ViewAppointment;