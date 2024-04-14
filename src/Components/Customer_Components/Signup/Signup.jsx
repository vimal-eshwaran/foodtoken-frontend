import * as React from 'react';
import './Signup.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, CircularProgress, Link } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';

// schema validations

export const customerValidation = yup.object({
  name: yup.string().required(),
  email: yup.string().required(),
  password: yup.string().required().min(5, "required min 5 character")
})

const Signup = () => {
  const [click, setClick] = useState(false)
  const [message, setMessage] = useState("")
  const history = useHistory()

  const { values, handleChange, handleSubmit, handleBlur } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: ""
    },
    validationSchema: customerValidation,
    onSubmit: (newcustomer) => {
      setClick(true)
      setMessage()
      addNewCustomer(newcustomer)
    }
  })


  const addNewCustomer = async (newcustomer) => {
    try {

      const response = await fetch("https://foodtoken-backend-1.onrender.com/customer/signup", {
        method: "POST",
        body: JSON.stringify(newcustomer),
        headers: {
          "Content-Type": "application/json"
        }
      })

      const customer = await response.json();

      setClick(false)
      if (customer.message === "succefully signed up") {
        history.push("/customersignin")
        setMessage("")
        return
      }
      else {
        setMessage(customer.message)
      }




    } catch (error) {
      console.log("add customer error ", error)
    }

  }


  return (
    <div className="signupdiv">
      <div className="tittle">
        CUSTOMER SIGNUP HERE :
      </div>
      <Box
        component="form"
        className='signupform'
        onSubmit={handleSubmit}
      >
        <TextField
          required
          id="fullWidth--input"
          label="Name"
          type='text'
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.name}
          name='name'

        />
        <TextField
          required
          id="fullWidth-email-input"
          label="Email"
          type='email'
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          name='email'

        />
        <TextField
          required
          id="fullWidth-password-input"
          label="Password (min 5 character)"
          type="password"
          autoComplete="current-password"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          name='password'
        />
        {
          click ?
            <Box sx={{ display: 'flex', justifyContent: "center" }}>
              <CircularProgress color="success" size="24.8px" />
            </Box>
            :
            <Button type='submit' variant='contained' color='success'>SIGNUP NOW</Button>
        }
        <div className="messagediv" style={{ color: "red" }}>{message}</div>

        <Link style={{ cursor: "pointer" }} onClick={() => history.push("/customersignin")} underline="hover">
          Already have an account? Sign in
        </Link>

      </Box>
    </div>
  );
}


export default Signup;