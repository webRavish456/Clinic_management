import React, { useEffect, useState } from "react";
import {
  TextField,
  Grid,
  Button,
  Box,
  CircularProgress,
  useMediaQuery,
} from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

const schema = yup.object().shape({
  patientName: yup.string().required("Patient Name is required"),
  doctor: yup.string().required("Doctor is required"),
  gender: yup.string().required("Gender is required"),
  date: yup.string().required("Date is required"),
  
  mobile: yup.string().required("Mobile is required"),
  email: yup.string().required("Email is required"),
  appointmentStatus: yup.string().required("Appointment Status is required"),
  visitType: yup.string().required("Visit Type is required"),
 
});

const EditAppointment = ({ handleUpdate, editData, handleClose }) => {
  const isSmScreen = useMediaQuery("(max-width:768px)");
  const token = Cookies.get("token");
  const Base_url = process.env.REACT_APP_BASE_URL;

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (editData) {
      reset({
        patientName: editData.patientName || "",
        doctor: editData.doctor || "",
        gender: editData.gender || "",
        date: editData.date || "",
        mobile: editData.mobile || "",
        email: editData.email || "",
        appointmentStatus: editData.appointmentStatus || "",
        visitType: editData.visitType || "",
       
      });
    }
  }, [editData, reset]);

  const onSubmit = (data) => {
 

    setLoading(true);

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
        Authorization: `Bearer ${token}`,
      },
    };

    fetch(`${Base_url}/appointment/${editData._id}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        try {
          const res = JSON.parse(result);
          if (res.status === "success") {
            toast.success("Appointment updated successfully!");
            handleUpdate(true);
            handleClose();
            reset();
          } else {
            toast.error(res.message);
          }
        } catch (err) {
          toast.error("Something went wrong while updating.");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Server error.");
        setLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label={
              <>
                Patient Name <span style={{ color: "red" }}>*</span>
              </>
            }
            fullWidth
            margin="normal"
            variant="outlined"
            {...register("patientName")}
            error={!!errors.patientName}
          />
          <div style={{ color: "red", fontSize: "0.8rem" }}>
            {errors.patientName?.message}
          </div>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label={
              <>
                Doctor <span style={{ color: "red" }}>*</span>
              </>
            }
            fullWidth
            margin="normal"
            variant="outlined"
            {...register("doctor")}
            error={!!errors.doctor}
          />
          <div style={{ color: "red", fontSize: "0.8rem" }}>
            {errors.doctor?.message}
          </div>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label={
              <>
                Gender <span style={{ color: "red" }}>*</span>
              </>
            }
            fullWidth
            margin="normal"
            variant="outlined"
            {...register("gender")}
            error={!!errors.gender}
          />
          <div style={{ color: "red", fontSize: "0.8rem" }}>
            {errors.gender?.message}
          </div>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label={
              <>
                Date <span style={{ color: "red" }}>*</span>
              </>
            }
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            {...register("date")}
            error={!!errors.date}
          />
          <div style={{ color: "red", fontSize: "0.8rem" }}>
            {errors.date?.message}
          </div>
        </Grid>

        

        <Grid item xs={12} sm={6}>
          <TextField
            label={
              <>
                Mobile <span style={{ color: "red" }}>*</span>
              </>
            }
           
            fullWidth
            margin="normal"
            variant="outlined"
            {...register("mobile")}
            error={!!errors.mobile}
          />
          <div style={{ color: "red", fontSize: "0.8rem" }}>
            {errors.mobile?.message}
          </div>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label={
              <>
                Email <span style={{ color: "red" }}>*</span>
              </>
            }
            fullWidth
            margin="normal"
            variant="outlined"
            {...register("email")}
            error={!!errors.email}
          />
          <div style={{ color: "red", fontSize: "0.8rem" }}>
            {errors.email?.message}
          </div>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label={
              <>
                Appointment Status <span style={{ color: "red" }}>*</span>
              </>
            }
            fullWidth
            margin="normal"
            variant="outlined"
            {...register("appointmentStatus")}
            error={!!errors.appointmentStatus}
          />
          <div style={{ color: "red", fontSize: "0.8rem" }}>
            {errors.appointmentStatus?.message}
          </div>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label={
              <>
                Visit Type <span style={{ color: "red" }}>*</span>
              </>
            }
            fullWidth
            margin="normal"
            variant="outlined"
            {...register("visitType")}
            error={!!errors.visitType}
          />
          <div style={{ color: "red", fontSize: "0.8rem" }}>
            {errors.visitType?.message}
          </div>
        </Grid>
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 3 }}>
        <Button onClick={handleClose} className="secondary_button">
          Cancel
        </Button>
        <Button type="submit" className="primary_button">
          {loading ? (
            <>
              <CircularProgress size={18} style={{ marginRight: 8, color: "#fff" }} />
              Submitting
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </Box>
    </form>
  );
};

export default EditAppointment;