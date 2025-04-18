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

    

    departmentName: yup.string().required("Department Name is required"),

    specialization: yup.string().required("Specialization  is required"),

    description: yup.string().required(" Description is required"),

    departmentHead: yup.string().required(" Department Head  is required"),

    date: yup.string().required("  Date is required"),
    

  });



const CreateDepartment =({handleCreate, handleClose})=>

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

          

          formdata.append("departmentName", data.departmentName);

          formdata.append("specialization", data.specialization);
          formdata.append("description", data.description);
          formdata.append("departmentHead", data.departmentHead);

          formdata.append("date", data.date);


      

          const requestOptions = {

            method: "POST",

            body: formdata,

            headers: {

              Authorization:` Bearer ${token}`, 

             },

          };

      

          fetch(`${Base_url}/department`, requestOptions)

            .then((response) => response.text())

      

            .then((result) => {

      

              const res = JSON.parse(result)

      

              if(res.status==="success")

              {

                setLoading(false)

               

                toast.success(" Department Created Successfully!")

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

                  Department Name <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>

                </>

              }

              variant="outlined"

              {...register("departmentName")}

              error={!!errors.departmentName}

              fullWidth

              margin="normal"

            />

            <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>

              {errors.departmentName?.message}

            </div>

          </Grid>

          <Grid item xs={12}  sm={isSmScreen?12:6} md={6}>

            <TextField

              type="text"

              label={

                <>

                  Specialization<span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>

                </>

              }

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

          <Grid item xs={12}sm={isSmScreen?12:6} md={6}>

            <TextField

              type="text"

              label={

                <>

                  Description<span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>

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

              type="text"

              label={

                <>

                  Department Head <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>

                </>

              }

              variant="outlined"

              {...register("departmentHead")}

              error={!!errors.departmentHead}

              fullWidth

              margin="normal"

            />

            <div style={{ color: "rgba(240, 68, 56, 1)", fontSize: "0.8rem" }}>

              {errors.departmentHead?.message}

            </div>

          </Grid>

          <Grid item xs={12} sm={isSmScreen?12:6} md={6}>

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



export default CreateDepartment;