import React, { useEffect, useState } from 'react';
import Default from '../layout/Default';
import Banner from '../util/Banner'
import TagList from '../TagList';
import { Link } from 'react-router-dom';
import ArticleList from '../ArticleList';
import { IoPricetagOutline } from "react-icons/io5";
import '../../styles/home.css'
import { useDispatch, useSelector } from 'react-redux';
import { getGlobalFeed, getYourFeed, setCurrentPage, setOffset, setTagSelect } from '../../redux/articleSlice';
import { getTags } from '../../redux/tagsSlice';
const Home = () => {
    const limit = 10
    const dispatch = useDispatch();
    const tagSelect = useSelector((state) => state.articles.tagSelect);
    const jwtToken = useSelector((state) => state.auth.login.jwtToken);
    const [toggle, setToggle] = useState(jwtToken ? 'YOUR' : 'GLOBAL');
    const globalFeed = useSelector((state) => state.articles.globalFeed);
    const yourFeed = useSelector((state) => state.articles.yourFeed);
    const loadingGlobalFeed = useSelector((state) => state.articles.loadingGlobalFeed);
    const loadingYourFeed = useSelector((state) => state.articles.loadingYourFeed);
    const offset = useSelector(state => state.articles.offset);


    useEffect(() => {
        // console.log(jwtToken);
        if (jwtToken) {
            dispatch(getYourFeed({ offset: offset }));
        }
        if (toggle === 'TAG') {
            console.log(tagSelect);
            dispatch(getGlobalFeed({ offset: offset, tag: tagSelect }));

        }
        if (toggle === 'GLOBAL') {
            console.log(tagSelect);
            dispatch(getGlobalFeed({ offset: offset }));
        }
        dispatch(getTags());
    }, [tagSelect, offset, jwtToken, toggle])



    return (
        <Default>
            {jwtToken ? '' : <Banner />}
            <div className='container page'>
                <div className='row'>
                    <div className='col-md-10'>
                        <div className="feed-toggle">
                            <ul className='nav-optionArticle p-0 mb-0'>
                                {
                                    jwtToken ? (
                                        <li className={toggle === 'YOUR' ? 'nav-item active' : 'nav-item'} onClick={() => { setToggle('YOUR'); dispatch(setTagSelect('')); dispatch(setOffset(0)); dispatch(setCurrentPage(1)); }}>
                                            <Link className="">Your Feed</Link>
                                        </li>
                                    ) : ('')
                                }
                                <li className={toggle === 'GLOBAL' ? 'nav-item active' : 'nav-item'} onClick={() => { setToggle('GLOBAL'); dispatch(setTagSelect('')); dispatch(setOffset(0)); dispatch(setCurrentPage(1)); }}>
                                    <Link className="">News Feed</Link>
                                </li>
                                {
                                    tagSelect ? (
                                        <li className={toggle === 'TAG' ? 'nav-item active' : 'nav-item'}>
                                            <Link className=""><IoPricetagOutline /> {tagSelect}</Link>
                                        </li>
                                    ) : ('')
                                }
                            </ul>
                        </div>
                        <ArticleList
                            limit={limit}
                            toggle={toggle}
                            articlesGlobal={globalFeed}
                            articlesYour={yourFeed}
                            loading={loadingGlobalFeed || loadingYourFeed}
                        />
                    </div>
                    <div className='col-md-2'>
                        <TagList onSelectTag={(tag) => dispatch(setTagSelect(tag))} onClickToggle={(toggle) => setToggle(toggle)} />
                    </div>
                </div>
            </div>
        </Default>
    );
};

export default Home;