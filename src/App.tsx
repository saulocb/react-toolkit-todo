import React, { CSSProperties, FC } from "react";
import "./App.css";
import AppRoute from "./app/AppRouter";
import "bootstrap/dist/css/bootstrap.min.css";
import Menu from "./Components/sider-menu/siderMenu";
import {
  useAppSelector,
} from "./configurations/withReduxFeatures";
import { ErrorBoundary } from "./shared/Components/ErrorBoundary";
import AlertsOverlayComponent from "./Components/site/Alert/AlertsOverlayComponent ";
import AppAlert from "./Components/site/Alert/AppAlert";
import { Row, Col } from "react-bootstrap";

const appAlert: CSSProperties = {
  position: "absolute",
  zIndex: 10100,
  paddingTop: "3%",
  paddingLeft: "1%",
};


const App = () => {
  const { authentication, arlets } = useAppSelector((state) => state);

  return (
    <div>
      <RenderAlert listAlerts={arlets.arlets} />
      {authentication?.isSignedIn && <Menu />}
      <ErrorBoundary>
        <AppRoute />
      </ErrorBoundary>
    </div>
  );
};

const RenderAlert = (props) => {
  return (
    <div style={appAlert}>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <AlertsOverlayComponent alerts={props.listAlerts}>
            <AppAlert />
          </AlertsOverlayComponent>
        </Col>
      </Row>
    </div>
  );
};

export default App;
