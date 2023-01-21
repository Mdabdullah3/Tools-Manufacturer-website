import React from 'react';
import Banner from '../Banner/Banner';
import About from '../About/About';
import Product from '../Product/Product';
import Team from '../Team/Team';
import Busniess from '../Busniess/Busniess';
import Review from '../Review/Review'
import Partner from '../Partner/Partner';
import Contact from '../contact/Contact';
const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <About></About>
            <Product></Product>
            <Team></Team>
            <Busniess></Busniess>
            <Partner />
            <Review></Review>
            <Contact />
        </div>
    );
};

export default Home;