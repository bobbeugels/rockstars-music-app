import React from 'react';
import { Link } from 'react-router-dom';
import './Artist.scss';

export default function Artist(props: Artist) {
  return (
    <Link className='Artist' to={`/artists/${props.id}`}>
      {props.name}
    </Link>
  );
}
