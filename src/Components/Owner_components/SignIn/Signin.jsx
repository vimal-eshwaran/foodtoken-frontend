import * as React from 'react';
import './Signin.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, CircularProgress, Link } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useFormik } from 'formik';

const OwnerSignin = () => {
  const [click, setClick] = useState(false)
  const [message, setMessage] = useState("")
  const history = useHistory()

  const { values, handleChange, handleSubmit, handleBlur } = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    onSubmit: (ownerSignin) => {
      setClick(true)
      setMessage()
      ownerlogin(ownerSignin)
    }
  })


  const ownerlogin = async (ownerSignin) => {
    try {

      const response = await fetch("https://foodtoken-backend-1.onrender.com/owner/login", {
        method: "POST",
        body: JSON.stringify(ownerSignin),
        headers: {
          "Content-Type": "application/json"
        }
      })

      const owner = await response.json();
      
      setClick(false)
      if (owner.ownerToken) {
        history.push("/ownerdash")
        localStorage.setItem("OwnerName", owner.ownerName)
        localStorage.setItem("ownertoken", owner.ownerToken)
      }
      else {
        setMessage(owner.message)
      }


    } catch (error) {
      console.log("add owner error ", error)
    }

  }

  return (
    <div className="ownersignindiv">
      <Box
        component="form"
        className='ownersigninform'
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

        <Link style={{ cursor: "pointer" }} onClick={() => history.push("/ownerforgotpassword")} underline="hover">
          Forgot password?
        </Link>


      </Box>
    </div>
  );
}


export default OwnerSignin;