// src/components/Create/Create.js


import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography,
  Button,
  Box,
  Grid,
  useMediaQuery,
  FormControl,
  FormLabel,
  CircularProgress,
} from "@mui/material";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {  toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import { NavLink } from "react-router-dom";


const schema = yup.object().shape({


  mobileNo: yup
  .string()
  .required("Mobile number is required")
  .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits"),
  email: yup
  .string()
  .required("Email ID is required")
  .email("Invalid email format"),
  address: yup.string().required("Address is required"),
  dob: yup.string().required("Date of Birth is required"),
  name: yup.string().required("Name is required"),
  gender: yup.string().required("Gender is required"),
  password: yup.string().required("Password is required"),
  confirmpassword: yup.string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required")

});



const EditProfile = ({editData, handleUpdate, handleClose}) => {


  const isSmScreen = useMediaQuery("(max-width:768px)");

  const token = Cookies.get('token');

  const Base_url = process.env.REACT_APP_BASE_URL;

  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (editData) {
      reset({
  
        mobileNo: editData.mobileNo|| "",
        address: editData.address || "",
        dob: editData.dob ? new Date(editData.dob).toISOString().split("T")[0] : "",
        name: editData.name || "",
        email: editData.email || "",
        gender: editData.gender || "",
        password:editData.password || "",
        confirmpassword:editData.password || ""
      });
    }
  }, [editData]);



  const onSubmit = (data) => {
    
    setLoading(true)

   const formdata = new FormData();

   if(data.profilePhoto)
   { formdata.append("profilePhoto", data.profilePhoto[0]);}

   formdata.append("mobileNo", data.mobileNo);
   formdata.append("address", data.address);
   formdata.append("dob", data.dob);
   formdata.append("name", data.name);
   formdata.append("email", data.email);
   formdata.append("gender", data.gender);
   if(editData.password!==data.password)
   {
    formdata.append("password", data.password);
   }
 

   const requestOptions = {
     method: "PATCH",
     body: formdata,
     headers: {
       Authorization: `Bearer ${token}`, 
      },
   };

   fetch(`${Base_url}/profile/${editData._id}`, requestOptions)
     .then((response) => response.text())

     .then((result) => {

       const res = JSON.parse(result)

       if(res.status==="success")
       {
         setLoading(false)
        
         toast.success("Profile Updated Successfully!")
         handleUpdate(true)
         handleClose()
         reset();
       }
       else {

         setLoading(false)
         toast.error(res.message)

       }
     })
     .catch((error) => console.error(error));
};   

  return ( 


    <form onSubmit={handleSubmit(onSubmit)}>

    <Grid container columnSpacing={2}>

      <Grid item xs={12} sm={isSmScreen?12:6} md={6}>
        <TextField
          type="text"
          label={
            <>
              Full name <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </>
          }
          variant="outlined"
          {...register("name")}
          error={!!errors.name}
          fullWidth
          margin="normal"
        />
        <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
          {errors.name?.message}
        </div>
      </Grid>
      
      <Grid item xs={12} sm={isSmScreen?12:6} md={6}>

      <FormControl component="fieldset" fullWidth margin="normal" error={!!errors.gender}>
            <FormLabel component="legend" sx={{ marginLeft: 2 }}>Gender</FormLabel>
            <RadioGroup row defaultValue={editData.gender}>
                <FormControlLabel
                    value="male"
                    control={<Radio sx={{ marginLeft: 2 }} {...register("gender")} />}
                    label="Male"
                    error={!!errors.gender}
                />
                <FormControlLabel
                    value="female"
                    control={<Radio sx={{ marginLeft: 2 }} {...register("gender")} />}
                    label="Female"
                    error={!!errors.gender}
                />
                <FormControlLabel
                    value="others"
                    control={<Radio sx={{ marginLeft: 2 }} {...register("gender")} />}
                    label="Others"
                    error={!!errors.gender}
                />
            </RadioGroup>
            <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
                {errors.gender?.message}
            </div>
                    </FormControl>
                    </Grid>

              <Grid item xs={12} sm={isSmScreen?12:6} md={6}>
                <TextField
                  type="number"
                  label={
                    <>
                      Mobile No <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
                    </>
                  }
                  variant="outlined"
                  {...register("mobileNo")}
                  error={!!errors.mobileNo}
                  fullWidth
                  margin="normal"
                />
                <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
                  {errors.mobileNo?.message}
                </div>
              </Grid>

          <Grid item xs={12} sm={isSmScreen?12:6} md={6}>
            <TextField
              type="text"
              label={
                <>
                  Email Id <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
                </>
              }
              variant="outlined"
              {...register("email")}
              error={!!errors.email}
              fullWidth
              margin="normal"
            />
            <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
              {errors.email?.message}
            </div>
          </Grid>

          <Grid item xs={12} sm={isSmScreen?12:6} md={6}>

          <TextField InputLabelProps={{shrink:true}}
                type="date"
                label={
                    <>
                    Date of Birth
                    </>
                }
                variant="outlined"
                {...register("dob")}
                error={!!errors.dob}
                fullWidth
                margin="normal"
            />
                <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
                {errors.dob?.message}
                </div>

              </Grid> 


              <Grid item xs={12} sm={isSmScreen?12:6} md={6}>
             
              <TextField InputLabelProps={{shrink:true}}
                    type="file"
                    label={
                        <>
                        Profile Photo
                        </>
                    }
                    variant="outlined"
                    {...register("profilePhoto")}
                    error={!!errors.profilePhoto}
                    fullWidth
                    margin="normal"
                />
                    <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
                    {errors.profilePhoto?.message}
                    </div>

                    <Typography variant="body2" sx={{ mt: 0 }}>
                    View existing Profile:&nbsp;
                  <NavLink 
                    to={editData.profilePhoto} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Profile Photo
                  </NavLink>
                </Typography>
              </Grid>

              <Grid item xs={12} sm={isSmScreen?12:6} md={6}>
                
                <TextField
              type="password"
              InputLabelProps={{ shrink:true}}
              label={
                <>
               Enter New Password
                </>
            }
              variant="outlined"
              {...register("password")}
              error={!!errors.password}
                fullWidth
                    margin="normal"
              />
              <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
                {errors.password?.message}
              </div>

              </Grid> 

              <Grid item xs={12} sm={isSmScreen?12:6} md={6}>

              <TextField
              type="password"
              InputLabelProps={{ shrink:true}}
              label={
                <>
               Confirm New Password
                </>
            }
             
              variant="outlined"
              {...register("confirmpassword")}
              error={!!errors.confirmpassword}
              fullWidth
              margin="normal"
            />
              <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
                {errors.confirmpassword?.message}
              </div>

              </Grid> 
      
       <Grid item xs={12} sm={12} md={12}>
        <TextField
           
            InputLabelProps={{ shrink:true}}
          label={
            <>
               Address <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </>
          }
          variant="outlined"
          {...register("address")}
          error={!!errors.address}
          fullWidth
          margin="normal"
        />
        <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
          {errors.address?.message}
        </div>
      </Grid>
     
    </Grid>

    <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 2 }}>
      <Button onClick={handleClose} className="secondary_button">
        Cancel
      </Button>
      <Button type="submit" className="primary_button">

      {loading ? (
   <>
     <CircularProgress size={18} 
      style={{ marginRight: 8, color: "#fff" }} />
            Submitting
        </>
        ) : (
        "Submit"
        )}

      </Button>
    </Box>
  </form>

  );
};

export default EditProfile;