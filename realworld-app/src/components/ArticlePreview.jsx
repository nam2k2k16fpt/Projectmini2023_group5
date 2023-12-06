import React, { useEffect } from 'react';
import ThumbnailImg from '../image/thumbnail.png'
import { CiHeart } from "react-icons/ci";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFavorite, postFavorite } from '../redux/favoriteSlice';
import { displayDate } from '../util/Helper';
import { useState } from 'react';

const ArticlePreview = ({ itemArticle }) => {
    const jwtToken = useSelector(state => state.auth.login.jwtToken);
    const [article, setArticle] = useState(itemArticle);
    const nav = useNavigate();
    const dispatch = useDispatch();
    // console.log('Before article :', itemArticle);


    useEffect(() => {
        setArticle(itemArticle);
    }, [itemArticle]);



    const handleFavoriteArticle = async (slug, statusFavorite) => {
        if (!jwtToken) {
            nav('/register');
        } else {
            try {
                const resultAction = await dispatch(statusFavorite ? deleteFavorite({ slug: slug }) : postFavorite({ slug: slug }));
                const updatedFavoritesCount = resultAction.payload.article.favoritesCount;
                const updatedArticle = { ...article, favorited: !statusFavorite, favoritesCount: updatedFavoritesCount };
                setArticle(updatedArticle);
            } catch (error) {
                console.log(error);
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
                                            <img src={article.author.image} alt='' className='img-thumbnail' style={{ width: '42px', height: '43px' }} />
                                        </Link>
                                    </div>
                                    <div className='post-author__info'>
                                        <div className=''>
                                            <Link to={`/@${article.author.username}`} className='link_author'>{article.author.username}</Link>
                                        </div>
                                        <div className='post_date'>
                                            <span>{displayDate(article.createdAt)}</span>
                                        </div>
                                    </div>

                                </div>
                                <div className='article-meta'>
                                    <div className={article.favorited ? 'heart-article bg_bg1' : 'heart-article'} onClick={() => handleFavoriteArticle(article.slug, article.favorited)}>
                                        <span style={{ fontSize: "1.4em" }}>{article.favorited ? <CiHeart /> : <>💙</>}&nbsp;</span>
                                        <span>{article.favoritesCount}</span>
                                    </div>
                                </div>
                            </div>
                            <h3 className='mt-4 article-content__title text-left'>
                                <Link to={`/article/${article.slug}`} >
                                    {article.title}
                                </Link>
                            </h3>
                        </header>
                        <div className='article-tag'>
                            <ul className='list-tag'>
                                {
                                    article.tagList.map((itemTag, index) => (
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
                                        <Link to={`/article/${article.slug}`} >
                                            {article.description}
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </article>
                    <div className='mt-5 text-left'>
                        <p className='read-more'><Link to={`/article/${article.slug}`}>Read more ...</Link></p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ArticlePreview;