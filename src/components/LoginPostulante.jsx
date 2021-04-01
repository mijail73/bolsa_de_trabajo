import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography, FormControl, TextField, Button } from '@material-ui/core/';
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { validaLogin, obtieneReglas } from '../store';
import BarraProgreso from './UI/BarraProgreso';
import Alerta from './UI/Alerta';

const useStyles = makeStyles((theme) => ({
  rootDiv: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: "center",
  },
  gridContainer: {
    flexGrow: 1,
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  paper: {
    color: theme.palette.text.secondary,
    marginTop: 30,
    paddingBottom: theme.spacing(2)
  },
  formulario: {
    '& > *': {
      margin: theme.spacing(1)
    },
    width: '80%'
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
      rules: [reglas.required, reglas.cuentaEmail]
    },
    progress: false,
    alerta: {
      active: false,
      text: ''
    },
  });
  
  const manageErrors = (value) => {
    const rules = field.user.rules;
    if (rules.length === 0) {
      setField({...field, user: {...field.user, value: value }});
      return;
    }
    for (let r of rules) {
      let result = r(value);
      if (typeof result === 'string') {
        setField({...field, user: {...field.user, error: true, value: value, label: result}});
        break;
      } 
      setField({...field, user: {...field.user, error: false, value: value, label: ''}});
    }
  };

  const changeField = (e) => {
    manageErrors(e.target.value);
  };

  const formularioValido = () => {
    manageErrors(field.user.value, 'user');
    return (field.user.error || field.user.value === '') ? false : true;
  }

  // const usuario = useSelector(store => store.usuario);
  // console.log('Usuario', usuario);

  const validaLoginUsuario = async () => {
    if (formularioValido()) {
      setField({...field, progress: true, alerta: {active: false, text: ''} });
      let form = new FormData();
      form.append('data', JSON.stringify({ user: field.user.value, pass: 'pass', type: 'postulante' }));
      const result = await dispatch(validaLogin(form));
      setTimeout(() => {
        setField({...field, progress: false});
        if (result.replyCode === 200 && result.data.length > 0) history.push("/vacantes");
        else setField({...field, alerta: {active: true, text: result.replyText}});
      }, 1500);
    }
  }

  return (
    <div className={classes.rootDiv}>
      <Grid container className={classes.gridContainer} spacing={1} justify="center"> {/** ROW */}
        <Grid item lg={6} md={6} sm={9} xs={12} className={classes.gridRow}>
          <Paper className={classes.paper}>
            <BarraProgreso activate={field.progress}></BarraProgreso>
            <Typography variant="h4" gutterBottom className={classes.titulo}> Búsqueda de vacantes </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Si eres parte de la comunidad FQ inicia sesión con tu número de cuenta.
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              ¿No eres comunidad FQ? Inicia sesión con tu correo electrónico
            </Typography>
            <FormControl className={classes.formulario}>
              <Alerta type="error" text={field.alerta.text} activate={field.alerta.active} ></Alerta>
              <TextField
                id="outlined-basic"
                label="Número de cuenta o correo"
                variant="outlined"
                value={field.user.value}
                onChange={changeField}
                error={field.user.error}
                size="small"
                helperText={field.user.label}
              />
              <Button variant="contained" color="primary" onClick={validaLoginUsuario}> Acceder </Button>
              <Button variant="text" color="primary" onClick={() => history.push("/registro_externos")}> 
                Registrarme como postulante externo 
              </Button>
            </FormControl>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
};

export default LoginUsuario;
