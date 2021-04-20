import React from 'react'
import TextField from './UI/TextField';
import AlertaInfo from './UI/AlertaInfo';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { useHistory, Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { validaLogin } from '../store';
import f from './../functions';


const LoginPostulante = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const rules = f.reglas();
  const [field, setField] = React.useState({
    user: {
      id: 'user',
      type: 'text',
      label: 'Usuario',
      placeholder: 'Número de cuenta',
      value: '',
      rules: [rules.required, rules.cuenta],
      error: false,
      labelError: ''
    },
  });
  const [fieldE, setFieldE] = React.useState({
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
  });
  const [alerta, setAlerta] = React.useState({
    show: false,
    text: 'Usuario o contraseña incorrectos',
    type: 'danger'
  });

  const handleChange = (id, value, error, labelError) => {
    setField({...field, [id]: {...field[id], value: value, error: error, labelError: labelError }});
  };
  const handleChange2 = (id, value, error, labelError) => {
    setFieldE({...fieldE, [id]: {...fieldE[id], value: value, error: error, labelError: labelError }});
  };

  const validaReglas = (element, value, type) => {
    let retorno = type === 'internos' ? field[element] : fieldE[element];
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

  const isValid = (form, type) => {
    let finalObj = {};
    for (let f of form) {
      if (f.localName !== 'button') {
        finalObj = {...finalObj, [f.id]: validaReglas(f.id, f.value, type)};
      }
    }
    if (type === 'internos') setField(finalObj); else setFieldE(finalObj);
    return !Object.entries(finalObj).map(o => o[1].error).includes(true);
  };

  const validaFormulario = async (e) => {
    e.preventDefault();
    const type = e.currentTarget.id;
    if(isValid(e.currentTarget, type)) {
      setAlerta({...alerta, show: false});
      let form = new FormData();
      form.append('data', JSON.stringify({ 
        user: type === 'internos' ? field.user.value : fieldE.user.value, 
        type: 'postulante' 
      }));
      const result = await dispatch(validaLogin(form));
      if (result.replyCode === 200 && result.data.length > 0) history.push("/postulante/vacantes");
      else setAlerta({...alerta, show: true, text: result.replyText});
    }
  };

  return (
    <Container className="mt-4 mb-4" >
      <Row className="justify-content-center">
        <Col lg={12} md={12} sm={12} xs={12}>
          <Card bg="light">
            <Card.Body>
              <Card.Title className="text-center">Acceso a Postulantes</Card.Title>
              <Card.Text className="text-center text-muted">
                Si eres parte de la comunidad FQ inicia sesión con tu número de cuenta.<br></br>
                ¿No eres comunidad FQ? Inicia sesión con tu correo electrónico.
              </Card.Text>
              <AlertaInfo activate={alerta.show} type={alerta.type} text={alerta.text}/>
              <Row className="mt-4">
                <Col lg={6} md={6} sm={12} xs={12} className="text-left">
                  <Card.Text className="text-center text-muted">
                    Comunidad FQ
                  </Card.Text>
                  <Form onSubmit={validaFormulario} id="internos">
                    <TextField 
                      element={field.user}
                      onChange={handleChange}
                    />
                    <Button variant="primary" type="submit">
                      Acceder 
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="ml-1" focusable={false}>
                        <path  d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"/>
                        <path  d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                      </svg>
                    </Button>
                  </Form>
                </Col>

                <Col lg={6} md={6} sm={12} xs={12} className="text-left">
                  <Card.Text className="text-center text-muted">
                    Postulantes externos
                  </Card.Text>
                  <Form onSubmit={validaFormulario} id="externos">
                    <TextField 
                      element={fieldE.user}
                      onChange={handleChange2}
                    />
                    <Button variant="primary" type="submit">
                      Acceder 
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="ml-1" focusable={false}>
                        <path  d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"/>
                        <path  d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                      </svg>
                    </Button>
                  </Form>
                </Col>
              </Row>
              <div className="mt-4 text-center">
                ¿No estás registrado? Regístrate como postulante externo <Link to="/postulante/registro">aquí</Link>.
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
    </Container>
  );
};

export default LoginPostulante;
