import React from 'react'
import TextField from './UI/TextField';
import AlertaError from './UI/AlertaError';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { useHistory, Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { validaLogin } from '../store';
import f from './../functions';


const Prueba = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const rules = f.reglas();
  const [field, setField] = React.useState({
    user: {
      id: 'user',
      type: 'text',
      label: 'Usuario',
      placeholder: 'Número de cuenta o correo',
      value: '',
      rules: [rules.required, rules.cuentaEmail],
      error: false,
      labelError: ''
    },
    pass: {
      id: 'pass',
      type: 'password',
      label: 'Contraseña',
      placeholder: '*************',
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

  const validaFormulario = async (e) => {
    e.preventDefault();
    if(isValid(e.currentTarget)) {
      setAlerta({...alerta, show: false});
      let form = new FormData();
      form.append('data', JSON.stringify({ user: field.user.value, pass: field.pass.value, type: 'postulante' }));
      const result = await dispatch(validaLogin(form));
      if (result.replyCode === 200 && result.data.length > 0) history.push("/vacantes");
      else setAlerta({...alerta, show: true, text: result.replyText});
    }
  };

  return (
    <Container className="mt-4 mb-4">
      <Row className="justify-content-center">
        <Col lg={6} md={8} sm={10} xs={12}>
          <Card bg="light">
            <Card.Body>
              <Card.Title className="text-center">Búsqueda de vacantes</Card.Title>
              <Card.Text className="text-center text-muted">
                Si eres parte de la comunidad FQ inicia sesión con tu número de cuenta.<br></br>
                ¿No eres comunidad FQ? Inicia sesión con tu correo electrónico.
              </Card.Text>
              <AlertaError activate={alerta.show} type={alerta.type} text={alerta.text}/>
              <Form onSubmit={validaFormulario}>
                <TextField 
                  element={field.user}
                  onChange={handleChange}
                />
                <TextField 
                  element={field.pass}
                  onChange={handleChange}
                />
                <Button variant="primary" type="submit" >
                  Iniciar sesión
                </Button>
              </Form>
              <div className="mt-4 text-center">
                ¿No estás registrado? Regístrate como postulante externo <Link to="/registro_postulante">aquí</Link>.
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Prueba;
