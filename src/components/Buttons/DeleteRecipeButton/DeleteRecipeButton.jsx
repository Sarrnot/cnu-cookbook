import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

function DeleteRecipeButton({ setDeleteRecipe, title }) {
  const [showModal, setShowModal] = useState(false);

  const onClickHandler = (event) => {
    setShowModal(true);
  };

  const hideModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Button variant="danger" onClick={onClickHandler}>
        <i
          class="fa fa-trash"
          onClick={onClickHandler}
          style={{ color: 'white', marginRight: '8px' }}
        />
        Smazat
      </Button>

      {/* Popup window. 'Are you sure?' */}
      <Modal show={showModal} onHide={hideModal}>
        <Modal.Header closeButton>
          <Modal.Title>Smazat recept</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="alert alert-danger">
            Určitě smazat recept <span style={{ fontWeight: 'bold' }}>{title}</span>?
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setDeleteRecipe(true)}>
            Smazat
          </Button>
          <Button variant="default" onClick={hideModal}>
            Zrušit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteRecipeButton;
