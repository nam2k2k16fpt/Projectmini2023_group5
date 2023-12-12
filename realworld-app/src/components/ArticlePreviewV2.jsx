import React, { useEffect, useState } from 'react';
import { CiHeart } from "react-icons/ci";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFavorite, postFavorite } from '../redux/favoriteSlice';
import { displayDate } from '../util/Helper';
import '../styles/articleV2.css';
import ThumbnailImg from '../image/thumbnail2.png';

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
                const updatedFavoritesCount = resultaction.payload.article.favoritesCount;
                const updatedArticle = { ...article, favorited: !statusFavorite, favoritesCount: updatedFavoritesCount };
                setArticle(updatedArticle);
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div className='row mt-5 mx-auto articlePreviewV2'>
            <div className='col-12 col-md-5 px-0'>
                <div className='article-content-left'>
                    <div className='article-mmeta'>
                        <div className={`heart-article ${article.favorited ? 'bg_bg1' : ''}`} onClick={() => handleFavoriteArticle(article.slug, article.favorited)}>
                            <span style={{ fontSize: "1.4em" }}>{article.favorited ? <CiHeart /> : <>💙</>}&nbsp;</span>
                            <span>{article.favoritesCount}</span>
                        </div>
                    </div>
                    <div className='title-heading mt-4 text-left'>
                        <h3 className='h3'>
                            <Link to={`/article/${article.slug}`} >
                                {article.title}
                            </Link>
                        </h3>
                    </div>
                    <div className='article-tag mt-4'>
                        <ul className='list-tag'>
                            {article.tagList.map((itemTag, index) => (
                                <li className='item-tag' key={index}> #{itemTag} </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className='col-12 col-md-7 px-0'>
                <div className='article-content-right'>
                    <div className='description-article position-relative' >
                        <img src={ThumbnailImg} alt='thumbnail.png' style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <div className="ccontent_description" style={{height:'fit-content'}}>
                            <div className='article-author'>
                                <div className="avatar-name ml-2">
                                    <Link to="/" className="">
                                        <img src={article.author.image} alt='' className='img-thumbnail' style={{ width: '42px', height: '43px' }} />
                                    </Link>
                                </div>
                                <div className='post-author__info'>
                                    <div>
                                        <Link to={`/@${article.author.username}`} className='link_author'>{article.author.username}</Link>
                                    </div>
                                    <div className='post_date'>
                                        <span>{displayDate(article.createdAt)}</span>
                                    </div>
                                </div>
                            </div>
                            <div style={{ marginTop: '2em'  }}>
                                <p className="text-center" style={{ color: '#B7C7DB', fontSize:'0.9em'}}>
                                    <Link to={`/article/${article.slug}`}>
                                        {article.description}
                                    </Link>
                                </p>
                                <div className='d-inline-block'>
                                    <p className='read-more'>
                                        <Link to={`/article/${article.slug}`}>Read more ...</Link>
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArticlePreviewV2;
