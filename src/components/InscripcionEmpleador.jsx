import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography, TextField, Button, Backdrop, CircularProgress } from '@material-ui/core/';
//import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { inscribeEmpleador, obtieneReglas } from '../store';
import InfoDialog from './UI/InfoDialog';

const useStyles = makeStyles((theme) => ({
  rootDiv: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: "center",
    marginBottom: theme.spacing(5)
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
  fieldText: {
    width: '90%',
  },
  card: {
    width: 400,
    justifyContent: "center",
    backgroundColor: "#fAfAfA",
  },
  row: {
    marginTop: theme.spacing(2),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },  
}));

const InscripcionEmpleador = () => {
  const classes = useStyles();
  //const history = useHistory();
  const dispatch = useDispatch();
  const reglas = dispatch(obtieneReglas());
  const [field, setField] = React.useState({
    nombre: {
      value: '',
      error: false,
      label: '',
      rules: [reglas.required]
    },
    puesto: {
      value: '',
      error: false,
      label: '',
      rules: [reglas.required]
    },
    empresa: {
      value: '',
      error: false,
      label: '',
      rules: [reglas.required]
    },
    dirOficinaCentral: {
      value: '',
      error: false,
      label: '',
      rules: [reglas.required]
    },
    correo: {
      value: '',
      error: false,
      label: '',
      rules: [reglas.required, reglas.email]
    },
    telOficina: {
      value: '',
      error: false,
      label: '',
      rules: [reglas.required, reglas.celular]
    },
    extension: {
      value: '',
      error: false,
      label: '',
      rules: [reglas.required]
    },
    celular: {
      value: '',
      error: false,
      label: '',
      rules: [reglas.required, reglas.celular]
    },
  });
  const [vars, setVars] = React.useState({
    dialog: false,
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
      } else setField({...field, [element]: {...field[element], error: false, value: value, label: ''}});
      
    }
  };

  const changeField = (e) => {
    manageErrors(e.target.value, e.target.id);
  };

  const formularioValido = () => {
    let campos = Object.entries(field).map(a => a[0]);
    for (let f of campos) {
      manageErrors(field[f].value, f);
      if (field[f].error || (field[f].value === '' && field[f].rules.length > 0)) return false;
    }
    return true;
  }

  const creaFormulario = () => {
    let form = new FormData();
    form.append('data', JSON.stringify({
      nombre: field.nombre.value.toUpperCase(),
      correo: field.correo.value,
      puesto: field.puesto.value,
      telOficina: field.telOficina.value,
      extension: field.extension.value,
      celular: field.celular.value,
      empresa: field.empresa.value,
      dirOficinaCentral: field.dirOficinaCentral.value
    }));
    return form;
  }

  const procesaInscripcionEmpleador = async () => {
    if (formularioValido()) {
      setVars({...vars, progress: true, alerta: {active: false, text: ''} });
      const result = await dispatch(inscribeEmpleador(creaFormulario()));
      setTimeout(() => {
        if (result.replyCode === 200) setVars({...vars, dialog: true, progress: false});
        else setVars({...vars, progress: false, alerta: {active: true, text: 'Ocurrió un error al guardar, intenta más tarde'} });
      }, 1500);   
    }
  }

  return (
    <div className={classes.rootDiv}>
      <Grid container className={classes.gridContainer} spacing={1} justify="center"> {/** ROW */}
        <Grid item lg={10} md={11} sm={11} xs={11}>
          <Paper className={classes.paper}>
            <Backdrop className={classes.backdrop} open={vars.progress}>
              <CircularProgress color="inherit" />
            </Backdrop>
                        
            <InfoDialog 
              open={vars.dialog}
              title="Inscripción exitosa"
              text="Te has inscrito como empleador de manera exitosa"
            />
            <Typography variant="h4" gutterBottom className={classes.titulo}> Registro de empleadores </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Completa los campos solicitados para darte de alta como empleador
            </Typography>
            
            <form>
              <Grid container className={classes.row} spacing={1}> {/** ROW */}
                <Grid item md={4} sm={10} xs={12} >
                  <TextField
                    className={classes.fieldText}
                    id="nombre"
                    label="Nombre(s)"
                    variant="outlined"
                    value={field.nombre.value}
                    onChange={changeField}
                    error={field.nombre.error}
                    size="small"
                    helperText={field.nombre.label}
                  />
                </Grid>
                <Grid item md={4} sm={10} xs={12}>
                  <TextField
                    className={classes.fieldText}
                    id="puesto"
                    label="Puesto"
                    variant="outlined"
                    value={field.puesto.value}
                    onChange={changeField}
                    error={field.puesto.error}
                    size="small"
                    helperText={field.puesto.label}
                  />
                </Grid>
                <Grid item md={4} sm={10} xs={12} >
                  <TextField
                    className={classes.fieldText}
                    id="empresa"
                    label="Empresa"
                    variant="outlined"
                    value={field.empresa.value}
                    onChange={changeField}
                    error={field.empresa.error}
                    size="small"
                    helperText={field.empresa.label}
                  />
                </Grid>
              </Grid>

              <Grid container className={classes.row} spacing={1}> {/** ROW */}
                <Grid item md={4} sm={10} xs={12}>
                  <TextField
                    className={classes.fieldText}
                    id="dirOficinaCentral"
                    label="Dirección de la oficina central"
                    variant="outlined"
                    value={field.dirOficinaCentral.value}
                    onChange={changeField}
                    error={field.dirOficinaCentral.error}
                    size="small"
                    helperText={field.dirOficinaCentral.label}
                  />
                </Grid>
                <Grid item md={4} sm={10} xs={12}>
                  <TextField
                    className={classes.fieldText}
                    id="correo"
                    label="Correo electrónico"
                    variant="outlined"
                    value={field.correo.value}
                    onChange={changeField}
                    error={field.correo.error}
                    size="small"
                    helperText={field.correo.label}
                  />
                </Grid>
                <Grid item md={4} sm={10} xs={12}>
                  <TextField
                    className={classes.fieldText}
                    id="telOficina"
                    label="Teléfono de la oficina"
                    variant="outlined"
                    value={field.telOficina.value}
                    onChange={changeField}
                    error={field.telOficina.error}
                    size="small"
                    helperText={field.telOficina.label}
                  />
                </Grid>
              </Grid>

              <Grid container className={classes.row} spacing={1}> {/** ROW */}
                <Grid item md={4} sm={10} xs={12}>
                  <TextField
                    className={classes.fieldText}
                    id="extension"
                    label="Extesión"
                    variant="outlined"
                    value={field.extension.value}
                    onChange={changeField}
                    error={field.extension.error}
                    size="small"
                    helperText={field.extension.label}
                  />
                </Grid>
                <Grid item md={4} sm={10} xs={12} >
                  <TextField
                    className={classes.fieldText}
                    id="celular"
                    label="Celular"
                    variant="outlined"
                    value={field.celular.value}
                    onChange={changeField}
                    error={field.celular.error}
                    size="small"
                    helperText={field.celular.label}
                  />
                </Grid>
              </Grid>

              <Grid container className={classes.row} spacing={1}> {/** ROW */}
                <Grid item md={3} sm={10} xs={12} >
                  <Button className={classes.fieldText} variant="contained" color="primary" onClick={procesaInscripcionEmpleador} > Inscribirme </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
};

export default InscripcionEmpleador;
