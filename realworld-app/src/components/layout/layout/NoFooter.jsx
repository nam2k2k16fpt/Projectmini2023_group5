import React from 'react';
import Header from '../util/Header';

const NoFooter = ( {children }) => {
    return (
        <>
            <Header />
            {children}
        </>
    );
}

export default NoFooter;