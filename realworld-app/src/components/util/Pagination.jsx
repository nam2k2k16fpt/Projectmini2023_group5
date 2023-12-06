import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import '../../styles/pagination.css'
import { usePagination, DOTS } from './usePagination';
import { Link } from 'react-router-dom';
const Pagination = (props) => {
    const { offset, totalCount, currentPage, pageSize, siblingCount = 1, onPageChange, onOffsetChange } = props

    console.log(offset,totalCount,currentPage);
    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
    });
    // console.log(paginationRange.length);


    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        onOffsetChange(offset + pageSize);
        onPageChange(currentPage + 1);

    };

    const onPrevious = () => {
        onOffsetChange(offset - pageSize);
        onPageChange(currentPage - 1);
    };

    const handleClickNumberReal = (num) => {
        // console.log(currentPage, num);
        if (currentPage > num) {
            let newoffset = (currentPage - 1) * pageSize - pageSize * (currentPage - num);
            onOffsetChange(newoffset);
        } else if (currentPage < num) {
            let newoffset = (num - 1) * pageSize;
            onOffsetChange(newoffset);
        }
        onPageChange(num);
    }

    let lastPage = paginationRange[paginationRange.length - 1];

    return (
        <div role="navigation" className='col-md-12 text-center'>
            <ul className="cd-pagination custom-buttons">
                <li
                    onClick={onPrevious}>
                    <button className='btn-pagination' disabled={currentPage === 1 ? true : false}><FaArrowLeft /></button>
                </li>
                {
                    paginationRange.map((pageNumber, index) => {
                        if (pageNumber === DOTS) {
                            return <li className="pagination-item dots" key={index}>&#8230;</li>;
                        }
                        return (
                            <li
                                onClick={() => {
                                    handleClickNumberReal(pageNumber)
                                }}
                                key={index}
                            >
                                <Link className={pageNumber === currentPage ? 'current' : ''}>{pageNumber}</Link>
                            </li>
                        )
                    })
                }
                <li onClick={onNext}>
                    <button className='btn-pagination' disabled={currentPage === lastPage ? true : false}><FaArrowRight /></button>
                </li>
            </ul>
        </div>
    );
};

export default Pagination;