import React from 'react';
import { AppBar, Button, Toolbar } from '@mui/material'
import { useHistory } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi'




const Base = ({children,sideBarCliked,setSideBarClicked,cartclicked,setCartClicked,tokenClicked,setTokenClicked}) => {
   
    const history = useHistory()


    const logout = () => {
        localStorage.removeItem("customertoken")
        localStorage.removeItem("CustomerName")
        history.replace("/")
    }

    const menuIcon =() => {
       setSideBarClicked(!sideBarCliked)
       setCartClicked(false)
       setTokenClicked(false)

    }
    const cart =() => {
        setCartClicked(!cartclicked)
        setSideBarClicked(false)
        setTokenClicked(false)
     }
     const token =() => {
        setTokenClicked(!tokenClicked)
        setCartClicked(false)
        setSideBarClicked(false)
     }

     const onBlurFunction =() => {
        setTimeout(()=>{
          setSideBarClicked(false)
        },200)
     }

    return (
        <div>


            <AppBar position='fixed'>
                <Toolbar style={{ display: "flex" }} variant='dense'>
                    <div style={{ flex: 1 }} tabIndex="0" onBlur={onBlurFunction}>
                        <GiHamburgerMenu onClick={menuIcon} size="calc(15px + 1vw)" style={{ cursor: "pointer" }} />
                    </div>

                    <div style={{ flex: 3, display: 'flex', justifyContent: "flex-end" ,gap:"calc(5px + 1vw)"}}>


                        <Button color='inherit' style={{ fontSize: "calc(9px + 0.5vw)", fontWeight: "bold" }}
                            onClick={token}
                        >

                            <div>Food Token</div>

                        </Button>




                        <Button color='inherit' style={{ fontSize: "calc(9px + 0.5vw)", fontWeight: "bold" }}
                            onClick={cart}
                        >

                            <div>My Cart</div>

                        </Button>




                        <Button color='inherit' style={{ fontSize: "calc(9px + 0.5vw)", fontWeight: "bold" }}
                            onClick={logout}
                        >

                            <div>LOGOUT</div>

                        </Button>
                    </div>

                </Toolbar>
            </AppBar>


            <div>
                {children}
            </div>

        </div>

    )
}

export default Base;
