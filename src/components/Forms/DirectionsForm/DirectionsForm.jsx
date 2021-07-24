import React from 'react';
import { Form } from 'react-bootstrap';

function DirectionsForm({ directions, setDirections }) {
  const onChangeHandler = (event) => {
    setDirections(event.target.value);
  };

  return <Form.Control as="textarea" rows={14} value={directions} onChange={onChangeHandler} />;
}

export default DirectionsForm;
