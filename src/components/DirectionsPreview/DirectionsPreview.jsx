import React from 'react';
import ReactMarkdown from 'react-markdown';

function DirectionsPreview({ directions }) {
  return <ReactMarkdown children={directions} />;
}

export default DirectionsPreview;
