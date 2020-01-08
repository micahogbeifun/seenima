import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import axios from "axios";

import { addItem, deleteItem } from "../../store/actions/items";
import { fetchMovie } from "../../store/actions/movies";
import "./Movie.css";
import Spinner from "../../components/UI/Spinner/Spinner";

class Movie extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  state = {
    crew: null,
    cast: null,
    error: null,
    favourite: { label: "Add to list", icon: "heart-empty" },
    toggled: null
  };
  handleScroll = () => {
    setTimeout(() => {
      this.myRef.current.scrollIntoView({ behavior: "smooth" });
    }, 250);
  };
  componentDidMount = () => {
    this.handleScroll();
    this.props.fetchMovie(this.props.match.params.movieId);
  };

  componentDidUpdate = (prevProps, prevState) => {
    this.handleScroll();
    if (prevProps.movie !== this.props.movie) {
      this.getCredits(this.props.movie.id);
    }
    if (this.props.favs.length > 0 && !prevState.toggled) {
      const { match, favs } = this.props;
      const action = favs.find(movie => movie.movieId === match.params.movieId);
      if (action) {
        this.setState({
          favourite: { label: "Added", icon: "heart" },
          toggled: true
        });
      }
    }
  };

  getCredits = async id => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=844dba0bfd8f3a4f3799f6130ef9e335`
      );
      const crew = response.data.crew.filter(
        member => member.department === "Directing"
      );
      const cast = response.data.cast.filter((cast, index) => index < 7);
      this.setState({ crew, cast });
    } catch (error) {
      this.setState({ error });
    }
  };

  switchFavourite = () => {
    const { match, userId, favs, addItem, deleteItem } = this.props;
    const action = favs.find(movie => movie.movieId === match.params.movieId);
    if (action) {
      deleteItem(action);
    } else {
      addItem({ movieId: match.params.movieId, userId });
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
    let movie = (
        <div style={{ margin: "200px auto" }}>
          <Spinner />
        </div>
      ),
      backdropPath,
      title,
      movieOverview,
      iframe,
      trailerSrc,
      movieGenres,
      imdbRating,
      crew,
      cast,
      movieFavourite;
    if (this.props.movie) {
      const {
        backdrop_path,
        videos,
        original_title,
        overview,
        genres,
        vote_average
      } = this.props.movie;
      backdropPath = `https://image.tmdb.org/t/p/w1280/${backdrop_path}`;
      title = original_title;
      movieOverview = overview;
      trailerSrc = `https://www.youtube.com/embed/${videos.results[0].key}`;
      iframe = (
        <iframe
          className="Iframe"
          allowFullScreen="allowFullScreen"
          title="video player"
          src={trailerSrc}
        />
      );
      movieGenres = genres.map(genre => <p key={genre.id}>{genre.name}</p>);
      imdbRating = (
        <div className="Rating">
          <ion-icon style={{ color: "#F1FE87" }} name="star"></ion-icon>
          <p>{vote_average}</p>{" "}
        </div>
      );

      const infoArray = [
        { title: "GENRES", data: movieGenres },
        { title: "IMDB RATING", data: imdbRating }
      ];
      if (this.state.crew) {
        crew = this.state.crew.map(member => (
          <p key={member.id}>{member.name}</p>
        ));
        cast = this.state.cast.map(member => (
          <p key={member.cast_id}>{member.name}</p>
        ));

        infoArray.push({ title: "DIRECTORS", data: crew });
        infoArray.push({ title: "MAIN CAST", data: cast });
      }
      const { label, icon } = this.state.favourite;
      movieFavourite =
        this.props.token !== null ? (
          <div className="FavDiv">
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
        ) : null;

      movie = (
        <React.Fragment>
          <div
            className="Backdrop"
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              backgroundImage: `url(${backdropPath})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              padding: "40px 20px"
            }}
          >
            <div className="MovieInfo">
              <div className="MovieDetail">
                <div className="TitleDiv">
                  <h1>{title}</h1>
                  {movieFavourite}
                </div>
                <h3>SYNOPIS</h3>
                <p>{movieOverview}</p>
                <div className="ExtraInfo">
                  {infoArray.map(info => (
                    <div key={info.title} className="Info">
                      <h4>{info.title}</h4>
                      {info.data}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="PageDiv">
            <h2>Movie Trailer</h2>
            <div className="ui embed">{iframe}</div>
          </div>
        </React.Fragment>
      );
    }

    return (
      <div
        ref={this.myRef}
        style={{
          margin: "0",
          padding: "0",
          paddingTop: "56px",
          width: "100%",
          height: "auto"
        }}
      >
        {movie}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    movie: state.movies.movie,
    token: state.auth.token,
    favs: state.myList.favs,
    loading: state.myList.loading,
    userId: state.auth.userId
  };
};

export default withRouter(
  connect(mapStateToProps, { fetchMovie, addItem, deleteItem })(Movie)
);
