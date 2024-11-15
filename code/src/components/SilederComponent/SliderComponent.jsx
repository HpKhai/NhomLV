
import { Image } from 'antd';
import React from 'react';
import { WrapperSliderStyle } from './style';

const SliderComponent = ({ arrImages }) => {
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  
  return (
    <div style={{marginLeft:"120px", marginRight:"120px" , paddingTop:"20px" , marginBottom:"40px"}}>
    <WrapperSliderStyle {...settings} >
      {arrImages.map((image) => {
        return (
          <Image key={image} src={image} alt="slider" preview={false} width="100%" height="160px"/>
        )
})}
    </WrapperSliderStyle></div>
  )
}

export default SliderComponent;
