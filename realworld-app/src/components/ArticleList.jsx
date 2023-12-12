import { useEffect } from "react";
import ArticlePreview from "./ArticlePreview";
import Pagination from "./util/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage, setOffset, settotalArticle} from "../redux/articleSlice";
import '../styles/article.css'
const ArticleList = ({toggle, articlesGlobal, articlesYour, loading }) => {
    const dispatch = useDispatch();
    const currentPage = useSelector(state => state.articles.currentPage);
    const totalArticle = useSelector(state => state.articles.totalArticle);
    const offset = useSelector(state => state.articles.offset);

    console.log('Article List: ',totalArticle);

    useEffect(() => {
        // console.log('articlesGlobal',articlesGlobal);
        console.log(toggle);
        if (toggle === 'YOUR') {
            dispatch(settotalArticle(articlesYour.articlesCount));
        } else if (toggle === 'GLOBAL') {
            dispatch(settotalArticle(articlesGlobal.articlesCount));
        } else if (toggle === 'TAG') {
            dispatch(settotalArticle(articlesGlobal.articlesCount));
        }
    }, [articlesGlobal, articlesYour, toggle, dispatch])


    return (
        <div className="row">
            {
                toggle === 'YOUR' && !loading ?
                    (
                        <>
                            {
                                     articlesYour?.articles?.length > 0 ?
                                    (
                                        <>
                                            {
                                                articlesYour.articles.map((itemArticle, index) => (
                                                    <ArticlePreview key={index} itemArticle={itemArticle} />
                                                ))
                                            }
                                            {
                                                !loading ? (
                                                    <Pagination
                                                        offset={offset}
                                                        totalCount={totalArticle}
                                                        currentPage={currentPage}
                                                        pageSize={10}
                                                        onPageChange={(page) => dispatch(setCurrentPage(page))}
                                                        onOffsetChange={(off) => dispatch(setOffset(off))}
                                                    />
                                                )
                                                    :
                                                    (<div>Loading Article...</div>)
                                            }
                                        </>

                                    )
                                    :
                                    (<div>No articles are here... yet.</div>)

                            }
                        </>
                    )
                    :
                    (
                        <>
                            {
                                articlesGlobal && articlesGlobal?.articles?.length > 0 ?
                                    (
                                        <>
                                            {
                                                articlesGlobal.articles.map((itemArticle, index) => (
                                                    <ArticlePreview key={index} itemArticle={itemArticle} toggle={toggle} />
                                                ))
                                            }
                                            {
                                                !loading ? (
                                                    <Pagination
                                                        offset={offset}
                                                        totalCount={totalArticle}
                                                        currentPage={currentPage}
                                                        pageSize={10}
                                                        onPageChange={(page) => dispatch(setCurrentPage(page))}
                                                        onOffsetChange={(off) => dispatch(setOffset(off))}
                                                    />
                                                )
                                                    :
                                                    (<div>Loading Article...</div>)
                                            }
                                        </>
                                    )
                                    :
                                    (<div>Loading Article...</div>)
                            }
                        </>
                    )
            }


        </div>
    )
};
export default ArticleList;