import * as React from 'react';
import './Signin.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, CircularProgress, Link } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import { useState } from 'react';





const Signin = () => {

  const [click, setClick] = useState(false)
  const [message, setMessage] = useState("")
  const history = useHistory()

  const { values, handleChange, handleSubmit, handleBlur } = useFormik({
    initialValues: {
      email: "customer007@gmail.com",
      password: "12345678"
    },
    onSubmit: (customerSignin) => {
      setClick(true)
      setMessage()
      customerlogin(customerSignin)
    }
  })


  const customerlogin = async (customerSignin) => {
    try {

      const response = await fetch("https://foodtoken-backend-1.onrender.com/customer/login", {
        method: "POST",
        body: JSON.stringify(customerSignin),
        headers: {
          "Content-Type": "application/json"
        }
      })

      const customer = await response.json();
      localStorage.setItem("customertoken", customer.customerToken)
      setClick(false)
      if (customer.customerToken) {
        localStorage.setItem("CustomerName", customer.customerName)
        return history.push("/customerdash")
      }
      else {
        setMessage(customer.message)
      }


    } catch (error) {
      console.log("add customer error ", error)
    }

  }
  return (
    <div className="signindiv">
      <Box
        component="form"
        className='signinform'
        onSubmit={handleSubmit}
      >
        <TextField
          required
          id="outlined-required"
          label="Email"
          type='email'
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          name='email'

        />
        <TextField
          required
          id="outlined-password-input"
          label="Password"
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

            <Button type='submit' variant='contained' color='success'>SIGNIN NOW</Button>
        }

        <div className="messagediv" style={{ color: "red" }}>{message}</div>
        <div className="links">
          <Link style={{ cursor: "pointer" }} onClick={() => history.push("/customerforgotpassword")} underline="hover">
            Forgot password?
          </Link>
          <Link style={{ cursor: "pointer" }} onClick={() => history.push("/customersignup")} underline="hover">
            Don't have an acoount? Signup
          </Link>

        </div>

      </Box>
    </div>
  );
}


export default Signin;