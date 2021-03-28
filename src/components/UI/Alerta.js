import React from 'react'
import { Alert } from '@material-ui/lab/';

const Alerta = (props) => {
  const { type, text, activate } = props;
  return activate ? (
    <Alert severity={type}>{text}</Alert>
  ) : (null)
};

export default Alerta;
