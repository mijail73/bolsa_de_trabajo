import React from 'react'
import { Form } from 'react-bootstrap';

const Select = (props) => {
  const { element, onChange } = props;
  const [value, setValue] = React.useState(element.value);
  const [error, setError] = React.useState({
    error: false, 
    label: ''
  });

  const checkRules = (value) => {
    onChange(element.id, value);
    setValue(value);
    if (!element.rules || element.rules.length === 0) return;
    for (let r of element.rules) {
      let result = r(value);
      if (typeof result === 'string') { // Error
        setError({error: true, label: result});
        break;
      }
      setError({error: false, label: ''});
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
        isInvalid={error.error}
        disabled={element.disabled}
        size={element.size}
      >
        {element.options.map((o) => 
          <option key={o.id} value={o.id}>{o.value}</option>
        )}
      </Form.Control>
      <Form.Control.Feedback type="invalid">{error.label}</Form.Control.Feedback>
    </Form.Group>
  );
};

export default Select;
