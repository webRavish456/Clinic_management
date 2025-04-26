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
  department: yup.string().required("Department is required"),
  specialization: yup.string().required("Specialization is required"),
  shiftStartDate: yup.string().required("Shift Start Date is required"),
  shiftEndDate: yup.string().required("Shift End Date is required"),
  workDays: yup.string().required("Work Days is required"),
  shiftHours: yup.string().required("Shift Hours is required"),
  shiftType: yup.string().required("Shift Type is required"),
});



const doctorNames=[
  "r.k Sinha"
]

const EditShiftManagement = ({ handleUpdate,  editData, handleClose}) => {
    const isSmScreen = useMediaQuery("(max-width:768px)");

    const token = Cookies.get('token');

    const Base_url = process.env.REACT_APP_BASE_URL;
  
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
            specialization: editData.specialization || "",
            shiftStartDate: editData.shiftStartDate || "",
            shiftEndDate: editData.shiftEndDate || "",
            workDays: editData.workDays || "",
            shiftHours: editData.shiftHours || "",
            shiftType: editData.shiftType || "",
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

                    toast.success("New ShiftManagement Added Successful!")

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
    helperText={errors.doctorName?.message}
    SelectProps={{
      MenuProps: {
        disableScrollLock: true,
      },
    }}
  >
    {doctorNames.map((method) => (
      <MenuItem key={method} value={method}>
        {method}
      </MenuItem>
    ))}
  </TextField>
                        </Grid>

                        <Grid item xs={12} sm={isSmScreen ? 12 : 6} md={6}>

                            <TextField
                                label={
                                    <>
                                        Department <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
                                    </>
                                }
                                fullWidth
                                margin="normal"
                                type="text"
                                variant="outlined"
                                {...register("department")}
                                error={!!errors.department}
                            />
                            <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
                                {errors.department?.message}
                            </div>

                        </Grid>

                        <Grid item xs={12} sm={isSmScreen ? 12 : 6} md={6}>
                        <TextField
                                label={
                                    <>
                                        Specialization <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
                                    </>
                                }
                                fullWidth
                                margin="normal"
                                type="text"
                                variant="outlined"
                                {...register("specialization")}
                                error={!!errors.specialization}
                            />
                            <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
                                {errors.specialization?.message}
                            </div>

                        </Grid>

                        <Grid item xs={12} sm={isSmScreen ? 12 : 6} md={6}>
                            <TextField
                                label={
                                    <>
                                        Shift Start Date  <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
                                    </>
                                }
                                type="text"
                                variant="outlined"
                                {...register("shiftStartDate")}
                                error={!!errors.shiftStartDate}
                                fullWidth
                                margin="normal"
                            />
                            <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
                                {errors.shiftStartDate?.message}
                            </div>
                        </Grid>


                        <Grid item xs={12} sm={isSmScreen ? 12 : 6} md={6}>
                            <TextField
                                label={
                                    <>
                                        Shift End Date  <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
                                    </>
                                }
                                type="text"
                                variant="outlined"
                                {...register("shiftEndDate")}
                                error={!!errors.shiftEndDate}
                                fullWidth
                                margin="normal"
                            />
                            <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
                                {errors.shiftEndDate?.message}
                            </div>
                        </Grid>


                        <Grid item xs={12} sm={isSmScreen ? 12 : 6} md={6}>
                            <TextField
                                label={
                                    <>
                                        Work Days  <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
                                    </>
                                }
                                type="text"
                                variant="outlined"
                                {...register("workDays")}
                                error={!!errors.workDays}
                                fullWidth
                                margin="normal"
                            />
                            <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
                                {errors.workDays?.message}
                            </div>
                        </Grid>


                        <Grid item xs={12} sm={isSmScreen ? 12 : 6} md={6}>
                            <TextField
                                label={
                                    <>
                                        Shift Hours  <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
                                    </>
                                }
                                type="text"
                                variant="outlined"
                                {...register("shiftHours")}
                                error={!!errors.shiftHours}
                                fullWidth
                                margin="normal"
                            />
                            <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
                                {errors.shiftHours?.message}
                            </div>
                        </Grid>


                        <Grid item xs={12} sm={isSmScreen ? 12 : 6} md={6}>
                            <TextField
                                label={
                                    <>
                                        Shift Type  <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
                                    </>
                                }
                                type="text"
                                variant="outlined"
                                {...register("shiftType")}
                                error={!!errors.shiftType}
                                fullWidth
                                margin="normal"
                            />
                            <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
                                {errors.shiftType?.message}
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