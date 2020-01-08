import React from "react";

import classes from "./SearchBar.module.css";

const Searchbar = props => {
  return (
    <React.Fragment>
      <input
        className={classes.SearchInput}
        type="text"
        value={props.value}
        placeholder="Search Movies"
        onChange={props.inputChangeHandler}
      />
      <div className={classes.IconDiv}>
        <ion-icon className={classes.Icon} name="search"></ion-icon>
      </div>
    </React.Fragment>
  );
};

export default Searchbar;
