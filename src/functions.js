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
  }, 
  obtieneCarreraPorClave: (clave) => {
    switch (clave) {
      case 'Q': return 'Química';
      case 'QA': return 'Química Analítica';
      case 'IQ': return 'Ingeniería Química';
      case 'IQM': return 'Ingeniería Química Metalúrgica';
      case 'QIM': return 'Química e Ingeniería de Materiales';
      case 'QFB': return 'Química Farmacéutica Biológica';
      default: return '';
    }
  },
  obtieneInglesPorClave: (clave) => {
    return clave === 'I' ? 'Intermedio' : clave === 'A' ? 'Avanzado' : 'No necesario';
  },
  obtieneSexoPorClave: (clave) => {
    return clave === 'M' ? 'Masculino' : clave === 'F' ? 'Femenino' : 'Indistinto';
  },
  obtieneEstatusPorClave: (clave) => {
    return clave === 'P' ? 'Pendiente de aprobación' : clave === 'A' ? 'Aprobada' : clave === 'A' ? 'Rechazada' : '';
  },
};
export default f;