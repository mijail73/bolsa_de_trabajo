import React from 'react'
import { Container, Row, Col, Table, Card, Dropdown, Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import f from './../functions';
import { obtieneVacantesEmpleador } from '../store';
import { Link, useHistory } from 'react-router-dom';
import AlertaInfo from './UI/AlertaInfo';
import DialogInfo from './UI/DialogInfo';


const VacantesEmpleador = () => {
  const history = useHistory();
  const empleador = useSelector(store => store.empleador[0])
  const dispatch = useDispatch();
  
  const [vacantes, setVacantes] = React.useState([]);
  const [vacanteSelected, setVacanteSelected] = React.useState({});
  const [indexSelected, setIndexSelected] = React.useState(-1);
  const [modal, setModal] = React.useState(false);
  const [alerta, setAlerta] = React.useState({
    show: false,
    text: '',
    type: ''
  });
  const [dialog, setDialog] = React.useState({
    show: false,
    title: 'Confirmación',
    subtitle: 'Confirmación',
    text: '¿Deseas eliminar esta vacante?'
  });

  const creaLista = (element) => {
    if (!element.includes('\n')) return <div>{element}</div>;
    return element.split('\n').map(e => {
      return <div key={e}>{e}</div>
    })
  }

  const creaCadenaCarreras = (carreras) => {
    let carreraRetorno = '';
    let arrCarreras = carreras.split(',');
    for (let c of arrCarreras) {
      carreraRetorno += f.obtieneCarreraPorClave(c) + ', ';
    }
    carreraRetorno = carreraRetorno.substring(0, carreraRetorno.length - 1);
    return carreraRetorno;
  };

  const muestraDetalles = (i) => {
    let selected = vacantes[i];
    selected = {
      ...selected, 
      carreras: creaCadenaCarreras(selected.carreras),
      ingles: f.obtieneInglesPorClave(selected.ingles),
      sexo: f.obtieneSexoPorClave(selected.sexo),
      habilidades: creaLista(selected.habilidades),
      actividades: creaLista(selected.actividades),
      index: i
    };
    setModal(true);
    setVacanteSelected(selected);
  };

  const borraVacante = () => {
    console.log('A borrar: ', vacantes[indexSelected]);
  };

  const procesaBorrado = (i) => {
    setDialog({...dialog, show: true});
    setIndexSelected(i);
  };

  const goToEdition = (index) => {
    setModal(false);
    history.push(`/crear/:${index}`);
  };

  const Content = () => {
    return vacantes.length > 0 ? (
      <Table striped bordered hover className="text-center">
        <thead>
          <tr>
            <th>Nombre de la vacante</th>
            <th>Estatus vacante</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {vacantes.map( (v, i) => {
            return (
              <tr key={v.idVacante}>
                <td>{v.nombreVacante}</td>
                <td>{v.estatus}</td>
                <td>
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic" size="sm">
                      Acciones
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => muestraDetalles(i)}>Detalles</Dropdown.Item>
                      <Dropdown.Item onClick={() => procesaBorrado(i)}>Eliminar</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    ) : (<Card.Text className="text-center text-muted"> No se encontraron vacantes </Card.Text>);
  };
  

  React.useEffect(() => {
    dispatch(obtieneVacantesEmpleador(empleador.idEmpleador)).then(result => {
      setVacantes(result.data);
    }).catch(error => {
      console.log(error);
    });
  }, []);


  return (
    <Container fluid className="mt-3 mb-4">
      <DialogInfo element={dialog} onHide={() => setDialog({...dialog, show: false})} agreeAction={borraVacante}/>
      <Row className="justify-content-center">
        <Col lg={10} md={11} sm={12} xs={12}>
          <Link to="/empleador/inicio">Inicio</Link>{' / '}<Link to="/empleador/ofertas/registro">Registro ofertas</Link>
          <Card bg="light">
            <Card.Body>
              <Card.Title className="text-center">Mis vacantes</Card.Title>
              <Card.Text className="text-center text-muted">
                Vacantes activas al día de hoy
              </Card.Text>
              {/* Alerta */}
              <AlertaInfo activate={alerta.show} type={alerta.type} text={alerta.text}/>

              {/* MODAL */}
              <Modal show={modal} onHide={() => setModal(false)} size="lg" aria-labelledby="example-custom-modal-styling-title" 
              dialogClassName="modal-90w" centered>
                <Modal.Header closeButton>
                  <Modal.Title id="example-custom-modal-styling-title" as="h6">
                    Detalles de la vacante
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Row>
                    <Col lg={12} md={12} sm={12} xs={12}>
                      <h5 className="font-weight-bold">Descripción</h5>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={12} md={12} sm={12} xs={12}>
                      <div>Nombre de la vacante: {vacanteSelected.nombreVacante} </div>
                      <div>Tipo de vacante: {vacanteSelected.tipoVacante} </div>
                      <div>Carrera(s): {vacanteSelected.carreras} </div>
                      <div>Término de materias: {vacanteSelected.terminoMaterias} </div>
                      <div>Nivel de inglés: {vacanteSelected.ingles} </div>
                      <div>Sexo: {vacanteSelected.sexo} </div>
                      <div>Edad mínima: {vacanteSelected.edadMinima} </div>
                      <div>Horario laboral: {vacanteSelected.horarioLaboral} </div>
                      <div>Tipo de contrato: {vacanteSelected.tipoContrato} </div>
                      <div>Zona de trabajo: {vacanteSelected.zonaTrabajo} </div>
                      <div>Sueldo: {vacanteSelected.sueldo} </div>
                      <div>Número de vacantes: {vacanteSelected.vacantesTotales} </div>
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col lg={12} md={12} sm={12} xs={12}>
                    <h5 className="font-weight-bold">Habilidades y experiencia</h5>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={12} md={12} sm={12} xs={12}>
                      {vacanteSelected.habilidades}
                      {vacanteSelected.experiencia}
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col lg={12} md={12} sm={12} xs={12}>
                      <h5 className="font-weight-bold">Actividades a realizar</h5>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={12} md={12} sm={12} xs={12}>
                      {vacanteSelected.actividades}
                    </Col>
                  </Row>
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={() => goToEdition(vacanteSelected.index)}>Editar</Button>
                  <Button onClick={() => procesaBorrado(vacanteSelected.index)}>Eliminar</Button>
                </Modal.Footer>
              </Modal>

              <Content/>
              
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default VacantesEmpleador;
