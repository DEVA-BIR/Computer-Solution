import React from "react";
import { Carousel } from "react-responsive-carousel";
import { img } from "./Images/Data";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function CarouselEffect() {
  return (
    <Carousel
      autoPlay
      infiniteLoop
      interval={4000}
      showThumbs={false}
      showIndicators={false}
      showStatus={false}
    >
      {img.map((imageItemLink, index) => (
        <div key={index}>
          <img
            src={imageItemLink}
            alt={`Slide ${index + 1}`}
          />
        </div>
      ))}
    </Carousel>
  );
}

export default CarouselEffect;