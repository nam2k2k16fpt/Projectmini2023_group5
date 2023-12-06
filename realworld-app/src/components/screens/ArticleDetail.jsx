import React, { useEffect } from 'react';
import Default from '../layout/Default';
import ThumbnailArticleDetail from '../../image/thumbnail2.png'
import { FaRegHeart } from "react-icons/fa";
import { IoHeartSharp } from "react-icons/io5";
import { FaRegComment } from "react-icons/fa";
import { SlUserFollow } from "react-icons/sl";
import { SlUserFollowing } from "react-icons/sl";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GoPencil } from "react-icons/go";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { getArticleDetail } from '../../redux/articleDetailSlice';
import { deleteCommentOfArticle, getCommentOfArticle, setListComment } from '../../redux/commentSlice';
import { displayDate } from '../../util/Helper';
import Loading from '../util/Loading';
import Commment from '../Comment';
import CommentPreview from '../CommentPreview';
import { deleteFollow, postFollow } from '../../redux/followSlice';
import { deleteFavorite, postFavorite } from '../../redux/favoriteSlice';
import style from '../../styles/articleDetail.module.css';
import parser from 'html-react-parser';
import { deleteArticle } from '../../redux/articleSlice';

const ArticleDetail = () => {
    const param = useParams();
    const nav = useNavigate();
    const dispatch = useDispatch();
    const loadingArticleDetail = useSelector((state) => state.article_detail.loadingArticleDetail);
    const { article } = useSelector((state) => state.article_detail.articleDetail);
    const { comments } = useSelector((state) => state.comment.listComment);
    const jwtToken = useSelector(state => state.auth.login.jwtToken);
    const currentUser = useSelector((state) => state.user.saveUserData.currentUser);
    const [newComments, setNewComments] = useState([]);
    const [follow, setFollow] = useState(article?.author?.following || false);
    const [articleV2, setArticleV2] = useState(article);

    console.log(comments);
    useEffect(() => {
        setArticleV2(article);
    }, [article]);


    useEffect(() => {
        dispatch(getArticleDetail({ slug: `${param.titleArticle}` }))
        dispatch(getCommentOfArticle({ slug: `${param.titleArticle}` }))
    }, [dispatch, param.titleArticle])


    const handleAddComment = (newComment) => {
        setNewComments([newComment, ...newComments]);
    };


    const handleClickNavigate = () => {
        nav(`/@${article.author.username}`);

    }


    const handleFavorite = async (slug, statusFavorite) => {
        if (!jwtToken) {
            nav('/register');
        } else {
            try {
                const resultaction = await dispatch(articleV2.favorited ? deleteFavorite({ slug: `${param.titleArticle}` }) : postFavorite({ slug: `${param.titleArticle}` }));
                console.log(resultaction);
                const updatedFavoritesCount = resultaction.payload.article.favoritesCount;
                const updatedArticle = { ...articleV2, favorited: !articleV2.favorited, favoritesCount: updatedFavoritesCount };
                setArticleV2(updatedArticle);
            } catch (error) {
                console.log(error);
            } finally {

            }
        }

    }

    const handleFollow = async () => {
        if (!jwtToken) {
            nav('/register');
        }
        else {
            try {
                const resultAction = await dispatch(follow ? deleteFollow({ username: article.author.username }) : postFollow({ username: article.author.username }));
                // console.log(resultAction.payload.profile.following);
                setFollow(resultAction.payload.profile.following);
            } catch (error) {
                console.log(error);
            } finally {

            }
        }

    }

    const handleDeleteComment = async (id) => {
        console.log(id);
        let flag = false;
        try {
            await dispatch(deleteCommentOfArticle({ slug: `${param.titleArticle}`, id: `${id}` }))
            // console.log(resultAction);
            if (newComments.length > 0) {
                setNewComments(newComments.filter(comment => comment.id !== id));
            }
            else if (comments.length > 0) {
                // flag = comments.some((itemcomment, index) => itemcomment.id === id);
                // console.log(flag);
                let tmpComment = comments.filter(comment => comment.id !== id);
                console.log(tmpComment);
                dispatch(setListComment({ comments: tmpComment }));
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleDeleteArticle = async () => {
        try {
            await dispatch(deleteArticle({ slug: `${param.titleArticle}` }));
            nav('/');
            console.log('Successfull');
        } catch (error) {
            console.log('error:', error);
        }
    }

    return (
        <Default>
            {
                loadingArticleDetail ? <div style={{ height: '100vh' }}>Loading article detail...</div> :
                    (
                        articleV2 ?
                            (
                                <div className={`container-fluid `}>
                                    <div className={`row ${style.article_detail}`}>
                                        <div className={`col-2 col-md-2`}>
                                            <div className={` ${style.dynamic_reaction}`}>
                                                <div className='border-bottom'>

                                                    {
                                                        currentUser?.user?.username !== articleV2.author.username ? (
                                                            <div className={`${style.Reaction_btnReact2} p-2 d-flex justify-content-between`} title="Follow this article">
                                                                <span style={{ lineHeight: '2.7em' }} role="button" onClick={handleClickNavigate}>{article.author.username}</span><span role="button" onClick={handleFollow}><i>{follow ? <SlUserFollow /> : <SlUserFollowing />}</i></span>
                                                            </div>
                                                        ) : ''
                                                    }
                                                </div>
                                                <div className='d-flex justify-content-between'>
                                                    <div className={`${style.Reaction_btnReact2}`} title="Click to like this article">
                                                        <span role="button" onClick={() => handleFavorite(articleV2.slug, articleV2.favorited)}>
                                                            <i>{articleV2.favorited ? <IoHeartSharp /> : < FaRegHeart />}</i>
                                                            &nbsp;&nbsp;{articleV2.favoritesCount}
                                                        </span>
                                                    </div>
                                                    <div className={`${style.Reaction_btnReact2}`} title="Total comment this article">
                                                        <span role="button">
                                                            <i><FaRegComment />&nbsp;&nbsp;</i>{comments?.length + newComments?.length}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <article className='col-12 col-md-7'>
                                            <div className={`${style.featured_image}`}>
                                                <div className={`${style.post_thumbnail}`}>
                                                    <img src={ThumbnailArticleDetail} data-lazy-type="image" data-src={ThumbnailArticleDetail} alt='thumbnail_img.png' sizes="(max-width: 1200px) 100vw, 1200px" title="ui portfolios cover image"></img>
                                                </div>
                                            </div>
                                            <main className={`mt-3 ${style.post_container}`}>
                                                <div className='row'>
                                                    <header className={`col-12 col-md-12 text-center ${style.post_header}`}>
                                                        <h2 className={`${style.entry_title}`}>
                                                            {articleV2.title}
                                                        </h2>
                                                        <div className={`${style.author} d-flex mt-4`}>
                                                            <img src={article.author.image} alt='avatar.png' className={`${style.avatar_photo}`} />
                                                            <label className={`${style.post_info} pb-3`}> by <span role="button" onClick={handleClickNavigate}>{article.author.username} </span>, {displayDate(article.updatedAt)} </label>
                                                        </div>
                                                    </header>
                                                </div>
                                                <div className='row'>
                                                    <div className='col-12 col-md-12'>
                                                        <div className={`text-left ${style.article_body_detail}`}>
                                                            {parser(articleV2.body)}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='row'>
                                                    <div className='col-12 col-md-12 p-4'>
                                                        <div className={`${style.reaction_wrapper}`}>
                                                            <div className={`${style.Reaction_btnReact}`} title="Click to like this article">
                                                                <span role="button" onClick={() => handleFavorite(articleV2.slug, articleV2.favorited)}
                                                                ><i>{articleV2?.favorited ? <IoHeartSharp /> : < FaRegHeart />}</i>
                                                                    &nbsp;&nbsp;{articleV2?.favoritesCount}
                                                                </span>
                                                            </div>
                                                            <div className={`${style.Reaction_btnReact}`} title="Total comment this article">
                                                                <span role="button">
                                                                    <i><FaRegComment />&nbsp;&nbsp;</i>
                                                                    {comments?.length || 0 + newComments?.length}
                                                                </span>
                                                            </div>
                                                            {
                                                                currentUser?.user?.username !== articleV2.author.username ? (<div className={`${style.Reaction_btnReact}`} title="Follow this article">
                                                                    <span role="button" onClick={handleFollow}>
                                                                        <i>{follow ? <SlUserFollow /> : <SlUserFollowing />}</i>
                                                                    </span>
                                                                </div>) : ''

                                                            }
                                                            {
                                                                currentUser?.user?.username === articleV2.author.username ? (
                                                                    <>
                                                                        <div className={`${style.Reaction_btnReact}`} title='Edit Article'>
                                                                            <button role='button' onClick={() => nav(`/editor/${param.titleArticle}`)}>
                                                                                <i><GoPencil />&nbsp;&nbsp;</i> Edit Article
                                                                            </button>
                                                                        </div>
                                                                        <div className={`${style.Reaction_btnReact}`} title='Delete Article'>
                                                                            <button role='button' onClick={handleDeleteArticle}>
                                                                                <i><RiDeleteBin6Line />&nbsp;&nbsp;</i> Delete Article
                                                                            </button>
                                                                        </div>
                                                                    </>
                                                                ) : ''
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className='col-12 col-md-12'>
                                                        <div className='article-tag mt-4 ml-5'>
                                                            <ul className='list-tag'>
                                                                {
                                                                    articleV2.tagList.map((itemTag, index) => (
                                                                        <li className='item-tag' key={index}> #{itemTag} </li>
                                                                    ))
                                                                }
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </main>
                                            <div className='col-12 col-md-12 p-3 text-left'>
                                                {!jwtToken ? <>
                                                    <span><Link to='/login'>Sign in</Link></span> or <span><Link to='/register'>Sign up</Link></span> to add comments on this article.
                                                </> : <Commment onAddComment={handleAddComment} />}
                                            </div>
                                            <div className='col-12 col-md-12 p-3'>
                                                {
                                                    newComments.length > 0 && newComments.map((itemComment, index) => (
                                                        <CommentPreview key={index} id={itemComment.id} itemComment={itemComment} onClick={handleDeleteComment} />
                                                    ))
                                                }
                                                {
                                                    comments?.length > 0 && comments.map((itemComment, index) => (
                                                        <CommentPreview key={index} id={itemComment.id} itemComment={itemComment} onClick={handleDeleteComment} />
                                                    ))
                                                }
                                            </div>
                                        </article>
                                    </div>
                                </div>
                            ) :
                            (
                                <Loading />
                            )
                    )

            }
        </Default >
    );
};

export default ArticleDetail;