import { Button } from '@mui/material'
import React from 'react'
import './MainDash.css'
import { useHistory } from 'react-router-dom'

const MainDash = () => {

    const history = useHistory()

    return (
        <div className="maindash">
            <div className="companyName">
            Welcome to FOODIES WORLD
            </div>
            <div className="logindiv">
                <div className="customerdiv">
                    <div>CUSTOMER</div>
                    <Button onClick={() => history.push("/customersignin")} variant='contained' color='primary'>customer signin</Button>
                    <Button onClick={() => history.push("/customersignup")} variant='contained' color='success'>customer signup</Button>

                </div>
                <div className="ownerdiv">
                    <div>OWNER</div>
                    <Button onClick={() => history.push("/ownersignin")} variant='contained' color='primary'>owner signin</Button>
                    <Button onClick={() => history.push("/ownersignup")} variant='contained' color='success'>Owner signup</Button>
                </div>
            </div>
        </div>
    )
}

export default MainDash