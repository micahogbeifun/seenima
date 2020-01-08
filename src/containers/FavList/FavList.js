import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import { Redirect } from "react-router";

import "./FavList.css";
import withErrorhandler from "../../hoc/withErrorHandler/withErrorHandler";
import { moviedb } from "../../apis/axios-movies";
import FavCard from "./FavCard/FavCard";
import Spinner from "../../components/UI/Spinner/Spinner";

class FavList extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef(); // Create a ref object
  }
  state = {};

  handleScroll = () => {
    setTimeout(() => {
      this.myRef.current.scrollIntoView({ behavior: "smooth" });
    }, 250);
  };

  componentDidMount = () => {
    this.handleScroll();
    this.setState(prevState => {
      if (!prevState.auth) return { auth: true };
    });
  };
  componentDidUpdate = (prevProps, prevState) => {
    this.handleScroll();
  };

  render() {
    let object = (
      <div style={{ margin: "80px auto" }}>
        <Spinner />
      </div>
    );
    if (this.state.auth === true) {
      object = this.props.isAuthenticated ? (
        <Fragment>
          <h1>{this.props.username}</h1>
          {this.props.movies.length === 0 && this.props.fetched ? (
            <p>Favourites List is Empty</p>
          ) : (
            this.props.movies.map((movie, index) => {
              return <FavCard key={movie.id} movie={movie} index={index} />;
            })
          )}
        </Fragment>
      ) : (
        <div>
          <Redirect to="/home/page-1" />
        </div>
      );
    }
    return (
      <div ref={this.myRef} className="FavList">
        {object}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    movies: state.myList.favs,
    username: state.auth.username,
    fetched: state.myList.fetched
  };
};

export default connect(mapStateToProps)(withErrorhandler(FavList, moviedb));
