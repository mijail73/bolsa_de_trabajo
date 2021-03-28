import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, FormControl, Card, Box, CardContent, Typography } from '@material-ui/core/';
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { validaLogin, obtieneReglas } from './../redux/store';
import BarraProgreso from './UI/BarraProgreso';
import Alerta from './UI/Alerta';

const useStyles = makeStyles((theme) => ({
  rootDiv: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: "center",
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '40ch',
    },
  },
  card: {
    width: 400,
    justifyContent: "center",
    backgroundColor: "#fAfAfA",
  },
  box: {
    margin: 50,
  },
  button: {
    width: '43ch',
  },
  bar: {
    transition: 'none'
  },
}));

const LoginUsuario = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const reglas = dispatch(obtieneReglas());
  const [field, setField] = React.useState({
    user: {
      value: '',
      error: false,
      label: '',
      rules: [reglas.required]
    },
    pass: {
      value: '',
      error: false,
      label: '',
      rules: [reglas.required]
    },
    progress: false,
    alerta: {
      active: false,
      text: ''
    },
  });
  
  const manageErrors = (value, element) => {
    const rules = field[element].rules;
    if (rules.length === 0) {
      setField({...field, [element]: {...field[element], value: value }});
      return;
    }
    for (let r of rules) {
      let result = r(value);
      if (typeof result === 'string') {
        setField({...field, [element]: {...field[element], error: true, value: value, label: result}});
        break;
      } else {  
        setField({...field, [element]: {...field[element], error: false, value: value, label: ''}});
      }
    }
  };

  const changeField = (e) => {
    manageErrors(e.target.value, e.target.id);
  };

  const formularioValido = () => {
    for (let f of Object.keys(field)) {
      if (field[f].error) return false;
    }
    return true;
  }

  // const usuario = useSelector(store => store.usuario);
  // console.log('Usuario', usuario);

  const validaLoginUsuario = async () => {
    if (formularioValido()) {
      setField({...field, progress: true, alerta: {active: false, text: ''} });
      let form = new FormData();
      form.append('data', JSON.stringify({ user: field.user.value, pass: field.pass.value, type: 'admin' }));
      const result = await dispatch(validaLogin(form));
      setTimeout(() => {
        setField({...field, progress: false});
        if (result.replyCode === 200 && result.data.length > 0) history.push("/login");
        else setField({...field, alerta: {active: true, text: result.replyText}});
      }, 2000);
    } 
  }

  return (
    <div className={classes.rootDiv}>
      <Box flexWrap="wrap" flexDirection="column" justifyContent="center" className={classes.box}>
        <Card className={classes.card}>
          <BarraProgreso activate={field.progress}></BarraProgreso>
          <CardContent>
            <FormControl className={classes.root}>
              <Typography gutterBottom variant="h6" component="h6">
                Iniciar Sesión
              </Typography>
              <Alerta type="error" text={field.alerta.text} activate={field.alerta.active} ></Alerta>
              <TextField
                id="user"
                label="Usuario"
                variant="outlined"
                value={field.user.value}
                onChange={changeField}
                error={field.user.error}
                size="small"
                helperText={field.user.label}
              />
              <TextField
                id="pass"
                label="Contraseña"
                variant="outlined"
                value={field.pass.value}
                onChange={changeField}
                error={field.pass.error}
                size="small"
                helperText={field.pass.label}
                type="password"
              />
              <Button
                variant="contained"
                color="primary"
                onClick={validaLoginUsuario}
                className={classes.button}
              >
                Acceder
              </Button>
            </FormControl>
          </CardContent>
        </Card>
      </Box>
    </div>
  )
};

export default LoginUsuario;
