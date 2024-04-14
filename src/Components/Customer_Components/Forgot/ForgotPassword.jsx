import * as React from 'react';
import './Forgot.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField'; 
import { Button, CircularProgress, Link } from '@mui/material';
import { Route, Switch, useHistory, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useEffect } from 'react';
import { decodeToken } from 'react-jwt';

const Customerforgot = () => {

  return (
    <div className="customerforgotdiv">
      <div className="tittle">
        CUSTOMER FORGOT HERE :
      </div>


      <Switch>
        <Route exact path="/customerforgotpassword">
          {/* Email checking component */}
          <Emailverification />
        </Route>
        <Route path="/customerforgotpassword/otp/:otp">
          {/* otp component  */}
          <OtpVerification />
        </Route>
        <Route path="/customerforgotpassword/newpassword/:newpassword">
          {/* password changing component  */}
          <ResetPaasword />
        </Route>
      </Switch>
    </div>
  );
}


export default Customerforgot;

// email checking compnent
const Emailverification = () => {

  const [click, setClick] = useState(false)
  const history = useHistory()
  const [message, setMessage] = useState("")
  // formik method to check email
  const { handleSubmit, values, handleChange } = useFormik(
    {
      initialValues: {
        email: localStorage.getItem("customeremail")
      },
      onSubmit: (email) => {
        setClick(true)
        setMessage()
        verify(email)
      }

    }
  )
  // fetch method
  const verify = async (email) => {
    try {


      const response = await fetch("https://foodtoken-backend-1.onrender.com/customer/forgotpassword", {
        method: "POST",
        body: JSON.stringify(email),
        headers: {
          "Content-Type": "application/json"
        }
      })

      const data = await response.json()
      setMessage(data.message)
      setClick(false)
      localStorage.setItem("customeremail", values.email)
      if (data.message === "Email sent successfully") history.push(`/customerforgotpassword/otp/${data.path}`)

    } catch (error) {
      console.log("email verification error", error)
    }
  }


  return (
    <Box
      component="form"
      className='customerforgotform'
      onSubmit={handleSubmit}
    >
      {message && <h5 style={{ textAlign: "center", color: "red", backgroundColor: "rgb(230, 240, 248)" }}>{message}</h5>}
      <TextField
        required
        id="outlined-required"
        label="Email"
        type='email'
        onChange={handleChange}
        value={values.email}
        name="email"

      />
      {
        click ?
          <Box sx={{ display: 'flex', justifyContent: "center" }}>
            <CircularProgress color="success" size="24.8px" />
          </Box>
          :
          <Button type='submit' color='success'>Verify your mail</Button>
      }
      <Link style={{ cursor: "pointer",textAlign:"center" }} onClick={() => { history.replace("/customersignin") }} underline="hover">
        I remember my password
      </Link>



    </Box>
  )
}


// OTP verification process

const OtpVerification = () => {
  const [click, setClick] = useState(false)
  const [message, setMessage] = useState("")
  const history = useHistory()
  const params = useParams()

  useEffect(() => {

    const pathtoken = decodeToken(params.otp)
    if (!pathtoken) {
      history.replace("/customerforgotpassword")
    }

  }, [])

  //    formik method to check otp

  const { handleSubmit, handleBlur, values, handleChange } = useFormik(
    {
      initialValues: {
        OTP: "",
        email: localStorage.getItem("customeremail")
      },
      onSubmit: (otp) => {
        setClick(true)
        setMessage()
        verify(otp)
      }

    }
  )

  // verifying otp 
  const verify = async (otp) => {
    try {


      const response = await fetch("https://foodtoken-backend-1.onrender.com/customer/forgotpassword/otp", {
        method: "POST",
        body: JSON.stringify(otp),
        headers: {
          "Content-Type": "application/json"
        }
      })

      const data = await response.json()

      setMessage(data.message)
      setClick(false)

      // component changing method
      if (data.message === "You can reset your password now") {
        history.replace("/customerforgotpassword")
        history.push(`/customerforgotpassword/newpassword/${data.path}`)
      }



    } catch (error) {
      console.log("email verification error", error)
    }
  }

  return (
    <Box
      component="form"
      className='customerforgotform'
      onSubmit={handleSubmit}
    >
      {message && <h5 style={{ textAlign: "center", color: "red", backgroundColor: "rgb(230, 240, 248)" }}>{message}</h5>}
      <TextField
        required
        id="outlined-required"
        label="Enter OTP"
        type='text'
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.OTP}
        name="OTP"

      />
      {
        click ?
          <Box sx={{ display: 'flex', justifyContent: "center" }}>
            <CircularProgress color="success" size="24.8px" />
          </Box>
          :
          <Button type='submit' color='success'>CHANGE PASSWORD</Button>
      }
      <Link style={{ cursor: "pointer",textAlign:"center" }} onClick={() => { history.replace("/customersignin") }} underline="hover">
        I remember my password
      </Link>



    </Box>
  )
}


// password changing process

const ResetPaasword = () => {
  const [click, setClick] = useState(false)
  const [message, setMessage] = useState("")
  const history = useHistory()
  const params = useParams()

  useEffect(() => {

    const pathtoken = decodeToken(params.newpassword)
    if (!pathtoken) {
      history.replace("/customerforgotpassword")
    }

  }, [])

  //   formik metid to change the password
  const { handleSubmit, handleBlur, values, handleChange } = useFormik(
    {
      initialValues: {
        password: "",
        email: localStorage.getItem("customeremail")
      },
      onSubmit: (password) => {
        setClick(true)
        setMessage()
        verify(password)
      }

    }
  )

  // changing password to backend
  const verify = async (password) => {
    try {


      const response = await fetch("https://foodtoken-backend-1.onrender.com/customer/forgotpassword/newpassword", {
        method: "PUT",
        body: JSON.stringify(password),
        headers: {
          "Content-Type": "application/json"
        }
      })

      const data = await response.json()

      setMessage(data.message)
      setClick(false)
      // Removes all localstorage elements used to replace components
      localStorage.removeItem("customeremail")
      history.replace("/customerforgotpassword")
      history.push("/customersignin")

    } catch (error) {
      console.log("email verification error", error)
    }
  }

  return (
    <Box
      component="form"
      className='customerforgotform'
      onSubmit={handleSubmit}
    >
      {message && <h5>{message}</h5>}
      <TextField
        required
        id="outlined-password-input"
        label="New Password"
        type="password"
        autoComplete="current-password"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.password}
        name="password"
      />
      {
        click ?
          <Box sx={{ display: 'flex', justifyContent: "center" }}>
            <CircularProgress color="success" size="24.8px" />
          </Box>
          :
          <Button type='submit' color='success'>CHANGE PASSWORD</Button>
      }
      <Link style={{ cursor: "pointer",textAlign:"center" }} onClick={() => { history.replace("/customersignin") }} underline="hover">
        I remember my password
      </Link>



    </Box>
  )
}
