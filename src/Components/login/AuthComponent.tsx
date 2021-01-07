import React, { FC, useEffect, useState } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { signin } from "../../features/auth/authRepository";
import AuthForm from "./AuthFormComponent";
import ILoginForm from "../../features/auth/Interfaces/IAuthForm";
import {
  useAppDispatch,
  useAppSelector,
} from "../../configurations/withReduxFeatures";
import history from "../../app/history";
import AlertDismissible from "../site/Alert/AlertDismissible";
import { SIGN_UP } from "../../app/RouterLinks";
import { cleanError } from "../../features/auth/authReducer";

const AuthComponent = ()=> {
 // you can move this line for a separete file like crete a selector to each redux
  const { authentication } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (authentication?.isSignedIn) {
      history.push("/home");
    }
  });

  const onSubmit = async (formeValue: ILoginForm) => {
    setLoading(true);
    await dispatch(signin(formeValue));
    setLoading(false);
  };

  const closeAlert = () => {
    dispatch(cleanError());
  };

  return (
    <Container>
      <Row>
        <Col sm={4}></Col>
        <Col sm={8}>
          <Jumbotron>
            <h1>Login</h1>
            {authentication?.error && (
              <AlertDismissible
                variant="danger"
                closeAlert={closeAlert}
                message={authentication?.error}
              />
            )}
            <AuthForm onSubmit={onSubmit} />
            <div>
              <Link to={SIGN_UP}>Sign-up</Link>
            </div>
          </Jumbotron>
        </Col>
      </Row>
    </Container>
  );
};

export default AuthComponent;
