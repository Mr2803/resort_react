import React, { Component } from "react";
import carousel1 from "../images/carHome1.JPG";
import carousel2 from "../images/carHome2.JPG";
import carousel3 from "../images/carHome3.JPG";
import Swiper from "swiper";
import "swiper/swiper-bundle.css";
export default class Carousel extends Component {
  componentDidMount() {
    this.swiper = new Swiper(".swiper-container", {
      scrollbar: {
        el: ".swiper-scrollbar",
        hide: true,
      },
    });
  }
  render() {
    return (
      <div className="swiper-container">
        <div className="swiper-wrapper">
          <div className="swiper-slide">
            <img src={carousel1}></img>
          </div>
          <div className="swiper-slide">
            <img src={carousel2}></img>
          </div>
          <div className="swiper-slide">
            <img src={carousel3}></img>
          </div>
        </div>

        <div className="swiper-scrollbar"></div>
      </div>
    );
  }
}
