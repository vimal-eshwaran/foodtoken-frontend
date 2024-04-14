import React from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { decodeToken } from "react-jwt";
import Base from "../BASE/Base";
import CustomerSidebar from "../Sidebar/Sidebar";
import { useState } from "react";
import FoodToken from "../FoodToken/Food";
import AddtoCart from "../Cart/AddtoCart";
import Food from "../Foods list/food";
import "./body.css";
import { Box, CircularProgress } from "@mui/material";

const Body = () => {
  const [loading, setLoading] = useState(false);
  const [sideBarCliked, setSideBarClicked] = useState(false);
  const [cartclicked, setCartClicked] = useState(false);
  const [tokenClicked, setTokenClicked] = useState(false);
  const [foodList, setFoodList] = useState([]);
  const [foodTokenlist, setFoodTokenlist] = useState([]);
  const [cartlist, setCartlist] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const customerToken = localStorage.getItem("customertoken");

        if (!customerToken) {
          history.replace("/");
        } else {
          const customer = decodeToken(customerToken);

          if (!customer) {
            localStorage.removeItem("customertoken");
            localStorage.removeItem("CustomerName");
            history.push("/");
          }
        }

        const response = await fetch(
          "https://foodtoken-backend-1.onrender.com/customer/food",
          {
            method: "GET",
            headers: {
              "x-auth-customertoken": customerToken,
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch data: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();
        setFoodList(data);
      } catch (error) {
        console.error("Error fetching food data:", error.message);
        // Handle error, you can set an error state or show a user-friendly message
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [history]);

  return (
    <div className="body">
      <MainContents
        sideBarCliked={sideBarCliked}
        setSideBarClicked={setSideBarClicked}
        cartclicked={cartclicked}
        setCartClicked={setCartClicked}
        tokenClicked={tokenClicked}
        setTokenClicked={setTokenClicked}
        foodList={foodList}
        setFoodList={setFoodList}
        foodTokenlist={foodTokenlist}
        setFoodTokenlist={setFoodTokenlist}
        cartlist={cartlist}
        setCartlist={setCartlist}
        loading={loading}
      />
    </div>
  );
};

export default Body;

const MainContents = ({
  loading,
  cartlist,
  setCartlist,
  foodTokenlist,
  setFoodTokenlist,
  foodList,
  setFoodList,
  sideBarCliked,
  setSideBarClicked,
  cartclicked,
  setCartClicked,
  tokenClicked,
  setTokenClicked,
}) => {
  return (
    <Base
      sideBarCliked={sideBarCliked}
      setSideBarClicked={setSideBarClicked}
      cartclicked={cartclicked}
      setCartClicked={setCartClicked}
      tokenClicked={tokenClicked}
      setTokenClicked={setTokenClicked}
    >
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            height: "50vh",
            alignItems: "center",
          }}
        >
          <CircularProgress color="primary" size="40px" />
        </Box>
      ) : (
        <div>
          {sideBarCliked && (
            <CustomerSidebar
              foodList={foodList}
              setSideBarClicked={setSideBarClicked}
            />
          )}
          {tokenClicked && (
            <FoodToken
              foodTokenlist={foodTokenlist}
              setFoodTokenlist={setFoodTokenlist}
              setTokenClicked={setTokenClicked}
            />
          )}
          {cartclicked && (
            <AddtoCart
              cartlist={cartlist}
              setCartlist={setCartlist}
              setSideBarClicked={setSideBarClicked}
              setCartClicked={setCartClicked}
              setTokenClicked={setTokenClicked}
              setFoodTokenlist={setFoodTokenlist}
              foodTokenlist={foodTokenlist}
            />
          )}

          <Food
            foodList={foodList}
            setFoodList={setFoodList}
            cartlist={cartlist}
            setCartlist={setCartlist}
            setCartClicked={setCartClicked}
            cartclicked={cartclicked}
          />
        </div>
      )}
    </Base>
  );
};
