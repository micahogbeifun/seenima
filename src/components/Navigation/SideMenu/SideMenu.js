import React from "react";
import Logo from "../../Logo/Logo";
import NavComponents from "../NavComponents/NavComponents";
import classes from "./SideMenu.module.css";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Auxilary/Auxilary";

const SideMenu = props => {
  let attachedClasses = [classes.SideMenu, classes.Closed];
  if (props.open) {
    attachedClasses = [classes.SideMenu, classes.Open];
  }
  return (
    <Aux>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(" ")} onClick={props.closed}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav style={{ padding: "20px" }}>
          <NavComponents isAuthenticated={props.isAuth} />
        </nav>
      </div>
    </Aux>
  );
};
export default SideMenu;
