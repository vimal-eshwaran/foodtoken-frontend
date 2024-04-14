import React from "react";
import { useHistory } from "react-router-dom";
import { AppBar, Button } from "@mui/material";

const OwnerSidebar = ({ setSideBarClicked }) => {
  const history = useHistory();
  const handleButtonClick = (path) => {
    history.push(`/ownerdash${path}`);
    setSideBarClicked(false);
  };

 
  return (
    <AppBar
      style={{
        height: "100vh",
        width: "calc(80px + 5vw)",
        padding: "calc(10px + 1vw)",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "calc(10px + 1vw)",
        fontWeight: "bold",
        color: "aliceblue",
        left: 0,
        top: "48px",
        position: "fixed"
      }}
    >
      <Button
        color="inherit"
        style={{ fontSize: "calc(9px + 0.5vw)", fontWeight: "bold" }}
        onClick={() => handleButtonClick("")}
      >
        INCOME
      </Button>

      <Button
        color="inherit"
        style={{ fontSize: "calc(9px + 0.5vw)", fontWeight: "bold" }}
        onClick={() => handleButtonClick("/orders")}
      >
        ORDERS
      </Button>

      <Button
        color="inherit"
        style={{ fontSize: "calc(9px + 0.5vw)", fontWeight: "bold" }}
        onClick={() => handleButtonClick("/foods")}
      >
        FOODS
      </Button>

      <Button
        color="inherit"
        style={{ fontSize: "calc(9px + 0.5vw)", fontWeight: "bold" }}
        onClick={() => handleButtonClick("/customers")}
      >
        CUSTOMERS
      </Button>
    </AppBar>
  );
};

export default OwnerSidebar;
