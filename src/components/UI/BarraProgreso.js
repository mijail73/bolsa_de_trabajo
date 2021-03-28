import React from 'react'
import { LinearProgress } from '@material-ui/core/';

const BarraProgreso = (props) => {
  return props.activate ? (
    <LinearProgress variant="indeterminate"/>
  ) : (null)
};

export default BarraProgreso;
