import React from "react";
import Slider from "react-slick";
import garden1 from "./../../assets/images/garden1.jpg";
import garden2 from "./../../assets/images/garden2.jpg";
import garden3 from "./../../assets/images/garden3.jpg";
import garden4 from "./../../assets/images/garden4.jpg";
import garden5 from "./../../assets/images/garden5.jpg";
import Suit1 from "./../../assets/images/merlot-suit.jpg";
import Coat from "./../../assets/images/mocha-overcoat.jpg";
import Dress from "./../../assets/images/moonlight-dress.jpg";
import Gown from "./../../assets/images/dream-gown.jpg";
import rainJacket from "./../../assets/images/rain-jacket.jpg";
import toughGuy from "./../../assets/images/denim-pioneer.jpg";




function HomeSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
    autoplay:true
  };
  return (
    <section className=" pb-6">
      <div className="flex flex-wrap items-center justify-center">
        <div className="md:w-2/3 w-full px-7 md:px-0 pb-8 md:pb-0  h-[400px]">
          <Slider {...settings}>
            <div>
              <img src={rainJacket} className="w-full object-fill mix-blend-darken h-[400px]  shadow-md transition-transform duration-300 ease-in-out transform hover:scale-105" alt="" />
            </div>
            <div>
              <img src={Coat} className="w-full  object-fill mix-blend-darken h-[400px] shadow-md transition-transform duration-300 ease-in-out transform hover:scale-105" alt="" />
            </div>
            <div>
              <img src={Gown} className="w-full object-fill mix-blend-darken h-[400px] shadow-md transition-transform duration-300 ease-in-out transform hover:scale-105" alt="" />
            </div>
          </Slider>
        </div>
        <div className="md:w-1/3 w-full px-7 md:px-0">
          <img src={Dress} className="w-full object-fill mix-blend-darken h-[205px] shadow-md transition-transform duration-300 ease-in-out transform hover:scale-105 block" alt="" />
          <img src={Suit1} className="w-full object-fill mix-blend-darken h-[195px] shadow-md transition-transform duration-300 ease-in-out transform hover:scale-105 pb-[5px] block" alt="" />
        </div>
      </div>
    </section>
  );
}

export default HomeSlider;


