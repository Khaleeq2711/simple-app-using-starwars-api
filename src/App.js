import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import AddMovie from "./components/AddMovie";
import MovieList from "./components/MovieList";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // const dummyMovies = [
  //   {id: 'm1', name: 'Dune', description: 'Description of Movie : Dune', releaseDate: '2023-5-20' },
  //   {id: 'm2', name: 'Dark', description: 'Description of Movie : Dark', releaseDate: '2023-6-20' },
  //   {id: 'm3', name: 'Doom', description: 'Description of Movie : Doom', releaseDate: '2023-7-20' }
  // ]

  //200 means SUCCESSFUL Response.
  //400 means AUTHORIZATION Error.
  //500 means SERVER Error.
  const fetchmoviesHandler = useCallback(async () => {
    //we can also use .then if dont wanna use variables..fetch().then().then()
    setLoading(true);
    setError(null);
    try {
      const response = await fetch( "https://react-http-testing-f9590-default-rtdb.firebaseio.com/movies.json");
      const data = await response.json();
      if (!response.ok) {
        throw new Error("Something went Wrong while Fetching Data ..!");
      }
      // setMovies(data.results);     if we use thier obj names..
      let loadedMovies = [];
      for(const i in data){
        loadedMovies.push({
          id: i,
          name: data[i].name,
          description: data[i].description,
          releaseDate: data[i].releaseDate,
        })
      }
      setMovies(loadedMovies);
      setLoading(false);
    } catch (error) {
      setError(error.message,);
    }
    setLoading(false);
  }, []);

  const addMovieHandler = async(movie) => {
    console.log("New Movie : ", movie);
    const response= await fetch(
      "https://react-http-testing-f9590-default-rtdb.firebaseio.com/movies.json",
      { method: "POST" ,
        body: JSON.stringify(movie),
        headers: {'Content-Type': 'applicatioon/json'}
      }
    );
    const data = await response.json();
    console.log('Data Posted : ', data);
  };

  let content = <p className="content">No Movies Found..</p>;
  if (!loading && movies.length > 0) {
    content = <MovieList movies={movies} />;
  } else if (!loading && movies.length === 0 && error) {
    content = <p className="content">Error : {error} No Movies Found</p>;
  } else if (loading) {
    content = <p className="content">Loading...</p>;
  }

  useEffect(() => {
    fetchmoviesHandler();
  }, [fetchmoviesHandler]); //Need use callback for function..
  console.log("loading= ", loading);
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div className="App">
      <header className="App-header">
        <h1>Star Wars</h1>
      </header>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />{" "}
      </section>
      <section className="actions">
        <button className="btn-fetch" onClick={fetchmoviesHandler}>
          Fetch Movies Manually
        </button>
      </section>
      <section className="movie-show">{content}</section>
    </div>
  );
}

export default App;
