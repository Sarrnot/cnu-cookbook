import React from 'react';
import { Form } from 'react-bootstrap';

function RecipeFilter({ recipe, setRecipe }) {
  const onChangeHandler = (event) => {
    setRecipe(event.target.value);
  };

  return (
    <Form>
      <Form.Group controlId="name">
        <Form.Control
          type="text"
          placeholder="Napište název receptu"
          value={recipe}
          onChange={onChangeHandler}
        />
      </Form.Group>
    </Form>
  );
}

export default RecipeFilter;
