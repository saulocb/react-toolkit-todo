import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import AuthComponent from "../Components/login/AuthComponent";
import history from "./history";
import HomeComponent from "../Components/home/HomeComponent";
import SignUpComponent from "../Components/sign-up/SignUpComponent";
import { PrivateRoute } from "./PrivateRoute";

const AppRoute = () => {
  return (
    <Router history={history}>
      <div style={{ paddingTop: "50px" }}>
        <Switch>
          <Route path="/login" exact component={AuthComponent} />
          <Route path="/sign-up" exact component={SignUpComponent} />
          <PrivateRoute exact path="/home" component={HomeComponent} />
          <Route path="*" component={AuthComponent} />
        </Switch>
      </div>
    </Router>
  );
};

export default AppRoute;
