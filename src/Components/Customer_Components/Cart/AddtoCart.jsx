import React, { useEffect, useState } from 'react'
import './Cart.css'
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import emptycart from '../emptycart.png'
import { CircularProgress } from '@mui/material';


const AddtoCart = ({ setFoodTokenlist, foodTokenlist, cartlist, setCartlist, setSideBarClicked, setCartClicked, setTokenClicked }) => {
  const [loading,setLoading] = useState(false)

  useEffect(() => {
    

    const cart = async () => {
      try {
        setLoading(true)
        const response = await fetch("https://foodtoken-backend-1.onrender.com/cart", {
        method: "GET",
        headers: {
          "x-auth-customertoken": localStorage.getItem("customertoken")
        }
      })

      const data = await response.json()
       if(data !== undefined){
      setCartlist(data)
       }
       
      } catch (error) {
        console.log("cart error",error)
      }finally{
        setLoading(false)
      }
    }

    cart()
  }, [])

  // remove the cart
  const handleClick = async (id, foodId) => {
    try {
      const response = await fetch(`https://foodtoken-backend-1.onrender.com/cart/delete/${id}`, {
        method: "DELETE",
        headers: {
          "x-auth-customertoken": localStorage.getItem("customertoken")
        }
      });

      await response.json();
      localStorage.removeItem(`food${foodId}`)
      const selectaddtocart = cartlist.filter((element) => element._id !== id)
      setCartlist(selectaddtocart)

    } catch (error) {
      console.log("delete addtocart error", error)
    }
  }

  const increaseproduct = async (id, foodCount) => {
    try {

      const count = foodCount + 1

      const response = await fetch(`https://foodtoken-backend-1.onrender.com/cart/edit/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          foodCount: count
        }),
        headers: {
          "Content-Type": "application/json",
          "x-auth-customertoken": localStorage.getItem("customertoken"),

        }

      })
      const data = await response.json();

      if (data) {
        const editedCart = cartlist.findIndex((element) => element._id === id)

        const price = cartlist[editedCart].foodPrice * count


        cartlist[editedCart] = {
          _id: cartlist[editedCart]._id,
          foodName: cartlist[editedCart].foodName,
          foodImage: cartlist[editedCart].foodImage,
          foodPrice: cartlist[editedCart].foodPrice,
          foodCount: count,
          totalFoodPrice: price,
        }

        setCartlist([...cartlist])
      }

    } catch (error) {
      console.log("increament error", error)
    }

  }

  // decrease the product count

  const decreaseProduct = async (id, foodCount) => {
    if (foodCount > 1) {
      try {

        const count = foodCount - 1

        const response = await fetch(`https://foodtoken-backend-1.onrender.com/cart/edit/${id}`, {
          method: "PUT",
          body: JSON.stringify({
            foodCount: count
          }),
          headers: {
            "Content-Type": "application/json",
            "x-auth-customertoken": localStorage.getItem("customertoken"),

          }

        })
        const data = await response.json();

        if (data) {
          const editedCart = cartlist.findIndex((element) => element._id === id)

          const price = cartlist[editedCart].foodPrice * count


          cartlist[editedCart] = {
            _id: cartlist[editedCart]._id,
            foodName: cartlist[editedCart].foodName,
            foodImage: cartlist[editedCart].foodImage,
            foodPrice: cartlist[editedCart].foodPrice,
            foodCount: count,
            totalFoodPrice: price,
          }

          setCartlist([...cartlist])
        }

      } catch (error) {
        console.log("decreament error", error)
      }
    }

  }

  // buy the product

  const handleBuy = async (id, foodId) => {
    try {
      const buyresponse = await fetch(`https://foodtoken-backend-1.onrender.com/token/add/${id}`, {
        method: "POST",
        body: JSON.stringify(),
        headers: {
          "Content-Type": "application/json",
          "x-auth-customertoken": localStorage.getItem("customertoken")
        }
      })
      const tokendata = await buyresponse.json()
      localStorage.removeItem(`food${foodId}`)
      setFoodTokenlist([...foodTokenlist, tokendata])
      const response = await fetch(`https://foodtoken-backend-1.onrender.com/cart/delete/${id}`, {
        method: "DELETE",
        headers: {
          "x-auth-customertoken": localStorage.getItem("customertoken")
        }
      });
      await response.json();

      const selectaddtocart = cartlist.filter((element) => element._id !== id)
      setCartlist(selectaddtocart)

      setSideBarClicked(false)
      setCartClicked(false)
      setTokenClicked(true)
    } catch (error) {
      console.log("Buy error", error)
    }

  }



  return (
    <div className={loading?'customerCart loading':'customerCart'}>
      {
        loading? <CircularProgress size="calc(10px + 3vw)" color='error'/> : cartlist.length === 0 ? <EmptyCart />
          :
          <Cart
            cartlist={cartlist}
            decreaseProduct={decreaseProduct}
            increaseproduct={increaseproduct}
            handleBuy={handleBuy}
            handleClick={handleClick}
          />
      }



    </div>
  )
}

const Cart = ({ cartlist, decreaseProduct, increaseproduct, handleBuy, handleClick }) => {
  return (
    <div>
      <div className="addtocartTittle">
        ADD TO CART :
      </div>
      <div className="addtocartDiv">
        {cartlist !== undefined &&
          cartlist.map((element, index) => {

            // console.log(element._id)
            return (
              <Card key={index} className="addtocart" style={{ boxShadow: "inset 0 0 calc(10px + 2vw) rgb(122, 195, 251)", borderRadius: "calc(5px + 1vw)" }}>

                <CardMedia
                  sx={{ height: "calc(70px + 4vw)", borderRadius: "calc(10px + 0.5vw) calc(10px + 0.5vw) 0 0" }}
                  image={element?.foodImage}
                  tittle="nothing"
                />

                <CardContent>

                  <Typography gutterBottom component="div">
                    <span>{element?.foodName}</span>
                  </Typography>
                  <Typography gutterBottom component="div">
                    <Button onClick={() => decreaseProduct(element._id, element.foodCount)} style={{ padding: 0, fontSize: "calc(10px + 2vw)" }}>-</Button> <span>{element?.foodCount}</span><Button onClick={() => increaseproduct(element._id, element.foodCount)} style={{ padding: 0, fontSize: "calc(10px + 2vw)" }}>+</Button>
                  </Typography>
                  <Typography gutterBottom component="div">
                    <span>Price:</span> <span>{element?.totalFoodPrice}.RS</span>
                  </Typography>
                  <div><Button variant='contained' color='success' style={{ fontSize: "calc(8px + 0.1vw)", fontWeight: "bold" }} onClick={() => handleBuy(element?._id, element.foodId)} size="small">buy now</Button>
                    <Button variant='contained' color='error' style={{ fontSize: "calc(8px + 0.1vw)", fontWeight: "bold" }} onClick={() => handleClick(element?._id, element.foodId)} size="small">Romove cart</Button></div>
                </CardContent>
              </Card>
            )
          })
        }
      </div>
    </div>
  )
}

const EmptyCart = () => {
  return (
    <div>
      <div className="addtocartTittle">
        YOUR CART IS EMPTY
      </div>
      <div className="addtocartDiv">
        <img src={emptycart} alt="CART IS EMPTY" />
      </div>
    </div>
  )
}

export default AddtoCart