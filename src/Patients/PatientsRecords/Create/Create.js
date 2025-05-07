import React, {useState} from "react"
import {
    TextField,
    Grid,
    useMediaQuery,
    Button,
    Box,
    CircularProgress,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
  } from "@mui/material";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {  toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';


  const schema = yup.object().shape({
    patientName: yup.string().required(" Patient Name is required"),
    labReport: yup.mixed().test("required", "Lab Report is required", (value) => {
      return value && value.length > 0;
      }),
    mobileNo: yup.string().required(" Mobile Number is required"),
    doctorNotes: yup.string().required(" Doctor Notes is required"),
    nextFollowUp: yup.string(),
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
          formdata.append("patientName", data.patientName);
          formdata.append("labReport", data.labReport[0]);
          formdata.append("mobileNo", data.mobileNo);
          formdata.append("doctorNotes", data.doctorNotes);
          formdata.append("nextFollowUp", data.nextFollowUp);
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
          <Grid item xs={12}sm={isSmScreen?12:6} md={6}>
            <TextField
              type="text"
              label={
                <>
                  Patient Name <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
                </>
              }
              variant="outlined"
              {...register("patientName")}
              error={!!errors.patientName}
              fullWidth
              margin="normal"
            />
            <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
              {errors.patientName?.message}
            </div>
          </Grid>

          <Grid item xs={12}sm={isSmScreen?12:6} md={6}>
            <TextField
            InputLabelProps={{ shrink: true }}
              type="number"
              label={
                <>
                Mobile Number <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
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

          <Grid item xs={12}sm={isSmScreen?12:6} md={6}>
            <TextField
            InputLabelProps={{ shrink: true }}
              type="file"
              label={
                <>
                Lab Report <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
                </>
              }
              variant="outlined"
              {...register("labReport")}
              error={!!errors.labReport}
              fullWidth
              margin="normal"
              inputProps={{ accept: "application/pdf" }} 
            />
            <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
              {errors.labReport?.message}
            </div>
          </Grid>
          
          <Grid item xs={12}sm={isSmScreen?12:6} md={6}>
            <TextField
              type="date"
              InputLabelProps={{shrink:true}}
              label={
                <>
                  Next FollowUp 
                </>
              }
              variant="outlined"
              {...register("nextFollowUp")}
              error={!!errors.nextFollowUp}
              fullWidth
              margin="normal"
            />
          </Grid>

          <Grid item xs={12}  sm={12} md={12}>
            <TextField
              type="text"
              label={
                <>
                  Doctor Notes <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
                </>
              }
              variant="outlined"
              {...register("doctorNotes")}
              error={!!errors.doctorNotes}
              fullWidth
              multiline
              margin="normal"
            />
            <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
              {errors.doctorNotes?.message}
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