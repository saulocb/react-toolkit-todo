import React, { useState } from "react";
import { Alert, Button } from "react-bootstrap";

interface State {
  show: boolean;
}

interface Props {
  message: string | null,
  variant: string;
  closeAlert(): void;
}

class AlertDismissible extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = { show: true };
  }

  close = () => {
    this.props.closeAlert();
  };

  render() {
    return (
      <Alert
        variant={this.props.variant}
        onClose={() => this.close()}
        dismissible
      >
        <Alert.Heading>Oh snap!</Alert.Heading>
        <p>{this.props.message}</p>
      </Alert>
    );
  }
}

export default AlertDismissible;
