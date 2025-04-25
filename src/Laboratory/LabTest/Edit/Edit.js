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
    mobileNo: yup.string().required("Mobile No is required"),
    gender: yup.string().required("Gender is required"),
    treatment: yup.string().required("Treatment is required"),
    testName: yup.string().required("Test Name Name is required"),
    doctorName: yup.string().required("Doctor Name is required"),
    assignedLabTechnician: yup.string().required("Assigned Lab Technician is required"),
    sampleCollectedOn: yup.string().required("Sample Collected On is required"),
    result: yup.string().required("Result is required"),
});

const EditLabTest = ({ handleUpdate,  editData, handleClose}) => {
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
            patientName: editData.patientName || "",
            mobileNo: editData.mobileNo || "",
            gender: editData.gender || "",
            treatment: editData.treatment || "",
            testName: editData.testName || "",
            doctorName: editData.doctorName || "",
            assignedLabTechnician: editData.assignedLabTechnician || "",
            sampleCollectedOn: editData.sampleCollectedOn || "",
            result: editData.result || "",
          });
        }
      }, [editData, reset]);


    const onSubmit = (data) => {

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
            method: "PATCH",
            body: formdata,
            headers: {
                Authorization: `Bearer ${token}`, 
               },
        };

        fetch(`${Base_url}/labtest/${editData._id}`, requestOptions)
            .then((response) => response.text())

            .then((result) => {

                const res = JSON.parse(result)

                if (res.status === "success") {
                    setLoading(false)

                    toast.success("New LabTest Added Successful!")

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
                                label={
                                    <>
                                        Test Name  <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
                                    </>
                                }
                                type="text"
                                variant="outlined"
                                {...register("testName")}
                                error={!!errors.testName}
                                fullWidth
                                margin="normal"
                            />
                            <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
                                {errors.testName?.message}
                            </div>
                        </Grid>  
                       
                        <Grid item xs={12} sm={isSmScreen ? 12 : 6} md={6}>
                            <TextField
                                label={
                                    <>
                                        Assigned Lab Technician  <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
                                    </>
                                }
                                type="text"
                                variant="outlined"
                                {...register("assignedLabTechnician")}
                                error={!!errors.assignedLabTechnician}
                                fullWidth
                                margin="normal"
                            />
                            <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
                                {errors.assignedLabTechnician?.message}
                            </div>
                        </Grid>  
                        <Grid item xs={12} sm={isSmScreen ? 12 : 6} md={6}>
                            <TextField
                                label={
                                    <>
                                        Sample Collected On  <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
                                    </>
                                }
                                type="text"
                                variant="outlined"
                                {...register("sampleCollectedOn")}
                                error={!!errors.sampleCollectedOn}
                                fullWidth
                                margin="normal"
                            />
                            <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
                                {errors.sampleCollectedOn?.message}
                            </div>
                        </Grid>  
                        <Grid item xs={12} sm={isSmScreen ? 12 : 6} md={6}>
                            <TextField
                                label={
                                    <>
                                        Result  <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
                                    </>
                                }
                                type="text"
                                variant="outlined"
                                {...register("result")}
                                error={!!errors.result}
                                fullWidth
                                margin="normal"
                            />
                            <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
                                {errors.result?.message}
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

export default EditLabTest;