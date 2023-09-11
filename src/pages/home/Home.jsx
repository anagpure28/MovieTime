import React from 'react';
import "./style.scss"
import HeroBanner from './heroBanner/HeroBanner';
import Trending from './trending/Trending';

export const Home = () => {
  return (
    <div className='HomePage'>
        <HeroBanner />
        <Trending />
        <div style={{ height: "1000px"}}></div>
    </div>
  )
}
