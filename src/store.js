import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import f from './functions';

const token = '3e16fcdf4daa4d6d4f938e7dc9453c2b2026b1662681f214e6c5d6a3ab5f5443';
const baseURL = process.env.NODE_ENV === 'development' ? 'http://132.248.103.86/services/bolsa_de_trabajo/' : 'https://api.quimica.unam.mx/bolsa_de_trabajo/';
axios.defaults.baseURL = baseURL;

// State
const state = {
  postulante: {},
  empleador: {
    idEmpleador: '1',
    nombreEmpleador: 'Victor',
    vacantes: [],
  },
  admin: {},
}

// Reducer
function stateReducer (estado = state, action) {
  switch (action.type) {
    case 'GUARDA_DATOS_POSTULANTE':
      return {...estado, postulante: action.payload }
    case 'GUARDA_DATOS_EMPLEADOR':
      return {...estado, empleador: action.payload }
    case 'GUARDA_VACANTES_EMPLEADOR':
      return {...estado, empleador: {...estado.empleador, vacantes: action.payload }}
    default:
      return estado;
  }
}

// Actions
export const validaLogin = (data, type) => (dispatch) => {
    return new Promise ((resolve, reject) => {
      axios.post('autenticacion.php', data, { headers: { BTKey: token }})
      .then (result => {
        if (result.data.replyCode === 200 && result.data.data.length > 0) {
          dispatch({ type: 'GUARDA_DATOS_POSTULANTE', payload: result.data.data[0] });
        }
        resolve(result.data);
      }).catch (error => {
        reject(error);
      });
    });
};
export const registraPostulante = (data) => (dispatch) => {
    return new Promise ((resolve, reject) => {
      axios.post('registraPostulante.php', data, { headers: { BTKey: token }})
      .then (result => {
        if (result.data.replyCode === 200 && f.arrayDefinido(result.data.data)) {
          dispatch({ type: 'GUARDA_DATOS_POSTULANTE', payload: result.data.data });
        }
        resolve(result.data);
      }).catch (error => {
        reject(error);
      });
    });
};
export const inscribeEmpleador = (data) => (dispatch) => {
    return new Promise ((resolve, reject) => {
      axios.post('inscribeEmpleador.php', data, { headers: { BTKey: token }})
      .then (result => {
        if (result.data.replyCode === 200 && result.data.data.length > 0) {
          dispatch({ type: 'GUARDA_DATOS_EMPLEADOR', payload: result.data.data });
        }
        resolve(result.data);
      }).catch (error => {
        reject(error);
      });
    });
};
export const registraVacante = (data) => () => {
  return new Promise ((resolve, reject) => {
    axios.post('registraVacante.php', data, { headers: { BTKey: token }})
    .then (result => {
      resolve(result.data);
    }).catch (error => {
      reject(error);
    });
  });
};
export const obtieneVacantesEmpleador = (idEmpleador) => (dispatch) => {
  return new Promise ((resolve, reject) => {
    axios.get('obtieneVacantesEmpleador.php?idEmpleador='+idEmpleador, { headers: { BTKey: token }})
    .then (result => {
      resolve(result.data);
      dispatch({ type: 'GUARDA_VACANTES_EMPLEADOR', payload: result.data.data });
    }).catch (error => {
      reject(error);
    });
  });
};

export const obtieneReglas = () => () => {
  return {
    required: (v) => !!v || 'Este campo es requerido',
    email: (v) => /.+@.+\..+/.test(v) || 'Escribe un correo electr??nico v??lido',
    cuenta: (v) => (/[0-9]+/.test(v) && v.length === 9) || 'Escribe un n??mero de cuenta v??lido',
    cuentaEmail: (v) => ( /.+@.+\..+/.test(v) || (/[0-9]+/.test(v) && v.length === 9)) || 'Escribe un n??mero de cuenta o correo v??lido',
    }
};

const store = createStore(stateReducer, compose(applyMiddleware(thunk)));
export default store;