import React from 'react'
import { Form } from 'react-bootstrap';
import f from './../../functions';

const CheckBoxGroup = (props) => {
  const { element, onChange } = props;

  const checkRules = (value, checked) => {
    if (!f.arrayDefinido(element.rules)) {
      onChange(element.id, value, element.type, false, '');
      return;
    }
    const condition = element.type === 'checkbox' ? !checked && element.value.length === 1 : !checked;
    const {error, label} = condition ? {error: true, label: 'Este campo es requerido'} : {error: false, label: ''};
    onChange(element.id, value, element.type, error, label);
  }

  const handleChange = (e) => {
    checkRules(e.target.value, e.target.checked);
  };
  

  return (
    <Form.Group controlId={element.id}>
      <Form.Label>{element.label} {element.requerido ? <span style={{color: 'red'}}>*</span> : null}</Form.Label>
      {element.items.map((e, i) => (
        <Form.Check
          custom
          key={element.id + i.toString()}
          id={element.id + i.toString()}
          inline={element.inline}
          type={element.type}
        >
          <Form.Check.Input 
            value={e.value}
            checked={element.type === 'checkbox' ? element.value.includes(e.value) : e.value === element.value}
            isInvalid={element.error}
            onChange={handleChange}
          />
          <Form.Check.Label>{e.label}</Form.Check.Label>
          <Form.Control.Feedback type="invalid">{element.labelError}</Form.Control.Feedback>
        </Form.Check>
      ))}
    </Form.Group>
  );
};

export default CheckBoxGroup;
