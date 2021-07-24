import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

function IngredientsForm({ ingredients, setIngredients, serverIngredients }) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState(null);
  const [amountUnit, setAmountUnit] = useState('');
  const [isGroup, setIsGroup] = useState(false);

  const onClickHandler = (event) => {
    setIngredients([
      ...ingredients,
      { name: name, amount: amount, amountUnit: amountUnit, isGroup: isGroup },
    ]);

    setName('');
    setAmount('');
    setAmountUnit('');
  };

  const onChangeHandler = (event) => {
    switch (event.target.name) {
      case 'name':
        setName(event.target.value);
        break;
      case 'amount':
        setAmount(event.target.value);
        break;
      case 'amountUnit':
        setAmountUnit(event.target.value);
        break;
      default:
        console.log('Error: IngredientsForm.jsx onChangeHandler');
        break;
    }
  };

  return (
    <Form.Group>
      <Form.Label>Přidat ingredienci</Form.Label>
      <div>
        <div className="editIngredientsAmount">
          <Form.Control
            name="amount"
            type="number"
            min="1"
            placeholder="Množství"
            value={amount}
            onChange={onChangeHandler}
          />
        </div>
        <div className="editIngredientsUnit">
          <Form.Control
            name="amountUnit"
            type="text"
            placeholder="Jednotka"
            value={amountUnit}
            onChange={onChangeHandler}
          />
        </div>
      </div>
      <div>
        <div className="editIngredientsName">
          <Form.Control
            name="name"
            type="text"
            placeholder="Název"
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

export default IngredientsForm;
