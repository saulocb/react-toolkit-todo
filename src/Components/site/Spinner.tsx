import React from 'react'
import Spinner from "react-bootstrap/Spinner";

const AppSpinner = () => {
    return (
      <Spinner
        as="span"
        animation="border"
        size="sm"
        role="status"
        aria-hidden="true"
      />
    );
  }

  export default AppSpinner