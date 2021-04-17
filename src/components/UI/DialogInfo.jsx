import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DialogInfo = (props) => {
  const { element, onHide, agreeAction } = props;
  return (  
    <Modal
      {...element}
      size="md"
      aria-labelledby="modal-center"
      centered
    >
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title id="modal-center" as="h6">
          {element.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center mt-3 mb-3">
        <h6>{element.subtitle}</h6>
        <p>{element.text}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={agreeAction}>Ir a vacantes</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DialogInfo;
