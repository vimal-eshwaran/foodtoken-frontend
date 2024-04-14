import React, { useState } from 'react'
import './Orders.css'
import { Button, Card, CardContent, CardMedia, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'

const Orders = ({ OrdersList, setOrdersList, profit, setProfit }) => {
    const [deliveryClicked, setDeliveryClicked] = useState(false)


    return (
        <div className="orders">
            <div className="ordertittle">
                ORDERS
            </div>
            {deliveryClicked ?
                <VerificationComponent
                    setOrdersList={setOrdersList}
                    OrdersList={OrdersList}
                    setProfit={setProfit}
                    profit={profit}
                    setDeliveryClicked={setDeliveryClicked}
                />

                :

                <div className="ordersDiv">

                    {OrdersList.length === 0 ? <div className="ordertittle">NO ORDERS AVAILABLE</div> :

                        OrdersList.map((element, index) => {
                            return (
                                <OrdersCard
                                    key={index}
                                    foodImage={element.foodImage}
                                    foodName={element.foodName}
                                    foodPrice={element.foodPrice}
                                    id={element._id}
                                    noOfFood={element.noOfFood}
                                    customerId={element.customerId}
                                    customerName={element.customerName}
                                    setDeliveryClicked={setDeliveryClicked}

                                />
                            )
                        })
                    }
                </div>
            }
        </div>
    )
}

export default Orders


const OrdersCard = ({ foodImage, foodName, foodPrice, noOfFood, customerId, customerName,id, setDeliveryClicked }) => {

    const deliveryFunction = () => {

        setDeliveryClicked(true)
        localStorage.setItem("tokenId", id)
    }



    return (
        <div>
            <Card className="OrdersCard" style={{ boxShadow: "inset 0 0 calc(10px + 2vw) rgb(122, 195, 251)", borderRadius: "calc(5px + 0.1vw)" }}>
                <CardMedia
                    sx={{height: "calc(70px + 4vw)" }}
                    image={foodImage}
                    tittle="nothing"

                />
                <CardContent >

                    <Typography gutterBottom component="div" >
                        <span>{foodName.toUpperCase()}</span>
                    </Typography>
                    <Typography gutterBottom component="div" >
                        <span>Price :</span> <span>{foodPrice} .RS</span>
                    </Typography>
                    <Typography gutterBottom component="div" >
                        <span>Total Food :</span> <span>{noOfFood}</span>
                    </Typography>
                    <Typography gutterBottom component="div" >
                        <span>Customer Name :</span> <span>{customerName}</span>
                    </Typography>
                    <Typography gutterBottom component="div" >
                        <span>Customer ID :</span> <span>{customerId}</span>
                    </Typography>
                    <div><Button onClick={deliveryFunction} variant='contained' color='success' style={{ fontSize: "calc(10px + 0.1vw)", fontWeight: "bold", position: "inherit" }} size="small">deliver food</Button></div>

                </CardContent>
            </Card>

        </div>
    )
}

const VerificationComponent = ({ profit, setProfit, setOrdersList, OrdersList, setDeliveryClicked }) => {

    const id = localStorage.getItem("tokenId")

    const { values, handleChange, handleSubmit, handleBlur } = useFormik(
        {
            initialValues: {
                token: id
            },
            onSubmit: (token) => {

                verifyToken(token.token)
            },

        }
    )

    const verifyToken = async (token) => {

        try {
            const profitresponse = await fetch(`https://foodtoken-backend-1.onrender.com/profit/${token}`, {
                method: "POST",
                body: JSON.stringify(),
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-ownertoken": localStorage.getItem("ownertoken")
                }
            })

            const profitData = await profitresponse.json()
            setProfit([...profit, profitData])


            const response = await fetch(`https://foodtoken-backend-1.onrender.com/ownertoken/${token}`, {
                method: "DELETE",
                headers: {
                    "x-auth-ownertoken": localStorage.getItem("ownertoken")
                }
            })

            await response.json()

            const deletedToken = OrdersList.filter((element) => element._id !== token)
            setOrdersList(deletedToken)
            localStorage.removeItem("tokenId")
            setDeliveryClicked(false)
        } catch (error) {
            console.log("customer token verification ", error)
        }
    }

    const cancelFunction = () => {
        localStorage.removeItem("tokenId")
        setDeliveryClicked(false)

    }

    return (
        <div className="fooddiv">
            <form className='addfood' onSubmit={handleSubmit} >
                <TextField
                    required id="outlined-basic"
                    label="Verify Customer Token"
                    variant="outlined"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.token}
                    name="token"
                />
                <div style={{ textAlign: "center" }}>If the food token is correct, click on the Verify button</div>
                <Button variant="contained" color='success' type='submit' >VERIFY TOKEN</Button>
                <Button variant="contained" color='error' onClick={cancelFunction} >calcel</Button>
            </form>
        </div>
    )
}

