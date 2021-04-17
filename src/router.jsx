import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
// Store
import { useSelector } from 'react-redux';

// Components
import LoginAdmin from './components/LoginAdministrador';
import LoginPostulante from './components/LoginPostulante';
import Inicio from './components/Inicio';
import Contacto from './components/Contacto';
import AcercaDe from './components/AcercaDe';
import RegistroPostulante from './components/RegistroPostulante';
import InscripcionEmpleador from './components/InscripcionEmpleador';
import Vacantes from './components/Vacantes';
import Prueba from './components/Prueba';

const Router = () => {
  const usuario = useSelector(store => store.usuario);
  const AdminLogin = () => {
    return usuario.length > 0 ? (<LoginAdmin/>) : (<Redirect to="/"/>);
  };
  return (
    <Switch>
      <Route exact path="/" component={Inicio} />
      <Route exact path="/vacantes"> <Vacantes /></Route>
      <Route exact path="/login"> LOGIN </Route>
      <Route exact path="/admin" render={AdminLogin} />
      <Route exact path="/login_postulante" component={LoginPostulante} />
      <Route exact path="/tramites">TRAMITES DE PRACTICAS PROFESIONALES</Route>
      <Route exact path="/btfq">EVENTOS DE BTFQ</Route>
      <Route exact path="/registro_postulante" component={RegistroPostulante} />
      <Route exact path="/inscripcion" component={InscripcionEmpleador} />
      <Route exact path="/info">INFORMACION DEL CORREDOR LABORAL</Route>
      <Route exact path="/taller"> QUIERO LLEVAR UN TALLER/ACTIVIDAD/WEBINAR A LA FAC </Route>
      <Route exact path="/contacto" component={Contacto} />
      <Route exact path="/acerca" component={AcercaDe} />
      <Route exact path="/prueba" component={Prueba} />
    </Switch>
  );
};

export default Router;