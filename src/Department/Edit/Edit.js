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
    si: yup.string().required("Si is required"),
    departmentName: yup.string().required("Department Name is required"),
    date: yup.string().required("Secialization is required"),
    description: yup.string().required(" Description is required"),
    departmentHead: yup.string().required("Department Head is required"),
    date:yup.string().required("Date is required"),

});

const EditDepartment= ({ handleUpdate,  editData, handleClose}) => {
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
           si : editData.si|| "",
           departmentHead: editData.departmentHead || "",
            specialization: editData. specialization|| "",
            description: editData.description|| "",
           departmentName : editData.departmentName|| "",
            date: editData.date || "",
            
            
          });
        }
      }, [editData, reset]);


    const onSubmit = (data) => {

        setLoading(true)

        const formdata = new FormData();
        formdata.append("si ", data.si );
        formdata.append(" departmentName", data. departmentName);
        formdata.append(" specialization", data. specialization);
        formdata.append("description", data.description);
        formdata.append("departmentHead", data.departmentHead);
        formdata.append(" date", data. date);
       

        const requestOptions = {
            method: "PATCH",
            body: formdata,
            headers: {
                Authorization:`Bearer ${token}`, 
               },
        };

        fetch(`${Base_url}/department/${editData._id}`, requestOptions)
            .then((response) => response.text())

            .then((result) => {

                const res = JSON.parse(result)

                if (res.status === "success") {
                    setLoading(false)

                    toast.success("New Department Added Successful!")

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
                                     Department Name   <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
                                    </>
                                }
                                fullWidth
                                margin="normal"
                                type="text"
                                variant="outlined"
                                {...register("departmentName")}
                                error={!!errors.departmentName}
                            />
                            <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
                                {errors.departmentName?.message}
                            </div></Grid>

<Grid item xs={12} sm={isSmScreen ? 12 : 6} md={6}>
    <TextField
        label={
            <>
             specialization <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
            </>
        }
        type="text"
        variant="outlined"
        {...register("specialization")}
        error={!!errors.specialization}
        fullWidth
        margin="normal"
    />
    <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
        {errors.specialization?.message}
    </div>

                        </Grid>

                        <Grid item xs={12} sm={isSmScreen ? 12 : 6} md={6}>
                        <TextField
                                label={
                                    <>
                                        Description<span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
                                    </>
                                }
                                fullWidth
                                margin="normal"
                                type="text"
                                variant="outlined"
                                {...register("description")}
                                error={!!errors.description}
                            />
                            <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
                                {errors.description?.message}
                            </div>

                        </Grid>

                        <Grid item xs={12} sm={isSmScreen ? 12 : 6} md={6}>
                            <TextField
                                label={
                                    <>
                                     Department Head  <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
                                    </>
                                }
                                type="text"
                                variant="outlined"
                                {...register("departmeentHead")}
                                error={!!errors.departmentHead}
                                fullWidth
                                margin="normal"
                            />
                            <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
                                {errors.departmentHead?.message}
                            </div>
                        </Grid>

                        <Grid item xs={12} sm={12} md={6}>
                            <TextField
                            InputLabelProps={{ shrink: true }}
                                label={
                                    <>
                                        Date <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
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

export default EditDepartment;