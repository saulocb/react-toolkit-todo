import React, { FC } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import history from "../../app/history";
import { Router } from "react-router-dom";
import {  logOut } from "../../features/auth/authReducer";
import { useAppDispatch } from "../../configurations/withReduxFeatures";


const Menu  = () => {
  const dispatch = useAppDispatch();
  const logUserOut = (e) => {
    e.preventDefault();
    dispatch(logOut());
  };

  return (
    <Navbar bg="primary" variant="dark">
      <Router history={history}>
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link onClick={(e) => logUserOut(e)}>Log out</Nav.Link>
        </Nav>
        <Form inline></Form>
      </Router>
    </Navbar>
  );
};

export default Menu;
