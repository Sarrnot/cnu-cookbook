import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function ButtonLink({ address, text }) {
  return (
    <Link to={address} replace>
      <Button variant="outline-primary">{text}</Button>
    </Link>
  );
}

export default ButtonLink;
