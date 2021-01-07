import React, { FC } from "react";
import { Alert } from "react-bootstrap";
import { useAppSelector, useAppDispatch } from "../../../configurations/withReduxFeatures";
import { removeAlert } from "../../../shared/alert/alertsReducer";
import IAlert from "../../../shared/alert/interface/IAlert";

interface Props {
  alert?: IAlert;
}

const AppAlert: FC<Props> = (props: Props) => {
  const dispatch = useAppDispatch();

  const removeAppAlert = () => {
    dispatch(removeAlert({id: props.alert?.id}))
  };

  const removeAlertTime = () => {
    setTimeout(() => {
      removeAppAlert();
    }, 3000);
  };

    removeAlertTime();
    return (
      <Alert
        variant={props.alert?.style}
        onClose={() => removeAppAlert()}
        dismissible
      >
        <Alert.Heading>{props.alert?.header}!</Alert.Heading>
        <p>{props.alert?.text}</p>
      </Alert>
    );
  }


export default AppAlert
