import React, { useEffect, useState } from "react"
import {
    TextField,
    Grid,
    MenuItem,
    InputLabel,
    FormControl,
    Select,
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
    transactionId: yup.string().required("Transaction Id is required"),
    description: yup.string().required("Description is required"),
    dateReceived: yup.string().required(" Date Received is required"),
   
    amount: yup.string().required("Amount is required"),
    paymentMethod: yup.string().required("Payment Method is required"),
    status: yup.string().required("Status is required"),



    
});

const paymentMethods = [
    "Cash",
    "UPI",
    "Bank Transfer",
    "Credit Card",
  "Debit Card",
  ];
  


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
            transactionId: editData.transactionId || "",
            description: editData.description || "",
            dateReceived: editData.dateReceived || "",
          
            amount: editData.Amount || "",
            paymentMethod: editData.paymentMethod || "",
            status: editData.status || "",
            
            
          });
        }
      }, [editData, reset]);


    const onSubmit = (data) => {

        setLoading(true)

        const formdata = new FormData();
        formdata.append("sourceName", data.sourceName);
        formdata.append("transactionId", data.transactionId);
       
        formdata.append("description", data.description);
        formdata.append("dateReceived", data.dateReceived);
        
        formdata.append("amount", data.amount);
        formdata.append("paymentMethod", data.paymentMethod);
        formdata.append("status", data.status);

        const requestOptions = {
            method: "PATCH",
            body: formdata,
            headers: {
                Authorization:`Bearer ${token}`, 
               },
        };

        fetch(`${Base_url}/income/${editData._id}`, requestOptions)
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
                                label={
                                    <>
                                        Transaction Id<span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
                                    </>
                                }
                                fullWidth
                                margin="normal"
                                type="text"
                                variant="outlined"
                                {...register("transactionId")}
                                error={!!errors.transactionId}
                            />
                            <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
                                {errors.transactionId?.message}
                            </div>

                        </Grid>

                        <Grid item xs={12} sm={isSmScreen ? 12 : 6} md={6}>
                            <TextField
                            InputLabelProps={{ shrink: true }}
                                label={
                                    <>
                                     Date Received  <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
                                    </>
                                }
                                type="date"
                                variant="outlined"
                                {...register("dateReceived")}
                                error={!!errors.dateReceived}
                                fullWidth
                                margin="normal"
                            />
                            <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
                                {errors.dateReceived?.message}
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
<Grid item xs={12} sm={isSmScreen ? 12 : 6} md={6}>
            <TextField
              select
              label={
                <>
                  Payment Method <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
                </>
              }
              variant="outlined"
              fullWidth
              margin="normal"
              {...register("paymentMethod")}
              error={!!errors.paymentMethod}
              helperText={errors.paymentMethod?.message}
              SelectProps={{
                MenuProps: {
                  disableScrollLock: true,
                },
              }}
            >
              {paymentMethods.map((method) => (
                <MenuItem key={method} value={method}>
                  {method}
                </MenuItem>
              ))}
            </TextField>
                       
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
  <FormControl fullWidth margin="normal" error={!!errors.status}>
    <InputLabel id="status-label">
      Status <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
    </InputLabel>
    <Select
      labelId="status-label"
      id="status"
      {...register("status")}
      defaultValue=""
    >
      <MenuItem value="Paid">Paid</MenuItem>
      <MenuItem value="Pending">Pending</MenuItem>
      <MenuItem value="Cancelled">Cancelled</MenuItem>
      <MenuItem value="Failed">Failed</MenuItem>
    </Select>
    <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
      {errors.status?.message}
    </div>
  </FormControl>
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