import React from 'react'
import TextField from './UI/TextField';
import AlertaInfo from './UI/AlertaInfo';
import DialogInfo from './UI/DialogInfo';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { inscribeEmpleador } from '../store';
import f from './../functions';
import { Link } from 'react-router-dom';

const InscripcionEmpleador = () => {
  const dispatch = useDispatch();
  const rules = f.reglas();
  const [field, setField] = React.useState({
    nombre: {
      id: 'nombre',
      type: 'text',
      value: '',
      error: false,
      label: 'Nombre',
      rules: [rules.required]
    },
    puesto: {
      id: 'puesto',
      type: 'text',
      value: '',
      error: false,
      label: 'Puesto',
      rules: [rules.required]
    },
    empresa: {
      id: 'empresa',
      type: 'text',
      value: '',
      error: false,
      label: 'Empresa',
      rules: [rules.required]
    },
    dirOficinaCentral: {
      id: 'dirOficinaCentral',
      type: 'text',
      value: '',
      error: false,
      label: 'Dirección de la oficina central',
      rules: [rules.required]
    },
    correo: {
      id: 'correo',
      type: 'text',
      value: '',
      placeholder: 'usuario@ejemplo.com',
      error: false,
      label: 'Correo electrónico',
      rules: [rules.required, rules.email]
    },
    telOficina: {
      id: 'telOficina',
      type: 'text',
      value: '',
      placeholder: '10 dígitos',
      error: false,
      label: 'Teléfono de la oficina',
      rules: [rules.required, rules.phone]
    },
    extension: {
      id: 'extension',
      type: 'text',
      value: '',
      error: false,
      label: 'Extensión',
      rules: [rules.required]
    },
    celular: {
      id: 'celular',
      type: 'text',
      value: '',
      placeholder: '10 dígitos',
      error: false,
      label: 'Celular',
      rules: [rules.required, rules.phone]
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
  
  const validaFormulario = async (e) => {
    e.preventDefault();
    if(isValid(e.currentTarget)) {
      setAlerta({...alerta, show: false});
      const result = await dispatch(inscribeEmpleador(createForm(e.currentTarget)));
      if (result.replyCode === 200) setDialog({...dialog, show: true});
      else setAlerta({...alerta, show: true, text: result.replyCode === 201 ? result.replyText : 'Ocurrió un error inesperado'});
    }
  };

  return (
    <Container fluid className="mt-3 mb-4">
      <DialogInfo element={dialog} onHide={() => setDialog({...dialog, show: false})}/>
      <Row className="justify-content-center">
        <Col lg={11} md={11} sm={12} xs={12}>
          <Link to="/empleador">Iniciar Sesión</Link>{' / '}<Link to="/empleador/inscripcion">Registro</Link>
          <Card bg="light">
            <Card.Body>
              <Card.Title className="text-center">Registro de empleadores</Card.Title>
              <Card.Text className="text-center text-muted">
                Completa los campos solicitados para darte de alta como empleador.
              </Card.Text>
              <AlertaInfo activate={alerta.show} type={alerta.type} text={alerta.text}/>
              <Form onSubmit={validaFormulario}>
                <Form.Row>
                  <Col lg={4} md={6} sm={12} xs={12}>
                    <TextField element={field.nombre} onChange={handleChange} />
                  </Col>
                  <Col lg={4} md={6} sm={12} xs={12}>
                    <TextField element={field.puesto} onChange={handleChange} />
                  </Col>
                  <Col lg={4} md={12} sm={12} xs={12}>
                    <TextField element={field.empresa} onChange={handleChange} />
                  </Col>
                </Form.Row>
                <Form.Row>
                  <Col lg={4} md={6} sm={12} xs={12}>
                    <TextField element={field.dirOficinaCentral} onChange={handleChange}/>
                  </Col>
                  <Col lg={4} md={6} sm={12} xs={12}>
                    <TextField element={field.correo} onChange={handleChange} />
                  </Col>
                  <Col lg={4} md={12} sm={12} xs={12}>
                    <TextField element={field.telOficina} onChange={handleChange} />
                  </Col>
                </Form.Row>
                <Form.Row>
                  <Col lg={4} md={6} sm={12} xs={12}>
                    <TextField element={field.extension} onChange={handleChange} />
                  </Col>
                  <Col lg={4} md={6} sm={12} xs={12}>
                    <TextField element={field.celular} onChange={handleChange} />
                  </Col>
                </Form.Row>
                <Button variant="primary" type="submit" >
                  Inscribirme
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

export default InscripcionEmpleador;