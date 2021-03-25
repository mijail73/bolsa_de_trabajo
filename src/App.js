import logo from './logo.svg';
import './App.css';
import TopHeader from './components/UI/Header/TopHeader';
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
      <TopHeader></TopHeader>
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
        <Route path="/registro">REGISTRO</Route>
        <Route path="/vacantes">VACANTES</Route>
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
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
