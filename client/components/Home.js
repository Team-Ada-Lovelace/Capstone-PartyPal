import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReviewsHome from './ReviewsHome';
import CarouselHome from './CarouselHome';
import FlexBox from './Styled-Components/FlexBox.styled';

const Home = () => {
  window.localStorage.removeItem('price');
  window.localStorage.removeItem('term');

  return (
    <div id='home-div'>
      <br></br>
      <CarouselHome />
      <div>
        <div>
          <FlexBox>
            <br></br>
            <br></br>
            
              <h2 style={{ textAlign: 'center', margin: '1rem' }}>
                <strong>
                  Have a party coming up? Need venue and catering
                  recommendations in your area? Click Start Planning to find
                  recommendations in your area.
                </strong>
              </h2>
           
            <br></br>
            <br></br>
            <h2>Reviews</h2>
            <br></br>
            <FlexBox>
              <ReviewsHome />
            </FlexBox>
          </FlexBox>
        </div>
      </div>
    </div>
  );
};

export default Home;
