import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Components
import TopHeader from './components/UI/Header/TopHeader';
import Footer from './components/UI/Footer/Footer';
// import DialogConfirm from './components/UI/DialogConfirm/DialogConfirm';
import FormSingleField from './components/UI/FormSigleField/FormSingleField';

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

ReactDOM.render(
  <React.StrictMode>
    <TopHeader></TopHeader>
    <App />
    {/* <DialogConfirm
      open={dialog}
      title="Confirmación"
      text="Deseas confirmar tu acción"
      agreeText="SI"
      disagreeText="NOP"
      agreeAction={() => setDialog(false)}
      disagreeAction={() => setDialog(false)}
    /> */}
    <FormSingleField
      fieldName="Correo electrónico"
      buttonName="Siguiente"
      rules={[rules.required, rules.email]}
      action={sendForm}
      react={React}
    />
    <Footer />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
