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
  doctorName: yup.string().required("doctorName is required"),
  mobileNo: yup.string().required("mobileNo is required"),
    department: yup.string().required("department is required"),
    specialization: yup.string().required("specialization is required"),
    shiftStartDate: yup.string().required("shiftStartDate is required"),
    shiftEndDate: yup.string().required("shiftEndDate is required"),
    workDays: yup.string().required("workDays is required"),
    shiftHours: yup.string().required("shiftHours is required"),
    shiftType: yup.string().required("shiftType is required"),
    availabilityStatus: yup.string().required("availabilityStatus is required"),
   
    
  });
  const doctorNames=[
    "r.k Sinha"
  ]
  const departments=[
    "r.k Sinha"
  ]




const CreateShiftManagement =({handleCreate, handleClose})=>
{   
  const [doctorAssigned, setdoctorAssigned]= useState([]);

    const token = Cookies.get('token');

    const Base_url = process.env.REACT_APP_BASE_URL;


 const [loading, setLoading] = useState(true)
  
    const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
    } = useForm({
      resolver: yupResolver(schema),
    });
    useEffect(() => {

      const fetchdoctorData = async () => {
        try {
          const response = await fetch(`${Base_url}/appointment`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const result = await response.json();
          if (result.status === "success") {
            console.log(result.data)
  
            setdoctorAssigned(result.data)
            setLoading(false)
          }
        } catch (error) {
          console.error("Error fetching doctor data:", error);
        }
      };
      if (loading) {
        fetchdoctorData();
      }
    }, [loading]); //dropdown

    const onSubmit = (data) => {
    
       console.log(data)
        setLoading(true)

       const formdata = new FormData();
       formdata.append("doctorName", data.doctorName);
       formdata.append("mobileNo", data.mobileNo);
       formdata.append("department", data.department);
       formdata.append("specialization", data.specialization);
        formdata.append("shiftStartDate", data.shiftStartDate);
        formdata.append("shiftEndDate", data.shiftEndDate);
        formdata.append("workDays", data.workDays);
        formdata.append("shiftHours", data.shiftHours);
        formdata.append("shiftType", data.shiftType);
        formdata.append("availabilityStatus", data.availabilityStatus);

       const requestOptions = {
         method: "POST",
         body: formdata,
         headers: {
           Authorization: `Bearer ${token}`, 
          },
       };
   
       fetch(`${Base_url}/shiftmanagement`, requestOptions)
         .then((response) => response.text())
   
         .then((result) => {
   
           const res = JSON.parse(result)
   
           if(res.status==="success")
           {
            setLoading(false)
               
            toast.success("ShiftManagement Created Successfully!")
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
              <Grid item xs={12} sm={isSmScreen ? 12 : 6} md={6}>
                                      
              <FormControl
              fullWidth
              margin="normal"
              error={!!errors.doctorAssigned}
            >
              <InputLabel>
                Doctor Name <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
              </InputLabel>

              <Select
                label="doctorName"
                defaultValue=""
                {...register("doctorName", { required: "doctor name is required" })}
              >

                {doctorAssigned.map((appointment, index) => (
                  <MenuItem key={index} value={appointment.doctorAssigned}>
                    {appointment.doctorAssigned}
                  </MenuItem>
                ))}
              </Select >
              <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
                {errors.doctorAssigned?.message}
              </div>
            </FormControl>
      
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

            </Grid>  <Grid item xs={12} sm={isSmScreen ? 12 : 6} md={6}>
                                      
                                      <TextField
                                        select
                                        label={
                                          <>
                                            Department <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
                                          </>
                                        }
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        {...register("department")}
                                        error={!!errors.department}
                                        helperText={errors.department?.message}
                                        SelectProps={{
                                          MenuProps: {
                                            disableScrollLock: true,
                                          },
                                        }}
                                      >
                                        {departments.map((method) => (
                                          <MenuItem key={method} value={method}>
                                            {method}
                                          </MenuItem>
                                        ))}
                                      </TextField>
                                                            </Grid>
                      

            

            <Grid item xs={12} sm={isSmScreen?12:6} md={6}>

            <TextField
            label={
            <>
                Specialization <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </>
            }
            name="specialization"
            variant="outlined"
            {...register("specialization")}
            error={!!errors.specialization}
            fullWidth

            margin="normal"
            />

            </Grid> 



            <Grid item xs={12} sm={isSmScreen?12:6} md={6}>
            <TextField
            label={
            <>
                Shift Start Date <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </>
            }
            name="shiftStartDate"
            variant="outlined"
            {...register("shiftStartDate")}
            error={!!errors.shiftStartDate}
            fullWidth

            margin="normal"
            />

            </Grid>


            <Grid item xs={12} sm={isSmScreen?12:6} md={6}>
            <TextField
            label={
            <>
                Shift End Date <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </>
            }
            name="shiftEndDate"
            variant="outlined"
            {...register("shiftEndDate")}
            error={!!errors.shiftEndDate}
            fullWidth
            margin="normal"
            />
            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6}>
            <TextField
            label={
            <>
                Work Days <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </>
            }
            name="workDays"
            variant="outlined"
            {...register("workDays")}
            error={!!errors.workDays}
            fullWidth
            margin="normal"
            />
            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6}>
            <TextField
            label={
            <>
                Shift Hours <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </>
            }
            name="shiftHours"
            variant="outlined"
            {...register("shiftHours")}
            error={!!errors.shiftHours}
            fullWidth
            margin="normal"
            />
            </Grid>


            <Grid item xs={12} sm={isSmScreen?12:6} md={6}>
            <TextField
            label={
            <>
                Shift Type <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </>
            }
            name="shiftType"
            variant="outlined"
            {...register("shiftType")}
            error={!!errors.shiftType}
            fullWidth
            margin="normal"
            />
            </Grid>

            <Grid item xs={12} sm={isSmScreen?12:6} md={6}>
            <TextField
            label={
            <>
                Availability Status <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </>
            }
            name="availabilityStatus"
            variant="outlined"
            {...register("availabilityStatus")}
            error={!!errors.availabilityStatus}
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

export default CreateShiftManagement;