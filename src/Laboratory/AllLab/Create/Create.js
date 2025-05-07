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
     labName: yup.string().required("Lab Name is required"),
     labType: yup.string().required("Lab Type is required"),
     assigneeStaff: yup.string().required("Assignee Staff is required"),
     shift: yup.string().required("Shift is required"),
    
  });


const CreateAllLab =({handleCreate, handleClose})=>
{   
    const token = Cookies.get('token');

    const Base_url = process.env.REACT_APP_BASE_URL;

    const [staff, setStaff] = useState([])

    const [loadingData, setLoadingData] = useState(true)

    useEffect(() => {
      const fetchStaffData = async () => {
        try {
          const response = await fetch(`${Base_url}/staff`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
    
          const result = await response.text();
          const res = JSON.parse(result);
    
          if (res.status === "success") {
            const formattedData = res.data.map((item) => item.staffName);
            setStaff(formattedData);
          }
        } catch (error) {
          console.error("Error fetching branch data:", error);
        }
      };
    
  
    
      const fetchData = async () => {
        try {
          await Promise.all([fetchStaffData()]);
          setLoadingData(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          setLoadingData(false);
        }
      };
    
      if (loadingData) {
        fetchData();
      }
    
    }, [loadingData]);


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
       formdata.append("labName", data.labName);
       formdata.append("labType", data.labType);
       formdata.append("assigneeStaff", data.assigneeStaff);
       formdata.append("shift", data.shift);
        
       const requestOptions = {
         method: "POST",
         body: formdata,
         headers: {
           Authorization: `Bearer ${token}`, 
          },
       };
   
       fetch(`${Base_url}/alllab`, requestOptions)
         .then((response) => response.text())
   
         .then((result) => {
   
           const res = JSON.parse(result)
   
           if(res.status==="success")
           {
            setLoading(false)
               
            toast.success("Lab Created Successfully!")
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

            <Grid item xs={12} sm={isSmScreen?12:6} md={6}>

            <TextField
            label={
            <>
                Lab Type <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </>
            }
            name="labType"
            variant="outlined"
            {...register("labType")}
            error={!!errors.labType}
            fullWidth

            margin="normal"
            />

            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6}>
          

      <FormControl fullWidth margin="normal"
            variant="outlined"
              error={!!errors.assigneeStaff}>
                        <InputLabel>Assignee Staff <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span></InputLabel>
                        <Select
                        label="assigneeStaff"
                       
                        {
                          ...register("assigneeStaff")
                        }>

                        {staff.map((staff, index) =>(
                          <MenuItem key={index} value={staff}>
                            {staff}
                          </MenuItem>
                        ))}
                        </Select>
                    </FormControl>
                    <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
              {errors.assigneeStaff?.message}
            </div>
            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6}>
            <TextField
            label={
            <>
                Shift <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </>
            }
            name="shift"
            variant="outlined"
            {...register("shift")}
            error={!!errors.shift}
            fullWidth
            margin="normal"
            />
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

export default CreateAllLab;