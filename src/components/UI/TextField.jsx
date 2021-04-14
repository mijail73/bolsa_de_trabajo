import React from 'react'
import { Form } from 'react-bootstrap';

const TextField = (props) => {
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
        type={element.type} 
        placeholder={element.placeholder} 
        onChange={handleChange} 
        value={value} 
        isInvalid={error.error}
        disabled={element.disabled}
        size={element.size}
        readOnly={element.readonly}
      />
      <Form.Control.Feedback type="invalid">{error.label}</Form.Control.Feedback>
    </Form.Group>
  );
};

export default TextField;
