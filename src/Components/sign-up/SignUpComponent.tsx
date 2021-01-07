import React, { FC, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import SignUpForm from "./signUpForm";
import { LOGIN } from "../../app/RouterLinks";
import AlertDismissible from "../site/Alert/AlertDismissible";
import {
  useAppDispatch,
  useAppSelector,
} from "../../configurations/withReduxFeatures";
import ISignUpForm from "../../features/auth/Interfaces/ISignUpForm";
import { signUp } from "../../features/auth/authRepository";
import { cleanError } from "../../features/auth/authReducer";

interface IProps {
  signUp(formValues: ISignUpForm): void;
  cleanError(): void;
}

const SignUpComponent: FC<IProps> = () => {
  const { authentication } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const onSubmit = (formValues: ISignUpForm) => {
    dispatch(signUp(formValues));
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
            {authentication?.error && (
              <AlertDismissible
                variant="danger"
                closeAlert={closeAlert}
                message={authentication?.error}
              />
            )}
            <h1>Sign out</h1>
            <SignUpForm onSubmit={onSubmit} />
            <Link to={LOGIN}>Login</Link>
          </Jumbotron>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUpComponent;
