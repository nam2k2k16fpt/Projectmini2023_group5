import React from 'react';
import { Link } from 'react-router-dom';
import { CiTrash } from "react-icons/ci";
import { useSelector } from 'react-redux';
const CommentPreview = ({ itemComment, id, onClick }) => {
    const userData = useSelector((state) => state.user.saveUserData.currentUser);

    return (
        <div>
            <div className='form-group'>
                <input name="body" type="textarea" row="6" className='form-control' value={itemComment.body} disabled />
            </div>
            <div className='d-flex justify-content-between article-content__author_meta' style={{ fontSize: '0.8rem', fontWeight: '300' }}>
                <div className='article-author'>
                    <div className="avatar-name">
                        <Link to="/" className="">
                            <img src={itemComment.author.image} alt='avatar.png' className='img-thumbnail' style={{ width: '29px', height: '31px' }} />
                        </Link>
                    </div>
                    <div className='post-author__info'>
                        <div className=''>
                            <Link to='/' className='link_author'>{itemComment.author.username}</Link>
                        </div>
                        <div className='post_date'>
                            <span>{itemComment.updatedAt}</span>
                        </div>
                    </div>

                </div>
                {
                    userData?.user?.username === itemComment.author.username ? (
                        <div className='form-group'>
                            <button className='btn btn-outline-primary btn-sm' onClick={() => onClick(id)}><CiTrash /></button>
                        </div>
                    ) : ''
                }

            </div>
        </div>

    );
};

export default CommentPreview;