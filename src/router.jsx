import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
// Store
import { useSelector } from 'react-redux';

// Components
import LoginAdmin from './components/LoginAdministrador';
import LoginPostulante from './components/LoginPostulante';
import LoginEmpleador from './components/LoginEmpleador';
import Inicio from './components/Inicio';
import Contacto from './components/Contacto';
import AcercaDe from './components/AcercaDe';
import RegistroPostulante from './components/RegistroPostulante';
import InscripcionEmpleador from './components/InscripcionEmpleador';
import Vacantes from './components/Vacantes';
import Prueba from './components/Prueba';
import RegistroVacante from './components/RegistroVacante';
import VacantesEmpleador from './components/VacantesEmpleador';

const Router = () => {
  const store = useSelector(store => store);
  // const AdminLogin = () => {
  //   return store.usuario.length > 0 ? (<LoginAdmin/>) : (<Redirect to="/"/>);
  // };
  const EmpleadorLogin = () => {
    return store.empleador.length > 0 ? (<LoginEmpleador/>) : (<Redirect to="/empleador"/>);
  };
  return (
    <Switch>
      <Route exact path="/" component={Inicio} />
      <Route exact path="/postulante/vacantes"> <Vacantes /></Route>
      <Route exact path="/postulante" component={LoginPostulante} />
      
      <Route exact path="/tramites">TRAMITES DE PRACTICAS PROFESIONALES</Route>
      <Route exact path="/btfq">EVENTOS DE BTFQ</Route>
      <Route exact path="/postulante/registro" component={RegistroPostulante} />

      <Route exact path="/empleador" component={LoginEmpleador} />
      <Route exact path="/empleador/inicio" render={EmpleadorLogin}/>
      <Route exact path="/empleador/vacantes" component={VacantesEmpleador}/>
      <Route exact path="/empleador/vacantes/crear" component={RegistroVacante}/>

      <Route exact path="/empleador/inscripcion" component={InscripcionEmpleador} />
      <Route exact path="/info">INFORMACION DEL CORREDOR LABORAL</Route>
      <Route exact path="/taller"> QUIERO LLEVAR UN TALLER/ACTIVIDAD/WEBINAR A LA FAC </Route>
      <Route exact path="/contacto" component={Contacto} />
      <Route exact path="/acerca" component={AcercaDe} />
      <Route exact path="/prueba" component={Prueba} />
      <Route exact path="/admin" component={LoginAdmin} />
    </Switch>
  );
};

export default Router;