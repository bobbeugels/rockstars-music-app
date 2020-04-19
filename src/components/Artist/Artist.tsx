import React from 'react';
import { Link } from 'react-router-dom';

export default function Artist(props: Artist) {
  return (
    <Link to={`/artists/${props.id}`}>
      <div className='Artist'>{props.name}</div>
    </Link>
  );
}
