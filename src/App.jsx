import React from 'react';
import logo from './logo.svg';
import './App.css';
import CallIcon from '@material-ui/icons/Call';
import EmailIcon from '@material-ui/icons/Email';
import PersonIcon from '@material-ui/icons/Person';
import TopHeader from './components/UI/Header/TopHeader';
import NavBar from './components/UI/Header/NavBar';
import Footer from './components/UI/Footer/Footer';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import axios from 'axios';
import LoginUsuario from './components/LoginUsuario';
import LoginPostulante from './components/LoginPostulante';

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  return (
    <Router>
      <TopHeader />
      <NavBar />
      <Switch>
        <Route path="/registro_externos">EXTERNOS</Route>
        <Route path="/vacantes">VACANTES</Route>
        <Route path="/login">LOGIN</Route>
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
          <section claas="Contacto">
            <div class="Contacto-info">
              <h1>Contacto</h1>
            </div>
            <div>
              <p class="Descripcion-info">
                Para cualquier duda que tengas con respecto a la Bolsa de
                Trabajo y Prácticas Profesionales puedes dirigirte con:
              </p>
            </div>
            <div class="Datos-info">
              <PersonIcon></PersonIcon>
              <strong> Nombre</strong>
              <p class="Combo-info">
                Maestro Javier Olguin Huerta, Encargada de BTYPP
              </p>
              <br />
              <EmailIcon /> <strong> Correo</strong>
              <p class="Combo-info">bolsatradebajofq@unam.mx</p>
              <br />
              <CallIcon></CallIcon>
              <strong> Teléfono</strong>
              <p class="Combo-info">55 55 55 55 55</p>
            </div>
          </section>
        </Route>
        <Route path="/acerca">
          <h3>¿Quiénes somos?</h3>
          <p>
            BTFQ es el departamento de FQ encargado de generar puentes entre la
            industria química en México y los alumnos y egresados de esta
            facultad para ...
          </p>
          <h3>Misión</h3>
          <p>
            Ser un referente de profesionalismo e innovación entre los mismos
            departamentos de toda la UNAM
          </p>
          <h3>Visión</h3>
          <p>
            Adecuar nuestra presencia a los medios modernos decomunicación para
            ganar aceptación en el nicho de potenciales usuarios dentro de la FQ
          </p>
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
