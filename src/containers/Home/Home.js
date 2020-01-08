import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchMovies, fetchSearch } from "../../store/actions/movies";

import withErrorhandler from "../../hoc/withErrorHandler/withErrorHandler";
import { moviedb } from "../../apis/axios-movies";
import * as actionTypes from "../../store/actions/actionTypes";
import classes from "./Home.module.css";
import SearchBar from "../../components/UI/SearchBar/SearchBar";
import HomeCarousel from "./HomeCarousel/HomeCarousel";
import MovieGrid from "../../components/MovieGrid/MovieGrid";
import PageButtons from "../../components/UI/PageButtons/PageButtons";

class Home extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  handleScroll = () => {
    setTimeout(() => {
      this.myRef.current.scrollIntoView({ behavior: "smooth" });
    }, 250);
  };

  state = {
    page: null,
    SearchValue: "",
    error: null,
    carouselMovies: null,
    queries: [],
    check: null
  };
  componentDidMount = () => {
    this.handleScroll();
    const page = this.props.match.params.page.split("-")[1];
    this.getCarousel();
    this.props.fetchMovies(page, "now_playing");
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.SearchValue < 1) this.handleScroll();
    if (!this.props.searchMovies) {
      if (this.props.match.url !== prevProps.match.url) {
        const page = this.props.match.params.page.split("-")[1];
        this.props.fetchMovies(page, "now_playing");
      }
      if (prevProps.cinemaMovies !== this.props.cinemaMovies) {
        const { results, page, total_pages } = this.props.cinemaMovies;
        this.setState({
          cinemaMovies: results,
          page,
          total_pages
        });
      }
    } else {
      if (
        prevProps.searchMovies !== this.props.searchMovies ||
        this.props.match.url !== prevProps.match.url
      ) {
        const { results, page, total_pages } = this.props.searchMovies;
        this.setState({
          searchMovies: results,
          page,
          total_pages
        });
      }
    }
  };

  getCarousel = async () => {
    const response = await moviedb.get(`/movie/${"now_playing"}`, {
      params: { api_key: actionTypes.API_KEY, page: 1 }
    });
    this.setState(prevState => {
      if (!prevState.carouselMovies) {
        return { carouselMovies: response.data.results };
      }
      return null;
    });
  };
  getImages = movies => {
    return movies.map(movie => {
      return {
        id: movie.id,
        url: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
      };
    });
  };

  inputChangeHandler = ({ target }) => {
    this.setState({ SearchValue: target.value });
  };
  seachSubmithandler = event => {
    event.preventDefault();
    this.props.fetchSearch(this.state.SearchValue, 1);
  };

  onPageNavHandler = nav => {
    let navPage = null;
    if (this.props.searchMovies) {
      const { page, total_pages } = this.state;
      navPage =
        nav === "next" && page < total_pages
          ? page + 1
          : nav === "prev" && page >= 1
          ? page - 1
          : null;
      if (navPage) {
        this.props.fetchSearch(this.state.SearchValue, navPage);
        this.props.history.push("/home/page-" + navPage);
      }
    } else if (this.state.cinemaMovies) {
      const { page, total_pages } = this.state;
      navPage =
        nav === "next" && page < total_pages
          ? page + 1
          : nav === "prev" && page >= 1
          ? page - 1
          : null;
      if (navPage) {
        this.props.fetchMovies(navPage, "now_playing");
        this.props.history.push("/home/page-" + navPage);
      }
    }
  };

  render() {
    let images = this.state.carouselMovies
      ? this.getImages(this.state.carouselMovies)
      : null;
    let movies = this.state.searchMovies
      ? this.state.searchMovies
      : this.state.cinemaMovies
      ? this.state.cinemaMovies
      : null;
    let buttons = this.state.total_pages ? (
      <PageButtons
        page={this.state.page}
        totalPages={this.state.total_pages}
        clicked={this.onPageNavHandler}
      >
        Next Page
      </PageButtons>
    ) : null;
    return (
      <div ref={this.myRef} className={classes.Home}>
        <HomeCarousel images={images} />
        <form className={classes.SearchDiv} onSubmit={this.seachSubmithandler}>
          <SearchBar
            value={this.state.SearchValue}
            inputChangeHandler={this.inputChangeHandler}
          />
        </form>
        <MovieGrid
          type={this.props.searchMovies ? "search" : "cinema"}
          movies={movies}
        />
        {buttons}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cinemaMovies: state.movies["now_playing"],
    searchMovies: state.movies.search
  };
};

export default connect(mapStateToProps, { fetchMovies, fetchSearch })(
  withErrorhandler(Home, moviedb)
);
