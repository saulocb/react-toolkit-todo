import React from "react";
import IAlert from "../../../shared/alert/interface/IAlert";

interface IProps {
  alerts: IAlert[];
  children?;
  style?: string;
}

class AlertsOverlayComponent extends React.Component<IProps> {

  renderAlerts = () => {
    let children = this.props.children;
    if (this.props.alerts.length > 0) {
      return this.props.alerts.map(function (alert: IAlert) {
        return React.cloneElement(children, { alert: alert, key: alert.id });
      });
    }
  };

  render() {
    return (
      <div>
        {this.renderAlerts()}
      </div>
    );
  }
}

export default AlertsOverlayComponent;
