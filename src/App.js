import logo from './logo.svg';
import './App.css';
import TopHeader from './components/UI/Header/TopHeader';
import NavBar from './components/UI/Header/NavBar';
import Footer from './components/UI/Footer/Footer';
import FormSingleField from './components/UI/FormSigleField/FormSingleField';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  const rules = {
    required: (v) => !!v || 'Este campo es requerido',
    email: (v) => /.+@.+\..+/.test(v) || 'Escribe un correo electrónico válido',
    cuenta: (v) =>
      (/[0-9]+/.test(v) && v.length === 9) ||
      'Escribe un número de cuenta válido',
  };
  const sendForm = () => {
    console.log('Formulario válido');
  };
  return (
    <Router>
      <TopHeader />
      <NavBar />
      <Switch>
        <Route path="/login">
          LOGIN
          <FormSingleField
            fieldName="Correo electrónico"
            buttonName="Siguiente"
            rules={[rules.required, rules.email]}
            action={sendForm}
          />
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
      <Footer />
    </Router>
  );
}

export default App;
