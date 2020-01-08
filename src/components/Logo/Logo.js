import React from "react";
import { Link } from "react-router-dom";

import classes from "./Logo.module.css";

import seenimaLogo from "../../assets/images/seenima-logo.png";

const Logo = props => (
  <Link to="/home/page-1">
    <div className={classes.Logo} style={{ height: props.height }}>
      <img src={seenimaLogo} alt="SeeNima"></img>
    </div>
  </Link>
);

export default Logo;
