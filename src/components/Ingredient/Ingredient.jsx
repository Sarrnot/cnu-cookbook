import { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import _uniqueID from 'lodash/uniqueId';

function Ingredient({ name, amount, amountUnit, isGroup, index, edit, setDelIngredient }) {
  const [ingredienceID] = useState(_uniqueID());

  const onClickHandler = (event) => {
    setDelIngredient({ index, delIngredient: true });
  };

  if (!edit) {
    return (
      <div className={isGroup ? 'ingredientItemGroup' : 'ingredientItem'}>
        <li>
          <div className="ingredientItemAmount">{amount} </div>
          <div className="ingredientItemUnit">{amountUnit}</div>
          <div className="ingredientItemName"> {name}</div>
        </li>
      </div>
    );
  } else {
    return (
      <div className={isGroup ? 'ingredientItemGroup' : 'ingredientItem'}>
        <Draggable key={ingredienceID} draggableId={ingredienceID} index={index}>
          {(provided) => (
            <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
              <div className="ingredientItemTrash">
                <i class="fa fa-trash" onClick={onClickHandler} style={{ color: 'red' }} />
              </div>
              <div className="ingredientItemAmount">{amount} </div>
              <div className="ingredientItemUnit">{amountUnit}</div>
              <div className="ingredientItemName"> {name}</div>
            </li>
          )}
        </Draggable>
      </div>
    );
  }
}

export default Ingredient;
