import { Route, Switch, useHistory } from "react-router-dom";
import "./App.css";
import Customerforgot from "./Components/Customer_Components/Forgot/ForgotPassword";
import Signin from "./Components/Customer_Components/SignIn/Signin";
import Signup from "./Components/Customer_Components/Signup/Signup";
import Ownerforgot from "./Components/Owner_components/Forgot/ForgotPassword";
import OwnerSignin from "./Components/Owner_components/SignIn/Signin";
import Nopage from "./Components/NOPAGE/nopage";
import Body from "./Components/Customer_Components/BODY/Body";
import OwnerBody from "./Components/Owner_components/BODY/Body";
import MainDash from "./Components/Main Dash/MainDash";
import { useEffect } from "react";
import { decodeToken } from "react-jwt";
import OwnerSignup from "./Components/Owner_components/Signup/OwnerSignup";


function App() {
  const history = useHistory()
  useEffect(() => {
      const verifyAndRedirect = (token, redirectPath) => {
        if (token) {
          const decodedToken = decodeToken(token);
  
          if (decodedToken) {
            history.replace(redirectPath);
          } else {
            localStorage.removeItem(token);
          }
        }
      };
  
      // Owner verification
      const ownerToken = localStorage.getItem('ownertoken');
      verifyAndRedirect(ownerToken, 'Owner', '/ownerdash');
  
      // Customer verification
      const customerToken = localStorage.getItem('customertoken');
      verifyAndRedirect(customerToken, 'Customer', '/customerdash');


}, [])
 

  return (
    <div className="App">
      {/* customer */}
      <Switch>
        <Route exact path="/">
          <MainDash />
        </Route>
        <Route path="/customersignup">
          <Signup />
        </Route>

        <Route path="/customersignin">
          <Signin />
        </Route>

        <Route path="/customerforgotpassword">
          <Customerforgot />
        </Route>

        <Route path="/customerdash">
          <Body />
        </Route>

        {/* OWNER */}

        <Route path="/ownersignup">
          <OwnerSignup />
        </Route>

        <Route path="/ownersignin">
          <OwnerSignin />
        </Route>

        <Route path="/ownerforgotpassword">
          <Ownerforgot />
        </Route>
        <Route path="/ownerdash">
          <OwnerBody
          />
        </Route>

        <Route path="**">
          <Nopage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
