import { Carousel } from 'antd';
import CarouselStyle from './CarouselStyle'
import CarouselItems from './CarouselItems'
import React from 'react';

const CarouselSingle = (link: string, key: React.Key):React.ReactElement => {
    return(
        <div key={key}>  
            <img src={link} style={CarouselStyle} />
        </div>
    );
}

const MarketCarousel = ():React.ReactElement => (
  <Carousel autoplay style={CarouselStyle} effect='fade'>
    { CarouselItems.map((item, index) => CarouselSingle(item.cover, index)) }
  </Carousel>
);

export default MarketCarousel;