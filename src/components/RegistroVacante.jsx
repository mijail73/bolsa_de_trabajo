import React from 'react'
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import f from './../functions';
import { registraVacante } from '../store';
import { Link } from 'react-router-dom';
import TextField from './UI/TextField';
import Select from './UI/Select';
import AlertaInfo from './UI/AlertaInfo';
import CheckBoxGroup from './UI/CheckBoxGroup';


const RegistroVacante = () => {
  const empleador = useSelector(store => store.empleador[0]);
  const dispatch = useDispatch();
  const rules = f.reglas();
  const [field, setField] = React.useState({
    nombreVacante: {
      id: 'nombreVacante',
      type: 'text',
      label: 'Nombre de la vacante',
      placeholder: 'Ej. Becario de MKT',
      value: '',
      rules: [rules.required],
      error: false,
      labelError: '',
      requerido: true
    },
    tipoVacante: {
      id: 'tipoVacante',
      label: 'Tipo de vacante',
      value: '',
      rules: [rules.required],
      options: [
        {id: '', text: 'Selecciona una opción'},
        {id: 'TC', text: 'Tiempo completo (8hr)'},
        {id: 'MT', text: 'Medio tiempo (4hr)'},
        {id: 'PP', text: 'Práctica profesional'},
        {id: 'B', text: 'Becari@'},
        {id: 'T', text: 'Trainee'},
      ],
      error: false,
      labelError: '',
      requerido: true
    },
    terminoMaterias: {
      id: 'terminoMaterias',
      type: 'date',
      label: 'Término de materias',
      value: '',
      rules: [rules.required],
      error: false,
      labelError: '',
      requerido: true
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
        {id: 'X', text: 'Sin preferencia'},
      ],
      error: false,
      labelError: '',
      requerido: true
    },
    ingles: {
      id: 'ingles',
      label: 'Inglés',
      value: '',
      rules: [rules.required],
      options: [
        {id: '', text: 'Selecciona una opción'},
        {id: 'A', text: 'Avanzado'},
        {id: 'I', text: 'Intermedio'},
        {id: 'X', text: 'No necesario'},
      ],
      error: false,
      labelError: '',
      requerido: true
    },
    habilidades: {
      id: 'habilidades',
      type: 'text',
      component: 'textarea',
      label: 'Habilidades',
      placeholder: 'Habilidades requeridas para el puesto',
      value: '',
      rules: [rules.required],
      error: false,
      labelError: '',
      requerido: true
    },
    experiencia: {
      id: 'experiencia',
      type: 'text',
      component: 'textarea',
      label: 'Experiencia',
      placeholder: 'Experiencia requerida para el puesto',
      value: '',
      rules: [],
      error: false,
      labelError: '',
    },
    edadMinima: {
      id: 'edadMinima',
      type: 'text',
      label: 'Edad mínima',
      placeholder: 'Ej. 23',
      value: '',
      rules: [rules.number],
      error: false,
      labelError: '',
    },
    actividades: {
      id: 'actividades',
      type: 'text',
      component: 'textarea',
      label: 'Actividades a realizar',
      placeholder: 'Actividades a realizar en el puesto',
      value: '',
      rules: [rules.required],
      error: false,
      labelError: '',
      requerido: true,
    },
    carreras: {
      id: 'carreras',
      type: 'checkbox',
      inline: false,
      label: 'Carrera(s)',
      value: [],
      items: [
        {value: 'Q', label: 'Q'},
        {value: 'QA', label: 'QA'},
        {value: 'IQ', label: 'IQ'},
        {value: 'IQM', label: 'IQM'},
        {value: 'QIM', label: 'QIM'},
        {value: 'QFB', label: 'QFB'},
      ],
      rules: [rules.required],
      error: false,
      labelError: '',
      requerido: true
    },
    estatusAcademico: {
      id: 'estatusAcademico',
      type: 'checkbox',
      inline: false,
      label: 'Estatus académico requerido',
      value: [],
      items: [
        {value: 'T', label: 'Titulad@'},
        {value: 'P', label: 'En proceso de titulación'},
        {value: 'C', label: '100% de créditos'},
        {value: 'E', label: 'Estudiante'},
      ],
      rules: [rules.required],
      error: false,
      labelError: '',
      requerido: true
    },
    horarioLaboral: {
      id: 'horarioLaboral',
      type: 'text',
      label: 'Horario laboral',
      placeholder: 'Ej. L-V 7:00 a 15:00',
      value: '',
      rules: [rules.required],
      error: false,
      labelError: '',
      requerido: true
    },
    zonaTrabajo: {
      id: 'zonaTrabajo',
      type: 'text',
      label: 'Zona de trabajo',
      placeholder: 'Ej. Centro Histórico',
      value: '',
      rules: [rules.required],
      error: false,
      labelError: '',
      requerido: true
    },
    sueldo: {
      id: 'sueldo',
      type: 'text',
      label: 'Sueldo',
      placeholder: 'Ej. 18,000 mensuales',
      value: '',
      rules: [rules.required],
      error: false,
      labelError: '',
      requerido: true
    },
    tipoContrato: {
      id: 'tipoContrato',
      type: 'text',
      label: 'Tipo de contrato',
      placeholder: 'Ej. Contratación directa',
      value: '',
      rules: [rules.required],
      error: false,
      labelError: '',
      requerido: true
    },
    vacantesTotales: {
      id: 'vacantesTotales',
      type: 'text',
      label: 'Número de vacantes',
      placeholder: 'Ej. 3',
      value: '',
      rules: [rules.required, rules.number],
      error: false,
      labelError: '',
      requerido: true
    },
  });
  const [alerta, setAlerta] = React.useState({
    show: false,
    text: '',
    type: ''
  });

  const handleChange = (id, value, error, labelError) => {
    setField({...field, [id]: {...field[id], value: value, error: error, labelError: labelError }});
  };

  const handleChangeCheckBox = (id, value, type, error, label) => {
    if (type === 'checkbox') {
      let itemsI = field[id].value;
      const index = itemsI.indexOf(value);
      if (index !== -1) itemsI.splice(index, 1); else itemsI.push(value);
      setField({...field, [id]: {...field[id], value: itemsI, error: error, labelError: label}});
    } else {
      setField({...field, [id]: {...field[id], value: value, error: error, labelError: label}});
    }
  };

  const createForm = () => {
    let finalObj = {};
    for (let f of Object.keys(field)) {
      finalObj = {...finalObj, [f]: field[f].value};
    }
    finalObj = {...finalObj, idEmpleador: empleador.idEmpleador, estatus: 'P', carreras: field.carreras.value.toString(),
    estatusAcademico: field.estatusAcademico.value.toString(), vacantesDisponibles: field.vacantesTotales.value};
    let formData = new FormData();
    formData.append('data', JSON.stringify(finalObj));
    return formData;
  };

  const validaReglas = (element, value, type) => {
    let elemento = field[element];
    if (type === 'radio' || type === 'checkbox') {
      if (f.arrayDefinido(elemento.rules)) {
        const condition = type === 'radio' ? f.definido(elemento.value) : f.arrayDefinido(elemento.value);
        const {error, label} = !condition ? {error: true, label: 'Este campo es requerido'} : {error: false, label: ''};
        elemento = {...elemento, error: error, labelError: label};
      } else elemento = {...elemento, error: false, labelError: ''};
    } else {
      const reglas = f.arrayDefinido(elemento.rules) ? elemento.rules : [];
      for (let r of reglas) {
        let result = r(value);
        if (typeof result === 'string') { 
          elemento = {...elemento, error: true, labelError: result};
          return elemento;
        }
      }
      elemento = {...elemento, error: false, labelError: ''};
    }
    return elemento;
  };

  
  const isValid = () => {
    let finalObj = {};
    for (let f of Object.keys(field)) {
      finalObj = {...finalObj, [f]: validaReglas(f, field[f].value, field[f].type)};
    }
    setField(finalObj);
    return !Object.entries(finalObj).map(o => o[1].error).includes(true);
  };

  const validaFormulario = async (e) => {
    e.preventDefault();
    if(isValid()) {
      setAlerta({...alerta, show: false});
      const result = await dispatch(registraVacante(createForm()));
      const {text, type} = result.replyCode === 200 ? {text: result.replyText, type: 'success'} : {text: 'Ocurrió un error al registrar tu vacante, por favor intenta más tarde', type: 'danger'};
      setAlerta({show: true, text: text, type: type});
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }
  };


  return (
    <Container fluid className="mt-3 mb-4">
      <Row className="justify-content-center">
        <Col lg={10} md={11} sm={12} xs={12}>
          <Link to="/empleador/inicio">Inicio</Link>{' / '}<Link to="/empleador/ofertas/registro">Registro ofertas</Link>
          <Card bg="light">
            <Card.Body>
              <Card.Title className="text-center">Registro de vacantes</Card.Title>
              <Card.Text className="text-center text-muted">
                Completa los campos solicitados para dar de alta una nueva vacante.
              </Card.Text>
              <Card.Text className="text-muted">
                Los campos marcados con <span style={{color: 'red'}}>*</span> son obligatorios.
              </Card.Text>
              <AlertaInfo activate={alerta.show} type={alerta.type} text={alerta.text}/>

              <Form onSubmit={validaFormulario}>
                <Form.Row>
                  <Col lg={4} md={6} sm={12} xs={12}>
                    <TextField element={field.nombreVacante} onChange={handleChange} />
                  </Col>
                  <Col lg={4} md={6} sm={12} xs={12}>
                    <Select element={field.tipoVacante} onChange={handleChange}/>
                  </Col>
                  <Col lg={4} md={6} sm={12} xs={12}>
                    <TextField element={field.terminoMaterias} onChange={handleChange} />
                  </Col>
                </Form.Row>

                <Form.Row>
                  <Col lg={4} md={6} sm={12} xs={12}>
                    <CheckBoxGroup element={field.carreras} onChange={handleChangeCheckBox} />
                  </Col>
                  <Col lg={4} md={6} sm={12} xs={12}>
                    <CheckBoxGroup element={field.estatusAcademico} onChange={handleChangeCheckBox}/>
                  </Col>
                  <Col lg={4} md={6} sm={12} xs={12}>
                    <Select element={field.ingles} onChange={handleChange} />
                  </Col>
                </Form.Row>

                <Form.Row>
                  <Col lg={3} md={6} sm={12} xs={12}>
                    <Select element={field.sexo} onChange={handleChange}/>
                  </Col>
                  <Col lg={3} md={6} sm={12} xs={12}>
                    <TextField element={field.edadMinima} onChange={handleChange} />
                  </Col>
                  <Col lg={3} md={6} sm={12} xs={12}>
                    <TextField element={field.horarioLaboral} onChange={handleChange} />
                  </Col>
                  <Col lg={3} md={6} sm={12} xs={12}>
                    <TextField element={field.tipoContrato} onChange={handleChange} />
                  </Col>
                </Form.Row>

                <Form.Row>
                  <Col lg={4} md={6} sm={12} xs={12}>
                    <TextField element={field.zonaTrabajo} onChange={handleChange} />
                  </Col>
                  <Col lg={4} md={6} sm={12} xs={12}>
                    <TextField element={field.sueldo} onChange={handleChange} />
                  </Col>
                  
                  <Col lg={4} md={6} sm={12} xs={12}>
                    <TextField element={field.vacantesTotales} onChange={handleChange} />
                  </Col>
                </Form.Row>
                
                <Form.Row>
                  <Col lg={6} md={6} sm={12} xs={12}>
                    <TextField element={field.habilidades} onChange={handleChange} />
                  </Col>
                  <Col lg={6} md={6} sm={12} xs={12}>
                    <TextField element={field.experiencia} onChange={handleChange} />
                  </Col>
                </Form.Row>

                <Form.Row className="justify-content-center">
                  <Col lg={7} md={6} sm={12} xs={12}>
                    <TextField element={field.actividades} onChange={handleChange} />
                  </Col>  
                </Form.Row>

                <Button variant="primary" type="submit" >
                  Registrar vacante
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RegistroVacante;
