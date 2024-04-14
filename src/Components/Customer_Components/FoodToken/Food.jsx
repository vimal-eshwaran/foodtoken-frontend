import React, { useEffect, useState } from "react";
import "./Food.css";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import emptytoken from "../emptycart.png";
import { CircularProgress } from "@mui/material";

const FoodToken = ({ foodTokenlist, setFoodTokenlist }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const token = async () => {
      try {
        const response = await fetch(
          "https://foodtoken-backend-1.onrender.com/token",
          {
            method: "GET",
            headers: {
              "x-auth-customertoken": localStorage.getItem("customertoken"),
            },
          }
        );

        const data = await response.json();
        if (data !== undefined) {
          setFoodTokenlist(data);
        }
      } catch (error) {
        console.log("token error", error);
      } finally {
        setLoading(false);
      }
    };
    token();
  }, []);

  const handleClick = async (id) => {
    try {
      const response = await fetch(
        `https://foodtoken-backend-1.onrender.com/token/${id}`,
        {
          method: "DELETE",
          headers: {
            "x-auth-customertoken": localStorage.getItem("customertoken"),
          },
        }
      );

      await response.json();

      const selectToken = foodTokenlist.filter((element) => element._id !== id);
      setFoodTokenlist(selectToken);
    } catch (error) {
      console.log("delete token error", error);
    }
  };

  return (
    <div
      className={loading ? "customerFoodToken loading" : "customerFoodToken"}
    >
      {loading ? (
        <CircularProgress size="calc(10px + 3vw)" color="error" />
      ) : foodTokenlist.length === 0 ? (
        <EmptyToken />
      ) : (
        <Token foodTokenlist={foodTokenlist} handleClick={handleClick} />
      )}
    </div>
  );
};

const Token = ({ foodTokenlist, handleClick }) => {
  return (
    <div>
      <div className="tokenTittle">TOKEN :</div>
      <div style={{ textAlign: "center" }}>
        Present the token when the owner delivers food to your home
      </div>
      <div className="tokenDiv">
        {foodTokenlist.map((element, index) => {
          return (
            <Card
              key={index}
              className="tokenCart"
              style={{
                boxShadow: "inset 0 0 calc(10px + 2vw) rgb(122, 195, 251)",
                borderRadius: "calc(5px + 1vw)",
              }}
            >
              <CardMedia
                sx={{
                  height: "calc(70px + 4vw)",
                  borderRadius: "calc(10px + 0.5vw) calc(10px + 0.5vw) 0 0",
                }}
                image={element.foodImage}
                tittle="nothing"
              />
              <CardContent>
                <Typography gutterBottom component="div">
                  <span>{element.foodName}</span>
                </Typography>
                <Typography gutterBottom component="div">
                  <span>Total food ordered:</span>{" "}
                  <span>{element.noOfFood}</span>
                </Typography>
                <Typography gutterBottom component="div">
                  <span>Total Price:{element.foodPrice} .RS</span>
                </Typography>
                <Typography gutterBottom component="div">
                  <span>Token:</span> <span>{element._id}</span>
                </Typography>

                <div>
                  <Button
                    onClick={() => handleClick(element._id)}
                    size="small"
                    variant="contained"
                    color="error"
                    style={{
                      fontSize: "calc(8px + 0.1vw)",
                      fontWeight: "bold",
                    }}
                  >
                    Cancel Order
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
const EmptyToken = () => {
  return (
    <div>
      <div className="addtocartTittle">YOUR CART IS EMPTY</div>
      <div className="addtocartDiv">
        <img src={emptytoken} alt="TOKEN IS EMPTY" />
      </div>
    </div>
  );
};

export default FoodToken;