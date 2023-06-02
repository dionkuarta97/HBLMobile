import React, {useState} from 'react';
import {Dimensions, Image, View} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';

const width = Dimensions.get('window').width;

const carouselItems = [
  {
    image: require('../../../../assets/slideshow-1.png'),
  },
  {
    image: require('../../../../assets/slideshow-2.png'),
  },
];

const HomeCarousel = () => {
  const itemWidth = Math.round(width * 0.9);
  const [activeSlide, setActiveSlide] = useState(0);

  const renderItem = ({item}) => (
    <Image
      source={item.image}
      style={{
        width: itemWidth,
        height: itemWidth / 2,
        alignItems: 'center',
        justifyContent: 'center',
        resizeMode: 'contain',
      }}
    />
  );

  return (
    <View style={{marginTop: 10}}>
      <Carousel
        layout={'default'}
        data={carouselItems}
        sliderWidth={width}
        itemWidth={itemWidth}
        renderItem={renderItem}
        onSnapToItem={index => setActiveSlide(index)}
        autoplay={true}
        enableMomentum={true}
        lockScrollWhileSnapping={true}
        autoplayInterval={4000}
        disableIntervalMomentum={true}
        loop={true}
        decelerationRate={0.25}
      />
      <Pagination
        dotsLength={carouselItems.length}
        activeDotIndex={activeSlide}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          backgroundColor: 'rgba(0, 77, 153, 1)',
        }}
        inactiveDotStyle={{
          backgroundColor: 'rgba(211, 211, 211, 1)',
        }}
        inactiveDotOpacity={0.6}
        inactiveDotScale={1}
      />
    </View>
  );
};

export default HomeCarousel;
