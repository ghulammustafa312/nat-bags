import React from "react";
import ReactPlayer from "react-player";
import "./VideosSection.css";
import Tilt from "react-parallax-tilt";
import { useNavigate } from "react-router-dom";

export const VideosSection = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="video-container">
        <Tilt transitionSpeed={1000} scale={1.07} className="video-card">
          {/*   <ReactPlayer
            onClick={() => navigate("/product-details/26")}
            url={`/assets/images/products-images/image-kids-1.png`}
            // url="https://res.cloudinary.com/darwtgzlk/video/upload/w_400,f_auto,q_auto/v1687842001/Ecommerce-app/hero-video-1_juagj7.mp4"
            playing
            playbackRate={1.15}
            muted
            loop
            controls={false}
            width="100%"
            height="119.9%"
          />
  */}
          <img src="/assets/images/Clutches.jpeg" alt="test" width={"90%"} />
          <h3>Clutches</h3>

          <span className="notch"></span>
        </Tilt>{" "}
        <Tilt transitionSpeed={1000} scale={1.07} className="video-card">
          <img src="/assets/images/shoulder-bag.webp" alt="test" width={"90%"} />

          <h3>Shoulder Bag</h3>
          <span className="notch"></span>
        </Tilt>
        <Tilt transitionSpeed={1000} scale={1.07} className="video-card">
          <img src="/assets/images/Handbag.jpeg" alt="test" width={"90%"} height={"100%"} />

          <h3>Hand Bag</h3>
          <span className="notch"></span>
        </Tilt>
        <Tilt transitionSpeed={1000} scale={1.07} className="video-card">
          <img src="/assets/images/tote-bag.webp" alt="test" width={"100%"} height={"100%"} />

          <h3>Tote Bag</h3>
          <span className="notch"></span>
        </Tilt>
      </div>
    </>
  );
};
