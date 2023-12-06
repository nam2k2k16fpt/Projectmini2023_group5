import React from 'react';
import '../../styles/banner.css';

const Banner = () => {
    return (
        <div className="banner container-fluid d-flex p-0">
            <div className="container banner-text">
                <h1 className="logo-band font-weight-bold mt-5">Knowledge Addict</h1>
                <p><strong>A place to share your knowledge.</strong></p>
            </div>
        </div>
    );
};

export default Banner;