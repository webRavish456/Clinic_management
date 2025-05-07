import React, {useEffect, useState} from "react";


import {
    TextField,
    Grid,
    Button,
    Box,
    CircularProgress,
    useMediaQuery,
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
   patientName: yup.string().required("Patient Name is required"),
   mobileNo: yup.string().required("Mobile No is required"),
   testName: yup.string().required("Test Name is required"),
   labName: yup.string().required("Lab Name is required"),
   labResult: yup
   .mixed()
   .test("required", "Lab Result is required", (value) => {
   return value && value.length > 0;
   }),
    
  });


const CreateLabTest =({handleCreate, handleClose})=>
{   
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

       const formdata = new FormData();
       formdata.append("patientName", data.patientName);
       formdata.append("mobileNo", data.mobileNo);
       formdata.append("testName", data.testName);
       formdata.append("labName", data.labName);
       formdata.append("labResult", data.labResult[0]);
        
       const requestOptions = {
         method: "POST",
         body: formdata,
         headers: {
           Authorization: `Bearer ${token}`, 
          },
       };
   
       fetch(`${Base_url}/labtest`, requestOptions)
         .then((response) => response.text())
   
         .then((result) => {
   
           const res = JSON.parse(result)
   
           if(res.status==="success")
           {
            setLoading(false)
               
            toast.success("LabTest Created Successfully!")
            handleCreate(true)
            handleClose()
            reset();
          }
          else {
            handleCreate(true)
            handleClose()
            setLoading(false)
            toast.error(res.message)
  
          }
        })
        .catch((error) => console.error(error));
    };

    
    const isSmScreen = useMediaQuery("(max-width:768px)");
     return (
        <>   
            <form onSubmit={handleSubmit(onSubmit)}>

             <Grid container columnSpacing={2}>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6}>

            <TextField
            label={
            <>
                Patient Name <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </>
            }
            name="patientName"
            variant="outlined"
            {...register("patientName")}
            error={!!errors.patientName}
            fullWidth
            margin="normal"
            />
            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6}>

          <TextField
          label={
          <>
              Mobile No <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
          </>
          }
          name="mobileNo"
          variant="outlined"
          {...register("mobileNo")}
          error={!!errors.mobileNo}
          fullWidth
          margin="normal"
          />
          </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6}>

            <TextField
            label={
            <>
                Test Name <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </>
            }
            name="testName"
            variant="outlined"
            {...register("testName")}
            error={!!errors.testName}
            fullWidth

            margin="normal"
            />

            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6}>

              <TextField
              label={
              <>
                  Lab Name <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
              </>
              }
              name="labName"
              variant="outlined"
              {...register("labName")}
              error={!!errors.labName}
              fullWidth

              margin="normal"
              />

          </Grid>
           
            <Grid item xs={12} sm={12} md={12}>
          <TextField
              type="file"
              InputLabelProps={{ shrink: true }}
              
              
              label={
                <>
                  Result <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
                </>
              }
              variant="outlined"
              {...register("labResult")}
              error={!!errors.labResult}
              fullWidth
              margin="normal"
              inputProps={{ accept: "application/pdf" }}
            />
           
            <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
              {errors.labResult?.message}
            </div>
          </Grid>
            
            </Grid>

            <Box className="submit" sx={{display :'flex', justifyContent : 'flex-end', gap :'10px'}}>
            <Button onClick={handleClose} className="secondary_button" >Cancel</Button>
            <Button type="submit"  className="primary_button">
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

export default CreateLabTest;