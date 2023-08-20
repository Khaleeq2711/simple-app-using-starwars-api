import React from 'react';
import './Movie.css';

function Movie(props) {

  return (
    <li className='movie'>
        <h2>{props.name}</h2>
        <h3>{props.releaseDate}</h3>
        <p>{props.decription}</p>
    </li>
  );
}

export default Movie;
