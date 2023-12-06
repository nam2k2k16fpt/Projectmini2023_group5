import React, { useEffect, useState } from 'react';
import ThumbnailImg from '../image/thumbnail2.png'
import { CiHeart } from "react-icons/ci";
import { Link, useNavigate } from 'react-router-dom';
import '../styles/articleV2.css'
import { displayDate } from '../util/Helper';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFavorite, postFavorite } from '../redux/favoriteSlice';

const ArticlePreviewV2 = ({ itemArticle }) => {
    const jwtToken = useSelector(state => state.auth.login.jwtToken);
    const [article, setArticle] = useState(itemArticle);
    const nav = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        setArticle(itemArticle);
    }, [itemArticle]);


    const handleFavoriteArticle = async (slug, statusFavorite) => {
        if (!jwtToken) {
            nav('/register');
        } else {
            try {
                const resultaction = await dispatch(statusFavorite ? deleteFavorite({ slug: slug }) : postFavorite({ slug: slug }));
                console.log(resultaction);
                const updatedFavoritesCount = resultaction.payload.article.favoritesCount;
                const updatedArticle = { ...article, favorited: !statusFavorite, favoritesCount: updatedFavoritesCount };
                setArticle(updatedArticle);
            } catch (error) {
                console.log(error);
            } finally {

            }
        }
    }
    return (
        <div className='row mt-5 mx-auto articlePreviewV2'>
            <div className='col-12 col-md-5 px-0'>
                <div className='article-content-left'>
                    <div className='article-mmeta'>
                        <div className={article.favorited ? 'heart-article bg_bg1' : 'heart-article'} onClick={() => handleFavoriteArticle(article.slug, article.favorited)}>
                            <span style={{ fontSize: "1.4em" }}>{article.favorited ? <CiHeart /> : <>💙</>}&nbsp;</span>
                            <span>{article.favoritesCount}</span>
                        </div>
                    </div>
                    <div className='title-heading mt-4 text-left'>
                        <h3>
                            <Link to={`/article/${article.slug}`} >
                                {article.title}
                            </Link>
                        </h3>
                    </div>
                    <div className='article-tag mt-4'>
                        <ul className='list-tag'>
                            {
                                article.tagList.map((itemTag, index) => (
                                    <li className='item-tag' key={index}> #{itemTag} </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
            <div className='col-12 col-md-7 px-0'>
                <div className='article-content-right'>
                    <div className='description-article position-relative'>
                        <img src={ThumbnailImg} alt='thumbnail.png' style={{ width: '100%' }} />
                        <div className="ccontent_description">
                            <div className='aarticle-author'>
                                <div className="avatar-name ml-2">
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
                            <div style={{ marginTop: '8em' }}>
                                <p className="text-right" style={{ color: '#B7C7DB' }}>
                                    <Link to={`/article/${article.slug}`}>
                                        {article.description}
                                    </Link>
                                </p>
                            </div>
                            <div className='d-inline-block'>
                                <p className='read-more'><Link to={`/article/${article.slug}`}>Read more ...</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArticlePreviewV2;
