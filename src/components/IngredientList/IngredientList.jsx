import React, { useState } from 'react';
import { Ingredient } from '../Ingredient';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

function IngredientList({ ingredients, setIngredients, edit }) {
  const [{ index, delIngredient }, setDelIngredient] = useState({
    index: null,
    delIngredient: false,
  });

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(ingredients);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setIngredients(items);
  }

  if (delIngredient) {
    setDelIngredient({ index: null, delIngredient: false });
    const items = Array.from(ingredients);
    items.splice(index, 1);
    setIngredients(items);
  }

  if (!edit) {
    return (
      <ul className="ingredientList">
        {ingredients.map((element) => (
          <Ingredient
            name={element.name}
            amount={element.amount}
            amountUnit={element.amountUnit}
            isGroup={element.isGroup}
            edit={edit}
          />
        ))}
      </ul>
    );
  } else {
    return (
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="ingredients">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef} className="ingredientList">
              {ingredients.map((element, index) => (
                <Ingredient
                  name={element.name}
                  amount={element.amount}
                  amountUnit={element.amountUnit}
                  isGroup={element.isGroup}
                  index={index}
                  edit={edit}
                  setDelIngredient={setDelIngredient}
                />
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}
export default IngredientList;
