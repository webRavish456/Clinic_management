import React, {useState} from "react"
import {
    TextField,
    Grid,
    useMediaQuery,
    Button,
    Box,
    CircularProgress,
  } from "@mui/material";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {  toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';


  const schema = yup.object().shape({
    patientname: yup.string().required(" Patient Name is required"),
    labreport: yup.string().required(" Lab Report is required"),
    doctornotes: yup.string().required(" Doctor Notes is required"),
    nextfollowup: yup.string().required("Next Follow Up is required"),
  });

const CreatePatientsRecords =({handleCreate, handleClose})=>
{
  const isSmScreen = useMediaQuery("(max-width:768px)");

    const token = Cookies.get('token');

    const Base_url = process.env.REACT_APP_BASE_URL;
  
    const [loading, setLoading] = useState(false)
  
    const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
    } = useForm({
      resolver: yupResolver(schema),
    });
  

  
  
    const onSubmit = (data) => {
    
           setLoading(true)
           console.log(data);
  
          const formdata = new FormData();
          formdata.append("patientname", data.patientnamename);
          formdata.append("labreport", data.labreport);
          formdata.append("doctornotes", data.doctornotes);
          formdata.append("nextfollowup", data.nextfollowup);
          const requestOptions = {
            method: "POST",
            body: formdata,
            headers: {
              Authorization: `Bearer ${token}`, 
             },
          };
      
          fetch(`${Base_url}/patientsrecords`, requestOptions)
            .then((response) => response.text())
      
            .then((result) => {
      
              const res = JSON.parse(result)
      
              if(res.status==="success")
              {
                setLoading(false)
               
                toast.success(" Patient Record Created Successfully!")
                handleCreate(true)
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
        <>
        
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container columnSpacing={2}>
          <Grid item xs={12}>
            <TextField
              type="text"
              label={
                <>
                  Patient Name <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
                </>
              }
              variant="outlined"
              {...register("patientname")}
              error={!!errors.patientname}
              fullWidth
              margin="normal"
            />
            <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
              {errors.patientname?.message}
            </div>
          </Grid>

          <Grid item xs={12}>
            <TextField
              type="file"
              label={
                <>
                Lab Report <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
                </>
              }
              variant="outlined"
              {...register("labreport")}
              error={!!errors.labreport}
              fullWidth
              margin="normal"
            />
            <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
              {errors.labreport?.message}
            </div>
          </Grid>
          <Grid item xs={12}  sm={isSmScreen?12:6} md={6}>
            <TextField
              type="text"
              label={
                <>
                  Doctor Notes <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
                </>
              }
              variant="outlined"
              {...register("doctornotes")}
              error={!!errors.doctornotes}
              fullWidth
              margin="normal"
            />
            <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
              {errors.doctornotes?.message}
            </div>
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="text"
              label={
                <>
                  Next FollowUp <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
                </>
              }
              variant="outlined"
              {...register("nextfollowup")}
              error={!!errors.nextfollowup}
              fullWidth
              margin="normal"
            />
            <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
              {errors.nextfollowup?.message}
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

        </>
     )
}

export default CreatePatientsRecords;