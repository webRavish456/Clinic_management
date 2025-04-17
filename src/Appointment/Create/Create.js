import React, {useState} from "react"

import {

    TextField,

    Grid,

    useMediaQuery,

    Button,

    Box,

    CircularProgress,

  } from "@mui/material";



import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";

import {  toast } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';

import Cookies from 'js-cookie';





  const schema = yup.object().shape({

    patientName : yup.string().required("Patient Name is required"),

    doctor: yup.string().required("Doctor is required"),

    gender : yup.string().required("Gender is required"),

    date: yup.string().required(" Date is required"),

   

    mobile: yup.string().required(" Mobile is required"),

    email: yup.string().required(" Email is required"),

    
    appointmentStatus: yup.string().required("Appointment Status is required"),

    
    visitType: yup.string().required("Visit  Type is required"),

    

  });



const CreateAppointment =({handleCreate, handleClose})=>

{

  const isSmScreen = useMediaQuery("(max-width:768px)");



    const token = Cookies.get('token');



    const Base_url = process.env.REACT_APP_BASE_URL;

  

    const [loading, setLoading] = useState(false)

  

    const {

      register,

      handleSubmit,

      formState: { errors },

      reset,

    } = useForm({

      resolver: yupResolver(schema),

    });

  



  

  

    const onSubmit = (data) => {

    

           setLoading(true)

           console.log(data);

  

          const formdata = new FormData();

          formdata.append("patientname", data.patientname);

          formdata.append("doctor", data.doctor);

          formdata.append("gender", data.gender);

          formdata.append("date", data.date);

         

          formdata.append("mobile", data.mobile);

          formdata.append("email", data.email);

          
          formdata.append("appointmentstatus", data.appointmentstatus);
          formdata.append("visitType", data.visittype);

          

      

          const requestOptions = {

            method: "POST",

            body: formdata,

            headers: {

              Authorization:` Bearer ${token}`, 

             },

          };

      

          fetch(`${Base_url}/appointment`, requestOptions)

            .then((response) => response.text())

      

            .then((result) => {

      

              const res = JSON.parse(result)

      

              if(res.status==="success")

              {

                setLoading(false)

               

                toast.success(" Appointment Created Successfully!")

                handleCreate(true)

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

          <Grid item xs={12}sm={isSmScreen?12:6} md={6}>

            <TextField

              type="text"

              label={

                <>

                  Patient Name <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>

                </>

              }

              variant="outlined"

              {...register("patientName")}

              error={!!errors.patientName}

              fullWidth

              margin="normal"

            />

            <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>

              {errors.patientName?.message}

            </div>

          </Grid>



          <Grid item xs={12}sm={isSmScreen?12:6} md={6}>

            <TextField

              type="text"

              label={

                <>

                  Doctor <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>

                </>

              }

              variant="outlined"

              {...register("doctor")}

              error={!!errors.doctor}

              fullWidth

              margin="normal"

            />

            <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>

              {errors.doctor?.message}

            </div>

          </Grid>

          <Grid item xs={12}sm={isSmScreen?12:6} md={6}>

            <TextField

              type="text"

              label={

                <>

                  Gender <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>

                </>

              }

              variant="outlined"

              {...register("gender")}

              error={!!errors.gender}

              fullWidth

              margin="normal"

            />

            <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>

              {errors.gender?.message}

            </div>

          </Grid>

          <Grid item xs={12}sm={isSmScreen?12:6} md={6}>

            <TextField
InputLabelProps={{ shrink: true }}
              type="date"

              label={

                <>

                  Date <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>

                </>

              }

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

         

          <Grid item xs={12}sm={isSmScreen?12:6} md={6}>

            <TextField

              type="text"

              label={

                <>

                  Mobile <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>

                </>

              }

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

          <Grid item xs={12}sm={isSmScreen?12:6} md={6}>

            <TextField

              type="text"

              label={

                <>

                  Email <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>

                </>

              }

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

          <Grid item xs={12}sm={isSmScreen?12:6} md={6}>

            <TextField

              type="text"

              label={

                <>

                  Appointment Status <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>

                </>

              }

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

          <Grid item xs={12}sm={isSmScreen?12:6} md={6}>

            <TextField

              type="text"

              label={

                <>

                  Visit Type <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>

                </>

              }

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



export default CreateAppointment;