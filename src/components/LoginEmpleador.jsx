import React from 'react'
import TextField from './UI/TextField';
import AlertaInfo from './UI/AlertaInfo';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { useHistory, Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { validaLogin } from '../store';
import f from '../functions';


const LoginEmpleador = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const rules = f.reglas();
  const [field, setField] = React.useState({
    user: {
      id: 'user',
      type: 'text',
      label: 'Usuario',
      placeholder: 'Correo electrónico',
      value: '',
      rules: [rules.required, rules.email],
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
      form.append('data', JSON.stringify({ user: field.user.value, pass: field.pass.value, type: 'empleador' }));
      const result = await dispatch(validaLogin(form));
      if (result.replyCode === 200 && result.data.length > 0) history.push("/empleador/vacantes");
      else setAlerta({...alerta, show: true, text: result.replyText});
    }
  };

  return (
    <Container className="mt-4 mb-4">
      <Row className="justify-content-center">
        <Col lg={6} md={8} sm={10} xs={12}>
          <Card bg="light">
            <Card.Body>
              <Card.Title className="text-center">Acceso para empleadores</Card.Title>
              <Card.Text className="text-center text-muted">
                Inicia sesión con tu correo electrónico y contraseña.
              </Card.Text>
              <AlertaInfo activate={alerta.show} type={alerta.type} text={alerta.text}/>
              <Form onSubmit={validaFormulario}>
                <TextField 
                  element={field.user}
                  onChange={handleChange}
                />
                <TextField 
                  element={field.pass}
                  onChange={handleChange}
                />
                <Button variant="primary" type="submit">
                  Iniciar sesión 
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="ml-1" focusable={false}>
                    <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"/>
                    <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                  </svg>
                </Button>
              </Form>
              <div className="mt-4 text-center">
                ¿No estás registrado? Regístrate <Link to="/empleador/inscripcion">aquí</Link>.
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginEmpleador;
