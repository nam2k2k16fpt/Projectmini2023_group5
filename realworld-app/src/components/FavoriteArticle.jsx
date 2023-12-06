import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOwnFavoriteArticle, setCurrentPage, setOffset } from '../redux/articleSlice';
import { useEffect } from 'react';
import ArticlePreviewV2 from './ArticlePreviewV2';
import Pagination from './util/Pagination';

const FavoriteArticle = () => {
    const dispatch = useDispatch();
    const { profile } = useSelector(state => state.profile.profile);
    const listOwnFavoriteArticle = useSelector((state) => state.articles.OwnFavoriteArticle);
    const currentPage = useSelector(state => state.articles.currentPage);
    const totalArticle = useSelector(state => state.articles.totalArticle);
    const offset = useSelector(state => state.articles.offset);
    const loadingFavoriteAricle = useSelector(state => state.articles.loadingFavoriteArticle);
    // console.log('profile: ', currentPage, totalArticle, offset);
    console.log('listOwnFavoriteArticle: ', listOwnFavoriteArticle);

    useEffect(() => {
        dispatch(getOwnFavoriteArticle({ offset: 0, limit: 5, username: profile.username }))
    }, [profile, offset, dispatch]);

    return (
        <div>
              {
                loadingFavoriteAricle ? <div>Loading articles...</div> :
                    (
                        listOwnFavoriteArticle && listOwnFavoriteArticle?.articles?.length > 0 ?
                            (<>
                                {
                                    listOwnFavoriteArticle.articles.map((itemArticle, index) => (
                                        <ArticlePreviewV2 key={index} itemArticle={itemArticle} />
                                    ))
                                }
                                {
                                    loadingFavoriteAricle ? <div>Loading articles...</div> :
                                        (
                                            <Pagination
                                                offset={offset}
                                                totalCount={totalArticle}
                                                currentPage={currentPage}
                                                pageSize={5}
                                                onPageChange={(page) => dispatch(setCurrentPage(page))}
                                                onOffsetChange={(off) => dispatch(setOffset(off))}
                                            />
                                        )
                                }
                            </>)
                            :
                            (<div>No articles are here... yet.</div>)
                    )

            }
        </div>
    );
};

export default FavoriteArticle;