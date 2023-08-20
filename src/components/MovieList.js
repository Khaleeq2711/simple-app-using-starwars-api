import React from "react";
import Movie from "./Movie";
import "./MovieList.css";

function MovieList(props) {
  return (
    <ul className="list">
      {props.movies.map((m) => {
        return (
          <Movie
          key={m.id}
            name={m.name}
            releaseDate={m.releaseDate}
            decription={m.description}
          />
        );
      })}
    </ul>
  );
}

export default MovieList;
