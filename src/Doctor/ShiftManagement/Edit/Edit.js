import React, { useState } from "react";
import {
  TextField,
  Grid,
  useMediaQuery,
  Button,
  Box,
  CircularProgress,
  MenuItem,
  FormHelperText,
  FormControl,
  Select,
  InputLabel,
} from "@mui/material";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

const schema = yup.object().shape({
  doctorname: yup.string().required("Doctor Name is required"),
  department: yup.string().required("Department is required"),
  specialization: yup.string().required("Specialization is required"),
  shiftstartdate: yup.string().required("Shift Start Date is required"),
  shiftenddate: yup.string().required("Shift End Date is required"),
  workdays: yup.string().required("Work Days is required"),
  shifthours: yup.string().required("Shift Hours is required"),
  shifttype: yup.string().required("Shift Type is required"),
});

const EditShiftManagement = ({ handleCreate, handleClose }) => {
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

  const onSubmit = (data) => {
    setLoading(true);
    console.log(data);

    const formdata = new FormData();
    formdata.append("doctorname", data.doctorname);
    formdata.append("department", data.department);
    formdata.append("specialization", data.specialization);
    formdata.append("shiftstartdate", data.shiftstartdate);
    formdata.append("shiftenddate", data.shiftenddate);
    formdata.append("workdays", data.workdays);
    formdata.append("shifthours", data.shifthours);
    formdata.append("shifttype", data.shifttype);

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
        const res = JSON.parse(result);

        if (res.status === "success") {
          setLoading(false);
          toast.success("Shift Management Edit Successfully!");
          handleCreate(true);
          handleClose();
        } else {
          setLoading(false);
          toast.error(res.message);
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container columnSpacing={2}>
        < Grid item xs={12} sm={isSmScreen?12:6} md={6}>
          <FormControl fullWidth margin="normal" error={!!errors.doctorname}>
              <InputLabel id="doctorname-label">
                Doctor Name<span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
              </InputLabel>
              <Select
                labelId="DoctorName-label"
                id="doctorname"
                label="doctorname"
                defaultValue=""
                {...register("DoctorName")}
              >
                <MenuItem value="complete">Complete</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="uncomplete">Uncomplete</MenuItem>
              </Select>
              <FormHelperText>{errors.doctorname?.message}</FormHelperText>
            </FormControl>
            </Grid>

            < Grid item xs={12} sm={isSmScreen?12:6} md={6}>
          <FormControl fullWidth margin="normal" error={!!errors.department}>
              <InputLabel id="department-label">
                Department<span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
              </InputLabel>
              <Select
                labelId="department-label"
                id="department"
                label="department"
                defaultValue=""
                {...register("department")}
              >
                <MenuItem value="complete">Complete</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="uncomplete">Uncomplete</MenuItem>
              </Select>
              <FormHelperText>{errors.department?.message}</FormHelperText>
            </FormControl>
            </Grid>

            < Grid item xs={12} sm={isSmScreen?12:6} md={6}>
          <FormControl fullWidth margin="normal" error={!!errors.taskStatus}>
              <InputLabel id="specialization-label">
                Specialization<span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
              </InputLabel>
              <Select
                labelId="specialization-label"
                id="specialization"
                label="specialization"
                defaultValue=""
                {...register("specialization")}
              >
                <MenuItem value="complete">Complete</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="uncomplete">Uncomplete</MenuItem>
              </Select>
              <FormHelperText>{errors.specialization?.message}</FormHelperText>
            </FormControl>
            </Grid>

            < Grid item xs={12} sm={isSmScreen?12:6} md={6}>
            <TextField
              type="text"
              label={
                <>
                  Shift Start Date{" "}
                  <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
                </>
              }
              variant="outlined"
              {...register("shiftstartdate")}
              error={!!errors.shiftstartdate}
              fullWidth
              margin="normal"
            />
            <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
              {errors.shiftstartdate?.message}
            </div>
          </Grid>

          < Grid item xs={12} sm={isSmScreen?12:6} md={6}>
            <TextField
              type="text"
              label={
                <>
                  Shift End Date{" "}
                  <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
                </>
              }
              variant="outlined"
              {...register("shiftenddate")}
              error={!!errors.shiftenddate}
              fullWidth
              margin="normal"
            />
            <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
              {errors.shiftenddate?.message}
            </div>
          </Grid>

          < Grid item xs={12} sm={isSmScreen?12:6} md={6}>
            <TextField
              type="text"
              label={
                <>
                  Work Days{" "}
                  <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
                </>
              }
              variant="outlined"
              {...register("workdays")}
              error={!!errors.workdays}
              fullWidth
              margin="normal"
            />
            <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
              {errors.workdays?.message}
            </div>
          </Grid>

          < Grid item xs={12} sm={isSmScreen?12:6} md={6}>
            <TextField
              type="text"
              label={
                <>
                  Shift Hours{" "}
                  <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
                </>
              }
              variant="outlined"
              {...register("shifthours")}
              error={!!errors.shifthours}
              fullWidth
              margin="normal"
            />
            <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
              {errors.shifthours?.message}
            </div>
          </Grid>

          < Grid item xs={12} sm={isSmScreen?12:6} md={6}>
            <TextField
              type="text"
              label={
                <>
                  Shift Type{" "}
                  <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
                </>
              }
              variant="outlined"
              {...register("shifttype")}
              error={!!errors.shifttype}
              fullWidth
              margin="normal"
            />
            <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
              {errors.shifttype?.message}
            </div>
          </Grid>
        </Grid>

        <Box
          sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 2 }}
        >
          <Button onClick={handleClose} className="secondary_button">
            Cancel
          </Button>
          <Button type="submit" className="primary_button">
            {loading ? (
              <>
                <CircularProgress
                  size={18}
                  style={{ marginRight: 8, color: "#fff" }}
                />
                Submitting
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </Box>
      </form>
    </>
  );
};

export default EditShiftManagement;
