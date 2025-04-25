import React from "react";
import { Box, Grid, useMediaQuery } from "@mui/material";

const ViewDepartment = ({ viewData }) => {
  const isSmScreen = useMediaQuery("(max-width:768px)");

  return (
    <>
      <Grid container columnSpacing={2} rowSpacing={1}>
        <Grid item xs={12} sm={isSmScreen ? 12 : 6} md={6} style={{ display: "flex" }}>
          <Grid item xs={6}>
            <Box className="pageTitle">Department Name:</Box>
          </Grid>
          <Grid item xs={6}>
            <Box className="pageDescription">{viewData.departmentName}</Box>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={isSmScreen ? 12 : 6} md={6} style={{ display: "flex" }}>
          <Grid item xs={6}>
            <Box className="pageTitle">Specialization:</Box>
          </Grid>
          <Grid item xs={6}>
            <Box className="pageDescription">{viewData.specialization}</Box>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={isSmScreen ? 12 : 6} md={6} style={{ display: "flex" }}>
          <Grid item xs={6}>
            <Box className="pageTitle">Description:</Box>
          </Grid>
          <Grid item xs={6}>
            <Box className="pageDescription">{viewData.description}</Box>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={isSmScreen ? 12 : 6} md={6} style={{ display: "flex" }}>
          <Grid item xs={6}>
            <Box className="pageTitle">Department Head:</Box>
          </Grid>
          <Grid item xs={6}>
            <Box className="pageDescription">{viewData.departmentHead}</Box>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default ViewDepartment;