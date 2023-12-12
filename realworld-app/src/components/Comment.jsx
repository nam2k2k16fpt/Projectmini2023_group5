import React from 'react';
import { Field, Formik, Form } from "formik";
import * as Yup from 'yup';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postCommentOfArticle } from '../redux/commentSlice';

const Comment = ({ onAddComment }) => {
    const currentUser = useSelector((state) => state.user.saveUserData.currentUser);
    const dispatch = useDispatch();
    const param = useParams();
    return (
        <Formik
            initialValues={{
                body: ''
            }}
            validationSchema={
                Yup.object({
                    body: Yup.string().required('')
                })
            }
            onSubmit={(values) => {
                console.log(values);
                dispatch(postCommentOfArticle({ slug: `${param.titleArticle}`, comment: values }))
                    .then((response) => {
                        onAddComment(response.payload.comment);
                    })
                    .catch((error) => {
                        console.error('Error creating comment:', error);
                    });
            }}
        >

            {({ errors, touched }) => (
                <Form>
                    <div className='form-group'>
                        <Field name="body" as="textarea" row="6" className='form-control' placeholder="Write a comment..."/>
                    </div>
                    <div className='d-flex justify-content-between article-content__author_meta'>
                        <div className='article-author'>
                            <div className="avatar-name">
                                <Link to="/" className="">
                                    <img src='https://tse2.mm.bing.net/th?id=OIP.0Vk0miaiStLLYxMLADxyZQHaHa&pid=Api&P=0&h=220' alt='' className='img-thumbnail' style={{ width: '42px', height: '43px' }} />
                                </Link>
                            </div>
                            <div className='post-author__info'>
                                <div className=''>
                                    <Link to='/' className='link_author'>{currentUser?.user?.username}</Link>
                                </div>
                                <div className='post_date'>
                                    <span>mm-dd-yyyy</span>
                                </div>
                            </div>

                        </div>
                        <div className='form-group'>
                            <button type='submit' className='btn' style={{ backgroundColor: '#1A32BA', color: "#fff" }}>Post Comment</button>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>

    );
};

export default Comment;