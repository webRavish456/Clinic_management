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
  } from "@mui/material";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {  toast, ToastContainer } from "react-toastify";
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


const CreateShiftManagement =({handleCreate, handleClose})=>
{   


    const token = Cookies.get('token');

    const Base_url = process.env.REACT_APP_BASE_URL;

    const [department, setDepartment] =useState([])

    const [doctor, setDoctor] = useState([])

    const [availiableDoctor, setAvailableDoctor] = useState([])

    const [specialization, setSpecialization] = useState([])

    const [loadingData, setLoadingData] = useState(true)

    const today = new Date().toISOString().split("T")[0];


 const [loading, setLoading] = useState(false)
  
    const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
    } = useForm({
      resolver: yupResolver(schema),
    });


    useEffect(() => {
    
  
      const fetchDepartmentData = async () => {
        try {
          const response = await fetch(`${Base_url}/department`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
    
          const result = await response.text();
          const res = JSON.parse(result);
    
          const formattedDepartment = res.data.map((item) => ({
              departmentName: item.departmentName,
              specialization: item.specialization,
            }));
            
            setDepartment(formattedDepartment);
            
        } catch (error) {
          console.error("Error fetching department data:", error);
        }
      };

      const fetchDoctorData = async () => {
        try {
          const response = await fetch(`${Base_url}/alldoctor`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
    
          const result = await response.text();
          const res = JSON.parse(result);
    
          const formattedDoctor = res.data.map((item) => ({
              doctorName: item.doctorName,
              specialization: item.companyDetails.specialization
            }));
            
            setDoctor(formattedDoctor);
            
        } catch (error) {
          console.error("Error fetching doctor data:", error);
        }
      };
    
      const fetchData = async () => {
        try {
          await Promise.all([fetchDepartmentData(), fetchDoctorData()]);
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

  
    
    const onDepartmentChange = (e) => {

      const selectedDept = e.target.value;
      const deptDetails = department.find((dept) => dept.departmentName === selectedDept);
  
      if (deptDetails) {
        setSpecialization(deptDetails.specialization);
      } else {
        setSpecialization([]);
      }
    };

    const onSpecializationChange = (e) => {

      const selectedSpecialization = e.target.value;
    
      const filteredDoctors = doctor.filter(
        (doc) => doc.specialization === selectedSpecialization
      );

      setAvailableDoctor(filteredDoctors); 
    };




    const onSubmit = (data) => {
    

    
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
               
            toast.success("Shift Management Created Successfully!")
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
    
            <form onSubmit={handleSubmit(onSubmit)}>

             <Grid container columnSpacing={2}>

             <Grid item xs={12} sm={isSmScreen ? 12 : 6} md={6}>
             <Box>

              <TextField
               InputLabelProps={{shrink:true}}
                  select
                  label={
                      <>
                      Department<span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
                      </>
                  }
                  variant="outlined"
                  error={!!errors.department}
                  fullWidth
                  margin="normal"
                  {...register("department")}
                  onChange={(e) => {
                      register("department").onChange(e);
                      onDepartmentChange(e);
                  }}

                  SelectProps={{
                      MenuProps: {
                      PaperProps: {
                          style: { maxHeight: 200 },
                      },
                      },
                  }}
                  >
                  {department?.map((dept, index) => (
                      <MenuItem key={index} value={dept.departmentName}>
                      {dept.departmentName}
                      </MenuItem>
                  ))}
                  </TextField>

                    <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
                    {errors.department?.message}
                    </div>

                  </Box>
           </Grid>

           <Grid item xs={12} sm={isSmScreen ? 12 : 6} md={6}>

                  <Box>
                        <TextField
                        InputLabelProps={{shrink:true}}
                          select
                          label={
                              <>
                              Specialization
                              </>
                          }
                            variant="outlined"
                              fullWidth
                              margin="normal"
                          {...register("specialization")}

                          onChange={(e) => {
                            register("specialization").onChange(e);
                            onSpecializationChange(e);
                        }}
                          error={!!errors.specialization}
                          
                          SelectProps={{
                              MenuProps: {
                              PaperProps: {
                                  style: { maxHeight: 200 },
                              },
                              },
                          }}
                          >
                          {specialization?.map((spec, index) => (
                              <MenuItem key={index} value={spec}>
                              {spec}
                              </MenuItem>
                          ))}
                          </TextField>
                          
                          <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
                              {errors.specialization?.message}
                              </div>

                          </Box>
                          </Grid>

                          <Grid item xs={12} sm={isSmScreen ? 12 : 6} md={6}>

                      <Box>
        
                    <TextField
                    InputLabelProps={{shrink:true}}
                      select
                      label={
                          <>
                      Doctor Name <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
                          </>
                      }
                      variant="outlined"
                          fullWidth
                          margin="normal"
                      {...register("doctorName")}
                      error={!!errors.doctorName}
                    
                      SelectProps={{
                          MenuProps: {
                          PaperProps: {
                              style: { maxHeight: 200 },
                          },
                          },
                      }}
                      >
                      {availiableDoctor?.map((doc, index) => (
                          <MenuItem key={index} value={doc.doctorName}>
                          {doc.doctorName}
                          </MenuItem>
                      ))}
                      </TextField>
                      
                      <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
                          {errors.doctorName?.message}
                          </div>

                      </Box>
                      </Grid>

             <Grid item xs={12} sm={isSmScreen?12:6} md={6}>

            <TextField
            InputLabelProps={{shrink:true}}
            type="number"
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
            InputLabelProps={{shrink:true}}
            type="date"
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
            inputProps={{ min: today }}
            margin="normal"
            />

            </Grid>


            <Grid item xs={12} sm={isSmScreen?12:6} md={6}>
            <TextField
            InputLabelProps={{shrink:true}}
               type="date"
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
            InputLabelProps={{shrink:true}}
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
            InputLabelProps={{shrink:true}}
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
            InputLabelProps={{shrink:true}}
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
              select
              label={
                <>
                  Availability Status <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
                </>
              }
          
              variant="outlined"
              {...register("availabilityStatus")}
              error={!!errors.availabilityStatus}
              fullWidth
              margin="normal"
            >
            <MenuItem value ="Available">Available</MenuItem>
            <MenuItem value ="Unavailable">Unavailable</MenuItem>
            <MenuItem value ="On Leave">On Leave</MenuItem>
            </TextField>
            <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
              {errors.availabilityStatus?.message}
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
 
     )
}

export default CreateShiftManagement;