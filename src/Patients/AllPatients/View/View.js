import React from "react"
import { Box, Grid,  useMediaQuery} from "@mui/material";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

const ViewPatient =({viewData})=>
{
    const isSmScreen = useMediaQuery("(max-width:768px)");

     return (
        <>
          <Grid container columnSpacing={2} rowSpacing={1}>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>
            
            <Grid item xs={6}>
            <Box className="pageTitle">Name:</Box> 
            </Grid>  
            <Grid item xs={6}>
            <Box className="pageDescription">{viewData.name}</Box>
            </Grid>

            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

            <Grid item xs={6}>
            <Box className="pageTitle">Blood Group:</Box>    
            </Grid>
            <Grid item xs={6}>
            <Box className="pageDescription">{viewData.bloodGroup}</Box>
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
            <Box className="pageTitle">MobileNo:</Box>
            </Grid>

            <Grid item xs={6}>
            <Box className="pageDescription">{viewData.mobileNo}</Box>
            </Grid>

            </Grid>


            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

            <Grid item xs={6}>
            <Box className="pageTitle">Email:</Box>
            </Grid>

            <Grid item xs={6}>
            <Box className="pageDescription">{viewData.email}</Box>
            </Grid>

            </Grid><Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

          <Grid item xs={6}>
          <Box className="pageTitle">Address:</Box>
          </Grid>

          <Grid item xs={6}>
          <Box className="pageDescription">{viewData.address}</Box>
          </Grid>

          </Grid>
       
            
            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

            <Grid item xs={6}>
            <Box className="pageTitle">Admission Date:</Box>
            </Grid>

            <Grid item xs={6}>
            <Box className="pageDescription">{new Date(viewData.admissionDate).toLocaleDateString("en-IN")}</Box>
            </Grid>

            </Grid>
            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

            <Grid item xs={6}>
            <Box className="pageTitle">Status:</Box>
            </Grid>

            <Grid item xs={6}>
            <Box className="pageDescription">{viewData.status}</Box>
            </Grid>

            </Grid>
            <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex"}}>

            <Grid item xs={6}>
            <Box className="pageTitle">Medical History:</Box>
            </Grid>

            <Grid item xs={6}>
            <Box className="pageDescription">< PictureAsPdfIcon/></Box>
            </Grid>

            </Grid>
           

            </Grid>

        </>
     )
}

export default ViewPatient;