import React from 'react';
import Button from 'react-bootstrap/Button';

function PostRecipeButton({ title, setPost }) {
  const onClickHandler = (event) => {
    setPost(true);
  };

  return (
    <Button variant="success" onClick={onClickHandler} disabled={!title}>
      Uložit
    </Button>
  );
}

export default PostRecipeButton;
