import React from 'react'
import { Form } from 'react-bootstrap';
import f from './../../functions';

const TextField = (props) => {
  const { element, onChange } = props;

  const checkRules = (value) => {
    if (!f.arrayDefinido(element.rules)) {
      onChange(element.id, value, false, ''); 
      return;
    }
    for (let r of element.rules) {
      const result = r(value);
      if (typeof result === 'string') { // Error
        onChange(element.id, value, true, result);
        break;
      }
      onChange(element.id, value, false, '');
    }
  };

  const handleChange = (e) => {
    checkRules(e.target.value);
  };

  return (
    <Form.Group controlId={element.id}>
      <Form.Label>{element.label} {element.requerido ? <span style={{color: 'red'}}>*</span> : null}</Form.Label>
      <Form.Control 
        type={element.type} 
        placeholder={element.placeholder} 
        onChange={handleChange} 
        value={element.value} 
        isInvalid={element.error}
        disabled={element.disabled}
        size={element.size}
        readOnly={element.readonly}
        as={element.component}
        rows={3}
      />
      <Form.Control.Feedback type="invalid">{element.labelError}</Form.Control.Feedback>
    </Form.Group>
  );
};

export default TextField;
