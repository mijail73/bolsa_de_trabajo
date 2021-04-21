import React from 'react'
import { Container, Row, Col, Table, Card, Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
// import f from './../functions';
import { obtieneVacantesEmpleador } from '../store';
import { Link } from 'react-router-dom';
import AlertaInfo from './UI/AlertaInfo';


const VacantesEmpleador = () => {
  const empleador = useSelector(store => store.empleador[0])
  const dispatch = useDispatch();
  
  const [vacantes, setVacantes] = React.useState([]);
  const [alerta, setAlerta] = React.useState({
    show: false,
    text: '',
    type: ''
  });

  const muestraDetalles = (i) => {
    console.log('Detalles: ', i);
  };

  const borraVacante = (i) => {
    console.log('A borrar: ', i);
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
      <Row className="justify-content-center">
        <Col lg={10} md={11} sm={12} xs={12}>
          <Link to="/empleador/inicio">Inicio</Link>{' / '}<Link to="/empleador/ofertas/registro">Registro ofertas</Link>
          <Card bg="light">
            <Card.Body>
              <Card.Title className="text-center">Mis vacantes</Card.Title>
              <Card.Text className="text-center text-muted">
                Vacantes activas al día de hoy
              </Card.Text>
              <AlertaInfo activate={alerta.show} type={alerta.type} text={alerta.text}/>
              
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Nombre de la vacante</th>
                    <th>Lugares disponibles</th>
                    <th>Zona de trabajo</th>
                    <th>Estatus vacante</th>
                    <th>Detalles</th>
                  </tr>
                </thead>
                <tbody>
                  {vacantes.map( (v, i) => {
                    return (
                      <tr key={v.idVacante}>
                        <td>{v.nombreVacante}</td>
                        <td>{v.vacantesDisponibles}</td>
                        <td>{v.zonaTrabajo}</td>
                        <td>{v.estatus}</td>
                        <td>
                          <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic" size="sm">
                              Acciones
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item onClick={() => muestraDetalles(i)}>Detalles</Dropdown.Item>
                              <Dropdown.Item onClick={() => borraVacante(i)}>Eliminar</Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default VacantesEmpleador;
