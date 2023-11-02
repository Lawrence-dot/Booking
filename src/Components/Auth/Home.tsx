import React, { createContext, useState } from "react";
import Login from "../../Components/Auth/Login";
import Register from "./Register";
import "./Home.css";
import { HomeType } from "../../Interfaces/interfaces";
import { TbArrowLeft } from "react-icons/tb";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const HomeContext = createContext<HomeType | null>(null);

function Home() {
  const [login, setlogin] = useState<boolean>(true);
  var settings = {
    dots: true,
    infinite: true,
    speed: 1500,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5200,
  };

  return (
    <HomeContext.Provider value={{ login, setlogin }}>
      <div
        className={`Home flex lpage flex-col-reverse ${
          login ? "md:flex-row" : "md:flex-row-reverse"
        } `}
      >
        <div className={`loginForm flex z-40 transition-all md:w-1/2 `}>
          {!login && (
            <div
              className="back flex cursor-pointer"
              onClick={() => setlogin(true)}
            >
              <TbArrowLeft />
              <p className="backlogin">Log in</p>
            </div>
          )}
          {login ? <Login /> : <Register />}
        </div>

        <div className={`loginImage transition-all w-1/2 `} id="loginImage">
          <div className="loginslider">
            <Slider {...settings}>
              <div className="sliderimg secondimg"></div>
              <div className="sliderimg thirdimg"></div>
              <div className="sliderimg firstimg"></div>
            </Slider>
          </div>
        </div>
      </div>
    </HomeContext.Provider>
  );
}

export default Home;
