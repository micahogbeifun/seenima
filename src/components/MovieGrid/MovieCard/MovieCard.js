import React from "react";
import { Link } from "react-router-dom";

import "./MovieCard.css";
import noImage from "../../../assets/images/no-image-available.jpg";

const MovieCard = props => {
  const { url, title, id } = props;
  return (
    <div id={id} className="image">
      <Link to={`/movies/movie/${id}`}>
        <img
          style={{
            borderRadius: "20px",
            width: "100%",
            height: "100%",
            objectFit: "cover"
          }}
          alt={title}
          src={url ? `https://image.tmdb.org/t/p/w500/${url}` : noImage}
        />
      </Link>
    </div>
  );
};

export default MovieCard;
