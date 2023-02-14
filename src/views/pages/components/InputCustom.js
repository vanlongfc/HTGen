import React from "react";
import { Input } from "reactstrap";

const InputCustom = ({
  label = "",
  id = "",
  messageValid = "",
  messageInvalid = "",
  required = () => <></>,
  ...rest
}) => {
  return (
    <>
      {label && (
        <label className="form-control-label" htmlFor={id}>
          {label}
          {required}
        </label>
      )}
      <Input {...rest} />
      <div className="valid-feedback">{messageValid}</div>
      <div className="invalid-feedback">{messageInvalid}</div>
    </>
  );
};

export default InputCustom;
