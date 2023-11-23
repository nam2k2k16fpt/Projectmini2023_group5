import React, { useState } from 'react';
import Default from '../layout/Default';
import Banner from '../util/Banner'
import { Link, NavLink } from 'react-router-dom';
import '../../styles/home.css'
import ArticleList from '../ArticleList';
const Home = () => {
    const [limit,useLimit] = useState(10);
    return (
        <Default>
            <Banner />
            <div className='container page'>
                <div className='row'>
                    <div className='col-md-9'>
                        <div className="feed-toggle">
                            <ul className='nav-optionArticle p-0 mb-0'>
                                <li className='nav-item active'>
                                    <Link className="">News Feed</Link>
                                </li>
                                <li className='nav-item'>
                                    <Link className="">News Feed</Link>
                                </li>
                            </ul>
                        </div>
                        {/* <ArticleList limit={limit}/> */}
                    </div>
                    <div className='col-md-3'>

                    </div>
                </div>
            </div>
        </Default>
    );
};

export default Home;