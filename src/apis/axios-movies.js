import axios from "axios";

export const moviedb = axios.create({
  baseURL: "https://api.themoviedb.org/3"
});

export const imagedb = axios.create({
  baseURL: "https://image.tmdb.org/t/p"
});
