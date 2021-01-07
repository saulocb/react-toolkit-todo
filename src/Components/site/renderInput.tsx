import React from "react";
import Form from "react-bootstrap/Form";

interface Props {
  input: any;
  label: any;
  meta: any;
  type: any;
  placeholder: any;
  disabled: boolean
}

const RenderInput = (props: Props) => {

  
  const renderError = ({ error, touched }) => {
    if (touched && error) {
      return (
        <div style={{ backgroundColor: "bisque" }}>
          <div style={{ color: "red" }}>{error}</div>
        </div>
      );
    }
  };

  const className = `field ${
    props.meta.error && props.meta.touched ? "error" : ""
  }`;

  return (
    <div className={className}>
      <Form.Label>{props.label}</Form.Label>
      <Form.Control
        autoComplete="off"
        type={props.type}
        disabled={props.disabled}
        placeholder={props.placeholder}
        {...props.input}
      />
      {renderError(props.meta)}
    </div>
  );
};

export default RenderInput;
