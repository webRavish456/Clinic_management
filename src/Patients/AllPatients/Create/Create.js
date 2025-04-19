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
    name: yup.string().required(" Name is required"),
    bloodGroup: yup.string().required(" Blood Group is required"),
    gender: yup.string().required(" Gender is required"),
    admissionDate: yup.string().required("Admission Date is required"),
    mobileNo: yup.string().required(" Mobile No is required"),
    email: yup.string().required(" Email is required"),
    address: yup.string().required(" Address is required"),
    treatment: yup.string().required(" Treatment is required"),
    doctorAssigned: yup.string().required(" Doctor Assigned is required"),
    medicalHistory: yup.string().required(" Medical History is required"),
    status: yup.string().required(" Status is required"),

  });

const CreateAllPatients =({handleCreate, handleClose})=>
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
          formdata.append("name", data.name);
          formdata.append("treatment", data.treatment);
          formdata.append("mobileNo", data.mobileNo);
          formdata.append("email", data.email);
          formdata.append("gender", data.gender);
          formdata.append("address", data.address);
          formdata.append("admissionDate", data.admissionDate);
          formdata.append("doctorAssigned", data.doctorAssigned)
          formdata.append("bloodGroup", data.bloodGroup);
          formdata.append("medicalHistory", data.medicalHistory);
          formdata.append("status", data.status);
      
          const requestOptions = {
            method: "POST",
            body: formdata,
            headers: {
              Authorization: `Bearer ${token}`, 
             },
          };
      
          fetch(`${Base_url}/allpatients`, requestOptions)
            .then((response) => response.text())
      
            .then((result) => {
      
              const res = JSON.parse(result)
      
              if(res.status==="success")
              {
                setLoading(false)
               
                toast.success(" Patient Created Successfully!")
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
          <Grid item xs={12} sm={isSmScreen?12:6} md={6}>
            <TextField
              type="text"
              label={
                <>
                  Name <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
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
            <TextField
              type="text"
              label={
                <>
                  treatment <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
                </>
              }
              variant="outlined"
              {...register("treatment")}
              error={!!errors.treatment}
              fullWidth
              margin="normal"
            />
            <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
              {errors.treatment?.message}
            </div>
          </Grid>
          <Grid item xs={12} sm={isSmScreen?12:6} md={6}> 
            <TextField
              type="text"
              label={
                <>
                  mobileNo <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
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
                  email <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
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
            <TextField
              type="text"
              label={
                <>
                  gender <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
                </>
              }
              variant="outlined"
              {...register("gender")}
              error={!!errors.gender}
              fullWidth
              margin="normal"
            />
            <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
              {errors.gender?.message}
            </div>
          </Grid>
          <Grid item xs={12} sm={isSmScreen?12:6} md={6}>
            <TextField
              type="text"
              label={
                <>
                  address <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
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
          <Grid item xs={12} sm={isSmScreen?12:6} md={6}>
            <TextField
            InputLabelProps={{ shrink: true }}
              type="date"
              label={
                <>
                  admissionDate <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
                </>
              }
              variant="outlined"
              {...register("admissionDate")}
              error={!!errors.admissionDate}
              fullWidth
              margin="normal"
            />
            <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
              {errors.admissionDate?.message}
            </div>
          </Grid>
          <Grid item xs={12} sm={isSmScreen?12:6} md={6}>
            <TextField
              type="text"
              label={
                <>
                  doctorAssigned <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
                </>
              }
              variant="outlined"
              {...register("doctorAssigned")}
              error={!!errors.doctorAssigned}
              fullWidth
              margin="normal"
            />
            <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
              {errors.doctorAssigned?.message}
            </div>
          </Grid>
          <Grid item xs={12} sm={isSmScreen?12:6} md={6}>
            <TextField
              type="text"
              label={
                <>
                  bloodGroup <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
                </>
              }
              variant="outlined"
              {...register("bloodGroup")}
              error={!!errors.bloodGroup}
              fullWidth
              margin="normal"
            />
            
            <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
              {errors.bloodGroup?.message}
            </div>
          </Grid>


          <Grid item xs={12} sm={isSmScreen?12:6} md={6}>
          <TextField
              type="file"
              InputLabelProps={{ shrink: true }}
              
              
              label={
                <>
                
                
                  medicalHistory <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
                </>
              }
              variant="outlined"
              {...register("medicalHistory")}
              error={!!errors.medicalHistory}
              fullWidth
              margin="normal"
            />
           
            <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
              {errors.medicalHistory?.message}
            </div>
          </Grid>
          <Grid item xs={12} sm={isSmScreen?12:6} md={6}>
          <TextField
              type="text"
              
              label={
                <>
                
                
                  status <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
                </>
              }
              variant="outlined"
              {...register("status")}
              error={!!errors.status}
              fullWidth
              margin="normal"
            />
           
            <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
              {errors.status?.message}
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

export default CreateAllPatients;