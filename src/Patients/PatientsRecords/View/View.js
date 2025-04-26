import React from "react"
import { Box, Grid,  useMediaQuery} from "@mui/material";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
const ViewPatientsRecords =({viewData})=>
{
    const isSmScreen = useMediaQuery("(max-width:768px)");

     return (
        <>
          <Grid container columnSpacing={2} rowSpacing={1}>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>
            
            <Grid item xs={6}>
            <Box className="pageTitle">Patient Name:</Box> 
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
            <Box className="pageDescription">{viewData.patient.treatment}</Box>
            </Grid>
            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

            <Grid item xs={6}>
            <Box className="pageTitle">Admission Date:</Box> 
            </Grid>   
            <Grid item xs={6}>
            <Box className="pageDescription">{viewData.patient.admissionDate}</Box>
            </Grid>

            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

            <Grid item xs={6}>
            <Box className="pageTitle">Lab Report:</Box>
            </Grid>

            <Grid item xs={6}>
            <Box className="pageDescription">< PictureAsPdfIcon/></Box>
            </Grid>

            </Grid>


            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

            <Grid item xs={6}>
            <Box className="pageTitle">Doctor Notes:</Box>
            </Grid>

            <Grid item xs={6}>
            <Box className="pageDescription">{viewData.doctorNotes}</Box>
            </Grid>

            </Grid><Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

<Grid item xs={6}>
<Box className="pageTitle">Next Follow Up:</Box>
</Grid>

<Grid item xs={6}>
<Box className="pageDescription">{viewData.nextFollowUp}</Box>
</Grid>

</Grid>
<Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

            <Grid item xs={6}>
            <Box className="pageTitle">Status:</Box>
            </Grid>

            <Grid item xs={6}>
            <Box className="pageDescription">{viewData.patient.status}</Box>
            </Grid>

            </Grid>
            
           
            </Grid>
           

            

        </>
     )
}

export default ViewPatientsRecords;