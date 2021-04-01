import React from 'react';
import { Switch, Route } from 'react-router-dom';

const Router = () => {
  return (
    <Switch>
      <Route exact path="/registro_externos"> EXTERNOS </Route>
      <Route path="/vacantes"> VACANTES </Route>
      <Route path="/login"> LOGIN </Route>
      <Route path="/login_usuario">
        <Provider store={store}>
          <LoginUsuario></LoginUsuario>
        </Provider>
      </Route>
      <Route path="/login_postulante">
        <Provider store={store}>
          <LoginPostulante></LoginPostulante>
        </Provider>
      </Route>
      <Route path="/" exact>
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                Edit <code>src/App.js</code> and save to reload.
              </p>
              <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn React
              </a>
            </header>
          </div>
        </Route>
        <Route path="/vacantes">VACANTES</Route>
        <Route path="/tramites">TRAMITES DE PRACTICAS PROFESIONALES</Route>
        <Route path="/btfq">EVENTOS DE BTFQ</Route>
        <Route path="/registro">REGISTRO</Route>
        <Route path="/info">INFORMACION DEL CORREDOR LABORAL</Route>
        <Route path="/taller">
          QUIERO LLEVAR UN TALLER/ACTIVIDAD/WEBINAR A LA FAC
        </Route>
        <Route path="/contacto">
          <h2 align="center">Contacto</h2>
          <p align="center">
            Para cualquier duda que tengas con respecto a la Bolsa de Trabajo y
            Prácticas Profesionales puedes dirigirte con:
          </p>
          <p align="center">Maestro Javier Olguin Huerta, Encargada de BTYPP</p>
          <p align="center">bolsatradebajofq@unam.mx</p>
          <p align="center">Teléfono: 55 55 55 55 55</p>
        </Route>
        <Route path="/acerca">Acerca de nosotros</Route>
    </Switch>
  );
}

export default Router;