import React from 'react'
import TextField from './UI/TextField';
import Select from './UI/Select';
import { useDispatch } from 'react-redux';
import { obtieneReglas } from '../store';


const Prueba = () => {
  const dispatch = useDispatch();
  const rules = dispatch(obtieneReglas());
  const [field, setField] = React.useState({
    email: {
      id: 'email',
      type: 'text',
      label: 'Correo electronico',
      placeholder: 'alguien@example.com',
      value: '',
      rules: [rules.required, rules.email],
    },
    pass: {
      id: 'pass',
      type: 'password',
      label: 'Contraseña',
      placeholder: 'Mínimo 8 caracteres',
      value: '',
      rules: [rules.required],
      readonly: true
    },
    select: {
      id: 'select',
      label: 'Opcionesss',
      placeholder: 'hola',
      options: [
        {id: '', value: 'Selecciona una opción'},
        {id: '0', value: 'Uno'},
        {id: '1', value: 'Dos'},
        {id: '2', value: 'Tres'},
      ],
      value: '',
      readonly: true
    },
  });

  const handleChange = (id, value) => {
    setField({...field, [id]: {...field[id], value: value }})
  };

  return (
    <div>
      <TextField 
        element={field.email}
        onChange={handleChange}/>
        <TextField 
        element={field.pass}
        onChange={handleChange}/>
        <Select
        element={field.select}
        onChange={handleChange}
        />
    </div>
  );
};

export default Prueba;
