import React, { FC } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Field, reduxForm } from "redux-form";
import { validate } from "./validation";
import RenderInput from "../site/renderInput";
import AppSpinner from "../site/Spinner";
import ISignUpForm from "../../features/auth/Interfaces/ISignUpForm";
import { useAppSelector } from "../../configurations/withReduxFeatures";

interface IProps {
  onSubmit(form: ISignUpForm);
  handleSubmit(funtion: Function);
}

const SignUpFormComponent: FC<IProps> = (props: IProps) => {
  const { authentication } = useAppSelector((state) => state);
  
 const  onSubmit = (formValues: ISignUpForm) => {
    props.onSubmit(formValues);
  };

    return (
      <>
        <Form onSubmit={props.handleSubmit(onSubmit)}>
          <Form.Group>
            <Field
              name="email"
              placeholder="Enter email"
              type="text"
              component={RenderInput}
              label="Email address"
            />
          </Form.Group>
          <Form.Group >
            <Field
              name="password"
              placeholder="password"
              type="password"
              component={RenderInput}
              label="Password"
            />
          </Form.Group>
          <Form.Group>
            <Field
              name="username"
              placeholder="IUser name"
              type="text"
              component={RenderInput}
              label="IUser Name"
            />
          </Form.Group>
          <Button variant="primary" type="submit" size="lg" block>
           {authentication.isFetching && <AppSpinner/>}
            Submit 
          </Button>
        </Form>
      </>
    );
  }

export default reduxForm({
  form: "signUp",
  validate,
})(SignUpFormComponent);
