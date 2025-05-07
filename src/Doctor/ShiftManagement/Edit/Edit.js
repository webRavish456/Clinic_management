import React, { useEffect, useState } from "react"
import {
    TextField,
    Grid,
    MenuItem,
    Button,
    Box,
    CircularProgress,
    useMediaQuery,
} from "@mui/material";
import * as  yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast, } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Cookies from "js-cookie"

const schema = yup.object().shape({
  doctorName: yup.string().required("Doctor Name is required"),
  mobileNo: yup.string().required("mobileNo is required"),
  department: yup.string().required("Department is required"),
  specialization: yup.string().required("Specialization is required"),
  shiftStartDate: yup.string().required("Shift Start Date is required"),
  shiftEndDate: yup.string().required("Shift End Date is required"),
  workDays: yup.string().required("Work Days is required"),
  shiftHours: yup.string().required("Shift Hours is required"),
  shiftType: yup.string().required("Shift Type is required"),
  availabilityStatus: yup.string().required("availabilityStatus is required"),
});



const EditShiftManagement = ({ handleUpdate,  editData, handleClose}) => {

    const isSmScreen = useMediaQuery("(max-width:768px)");

    const token = Cookies.get('token');

    const Base_url = process.env.REACT_APP_BASE_URL;

    const today = new Date().toISOString().split("T")[0];
  
    const [loading, setLoading] = useState(false)


    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: yupResolver(schema)
    });

   


      useEffect(() => {

        if (editData) {
          reset({
            doctorName: editData.doctorName || "",
            department: editData.department || "",
            mobileNo: editData.mobileNo || "",
            specialization: editData.specialization || "",
            shiftStartDate: new Date(editData.shiftStartDate).toISOString().split("T")[0] || "",
            shiftEndDate: new Date(editData.shiftEndDate).toISOString().split("T")[0] || "",
            workDays: editData.workDays || "",
            shiftHours: editData.shiftHours || "",
            shiftType: editData.shiftType || "",
            availabilityStatus: editData.availabilityStatus || ""
          });

        }
      }, [editData, reset]);
      



    const onSubmit = (data) => {

        setLoading(true)

        const formdata = new FormData();
        formdata.append("doctorName", data.doctorName);
        formdata.append("department", data.department);
        formdata.append("specialization", data.specialization);
        formdata.append("shiftStartDate", data.shiftStartDate);
        formdata.append("shiftEndDate", data.shiftEndDate);
        formdata.append("workDays", data.workDays);
        formdata.append("shiftHours", data.shiftHours);
        formdata.append("shiftType", data.shiftType);
        formdata.append("availabilityStatus", data.availabilityStatus);

        const requestOptions = {
            method: "PATCH",
            body: formdata,
            headers: {
                Authorization: `Bearer ${token}`, 
               },
        };

        fetch(`${Base_url}/shiftmanagement/${editData._id}`, requestOptions)
            .then((response) => response.text())

            .then((result) => {

                const res = JSON.parse(result)

                if (res.status === "success") {
                    setLoading(false)

                    toast.success(" Shift Management Updated Successful!")

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
        <>
        <form onSubmit={handleSubmit(onSubmit)}>

            <Grid container columnSpacing={2}>

            <Grid item xs={12} sm={isSmScreen ? 12 : 6} md={6}>
                        
            <TextField
            InputLabelProps={{ shrink: true }}
            InputProps={{ readOnly: true }}
            label={
                <>
                Department<span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
                </>
            }
            defaultValue={editData.department}
            variant="outlined"
            error={!!errors.department}
            fullWidth
            margin="normal"
            {...register("department")}
        
            >
          
            </TextField>


                    <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
                    {errors.department?.message}
                    </div>

                    </Grid>

                <Grid item xs={12} sm={isSmScreen ? 12 : 6} md={6}>

                 <TextField
                    InputLabelProps={{shrink:true}}
                    InputProps={{ readOnly: true }}
                    label={
                        <>
                        Specialization
                        </>
                    }
                    defaultValue={editData.specialization}
                    variant="outlined"
                        fullWidth
                        margin="normal"
                    {...register("specialization")}

             
                    error={!!errors.specialization}
                    
                    SelectProps={{
                        MenuProps: {
                        PaperProps: {
                            style: { maxHeight: 200 },
                        },
                        },
                    }}
                    >
                

                        </TextField>
                        
                        <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
                            {errors.specialization?.message}
                            </div>
                    </Grid>


                <Grid item xs={12} sm={isSmScreen ? 12 : 6} md={6}>
                        <TextField
                    InputLabelProps={{shrink:true}}
                    InputProps={{ readOnly: true }}
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
                   
                      </TextField>
                      
                      <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
                          {errors.doctorName?.message}
                          </div>
                        </Grid>


                <Grid item xs={12} sm={isSmScreen ? 12 : 6} md={6}>
                         
                        <TextField
                        InputLabelProps={{shrink:true}}
                        InputProps={{ readOnly: true }}
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

              <Grid item xs={12} sm={isSmScreen ? 12 : 6} md={6}>

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


                <Grid item xs={12} sm={isSmScreen ? 12 : 6} md={6}>
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


           <Grid item xs={12} sm={isSmScreen ? 12 : 6} md={6}>
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


            <Grid item xs={12} sm={isSmScreen ? 12 : 6} md={6}>

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


             <Grid item xs={12} sm={isSmScreen ? 12 : 6} md={6}>
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


                        <Grid item xs={12} sm={isSmScreen ? 12 : 6} md={6}>
                      
                        <TextField
                        select
                        label={
                            <>
                            Availability Status <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
                            </>
                        }
                        defaultValue={editData.availabilityStatus}
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

export default EditShiftManagement;


/*         const deptDetails = department.find((dept) => dept.departmentName === editData.department);
      
          if (deptDetails) {
            setSpecialization(deptDetails.specialization);
          } else {
            setSpecialization([]);
           
          }
          
          const filteredDoctors = doctor.filter(
            (doc) => doc.specialization === editData.specialization && doc.mobileNo==editData.mobileNo
          );
    
          setAvailableDoctor(filteredDoctors); 
          
           const onDepartmentChange = (e) => {

        setAvailableDoctor([]); 
        setSpecialization([]);

        const selectedDept = e.target.value;
        const deptDetails = department.find((dept) => dept.departmentName === selectedDept);
      
        if (deptDetails) {
          setSpecialization(deptDetails.specialization);
        } else {
          setSpecialization([]);
    
        }
      };
  

      const onSpecializationChange = (e) => {

          setAvailableDoctor([]); 
  
        const selectedSpecialization = e.target.value;
      
        const filteredDoctors = doctor.filter(
          (doc) => doc.specialization === selectedSpecialization
        );

          if(filteredDoctors)
          {
            setAvailableDoctor(filteredDoctors); 
          }
        else {
            setAvailableDoctor([]); 
        }  
  
      };

          */