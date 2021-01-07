import React, { useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Field, reduxForm, change } from "redux-form";
import { reset } from "redux-form";
import RenderInput from "../../site/renderInput";
import AppSpinner from "../../site/Spinner";
import { validate } from "./validation";
import { Row, Col } from "react-bootstrap";
import IAddShiftForm from "../../../features/shift/Interfaces/IAddShiftForm";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../configurations/withReduxFeatures";

interface IProps {
  onSubmit(form: IAddShiftForm);
  handleSubmit(funtion: Function);
}

const AddShiftFormComponent: React.FC<IProps> = ({
  onSubmit,
  handleSubmit,
}) => {
  const { authentication, shift } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  useEffect(() => {
    updateShift();
  }, [shift.selectedShift]);

  const submit = (formValues: IAddShiftForm) => {
    dispatch(change("addShift", "userId", authentication.auth?.userId));
    dispatch(change("addShift", "creationDate", new Date()));
    onSubmit(formValues);
    clean();
  };

  const updateShift = () => {
    if (shift.selectedShift) {
      dispatch(
        change("addShift", "qdtBouncer", shift.selectedShift.qdtBouncer)
      );
      dispatch(change("addShift", "interval", shift.selectedShift.interval));
      dispatch(change("addShift", "pay", shift.selectedShift.pay));
      dispatch(change("addShift", "id", shift.selectedShift.id));
      dispatch(change("addShift", "userId", shift.selectedShift.userId));
    }
  };

  const clean = () => {
    dispatch(reset("addShift"));
  };

  return (
    <>
      <Form onSubmit={handleSubmit(submit)}>
        <Row>
          <Col>
            <Form.Group>
              <Field
                name="qdtBouncer"
                type="number"
                component={RenderInput}
                label="How many Bouncer ?"
              />
            </Form.Group>
            <Form.Group>
              <Field
                name="interval"
                type="text"
                component={RenderInput}
                label="How many hours ?"
              />
            </Form.Group>
            <Form.Group>
              <Field
                name="pay"
                type="number"
                component={RenderInput}
                label="Payment p/hour"
              />
            </Form.Group>
            <Button variant="primary" type="submit" size="lg" block>
              {shift.isFetching && <AppSpinner />}
              Submit
            </Button>
          </Col>
          <Col></Col>
        </Row>
      </Form>
    </>
  );
};

export default reduxForm({
  form: "addShift",
  enableReinitialize: true,
  validate,
})(AddShiftFormComponent);
