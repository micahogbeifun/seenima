import "./MovieGrid.css";
import React from "react";

import MovieCard from "./MovieCard/MovieCard";
import Spinner from "../UI/Spinner/Spinner";
import Aux from "../../hoc/Auxilary/Auxilary";

const MovieGrid = props => {
  let movies = (
    <div
      style={{
        margin: "50px auto"
      }}
    >
      <Spinner />
    </div>
  );
  if (props.movies) {
    let title =
      props.type === "trending"
        ? "Trending Movies"
        : props.type === "top_rated"
        ? "Top Rated Movies"
        : props.type === "popular"
        ? "Popular Movies"
        : props.type === "cinema"
        ? "Movies Now Showing"
        : props.type === "upcoming"
        ? "Upcoming Movies"
        : null;

    movies = (
      <div className="Container">
        <h1>{title}</h1>
        <div className="image-list">
          {props.movies.map(movie => {
            return (
              <MovieCard
                key={movie.id}
                id={movie.id}
                url={movie.poster_path}
                title={movie.title}
              />
            );
          })}
        </div>
      </div>
    );
  }
  return <Aux>{movies}</Aux>;
};

export default MovieGrid;
