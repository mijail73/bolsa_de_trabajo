import React from 'react';
import { Alert } from 'react-bootstrap';

const AlertaError = (props) => {
  const {type, text, activate} = props;
  return activate ? (
    <Alert variant={type}> {text} </Alert>
  ) : (null);
};

export default AlertaError;
