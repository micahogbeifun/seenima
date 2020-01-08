import React from "react";
import classes from "./NavComponent.module.css";
import { NavLink } from "react-router-dom";

const NavComponent = props => (
  <li className={classes.NavComponent}>
    <NavLink to={props.to} exact={props.exact} activeClassName={classes.active}>
      {props.children}
    </NavLink>
  </li>
);

export default NavComponent;
