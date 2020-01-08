import React from "react";

import classes from "./TopMenu.module.css";
import Logo from "../../Logo/Logo";
import NavComponents from "../NavComponents/NavComponents";
import SideToggle from "../SideMenu/SideToggle/SideToggle";

const TopMenu = props => (
  <header className={classes.TopMenu}>
    <SideToggle clicked={props.drawerToggleClicked} />
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav className={classes.Desktop}>
      <NavComponents isAuthenticated={props.isAuth} />
    </nav>
  </header>
);

export default TopMenu;
