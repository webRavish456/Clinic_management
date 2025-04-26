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
            <Box className="pageTitle">Treatment:</Box>    
            </Grid>
            <Grid item xs={6}>
            <Box className="pageDescription">{viewData.treatment}</Box>
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
            <Box className="pageTitle"> Email Id:</Box>
            </Grid>

            <Grid item xs={6}>
            <Box className="pageDescription">{viewData.emailId}</Box>
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
            <Box className="pageTitle">Department:</Box>
            </Grid>

            <Grid item xs={6}>
            <Box className="pageDescription">{viewData.department}</Box>
            </Grid>



            </Grid>

<Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

<Grid item xs={6}>
<Box className="pageTitle">Specialization:</Box>
</Grid>

<Grid item xs={6}>
<Box className="pageDescription">{viewData.specialization}</Box>
</Grid></Grid>

<Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

<Grid item xs={6}>
<Box className="pageTitle">Assigned Doctor:</Box>
</Grid>

<Grid item xs={6}>
<Box className="pageDescription">{viewData.doctorAssigned}</Box>
</Grid>
            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

<Grid item xs={6}>
<Box className="pageTitle">Date:</Box>
</Grid>

<Grid item xs={6}>
<Box className="pageDescription">{viewData.date}</Box>
</Grid>
            </Grid>
            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

<Grid item xs={6}>
<Box className="pageTitle">Appointment Status:</Box>
</Grid>

<Grid item xs={6}>
<Box className="pageDescription">{viewData.appointmentStatus}</Box>
</Grid>
            </Grid>
            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

<Grid item xs={6}>
<Box className="pageTitle">Visit Type:</Box>
</Grid>

<Grid item xs={6}>
<Box className="pageDescription">{viewData.visitType}</Box>
</Grid>
            </Grid>

        </>
     )
}

export default ViewAppointment;