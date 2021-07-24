import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

function GroupForm({ ingredients, setIngredients }) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState(null);
  const [amountUnit, setAmountUnit] = useState('');
  const [isGroup, setIsGroup] = useState(true);

  const onClickHandler = (event) => {
    setIngredients([
      ...ingredients,
      { name: name, amount: amount, amountUnit: amountUnit, isGroup: isGroup },
    ]);

    setName('');
  };

  const onChangeHandler = (event) => {
    setName(event.target.value);
  };

  return (
    <Form.Group>
      <Form.Label>Přidat skupinu</Form.Label>
      <div>
        <div className="editGroupName">
          <Form.Control
            name="name"
            type="text"
            placeholder="Nová skupina"
            value={name}
            onChange={onChangeHandler}
          />
        </div>
        <Button
          variant="primary"
          onClick={onClickHandler}
          disabled={!name}
          className="addIngredientButton"
        >
          Přidat
        </Button>
      </div>
    </Form.Group>
  );
}

export default GroupForm;
