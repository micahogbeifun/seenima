import React, { Component } from "react";
import {connect} from 'react-redux';

import Aux from "../Auxilary/Auxilary";
import classes from "./Menu.module.css";
import TopMenu from "../../components/Navigation/TopMenu/TopMenu";
import SideMenu from "../../components/Navigation/SideMenu/SideMenu";

class Menu extends Component {
  state = { showSideMenu: false };

  SideMenuClosedHandler = () => {
    this.setState({ showSideMenu: false });
  };

  SideMenuToggleHandler = () => {
    this.setState(prevState => {
      return { showSideMenu: !prevState.showSideMenu };
    });
  };

  render() {
    return (
      <Aux>
        <TopMenu
          isAuth={this.props.isAuthenticated}
          drawerToggleClicked={this.SideMenuToggleHandler}
        />
        <SideMenu
          isAuth={this.props.isAuthenticated}
          open={this.state.showSideMenu}
          closed={this.SideMenuClosedHandler}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return { isAuthenticated: state.auth.token !== null };
};

export default connect(mapStateToProps)(Menu);
