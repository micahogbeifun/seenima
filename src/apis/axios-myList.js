import axios from "axios";

export const listItems = axios.create({
  baseURL: "https://pig-game-9803a.firebaseio.com"
});
