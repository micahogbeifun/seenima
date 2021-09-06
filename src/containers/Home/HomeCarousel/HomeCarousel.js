import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Gallery, GalleryImage } from "react-gesture-gallery";

import Spinner from "../../../components/UI/Spinner/Spinner";

import "./HomeCarousel.css";

class HomeCarousel extends Component {
  state = {
    images: null,
    currentSlide: 0
  };
  componentDidMount() {
    // this.scroll = setInterval(
    //   () =>
    //     this.setState(prevState => {
    //       const slide =
    //         prevState.currentSlide >= this.props.images.length - 1
    //           ? 0
    //           : prevState.currentSlide + 1;
    //       return { currentSlide: slide };
    //     }),
    //   7000
    // );
  }
  componentWillUnmount() {
    clearInterval(this.scroll);
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.images !== prevProps.images)
      this.setState({ images: this.props.images });
  }
  render() {
    let gallery = (
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          background: "black"
        }}
      >
<<<<<<< HEAD
=======
        {" "}
>>>>>>> 6602cc5e98ffc3af0edd0223cc61149503ee23a7
        <Spinner />
      </div>
    );
    if (this.props.images) {
      gallery = (
        <Gallery
          className="Gallery"
          style={{
            width: "100%",
            height: "100vh",
            backgroundColor: "black"
          }}
          index={this.state.currentSlide}
          onRequestChange={i => this.setState({ currentSlide: i })}
        >
          {this.props.images.map((image, index) => (
            <Link key={index} to={`/movies/movie/${image.id}`}>
              <GalleryImage
                onClick={image.clicked}
                className="GalleryImage"
                src={image.url}
                style={{ cursor: "pointer" }}
              />
            </Link>
          ))}
        </Gallery>
      );
    }
    return <React.Fragment>{gallery}</React.Fragment>;
  }
}

export default HomeCarousel;
