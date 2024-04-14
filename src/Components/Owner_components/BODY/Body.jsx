import React, { useState } from "react";
import { useEffect } from "react";
import { decodeToken } from "react-jwt";
import { Route, Switch, useHistory } from "react-router-dom";
import Base from "../BASE/Base";
import Foodlist from "../Food/Food";
import Nopage from "../../NOPAGE/nopage";
import Customer from "../Customer/Customer";
import Orders from "../Orders/Orders";
import Income from "../Income/Income";
import { Box, CircularProgress } from "@mui/material";

const OwnerBody = () => {
  const [loading, setLoading] = useState(false);
  const [sideBarCliked, setSideBarClicked] = useState(false);
  const [customersData, setCustomerData] = useState([]);
  const [ownerFoodsDetails, setOwnerFoodsDetails] = useState([]);
  const [OrdersList, setOrdersList] = useState([]);
  const [profit, setProfit] = useState([]);

  const history = useHistory();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
      const ownerToken = localStorage.getItem("ownertoken");

      if (!ownerToken) {
        history.replace("/");
      } else {
        const owner = await decodeToken(ownerToken);

        if (!owner) {
          localStorage.removeItem("ownertoken");
          history.replace("/");
        }
      }
        // Fetch food details
        const foodResponse = await fetch(
          "https://foodtoken-backend-1.onrender.com/owner/food",
          {
            method: "GET",
            headers: {
              "x-auth-ownertoken": ownerToken,
            },
          }
        );
        const foodData = await foodResponse.json();
        setOwnerFoodsDetails(foodData);

        // Fetch customer data
        const customerResponse = await fetch(
          "https://foodtoken-backend-1.onrender.com/customers",
          {
            method: "GET",
            headers: {
              "x-auth-ownertoken": ownerToken,
            },
          }
        );
        const customerData = await customerResponse.json();
        setCustomerData(customerData);

        // Fetch orders list
        const ordersResponse = await fetch(
          "https://foodtoken-backend-1.onrender.com/ownertoken",
          {
            method: "GET",
            headers: {
              "x-auth-ownertoken": ownerToken,
            },
          }
        );
        const ordersData = await ordersResponse.json();
        setOrdersList(ordersData);

        // Fetch profit list
        const profitResponse = await fetch(
          "https://foodtoken-backend-1.onrender.com/profit",
          {
            method: "GET",
            headers: {
              "x-auth-ownertoken": ownerToken,
            },
          }
        );
        const profitData = await profitResponse.json();
        setProfit(profitData);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error, you can set an error state or show a user-friendly message
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  
  return (
    <div>
      <Base sideBarCliked={sideBarCliked} setSideBarClicked={setSideBarClicked}>
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
          <Switch>
            <Route exact path="/ownerdash">
              <Income profit={profit} setProfit={setProfit} />
            </Route>

            <Route exact path="/ownerdash/orders">
              <Orders
                OrdersList={OrdersList}
                setOrdersList={setOrdersList}
                profit={profit}
                setProfit={setProfit}
              />
            </Route>
            <Route exact path="/ownerdash/foods">
              <Foodlist
                ownerFoodsDetails={ownerFoodsDetails}
                setOwnerFoodsDetails={setOwnerFoodsDetails}
              />
            </Route>
            <Route exact path="/ownerdash/customers">
              <Customer
                customersData={customersData}
                setCustomerData={setCustomerData}
              />
            </Route>
            <Route path="**">
              <Nopage />
            </Route>
          </Switch>
        )}
      </Base>
    </div>
  );
};

export default OwnerBody;
