import React from 'react'
import TextField from './UI/TextField';
import Select from './UI/Select';
import AlertaInfo from './UI/AlertaInfo';
import DialogInfo from './UI/DialogInfo';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { registraPostulante } from '../store';
import f from './../functions';
import { Link } from 'react-router-dom';


const RegistroPostulante = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const rules = f.reglas();
  const [field, setField] = React.useState({
    nombre: {
      id: 'nombre',
      type: 'text',
      label: 'Nombre(s)',
      placeholder: 'Nombre(s)',
      value: '',
      rules: [rules.required],
      error: false,
      labelError: ''
    },
    apPaterno: {
      id: 'apPaterno',
      type: 'text',
      label: 'Apellido paterno',
      placeholder: 'Apellido paterno',
      value: '',
      rules: [rules.required],
      error: false,
      labelError: ''
    },
    apMaterno: {
      id: 'apMaterno',
      type: 'text',
      label: 'Apellido materno',
      placeholder: 'Apellido materno',
      value: '',
      rules: [rules.required],
      error: false,
      labelError: ''
    },
    fechaNacimiento: {
      id: 'fechaNacimiento',
      type: 'date',
      label: 'Fecha de nacimiento',
      value: '',
      min: '2021-04-17',
      rules: [rules.required],
      error: false,
      labelError: ''
    },
    sexo: {
      id: 'sexo',
      label: 'Sexo',
      value: '',
      rules: [rules.required],
      options: [
        {id: '', text: 'Selecciona una opción'},
        {id: 'F', text: 'Femenino'},
        {id: 'M', text: 'Masculino'},
        {id: 'X', text: 'Prefiero no decir'},
      ],
      error: false,
      labelError: ''
    },
    correo: {
      id: 'correo',
      type: 'text',
      label: 'Correo electrónico',
      placeholder: 'usuario@ejemplo.com',
      value: '',
      rules: [rules.required, rules.email],
      error: false,
      labelError: ''
    },
    telefono: {
      id: 'telefono',
      type: 'text',
      label: 'Teléfono',
      placeholder: '10 dígitos',
      value: '',
      rules: [rules.required, rules.phone],
      error: false,
      labelError: ''
    },
    universidad: {
      id: 'universidad',
      type: 'text',
      label: 'Universidad',
      placeholder: 'Ej. UNAM',
      value: '',
      rules: [rules.required],
      error: false,
      labelError: ''
    },
    facultad: {
      id: 'facultad',
      type: 'text',
      label: 'Facultad',
      placeholder: 'Ej. FQ',
      value: '',
      rules: [rules.required],
      error: false,
      labelError: ''
    },
    carrera: {
      id: 'carrera',
      type: 'text',
      label: 'Carrera',
      placeholder: 'Ej. Ingeniería Química',
      value: '',
      rules: [rules.required],
      error: false,
      labelError: ''
    },
    situacionAcademica: {
      id: 'situacionAcademica',
      type: 'text',
      label: 'Situacion académica',
      placeholder: 'Ej. Pasante',
      value: '',
      rules: [rules.required],
      error: false,
      labelError: ''
    },
    semestre: {
      id: 'semestre',
      type: 'text',
      label: 'Semestre',
      placeholder: 'Ej. 2',
      value: '',
      rules: [rules.required],
      error: false,
      labelError: ''
    },
    situacionLaboral: {
      id: 'situacionLaboral',
      type: 'text',
      label: 'Situación laboral',
      placeholder: 'Ej. Desempleado',
      value: '',
      rules: [rules.required],
      error: false,
      labelError: ''
    },
    estado: {
      id: 'estado',
      type: 'text',
      label: 'Estado de residencia',
      placeholder: 'Ej. CDMX',
      value: '',
      rules: [rules.required],
      error: false,
      labelError: ''
    },
    
  });
  const [alerta, setAlerta] = React.useState({
    show: false,
    text: 'Usuario o contraseña incorrectos',
    type: 'danger'
  });

  const [dialog, setDialog] = React.useState({
    show: false,
    title: 'Información',
    subtitle: 'Registro exitoso',
    text: 'Te has registrado exitosamente como postulante, ahora puedes consultar las vacantes disponibles.'
  });

  const handleChange = (id, value, error, labelError) => {
    setField({...field, [id]: {...field[id], value: value, error: error, labelError: labelError }});
  };

  const validaReglas = (element, value) => {
    let retorno = field[element];
    const reglas = f.definido(retorno.rules) ? retorno.rules : [];
    for (let r of reglas) {
      let result = r(value);
      if (typeof result === 'string') { 
        retorno = {...retorno, error: true, labelError: result};
        return retorno;
      }
    }
    retorno = {...retorno, error: false, labelError: ''};
    return retorno;
  };

  const createForm = (form) => {
    let finalObj = {};
    for (let f of form) {
      if (f.localName !== 'button') {
        finalObj = {...finalObj, [f.id]: f.value};
      }
    }
    
    finalObj = {...finalObj, tipo: 'E'};
    let formData = new FormData();
    formData.append('data', JSON.stringify(finalObj));
    return formData;
  };

  const isValid = (form) => {
    let finalObj = {};
    for (let f of form) {
      if (f.localName !== 'button') {
        finalObj = {...finalObj, [f.id]: validaReglas(f.id, f.value)};
      }
    }
    setField(finalObj);
    return !Object.entries(finalObj).map(o => o[1].error).includes(true);
  };

  const validaFormulario = async (e) => {
    e.preventDefault();
    if(isValid(e.currentTarget)) {
      setAlerta({...alerta, show: false});
      const result = await dispatch(registraPostulante(createForm(e.currentTarget)));
      if (result.replyCode === 200) setDialog({...dialog, show: true});
      else setAlerta({...alerta, show: true, text: result.replyCode === 201 ? result.replyText : 'Ocurrió un error inesperado'});
    }
  };

  const goToVacantes = () => {
    setDialog({...dialog, show: false});
    history.push('/postulante/vacantes');
  };

  return (
    <Container fluid className="mt-3 mb-4">
      <DialogInfo element={dialog} onHide={() => setDialog({...dialog, show: false})} agreeAction={goToVacantes}/>
      <Row className="justify-content-center">
        <Col lg={11} md={11} sm={12} xs={12}>
          <Link to="/postulante">Iniciar Sesión</Link>{' / '}<Link to="/postulante/registro">Registro</Link>
          <Card bg="light">
            <Card.Body>
              <Card.Title className="text-center">Registro de postulantes externos</Card.Title>
              <Card.Text className="text-center text-muted">
                Completa los campos solicitados para darte de alta como postulante.
              </Card.Text>
              <AlertaInfo activate={alerta.show} type={alerta.type} text={alerta.text}/>
              <Form onSubmit={validaFormulario}>
                <Form.Row>
                  <Col lg={3} md={6} sm={12} xs={12}>
                    <TextField element={field.nombre} onChange={handleChange} />
                  </Col>
                  <Col lg={3} md={6} sm={12} xs={12}>
                    <TextField element={field.apPaterno} onChange={handleChange} />
                  </Col>
                  <Col lg={3} md={6} sm={12} xs={12}>
                    <TextField element={field.apMaterno} onChange={handleChange} />
                  </Col>
                  <Col lg={3} md={6} sm={12} xs={12}>
                    <TextField element={field.fechaNacimiento} onChange={handleChange} />
                  </Col>
                </Form.Row>
                <Form.Row>
                  <Col lg={3} md={6} sm={12} xs={12}>
                    <Select element={field.sexo} onChange={handleChange}/>
                  </Col>
                  <Col lg={3} md={6} sm={12} xs={12}>
                    <TextField element={field.correo} onChange={handleChange} />
                  </Col>
                  <Col lg={3} md={6} sm={12} xs={12}>
                    <TextField element={field.telefono} onChange={handleChange} />
                  </Col>
                  <Col lg={3} md={6} sm={12} xs={12}>
                    <TextField element={field.universidad} onChange={handleChange} />
                  </Col>
                </Form.Row>
                <Form.Row>
                  <Col lg={3} md={6} sm={12} xs={12}>
                    <TextField element={field.facultad} onChange={handleChange} />
                  </Col>
                  <Col lg={3} md={6} sm={12} xs={12}>
                    <TextField element={field.carrera} onChange={handleChange} />
                  </Col>
                  <Col lg={3} md={6} sm={12} xs={12}>
                    <TextField element={field.situacionAcademica} onChange={handleChange} />
                  </Col>
                  <Col lg={3} md={6} sm={12} xs={12}>
                    <TextField element={field.semestre} onChange={handleChange} />
                  </Col>
                </Form.Row>
                <Form.Row>
                  <Col lg={3} md={6} sm={12} xs={12}>
                    <TextField element={field.situacionLaboral} onChange={handleChange} />
                  </Col>
                  <Col lg={3} md={6} sm={12} xs={12}>
                    <TextField element={field.estado} onChange={handleChange} />
                  </Col>
                </Form.Row>

                <Button variant="primary" type="submit" >
                  Registrarme
                </Button>
              </Form>
              {/* <a href="/registro" >Registrarme como postulante externo</a> */}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RegistroPostulante;
