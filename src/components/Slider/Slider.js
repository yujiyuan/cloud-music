import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Slider.scss"
function SimpleSlider ({ bannerList = [] }) {
    const [sliderSwiper, setSliderSwiper] = useState(null);

    useEffect(() => {
        if (bannerList.length && !sliderSwiper) {
            let settings = {
                className:"slider-container",
                dots: true,
                infinite: true,
                speed: 500,
                slidesToShow: 1,
                slidesToScroll: 1,
                dotsClass: "slick-dots slick-write",
            };
            setSliderSwiper(settings);
        }
    }, [bannerList.length, sliderSwiper])

    return (
        <div className="slider-swiper-container">
            <div className="before"></div>
            <Slider {...sliderSwiper}>
            {
                bannerList.map(slider => {
                    return (
                        <div className="swiper-slide" key={slider.imageUrl}>
                            <div className="slider-nav">
                                <img src={slider.imageUrl} width="100%" height="100%" alt="推荐" />
                            </div>
                        </div>
                    )
                })
            }
        </Slider>
        </div>
    );
}

export default SimpleSlider;