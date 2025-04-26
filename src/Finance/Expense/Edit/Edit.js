import React, { useEffect, useState } from "react";
import {
  TextField,
  Grid,
  MenuItem,
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
  expenseCategory: yup.string().required("Expense Category is required"),
  transactionId: yup.string().required("Transaction ID is required"),
  payeeName: yup.string().required("Payee Name is required"),
  datePaid: yup.string().required("Date Paid is required"),
  amount: yup.string().required("Amount is required"),
  paymentMethod: yup.string().required("Payment Method is required"),
  status: yup.string().required("Status is required"),
});

// Status options
const statuses = [
  "Paid",
  "Pending",
  "Cancelled",
  "Failed",

];
const paymentMethods = [
  "Cash",
  "UPI",
  "Bank Transfer",
  "Credit Card",
  "Debit Card",


];



const EditExpense = ({ handleUpdate, editData, handleClose }) => {
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
        expenseCategory: editData.expenseCategory || "",
        transactionId: editData.transactionId || "",
        payeeName: editData.payeeName || "",
        datePaid: editData.datePaid || "",
        amount: editData.amount || "",
        paymentMethod: editData.paymentMethod || "",
        status: editData.status || "",
      });
    }
  }, [editData, reset]);

  console.log(editData)

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formdata = new FormData();
      formdata.append("expenseCategory", data.expenseCategory);
      formdata.append("transactionId", data.transactionId);
      formdata.append("payeeName", data.payeeName);
      formdata.append("datePaid", data.datePaid);
      formdata.append("amount", data.amount);
      formdata.append("paymentMethod", data.paymentMethod);
      formdata.append("status", data.status);

      const response = await fetch(`${Base_url}/expense/${editData._id}`, {
        method: "PATCH",
        body: formdata,
        headers: {
          Authorization:`Bearer ${token}`,
        },
      });

      const res = await response.json();

      if (res.status === "success") {
        toast.success("Expense updated successfully!");
        handleUpdate(true);
        handleClose();
        reset();
      } else {
        toast.error(res.message || "Failed to update expense.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
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
                  Expense Category{" "}
                  <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
                </>
              }
              fullWidth
              margin="normal"
              variant="outlined"
              {...register("expenseCategory")}
              error={!!errors.expenseCategory}
            />
            <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
              {errors.expenseCategory?.message}
            </div>
          </Grid>

          <Grid item xs={12} sm={isSmScreen ? 12 : 6} md={6}>
            <TextField
              type="text"
              label={
                <>
                  Transaction ID{" "}
                  <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
                </>
              }
              fullWidth
              margin="normal"
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
              type="text"
              label={
                <>
                  Payee Name <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
                </>
              }
              fullWidth
              margin="normal"
              variant="outlined"
              {...register("payeeName")}
              error={!!errors.payeeName}
            />
            <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
              {errors.payeeName?.message}
            </div>
          </Grid>

          <Grid item xs={12} sm={isSmScreen ? 12 : 6} md={6}>
            <TextField
              type="date"
              InputLabelProps={{ shrink: true }}
              label={
                <>
                  Date Paid <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
                </>
              }
              fullWidth
              margin="normal"
              variant="outlined"
              {...register("datePaid")}
              error={!!errors.datePaid}
            />
            <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
              {errors.datePaid?.message}
            </div>
          </Grid>

          <Grid item xs={12} sm={12} md={6}>
            <TextField
              type="text"
              label={
                <>
                  Amount <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
                </>
              }
              fullWidth
              margin="normal"
              variant="outlined"
              {...register("amount")}
              error={!!errors.amount}
            />
            <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
              {errors.amount?.message}
            </div>
          </Grid>
 <Grid item xs={12} sm={6}>
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
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label={
                <>
                  Status <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
                </>
              }
              fullWidth
              margin="normal"
              variant="outlined"
              {...register("status")}
              error={!!errors.status}
              helperText={errors.status?.message}
            >
              {statuses.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 2 }}>
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
    </>
  );
};

export default EditExpense;