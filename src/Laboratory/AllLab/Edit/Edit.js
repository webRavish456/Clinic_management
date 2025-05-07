import React, { useEffect, useState } from "react"
import {
    TextField,
    Grid,
    Button,
    Box,
    CircularProgress,
    useMediaQuery,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import * as  yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast, } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Cookies from "js-cookie"

const schema = yup.object().shape({
    labName: yup.string().required("Lab Name is required"),
    labType: yup.string().required("Lab Type is required"),
    assigneeStaff: yup.string().required("Assignee Staff is required"),
    shift: yup.string().required("Shift is required"),
});

const EditAllLab = ({ handleUpdate,  editData, handleClose}) => {
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
            labName: editData.labName || "",
            labType: editData.labType || "",
            assigneeStaff: editData.assigneeStaff || "",
            shift: editData.shift || "",
          });
        }
      }, [editData, reset]);

      const [staff, setStaff] = useState([])

      const [loadingData, setLoadingData] = useState(true)
  
      useEffect(() => {
        const fetchStaffData = async () => {
          try {
            const response = await fetch(`${Base_url}/staff`, {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
      
            const result = await response.text();
            const res = JSON.parse(result);
      
            if (res.status === "success") {
              const formattedData = res.data.map((item) => item.staffName);
              setStaff(formattedData);
            }
          } catch (error) {
            console.error("Error fetching branch data:", error);
          }
        };
      
    
      
        const fetchData = async () => {
          try {
            await Promise.all([fetchStaffData()]);
            setLoadingData(false);
          } catch (error) {
            console.error("Error fetching data:", error);
            setLoadingData(false);
          }
        };
      
        if (loadingData) {
          fetchData();
        }
      
      }, [loadingData]);


    const onSubmit = (data) => {

        setLoading(true)

        const formdata = new FormData();
        formdata.append("labName", data.labName);
        formdata.append("labType", data.labType);
        formdata.append("assigneeStaff", data.assigneeStaff);
        formdata.append("shift", data.shift);
        

        const requestOptions = {
            method: "PATCH",
            body: formdata,
            headers: {
                Authorization: `Bearer ${token}`, 
               },
        };

        fetch(`${Base_url}/alllab/${editData._id}`, requestOptions)
            .then((response) => response.text())

            .then((result) => {

                const res = JSON.parse(result)

                if (res.status === "success") {
                    setLoading(false)

                    toast.success("New AllLab Added Successful!")

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
                                        Lab Name <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
                                    </>
                                }
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                {...register("labName")}
                                error={!!errors.labName}
                            />
                            <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
                                {errors.labName?.message}
                            </div>
                        </Grid>

                        <Grid item xs={12} sm={isSmScreen ? 12 : 6} md={6}>

                            <TextField
                                label={
                                    <>
                                        Lab Type <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
                                    </>
                                }
                                fullWidth
                                margin="normal"
                                type="text"
                                variant="outlined"
                                {...register("labType")}
                                error={!!errors.labType}
                            />
                            <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
                                {errors.labType?.message}
                            </div>

                        </Grid>

                        <Grid item xs={12} sm={isSmScreen ? 12 : 6} md={6}>
                       
                        <FormControl fullWidth margin="normal"
                            variant="outlined"
                            
                            error={!!errors.assigneeStaff}>
                                        <InputLabel>Assignee Staff <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span></InputLabel>
                                        <Select
                                        label="assigneeStaff"
                                         defaultValue={editData.assigneeStaff}
                                        {
                                        ...register("assigneeStaff")
                                        }  >

                                        {staff.map((staff, index) =>(
                                        <MenuItem key={index} value={staff}>
                                            {staff}
                                        </MenuItem>
                                        ))}
                                        </Select>
                                    </FormControl>
                                    <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
                            {errors.assigneeStaff?.message}
                            </div>

                        </Grid>

                        <Grid item xs={12} sm={isSmScreen ? 12 : 6} md={6}>
                            <TextField
                                label={
                                    <>
                                        Shift  <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
                                    </>
                                }
                                type="text"
                                variant="outlined"
                                {...register("shift")}
                                error={!!errors.shift}
                                fullWidth
                                margin="normal"
                            />
                            <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>
                                {errors.shift?.message}
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

export default EditAllLab;