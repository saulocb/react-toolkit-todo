import React, { FC } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  useAppDispatch,
  useAppSelector,
} from "../../configurations/withReduxFeatures";
import AddShiftFormComponent from "./addShift/addShiftForm";
import IAddShiftForm from "../../features/shift/Interfaces/IAddShiftForm";
import { addShift, editShift } from "../../features/shift/shiftRepository";
import ListShiftComponent from "./listShift/listShiftComponent";
import IShift from "../../features/shift/Interfaces/IShift";
import Shift from "../../features/shift/Models/Shift";
import { cleanError } from "../../features/auth/authReducer";

const ShiftComponent = () => {
  const {  authentication } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const onSubmit = (formeValue: IAddShiftForm) => {
    if (formeValue.id) {
      const shift: IShift = new Shift(
        formeValue.id,
        formeValue.userId,
        formeValue.qdtBouncer,
        formeValue.creationDate,
        formeValue.pay,
        formeValue.interval
      );
      dispatch(editShift(shift));
    } else {
      dispatch(addShift(formeValue, authentication.auth?.userId));
    }
  };

  const closeAlert = () => {
    dispatch(cleanError());
  };

  return (
    <Container>
      <Row>
        <Col sm={4}>
          <AddShiftFormComponent onSubmit={onSubmit} />
        </Col>
        <Col sm={8}>
          <ListShiftComponent />
        </Col>
      </Row>
    </Container>
  );
};

export default ShiftComponent;
