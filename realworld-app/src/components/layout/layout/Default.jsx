import React from 'react';
import Header from '../util/Header';
import Footer from '../util/Footer';

const Default = ( { children }) => {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
}

export default Default;