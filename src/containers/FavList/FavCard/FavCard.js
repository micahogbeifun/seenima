import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import "./FavCard.css";
import Spinner from "../../../components/UI/Spinner/Spinner";
import { moviedb } from "../../../apis/axios-movies";
import * as actionTypes from "../../../store/actions/actionTypes";
import { addItem, deleteItem } from "../../../store/actions/items";

class FavCard extends Component {
  state = {
    movie: null,
    favourite: { label: "Added", icon: "heart" }
  };
  componentDidMount = async () => {
    const response = await moviedb.get(`/movie/${this.props.movie.movieId}`, {
      params: { api_key: actionTypes.API_KEY }
    });
    if (response) {
      this.setState({ movie: response.data });
    }
  };

  switchFavourite = () => {
    const { userId, favs, addItem, deleteItem } = this.props;
    const action = favs.find(
      movie => movie.movieId === this.props.movie.movieId
    );
    if (action) {
      deleteItem(action);
    } else {
      addItem({ movieId: this.state.movie.id, userId });
    }
    this.setState(prevState => {
      const label =
        prevState.favourite.label === "Add to list" ? "Added" : "Add to list";
      const icon =
        prevState.favourite.icon === "heart-empty" ? "heart" : "heart-empty";
      const favourite = { label, icon };
      return { favourite };
    });
  };

  render() {
    const { movie } = this.state;
    let renderMovie = <Spinner />;
    if (movie) {
      const { original_title, overview, poster_path } = movie;
      const long = overview.length > 390;
      const overviewTrim = long ? overview.substring(0, 397) + "..." : overview;
      const { label, icon } = this.state.favourite;
      const fav = (
        <div className="FavFavDiv">
          <ion-icon
            onClick={this.switchFavourite}
            style={{
              color: "B007D4",
              cursor: this.props.loading ? "not-allowed" : "pointer"
            }}
            name={icon}
          ></ion-icon>
          <p>{label}</p>
        </div>
      );
      const imagePath = `https://image.tmdb.org/t/p/w500/${poster_path}`;
      renderMovie = (
        <React.Fragment>
          <div
            onClick={() =>
              this.props.history.replace(
                "/movies/movie/" + this.props.movie.movieId
              )
            }
            className="FavImageCard"
          >
            <img src={imagePath} alt={movie.title} />
          </div>
          <div className="FavMovieDetail">
            <div className="FavHeader">
              <h3>{original_title}</h3>
              {fav}
            </div>
            <h5>OVERVIEW</h5>
            <p>{overviewTrim}</p>
          </div>
        </React.Fragment>
      );
    }

    return <div className="FavCard">{renderMovie}</div>;
  }
}

const mapStateToProps = state => {
  return {
    favs: state.myList.favs,
    loading: state.myList.loading,
    userId: state.auth.userId
  };
};

export default withRouter(
  connect(mapStateToProps, { addItem, deleteItem })(FavCard)
);
