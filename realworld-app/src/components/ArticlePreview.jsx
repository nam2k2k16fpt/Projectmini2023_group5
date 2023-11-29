import React, { useEffect } from 'react';
import ThumbnailImg from '../image/thumbnail.png'
import { CiHeart } from "react-icons/ci";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFavorite, postFavorite } from '../redux/favoriteSlice';
import { getGlobalFeed, getYourFeed } from '../redux/articleSlice';

const ArticlePreview = ({ itemArticle, toggle }) => {
    const jwtToken = useSelector(state => state.auth.login.jwtToken);
    const offset = useSelector(state => state.articles.offset);
    const tagSelect = useSelector((state) => state.articles.tagSelect);
    const nav = useNavigate();
    const dispatch = useDispatch();




    const handleFavoriteArticle = (slug, statusFavorite) => {
        if (!jwtToken) {
            nav('/register');
        } else {
            dispatch(statusFavorite ? deleteFavorite({ slug: slug }) : postFavorite({ slug: slug }));
            if (toggle === 'GLOBAL') {
                dispatch(getGlobalFeed({ offset: offset }));
            } else if (toggle === 'TAG') {
                dispatch(getGlobalFeed({ offset: offset, tag: tagSelect }));
            }
            else {
                dispatch(getYourFeed({ offset: offset }));
            }
        }
    }


    return (
        <div className='col-md-12 '>
            <div className='row'>
                <div className='col-12 article-body pt-4'>
                    <article className='article-content'>
                        <header className=''>
                            <div className='d-flex justify-content-between article-content__author_meta'>
                                <div className='article-author'>
                                    <div className="avatar-name">
                                        <Link to="/" className="">
                                            <img src={itemArticle.author.image} alt='' className='img-thumbnail' style={{ width: '42px', height: '43px' }} />
                                        </Link>
                                    </div>
                                    <div className='post-author__info'>
                                        <div className=''>
                                            <Link to="/" className='link_author'>{itemArticle.author.username}</Link>
                                        </div>
                                        <div className='post_date'>
                                            {/* 2023-11-27T16:11:40.402Z */}
                                            <span>{itemArticle.createdAt}</span>
                                        </div>
                                    </div>

                                </div>
                                <div className='article-meta'>
                                    <div className={itemArticle.favorited ? 'heart-article bg_bg1' : 'heart-article'} onClick={() => handleFavoriteArticle(itemArticle.slug, itemArticle.favorited)}>
                                        <span style={{ fontSize: "1.4em" }}>{itemArticle.favorited ? <CiHeart /> : <>💙</>}&nbsp;</span>
                                        <span>{itemArticle.favoritesCount}</span>
                                    </div>
                                </div>
                            </div>
                            <h3 className='mt-4 article-content__title text-left'>{itemArticle.title}</h3>
                        </header>
                        <div className='article-tag'>
                            <ul className='list-tag'>
                                {
                                    itemArticle.tagList.map((itemTag, index) => (
                                        <li className='item-tag' key={index}> #{itemTag}</li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className='article-content__body'>
                            <div className="description__project__recent">
                                <img src={ThumbnailImg} alt="" className="thumbnail__project__recent" />
                                <div className="content_description">
                                    <p className="pharagraph-desc text-left">
                                        {itemArticle.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </article>
                    <div className='mt-5 text-left'>
                        <p className='read-more'>Read more ...</p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ArticlePreview;