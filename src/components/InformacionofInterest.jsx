/* eslint-disable react/no-array-index-key */
import React from 'react';
import Slider from 'react-animated-slider';
import Header from './Header';
import 'react-animated-slider/build/horizontal.css';
import '../styles/App.scss';

const InformationofInterest = () => {
  const content = [
    {
      index: 1, image: '', title: 'principal', description: 'descripcion del proyecto', button: 'Leer mas',
    },
    {
      index: 2, image: '', title: 'principal', description: 'descripcion del proyecto', button: 'Leer mas',
    },
    {
      index: 3, image: '', title: 'principal', description: 'descripcion del proyecto', button: 'Leer mas',
    },
  ];

  return (
    <>
      <Header />
      <div className="information__container">
        <div className="header-carousel">
          <Slider autoplay={3000} className="slider-wrapper">
            {content.map((item, index) => (
              <div
                key={index}
                className="slider-content"
                style={{ background: `url('${item.image}') no-repeat center center` }}
              >
                <div className="center">
                  <h1>{item.title}</h1>
                  <p>{item.description}</p>
                  <button type="button">{item.button}</button>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
};
export default InformationofInterest;
