import React from 'react';
import "./style.scss"
import HeroBanner from './heroBanner/HeroBanner';

export const Home = () => {
  return (
    <div className='HomePage'>
        <HeroBanner />
        <div style={{ height: "1000px"}}></div>
    </div>
  )
}
