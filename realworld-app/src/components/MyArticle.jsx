import React from 'react';
import ArticlePreviewV2 from './ArticlePreviewV2';
import { useDispatch, useSelector } from 'react-redux';
import { getOwnArticle, setCurrentPage, setOffset } from '../redux/articleSlice';
import { useEffect } from 'react';
import Pagination from './util/Pagination';


const MyArticle = ({ profile }) => {
    const dispatch = useDispatch();
    const listOwnArticle = useSelector((state) => state.articles.OwnArticle);
    const currentPage = useSelector(state => state.articles.currentPage);
    const totalArticle = useSelector(state => state.articles.totalArticle);
    const offset = useSelector(state => state.articles.offset);
    const loadingOwnArticle = useSelector(state => state.articles.loadingOwnArticle);
    // console.log('profile: ', currentPage, totalArticle, offset);
    // console.log('listOwnArticle: ', listOwnArticle);


    useEffect(() => {
        dispatch(getOwnArticle({ offset: offset, limit: 5, username: profile.username }))
        // dispatch(getOwnFavoriteArticle({ offset: 0, limit: 5, username: profile.username }))
    }, [profile,offset, dispatch]);

    return (
        <div>
            {
                loadingOwnArticle ? <div>Loading articles...</div> :
                    (
                        listOwnArticle && listOwnArticle?.articles?.length > 0 ?
                            (<>
                                {
                                    listOwnArticle.articles.map((itemArticle, index) => (
                                        <ArticlePreviewV2 key={index} itemArticle={itemArticle} />
                                    ))
                                }
                                {
                                    loadingOwnArticle ? <div>Loading articles...</div> :
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

export default MyArticle;
