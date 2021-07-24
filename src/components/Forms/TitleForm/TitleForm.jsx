import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

function TitleForm({ title, setTitle }) {
  const onChangeHandler = (event) => {
    setTitle(event.target.value);
  };

  return (
    <>
      <Form.Control isInvalid={!title} type="text" value={title} onChange={onChangeHandler} />
      {!title && <span>Název je povinný</span>}
    </>
  );
}

export default TitleForm;
