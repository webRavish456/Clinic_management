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
    sourceName: yup.string().required("Source Name is required"),
    
    description: yup.string().required("Description is required"),
    date: yup.string().required(" Date is required"),
   
    amount: yup.string().required("Amount is required"),
    paymentMethod: yup.string().required("Payment Method is required"),
   
});

const EditIncome= ({ handleUpdate,  editData, handleClose}) => {
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
            sourceName: editData.sourceName || "",
            
            description: editData.Description || "",
            date: editData.Date || "",
          
            amount: editData.Amount || "",
            paymentMethod: editData.paymentMethod || "",
            
            
          });
        }
      }, [editData, reset]);


    const onSubmit = (data) => {

        setLoading(true)

        const formdata = new FormData();
        formdata.append("sourceName", data.sourceName);
       
        formdata.append("description", data.description);
        formdata.append("date", data.examdate);
        
        formdata.append("amount", data.amount);
        formdata.append("paymentMethod", data.paymentMethod);
        

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

                    toast.success("New Income Added Successful!")

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
                                        Source Name <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
                                    </>
                                }
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                {...register("sourceName")}
                                error={!!errors.sourceName}
                            />
                            <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
                                {errors.sourceName?.message}
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
                                        Amount <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
                                    </>
                                }
                                type="text"
                                variant="outlined"
                                {...register("amount")}
                                error={!!errors.amount}
                                fullWidth
                                margin="normal"
                            />
                            <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
                                {errors.amount?.message}
                            </div>
                        </Grid>

                        <Grid item xs={12} sm={12} md={6}>
                            <TextField
                                label={
                                    <>
                                        Payment Method <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
                                    </>
                                }
                                type="number"
                                variant="outlined"
                                {...register("paymentMethod")}
                                error={!!errors.paymentMethod}
                                fullWidth
                                margin="normal"
                            />
                            <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
                                {errors.paymentMethod?.message}
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

export default EditIncome;