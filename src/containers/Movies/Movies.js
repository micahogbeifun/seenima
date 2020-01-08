import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";

import withErrorhandler from "../../hoc/withErrorHandler/withErrorHandler";
import { moviedb } from "../../apis/axios-movies";
import { fetchMovies } from "../../store/actions/movies";
import MovieGrid from "../../components/MovieGrid/MovieGrid";
import PageButtons from "../../components/UI/PageButtons/PageButtons";
import Spinner from "../../components/UI/Spinner/Spinner";

class Movies extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef(); // Create a ref object
  }

  handleScroll = () => {
    setTimeout(() => {
      this.myRef.current.scrollIntoView({ behavior: "smooth" });
    }, 250);
  };

  state = {
    error: null,
    movies: null,
    categories: ["popular", "top_rated", "upcoming"]
  };
  componentDidMount = () => {
    this.handleScroll();
    const page = this.props.match.params.page.split("-")[1];
    this.props.fetchMovies(page, this.props.match.params.category);
  };

  componentDidUpdate = (prevProps, prevState) => {
    this.handleScroll();
    if (
      prevProps.match.params.page !== this.props.match.params.page ||
      prevProps.match.params.category !== this.props.match.params.category
    ) {
      const { category, page } = this.props.match.params;
      this.props.fetchMovies(page.split("-")[1], category);
    }
    const { category } = this.props.match.params;
    if (this.props.movies[category]) {
      if (this.props.movies[category].results !== this.state.movies) {
        const { results, page, total_pages } = this.props.movies[category];
        this.setState({
          movies: results,
          page,
          total_pages
        });
      }
    }
  };

  onPageNavHandler = nav => {
    let navPage = null;
    const { category } = this.props.match.params;
    const { page, total_pages } = this.state;
    navPage =
      nav === "next" && page < total_pages
        ? page + 1
        : nav === "prev" && page >= 1
        ? page - 1
        : null;
    if (navPage) {
      this.props.history.push(`/movies/${category}/page-${navPage}`);
    }
  };

  render() {
    const { category } = this.props.match.params;
    let movies = this.state.movies ? this.state.movies : null;
    let buttons = this.state.total_pages ? (
      <PageButtons
        page={this.state.page}
        totalPages={this.state.total_pages}
        clicked={this.onPageNavHandler}
      >
        Next Page
      </PageButtons>
    ) : null;
    if (!this.state.categories.includes(category)) {
      return <Redirect ref={this.myRef} to="/home/page-1" />;
    }
    if (!this.state.movies) {
      return (
        <div ref={this.myRef} style={{ margin: "150px auto" }}>
          <Spinner />
        </div>
      );
    }
    return (
      <div ref={this.myRef} style={{ paddingTop: "56px" }} className="Movies">
        <MovieGrid type={category} movies={movies} />
        {buttons}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    movies: state.movies
  };
};

export default connect(mapStateToProps, { fetchMovies })(
  withErrorhandler(Movies, moviedb)
);
