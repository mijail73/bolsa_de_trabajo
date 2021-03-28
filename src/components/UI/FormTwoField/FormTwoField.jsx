import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

function FormSingleField(props) {
  const { fieldName, buttonName, rules, action } = props;
  const classes = useStyles();
  const [field, setField] = React.useState('');
  const [errorField, setErrorField] = React.useState(false);
  const [helperText, setHelperText] = React.useState('');
  const [validForm, setValidForm] = React.useState(false);

  const manageErrors = (value, setterError, setterText, rules) => {
    for (let r of rules) {
      let result = r(value);
      if (typeof result === 'string') {
        setterError(true);
        setterText(result);
        setValidForm(false);
        break;
      } else {
        setterError(false);
        setterText('');
        setValidForm(true);
      }
    }
  };

  const changeField = (e) => {
    setField(e.target.value);
    manageErrors(e.target.value, setErrorField, setHelperText, rules);
  };

  return (
    <FormControl className={classes.root}>
      <TextField
        id="outlined-basic"
        label={fieldName}
        variant="outlined"
        value={field}
        onChange={changeField}
        error={errorField}
        size="small"
        helperText={helperText}
      />
      <Button
        size="small"
        color="primary"
        onClick={action}
        disabled={!validForm}
      >
        {buttonName}
      </Button>
    </FormControl>
  );
}

export default FormSingleField;
