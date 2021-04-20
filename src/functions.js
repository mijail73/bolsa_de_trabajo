const f = {
  definido: (value) => {
    return value !== undefined && value !== '';
  },
  arrayDefinido: (value) => { 
    return Array.isArray(value) && value.length > 0;
  },
  objetoDefinido: (value) => {
    return Object.keys(value).length > 0;
  },
  reglas: () => {
    return {
      required: (v) => !!v || 'Este campo es requerido',
      email: (v) => /.+@.+\..+/.test(v) || 'Escribe un correo electrónico válido',
      cuenta: (v) => (/[0-9]+/.test(v) && v.length === 9) || 'Escribe un número de cuenta válido',
      cuentaEmail: (v) => ( /.+@.+\..+/.test(v) || (/[0-9]+/.test(v) && v.length === 9)) || 'Escribe un número de cuenta o correo válido',
      phone: (v) => (/^([0-9])+$/.test(v) && v.length === 10) || 'Ingresa un número telefónico válido',
      number: (v) => (!v || /^([0-9])+$/.test(v)) || 'Ingresa un número entero válido',
    }
  }
};
export default f;