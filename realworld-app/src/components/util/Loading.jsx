import React from 'react';
import ReactLoading from "react-loading";

const Loading = () => {
    return (
        <div className='container d-flex align-items-center' style={{height: '100vh'}}>
            <ReactLoading type="bubbles" color="#1A32BA"
                    height={120} width={150} className='d-flex mx-auto'/>
        </div>
    );
};

export default Loading;
