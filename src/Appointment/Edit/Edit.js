import React, { useEffect, useState } from "react"
import {
    TextField,
    Grid,
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
    patientName: yup.string().required("Patient Name is required"),
    doctor: yup.string().required("Doctor is required"),
    gender: yup.string().required("Gender is required"),
    date: yup.string().required(" Date is required"),
    
    mobile: yup.string().required("Mobile  is required"),
    email: yup.string().required("Email is required"),
    appointmentStatus: yup.string().required("Appointment Status is required"),
    visitType: yup.string().required("Visit Type is required"),
});

const EditAppointment= ({ handleUpdate,  editData, handleClose}) => {
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
            patientName: editData.patientName|| "",
            doctor: editData.doctor|| "",
            gender: editData.gender || "",
            date: editData.Date || "",
            
             mobile: editData.mobile || "",
            appointmenStatus: editData.appointmentStatus || "",

            visitType: editData.visitType|| "",
            
          });
        }
      }, [editData, reset]);


    const onSubmit = (data) => {

        setLoading(true)

        const formdata = new FormData();
        formdata.append("patientName", data.patientName);
        formdata.append("doctor", data.doctor);
        formdata.append("gender", data.gender);
        formdata.append("date", data.date);
       
        formdata.append("mobile", data.mobile);
        formdata.append("email", data.email);
        formdata.append("appointmentStatus", data.appointmentStatus);
        formdata.append("visitType", data.visitType);



        const requestOptions = {
            method: "PATCH",
            body: formdata,
            headers: {
                Authorization:`Bearer ${token}`, 
               },
        };

        fetch(`${Base_url}/exam/${editData._id}`, requestOptions)
            .then((response) => response.text())

            .then((result) => {

                const res = JSON.parse(result)

                if (res.status === "success") {
                    setLoading(false)

                    toast.success("New Appointment Added Successful!")

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
                            type="text"
                                label={
                                    <>
                                        Patient Name <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
                                    </>
                                }
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                {...register("patientName")}
                                error={!!errors.patientName}
                            />
                            <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
                                {errors.patientName?.message}
                            </div>
                        </Grid>

                        <Grid item xs={12} sm={isSmScreen ? 12 : 6} md={6}>

                            <TextField
                                label={
                                    <>
                                    Doctor <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
                                    </>
                                }
                                fullWidth
                                margin="normal"
                                type="text"
                                variant="outlined"
                                {...register("doctor")}
                                error={!!errors.doctor}
                            />
                            <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
                                {errors.doctor?.message}
                            </div>

                        </Grid>

                        <Grid item xs={12} sm={isSmScreen ? 12 : 6} md={6}>
                        <TextField
                                label={
                                    <>
                                        Gender<span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
                                    </>
                                }
                                fullWidth
                                margin="normal"
                                type="text"
                                variant="outlined"
                                {...register("gender")}
                                error={!!errors.gender}
                            />
                            <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
                                {errors.gender?.message}
                            </div>

                        </Grid>

                        <Grid item xs={12} sm={isSmScreen ? 12 : 6} md={6}>
                            <TextField
                            InputLabelProps={{ shrink: true }}
                                label={
                                    <>
                                     Date  <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
                                    </>
                                }
                                type="date"
                                variant="outlined"
                                {...register("date")}
                                error={!!errors.date}
                                fullWidth
                                margin="normal"
                            />
                            <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
                                {errors.date?.message}
                            </div>
                        </Grid>

                        <Grid item xs={12} sm={12} md={6}>
                            <TextField
                                label={
                                    <>
                                        Time <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
                                    </>
                                }
                                type="text"
                                variant="outlined"
                                {...register("time")}
                                error={!!errors.time}
                                fullWidth
                                margin="normal"
                            />
                            <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
                                {errors.time?.message}
                            </div>
                        </Grid>

                        <Grid item xs={12} sm={12} md={6}>
                            <TextField
                                label={
                                    <>
                                    Mobile <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
                                    </>
                                }
                                type="text"
                                variant="outlined"
                                {...register("mobile")}
                                error={!!errors.mobile}
                                fullWidth
                                margin="normal"
                            />
                            <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
                                {errors.mobile?.message}
                            </div>
                        </Grid>

                        <Grid item xs={12} sm={12} md={6}>
                            <TextField
                                label={
                                    <>
                                        Email<span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
                                    </>
                                }
                                type="number"
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


                        <Grid item xs={12} sm={12} md={6}>
                            <TextField
                                label={
                                    <>
                                        Appointment Status<span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
                                    </>
                                }
                                type="number"
                                variant="outlined"
                                {...register("appointmentStatus")}
                                error={!!errors.appointmentStatus}
                                fullWidth
                                margin="normal"
                            />
                            <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
                                {errors.appointmentStatus?.message}
                            </div>
                        
                        </Grid>   
                        <Grid item xs={12} sm={12} md={6}>
                            <TextField
                                label={
                                    <>
                                        visit Type<span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
                                    </>
                                }
                                type="text"
                                variant="outlined"
                                {...register("visitType")}
                                error={!!errors.visitType}
                                fullWidth
                                margin="normal"
                            />
                            <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
                                {errors.visitType?.message}
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

export default EditAppointment;