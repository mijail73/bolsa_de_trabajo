import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography, TextField, Button, Backdrop, CircularProgress } from '@material-ui/core/';
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { registraPostulante, obtieneReglas } from '../store';
import InfoDialog from './UI/InfoDialog';
import Alerta from './UI/Alerta';

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

const RegistroPostulante = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const reglas = dispatch(obtieneReglas());
  const [field, setField] = React.useState({
    nombre: {
      value: '',
      error: false,
      label: '',
      rules: [reglas.required]
    },
    apPaterno: {
      value: '',
      error: false,
      label: '',
      rules: [reglas.required]
    },
    apMaterno: {
      value: '',
      error: false,
      label: '',
      rules: [reglas.required]
    },
    fechaNacimiento: {
      value: '',
      error: false,
      label: '',
      rules: [reglas.required]
    },
    sexo: {
      value: '',
      error: false,
      label: '',
      rules: [reglas.required]
    },
    estado: {
      value: '',
      error: false,
      label: '',
      rules: [reglas.required]
    },
    universidad: {
      value: '',
      error: false,
      label: '',
      rules: [reglas.required]
    },
    facultad: {
      value: '',
      error: false,
      label: '',
      rules: [reglas.required]
    },
    carrera: {
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
    telefono: {
      value: '',
      error: false,
      label: '',
      rules: [reglas.required]
    },
    situacionAcademica: {
      value: '',
      error: false,
      label: '',
      rules: [reglas.required]
    },
    semestre: {
      value: '',
      error: false,
      label: '',
      rules: [reglas.required]
    },
    situacionLaboral: {
      value: '',
      error: false,
      label: '',
      rules: [reglas.required]
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
      apPaterno: field.apPaterno.value.toUpperCase(),
      apMaterno: field.apMaterno.value.toUpperCase(),
      fechaNacimiento: field.fechaNacimiento.value,
      sexo: field.sexo.value,
      estado: field.estado.value,
      universidad: field.universidad.value,
      facultad: field.facultad.value,
      carrera: field.carrera.value,
      correo: field.correo.value,
      telefono: field.telefono.value,
      situacionAcademica: field.situacionAcademica.value,
      semestre: field.semestre.value,
      situacionLaboral: field.situacionLaboral.value,
      tipo: 'E'
    }));
    return form;
  }

  const procesaRegistroPostulante = async () => {
    if (formularioValido()) {
      setVars({...vars, progress: true, alerta: {active: false, text: ''} });
      const result = await dispatch(registraPostulante(creaFormulario()));
      setTimeout(() => {
        if (result.replyCode === 200) setVars({...vars, dialog: true, progress: false});
        else setVars({...vars, progress: false, alerta: {active: true, text: 'Ocurrió un error al guardar, intenta más tarde'} });
      }, 1500);   
    }
  }

  const goToVacantes = () => {
    setVars({...vars, dialog: false})
    history.push('/vacantes');
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
              title="Registro exitoso"
              text="Te has registrado como postulante de manera exitosa"
              agreeText="Ir a vacantes"
              agreeAction={goToVacantes}
            />
            <Typography variant="h4" gutterBottom className={classes.titulo}> Registro de postulantes externos </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Completa los campos solicitados para darte de alta como postulante
            </Typography>
            <Alerta type="error" text={vars.alerta.text} activate={vars.alerta.active} ></Alerta>
            
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
                    id="apPaterno"
                    label="Apellido paterno"
                    variant="outlined"
                    value={field.apPaterno.value}
                    onChange={changeField}
                    error={field.apPaterno.error}
                    size="small"
                    helperText={field.apPaterno.label}
                  />
                </Grid>
                <Grid item md={4} sm={10} xs={12}>
                  <TextField
                    className={classes.fieldText}
                    id="apMaterno"
                    label="Apellido materno"
                    variant="outlined"
                    value={field.apMaterno.value}
                    onChange={changeField}
                    error={field.apMaterno.error}
                    size="small"
                    helperText={field.apMaterno.label}
                  />
                </Grid>
              </Grid>

              <Grid container className={classes.row} spacing={1}> {/** ROW */}
                <Grid item md={4} sm={10} xs={12} >
                  <TextField
                    className={classes.fieldText}
                    id="fechaNacimiento"
                    label="Fecha de nacimiento"
                    variant="outlined"
                    value={field.fechaNacimiento.value}
                    onChange={changeField}
                    error={field.fechaNacimiento.error}
                    size="small"
                    helperText={field.fechaNacimiento.label}
                  />
                </Grid>
                <Grid item md={4} sm={10} xs={12}>
                  <TextField
                    className={classes.fieldText}
                    id="sexo"
                    label="Sexo"
                    variant="outlined"
                    value={field.sexo.value}
                    onChange={changeField}
                    error={field.sexo.error}
                    size="small"
                    helperText={field.sexo.label}
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
              </Grid>

              <Grid container className={classes.row} spacing={1}> {/** ROW */}
                <Grid item md={4} sm={10} xs={12} >
                  <TextField
                    className={classes.fieldText}
                    id="universidad"
                    label="Universidad"
                    variant="outlined"
                    value={field.universidad.value}
                    onChange={changeField}
                    error={field.universidad.error}
                    size="small"
                    helperText={field.universidad.label}
                  />
                </Grid>
                <Grid item md={4} sm={10} xs={12}>
                  <TextField
                    className={classes.fieldText}
                    id="facultad"
                    label="Facultad"
                    variant="outlined"
                    value={field.facultad.value}
                    onChange={changeField}
                    error={field.facultad.error}
                    size="small"
                    helperText={field.facultad.label}
                  />
                </Grid>
                <Grid item md={4} sm={10} xs={12}>
                  <TextField
                    className={classes.fieldText}
                    id="carrera"
                    label="Carrera"
                    variant="outlined"
                    value={field.carrera.value}
                    onChange={changeField}
                    error={field.carrera.error}
                    size="small"
                    helperText={field.carrera.label}
                  />
                </Grid>
              </Grid>

              <Grid container className={classes.row} spacing={1}> {/** ROW */}
                <Grid item md={4} sm={10} xs={12} >
                  <TextField
                    className={classes.fieldText}
                    id="situacionAcademica"
                    label="Situación académica"
                    variant="outlined"
                    value={field.situacionAcademica.value}
                    onChange={changeField}
                    error={field.situacionAcademica.error}
                    size="small"
                    helperText={field.situacionAcademica.label}
                  />
                </Grid>
                <Grid item md={4} sm={10} xs={12}>
                  <TextField
                    className={classes.fieldText}
                    id="semestre"
                    label="Semestre"
                    variant="outlined"
                    value={field.semestre.value}
                    onChange={changeField}
                    error={field.semestre.error}
                    size="small"
                    helperText={field.semestre.label}
                  />
                </Grid>
                <Grid item md={4} sm={10} xs={12}>
                  <TextField
                    className={classes.fieldText}
                    id="situacionLaboral"
                    label="Situación laboral"
                    variant="outlined"
                    value={field.situacionLaboral.value}
                    onChange={changeField}
                    error={field.situacionLaboral.error}
                    size="small"
                    helperText={field.situacionLaboral.label}
                  />
                </Grid>
              </Grid>

              <Grid container className={classes.row} spacing={1}> {/** ROW */}
                <Grid item md={4} sm={10} xs={12} >
                  <TextField
                    className={classes.fieldText}
                    id="estado"
                    label="Estado"
                    variant="outlined"
                    value={field.estado.value}
                    onChange={changeField}
                    error={field.estado.error}
                    size="small"
                    helperText={field.estado.label}
                  />
                </Grid>
                <Grid item md={4} sm={10} xs={12} >
                  <TextField
                    className={classes.fieldText}
                    id="telefono"
                    label="Teléfono"
                    variant="outlined"
                    value={field.telefono.value}
                    onChange={changeField}
                    error={field.telefono.error}
                    size="small"
                    helperText={field.telefono.label}
                  />
                </Grid>
              </Grid>

              <Grid container className={classes.row} spacing={1}> {/** ROW */}
                <Grid item md={3} sm={10} xs={12} >
                  <Button className={classes.fieldText} variant="contained" color="primary" onClick={procesaRegistroPostulante}> Registrarme </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
};

export default RegistroPostulante;
