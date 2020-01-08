import React from "react";

import classes from "./NavComponents.module.css";
import NavComponent from "./NavComponent/NavComponent";

const NavComponents = props => {
  const links = [
    {
      name: "Cinema",
      to: {
        pathname: "/home/page-1"
      },
      exact: null
    },
    {
      name: "Popular",
      to: {
        pathname: "/movies/popular/page-1"
      },
      exact: null
    },
    {
      name: "Top Rated",
      to: {
        pathname: "/movies/top_rated/page-1"
      },
      exact: null
    },
    {
      name: "Upcoming",
      to: {
        pathname: "/movies/upcoming/page-1"
      },
      exact: null
    }
  ];

  if (props.isAuthenticated) {
    links.splice(1, 0, {
      name: "Your favs",
      to: {
        pathname: "/favourites"
      },
      exact: null
    });
  }

  return (
    <ul className={classes.NavComponents}>
      {links.map((link, index) => (
        <NavComponent to={link.to} exact key={index}>
          {link.name}
        </NavComponent>
      ))}

      {props.isAuthenticated ? (
        <NavComponent to="/logout">Logout</NavComponent>
      ) : (
        <NavComponent to="/login">Login</NavComponent>
      )}
    </ul>
  );
};

export default NavComponents;
