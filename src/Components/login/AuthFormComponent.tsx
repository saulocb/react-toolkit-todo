import React, { FC } from "react";
import { Field, reduxForm } from "redux-form";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ILoginForm from "../../features/auth/Interfaces/IAuthForm";
import { connect } from "react-redux";
import { validate } from "./validate";
import {
  ApplicationState,
  useAppSelector,
} from "../../configurations/withReduxFeatures";
import RenderInput from "../site/renderInput";
import AppSpinner from "../site/Spinner";

interface Props {
  onSubmit(form: ILoginForm);
  handleSubmit(funtion: Function);
}

const AuthFormComponent: FC<Props> = (props: Props) => {
  // you can move this line for a separete file like crete a selector to each redux
  const { authentication } = useAppSelector((state) => state);
  const onSubmit = (formValues: ILoginForm) => {
    props.onSubmit(formValues);
  };

  return (
    <Form onSubmit={props.handleSubmit(onSubmit)}>
      <Form.Group controlId="formBasicEmail">
        <Field
          name="email"
          placeholder="Enter email"
          type="text"
          component={RenderInput}
          label="Email address "
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Field
          name="password"
          placeholder="password"
          type="password"
          component={RenderInput}
          label="Password"
        />
      </Form.Group>
      <Form.Group controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>

      <Button variant="primary" type="submit" size="lg" block>
        {authentication.isFetching && <AppSpinner />}
        Submit
      </Button>
      {/* <GoogleAuth from="login"/> */}
    </Form>
  );
};

const mapStateToPropes = (state: ApplicationState) => {
  return {
    isSignedIn: state.authentication.isSignedIn,
    isFetching: state.authentication.isFetching,
  };
};

const AppConnect = connect(mapStateToPropes)(AuthFormComponent);

export default reduxForm({
  form: "authForm",
  validate,
})(AppConnect);
