import React from 'react';
import { Form } from 'react-bootstrap';

function BasicInfoForm({
  preparationTime,
  setPreparationTime,
  servingCount,
  setServingCount,
  sideDish,
  setSideDish,
  serverSideDish,
}) {
  const onChangeHandler = (event) => {
    switch (event.target.name) {
      case 'preparationTime':
        setPreparationTime(event.target.value);
        break;
      case 'servingCount':
        setServingCount(event.target.value);
        break;
      case 'sideDish':
        setSideDish(event.target.value);
        break;
      default:
        console.log('Error: BasicInfoForm.jsx onChangeHandler');
        break;
    }
  };

  return (
    <>
      <Form.Group>
        <Form.Label>Doba přípravy</Form.Label>
        <div>
          <Form.Control
            name="preparationTime"
            type="number"
            min="1"
            value={preparationTime}
            onChange={onChangeHandler}
            style={{ width: '72%', float: 'left' }}
          />
          <Form.Control name="min" type="text" value="min" style={{ width: '28%' }} disabled />
        </div>
      </Form.Group>
      <Form.Group>
        <Form.Label>Počet porcí</Form.Label>
        <Form.Control
          name="servingCount"
          type="number"
          min="1"
          value={servingCount}
          onChange={onChangeHandler}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Příloha</Form.Label>
        <Form.Control name="sideDish" type="text" value={sideDish} onChange={onChangeHandler} />
      </Form.Group>
    </>
  );
}

export default BasicInfoForm;
