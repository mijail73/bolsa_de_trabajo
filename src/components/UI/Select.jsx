import React from 'react'
import { Form } from 'react-bootstrap';
import f from './../../functions';

const Select = (props) => {
  const { element, onChange } = props;
  const [value, setValue] = React.useState(element.value);

  const checkRules = (value) => {
    setValue(value);
    if (!f.definido(element.rules)) {
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
      <Form.Label>{element.label}</Form.Label>
      <Form.Control 
        as="select" 
        custom 
        onChange={handleChange} 
        value={value} 
        isInvalid={element.error}
        disabled={element.disabled}
        size={element.size}
      >
        {element.options.map((o) => 
          <option key={o.id} value={o.id}>{o.text}</option>
        )}
      </Form.Control>
      <Form.Control.Feedback type="invalid">{element.labelError}</Form.Control.Feedback>
    </Form.Group>
  );
};

export default Select;
