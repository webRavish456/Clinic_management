import React, {useState} from "react";


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
   gender: yup.string().required("Gender is required"),
   treatment: yup.string().required("Treatment is required"),
   testName: yup.string().required("Test Name is required"),
   doctorName: yup.string().required("Assignee Staff is required"),
   assignedLabTechnician: yup.string().required("Assigned Lab Technician is required"),
   sampleCollectedOn: yup.string().required("Sample Collected On is required"),
   result: yup.string().required("Result is required"),
    
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
    
       console.log(data)
        setLoading(true)

       const formdata = new FormData();
       formdata.append("patientName", data.patientName);
       formdata.append("mobileNo", data.mobileNo);
       formdata.append("gender", data.gender);
       formdata.append("treatment", data.treatment);
       formdata.append("testName", data.testName);
       formdata.append("doctorName", data.doctorName);
       formdata.append("assignedLabTechnician", data.assignedLabTechnician);
       formdata.append("sampleCollectedOn", data.sampleCollectedOn);
       formdata.append("result", data.result);
        
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
                Gender <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </>
            }
            name="gender"
            variant="outlined"
            {...register("gender")}
            error={!!errors.gender}
            fullWidth

            margin="normal"
            />

            </Grid>
            <Grid item xs={12} sm={isSmScreen?12:6} md={6}>

            <TextField
            label={
            <>
                Treatment <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </>
            }
            name="treatment"
            variant="outlined"
            {...register("treatment")}
            error={!!errors.treatment}
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
                Doctor Name <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </>
            }
            name="doctorName"
            variant="outlined"
            {...register("doctorName")}
            error={!!errors.doctorName}
            fullWidth
            margin="normal"
            />
            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6}>
            <TextField
            label={
            <>
                Assigned Lab Technician <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </>
            }
            name="assignedLabTechnician"
            variant="outlined"
            {...register("assignedLabTechnician")}
            error={!!errors.assignedLabTechnician}
            fullWidth
            margin="normal"
            />
            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6}>
            <TextField
            label={
            <>
                Sample Collected On <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </>
            }
            name="sampleCollectedOn"
            variant="outlined"
            {...register("sampleCollectedOn")}
            error={!!errors.sampleCollectedOn}
            fullWidth
            margin="normal"
            />
            </Grid>
            
            <Grid item xs={12} sm={isSmScreen?12:6} md={6}>
            <TextField
            label={
            <>
                Result <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </>
            }
            name="result"
            variant="outlined"
            {...register("result")}
            error={!!errors.result}
            fullWidth
            margin="normal"
            />
            </Grid>
            
            

            

            {/* <Grid item xs={12} sm={isSmScreen?12:6} md={6}>
                        <TextField
                          type="text"
                          label={
                            <>
                              Status <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
                            </>
                          }
                          variant="outlined"
                          {...register("Status")}
                          error={!!errors.Status}
                          fullWidth
                          margin="normal"
                        />
                        <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
                          {errors.Status?.message}
                        </div>
                      </Grid> */}
{/* <Grid item xs={12} sm={isSmScreen?12:6} md={6}>
<FormControl fullWidth margin="normal" error={!!errors.status}>
  <InputLabel id="status-label">
    Status<span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
  </InputLabel>
  <Select
    labelId="status-label"
    id="status"
    label="Status"
    defaultValue=""
    {...register("status")}
  >
    <MenuItem value="complete">Complete</MenuItem>
    <MenuItem value="active">Active</MenuItem>
    <MenuItem value="uncomplete">Uncomplete</MenuItem>
  </Select>
  <FormHelperText>{errors.status?.message}</FormHelperText>
</FormControl>
</Grid> */}
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