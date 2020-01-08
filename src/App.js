import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Menu from "./hoc/Menu/Menu";
import Home from "./containers/Home/Home";
import Movies from "./containers/Movies/Movies";
import Movie from "./containers/Movie/Movie";
import Logout from "./containers/Auth/Logout/Logout";
import FavList from "./containers/FavList/FavList";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";
import { authCheckState } from "./store/actions/auth";
import { fetchList } from "./store/actions/items";

const asyncAuth = asyncComponent(() => import("./containers/Auth/Auth"));

class App extends Component {
  state = { favs: null, userId: null };
  componentDidMount() {
    this.props.authCheckState();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.isAuthenticated && !prevProps.isAuthenticated) {
      this.props.fetchList(this.props.userId);
    }
    if (!this.props.fetched && !this.props.loading) {
      this.props.fetchList(this.props.userId);
    }
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/login" exact component={asyncAuth} />
        <Route path="/favourites" component={FavList} />

        <Route path={"/home/:page"} exact component={Home} />
        <Route path="/movies/movie/:movieId" component={Movie} />
        <Route path="/movies/:category/:page" component={Movies} />

        <Route path="/logout" component={Logout} />
        <Redirect to={"/home/page-1"} />
      </Switch>
    );

    return (
      <div>
        <Menu>{routes}</Menu>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    token: state.auth.token,
    userId: state.auth.userId,
    favs: state.myList.favs,
    fetched: state.myList.fetched,
    loading: state.myList.loading
  };
};

export default withRouter(
  connect(mapStateToProps, { authCheckState, fetchList })(App)
);
