import React from "react";
import { AppBar, Button, Toolbar } from "@mui/material";
import { useHistory } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import OwnerSidebar from "../Sidebar/Sidebar";

const Base = ({ children, setSideBarClicked, sideBarCliked }) => {
  const history = useHistory();

  const ownerName = localStorage.getItem("OwnerName");

  const logout = () => {
    localStorage.removeItem("ownertoken");
    localStorage.removeItem("OwnerName");
    history.replace("/");
  };

  const onBlurFunction = () => {
    setTimeout(() => {
      setSideBarClicked(false);
    }, 200);
  };

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar style={{ display: "flex" }} variant="dense">
          <div style={{ flex: 1 }} tabIndex="0" onBlur={onBlurFunction}>
            <GiHamburgerMenu
              onClick={() => setSideBarClicked(!sideBarCliked)}
              size="calc(15px + 1vw)"
              style={{ cursor: "pointer" }}
            />
          </div>

          <div style={{ flex: 2, textAlign: "center" }}>
            WELCOME {ownerName && ownerName.toUpperCase()}
          </div>
          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "flex-end",
              gap: "calc(5px + 1vw)",
            }}
          >
            <Button
              color="inherit"
              style={{ fontSize: "calc(9px + 0.5vw)", fontWeight: "bold" }}
              onClick={logout}
            >
              <div>LOGOUT</div>
            </Button>
          </div>
        </Toolbar>
      </AppBar>

      {sideBarCliked && <OwnerSidebar setSideBarClicked={setSideBarClicked} />}

      <div style={{ marginTop: "7.8vh" }}>{children}</div>
    </div>
  );
};

export default Base;
