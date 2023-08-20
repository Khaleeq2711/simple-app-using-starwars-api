import React, { useRef } from "react";

import classes from "./AddMovie.module.css";

function AddMovie(props) {
  const nameRef = useRef("");
  const descriptionRef = useRef("");
  const releaseDateRef = useRef("");

  function submitHandler(event) {
    event.preventDefault();

    // could add validation here...

    const movie = {
      name: nameRef.current.value,
      description: descriptionRef.current.value,
      releaseDate: releaseDateRef.current.value,
    };

    props.onAddMovie(movie);
  }
  return (
    <form onSubmit={submitHandler} className={classes.main}>
      <h1><u>Add a Movie</u></h1>
      <div className={classes.control}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" ref={nameRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="description">Description</label>
        <textarea rows="5" id="description" ref={descriptionRef}></textarea>
      </div>
      <div className={classes.control}>
        <label htmlFor="date">Release Date</label>
        <input type="text" id="date" ref={releaseDateRef} />
      </div>
      <button className={classes['btn-add']}>Add Movie</button>
    </form>
  );
}

export default AddMovie;
