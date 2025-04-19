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

    sourceName: yup.string().required("Source Name is required"),

    
    description: yup.string().required(" Description is required"),

    date: yup.string().required(" Date is required"),

   

    amount: yup.string().required(" Amount is required"),

    paymentMethod: yup.string().required(" Payment Method is required"),

    
    

    

  });



const CreateIncome =({handleCreate, handleClose})=>

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

          formdata.append("sourceName", data.sourceName);

          

          formdata.append("description", data.description);

          formdata.append("date", data.date);

          

          formdata.append("amount", data.amount);

          formdata.append("paymentMethod", data.paymentMethod);

          

          

      

          const requestOptions = {

            method: "POST",

            body: formdata,

            headers: {

              Authorization:` Bearer ${token}`, 

             },

          };

      

          fetch(`${Base_url}/income`, requestOptions)

            .then((response) => response.text())

      

            .then((result) => {

      

              const res = JSON.parse(result)

      

              if(res.status==="success")

              {

                setLoading(false)

               

                toast.success(" Income Created Successfully!")

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

          <Grid item xs={12}>

            <TextField

              type="text"

              label={

                <>

                  Source Name <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>

                </>

              }

              variant="outlined"

              {...register("sourceName")}

              error={!!errors.sourceName}

              fullWidth

              margin="normal"

            />

            <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>

              {errors.sourceName?.message}

            </div>

          </Grid>



          
  

          <Grid item xs={12}sm={isSmScreen?12:6} md={6}>

            <TextField

              type="text"

              label={

                <>

                  Description <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>

                </>

              }

              variant="outlined"

              {...register("description")}

              error={!!errors.description}

              fullWidth

              margin="normal"

            />

            <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>

              {errors.description?.message}

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

                  Amount <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>

                </>

              }

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

          <Grid item xs={12}sm={isSmScreen?12:6} md={6}>

            <TextField

              type="text"

              label={

                <>

                  Payment Method <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>

                </>

              }

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



        



        <Box className="submit" sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 2 }}>

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



export default CreateIncome;