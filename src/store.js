import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import f from './functions';

const token = '3e16fcdf4daa4d6d4f938e7dc9453c2b2026b1662681f214e6c5d6a3ab5f5443';
const baseURL = process.env.NODE_ENV === 'development' ? 'http://132.248.103.86/services/bolsa_de_trabajo/' : 'https://api.quimica.unam.mx/bolsa_de_trabajo/';

// State
const state = {
  usuario: [],
}

// Reducer
function stateReducer (estado = state, action) {
  switch (action.type) {
    case 'GUARDA_DATOS_LOGIN':
      return {...estado, usuario: action.payload }
    default:
      return estado;
  }
}

// Actions
export const validaLogin = (data) => (dispatch) => {
    return new Promise ((resolve, reject) => {
      axios.post(baseURL + 'autenticacion.php', data, { headers: { BTKey: token }})
      .then (result => {
        if (result.data.replyCode === 200 && result.data.data.length > 0) {
          dispatch({ type: 'GUARDA_DATOS_LOGIN', payload: result.data.data });
        }
        resolve(result.data);
      }).catch (error => {
        reject(error);
      });
    });
};
export const registraPostulante = (data) => (dispatch) => {
    return new Promise ((resolve, reject) => {
      axios.post(baseURL + 'registraPostulante.php', data, { headers: { BTKey: token }})
      .then (result => {
        if (result.data.replyCode === 200 && f.arrayDefinido(result.data.data)) {
          dispatch({ type: 'GUARDA_DATOS_LOGIN', payload: result.data.data });
        }
        resolve(result.data);
      }).catch (error => {
        reject(error);
      });
    });
};
export const inscribeEmpleador = (data) => (dispatch) => {
    return new Promise ((resolve, reject) => {
      axios.post(baseURL + 'inscribeEmpleador.php', data, { headers: { BTKey: token }})
      .then (result => {
        if (result.data.replyCode === 200 && result.data.data.length > 0) {
          dispatch({ type: 'GUARDA_DATOS_LOGIN', payload: result.data.data });
        }
        resolve(result.data);
      }).catch (error => {
        reject(error);
      });
    });
};

export const obtieneReglas = () => () => {
  return {
    required: (v) => !!v || 'Este campo es requerido',
    email: (v) => /.+@.+\..+/.test(v) || 'Escribe un correo electrónico válido',
    cuenta: (v) => (/[0-9]+/.test(v) && v.length === 9) || 'Escribe un número de cuenta válido',
    cuentaEmail: (v) => ( /.+@.+\..+/.test(v) || (/[0-9]+/.test(v) && v.length === 9)) || 'Escribe un número de cuenta o correo válido',
    celular: (v) => (/^([0-9])+$/.test(v) && v.length === 10) || 'Ingresa un número telefónico válido',
  }
};

const store = createStore(stateReducer, compose(applyMiddleware(thunk)));
export default store;