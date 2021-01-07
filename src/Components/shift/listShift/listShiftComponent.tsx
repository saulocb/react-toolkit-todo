import React, { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../configurations/withReduxFeatures";
import {
  deleteShift,
  getAllShift,
} from "../../../features/shift/shiftRepository";
import IShift from "../../../features/shift/Interfaces/IShift";
import { selectShift } from "../../../features/shift/shiftRecuders";
import AppSpinner from "../../site/Spinner";

const ListShiftComponent = () => {
  useEffect(() => {
    dispatch(getAllShift());
  }, []);

  const { shift } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const removeSHift = (shiftId?: string) => {
    dispatch(deleteShift(shiftId));
  };

  const updateShift = (shift: IShift) => {
    dispatch(selectShift(shift));
  };

  const RenderShift = () => {
    const listShift = shift?.myShifts?.map((shift: IShift) => {
      return (
        <tr key={shift.id}>
          <td>{shift.qdtBouncer}</td>
          <td>{shift.interval}</td>
          <td>{shift.pay}</td>
          <td>{shift.creationDate}</td>
          <td style={{ display: "flex" }}>
            <Button onClick={() => updateShift(shift)} variant="primary">
              Edit
            </Button>
            <Button onClick={() => removeSHift(shift.id)} variant="danger">
              Delete
            </Button>
          </td>
        </tr>
      );
    });
    return <>{listShift}</>;
  };

  return (
    <>
      {shift.myShifts.length > 0 && (
        <Table striped bordered hover>
          {shift.isFetching && <AppSpinner />}
          <thead>
            <tr>
              <th>Bouncer</th>
              <th>hours </th>
              <th>Start</th>
              <th>Created at</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <RenderShift />
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ListShiftComponent;
