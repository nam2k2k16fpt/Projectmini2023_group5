import { useEffect } from "react";
import ArticlePreview from "./ArticlePreview";
import Pagination from "./util/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage, setOffset, setTotalPage } from "../redux/articleSlice";
import '../styles/article.css'
const ArticleList = ({ limit, toggle, articlesGlobal, articlesYour, loading }) => {

    const dispatch = useDispatch();
    const currentPage = useSelector(state => state.articles.currentPage);
    const totalPage = useSelector(state => state.articles.totalPage);
    const offset = useSelector(state => state.articles.offset);
    


    //check xem là loại toggle gì, và nếu user chọn bất kì tag nào nó sẽ tính lại số bài, hay khi nó bị thay đổi toggle
    useEffect(() => {
        // console.log('articlesGlobal',articlesGlobal);
        console.log(toggle);
        if (toggle === 'YOUR') {
            dispatch(setTotalPage(articlesYour.articlesCount));
        } else if (toggle === 'GLOBAL') {
            dispatch(setTotalPage(articlesGlobal.articlesCount));
        } else if(toggle === 'TAG'){
            dispatch(setTotalPage(articlesGlobal.articlesCount));
        }
    }, [articlesGlobal, articlesYour,toggle])


    return (
        <div className="row">
            {
                toggle === 'YOUR' && articlesYour && articlesYour?.articles?.length > 0 ? (
                    <>
                        {
                            articlesYour.articles.map((itemArticle, index) => (
                                <ArticlePreview key={index} itemArticle={itemArticle}/>
                            ))

                        }
                        {
                            !loading ? (
                                <Pagination
                                    offset={offset}
                                    totalCount={totalPage}
                                    currentPage={currentPage}
                                    pageSize={limit}
                                    onPageChange={(page) => dispatch(setCurrentPage(page))}
                                    onOffsetChange={(off) => dispatch(setOffset(off))}
                                />
                            )
                                :
                                (<div>Loading Article...</div>)
                        }
                    </>
                ) : (

                    articlesGlobal && articlesGlobal?.articles?.length > 0 ? (
                        <>
                            {
                                articlesGlobal.articles.map((itemArticle, index) => (
                                    <ArticlePreview key={index} itemArticle={itemArticle} toggle={toggle}/>
                                ))

                            }
                            {
                                !loading ? (
                                    <Pagination
                                        offset={offset}
                                        totalCount={totalPage}
                                        currentPage={currentPage}
                                        pageSize={limit}
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

                        (
                            <div>Loading Article...</div>
                        )

                )
            }
        </div>
    )
};
export default ArticleList;