import { useDispatch, useSelector } from 'react-redux';
import styles from '../styles/tag.module.css'
import { setCurrentPage, setOffset } from '../redux/articleSlice';
const TagList = ({ onSelectTag, onClickToggle }) => {
    const tagpopular = useSelector(state => state.tags.tags);
    const dispatch = useDispatch();
    const handleClickTag = (itemtag) => {
        onSelectTag(itemtag);
        onClickToggle('TAG');
        dispatch(setCurrentPage(1));
        dispatch(setOffset(0));
    }
    return (


        <div className='col-md-12 p-0'>
            <div className={`${styles.popular_tags}mt-5 text-left`}>
                <h5 className={styles.heading_tags}>Popular Tags</h5>
                <div className='px-3 pb-2'>
                    <ul className={styles.list_tags}>
                        {
                            tagpopular && tagpopular.length > 0 ? (
                                tagpopular.map((itemtag, index) => (
                                    <li
                                        className={styles.item_tag}
                                        key={index}
                                        onClick={() => handleClickTag(itemtag)}><span>{itemtag}</span></li>
                                ))
                            ) : (
                                <div>Loading Tags...</div>
                            )
                        }

                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TagList;
