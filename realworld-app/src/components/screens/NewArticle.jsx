import NoFooter from '../layout/NoFooter';
import { Field, Formik, Form, ErrorMessage } from 'formik';
import TipTap from '../TipTap';
import { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOwnArticle, postNewArticle, updateArticle } from '../../redux/articleSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { getArticleDetail } from '../../redux/articleDetailSlice';
import '../../styles/newArticle.css'


const NewArticle = ({ type }) => {
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef(null);
    const userData = useSelector((state) => state.user.saveUserData.currentUser);
    const { article } = useSelector((state) => state.article_detail.articleDetail);
    const [tags, setTags] = useState(type === 'NEW' ? [] : (article?.tagList === undefined ? [] : article?.tagList));
    const dispatch = useDispatch();
    const nav = useNavigate();
    const param = useParams();

    function validateDescription(value) {
        console.log(value);
        let error;
        if (!value) {
            error = '* Required description not blank';
        }
        return error;
    }


    async function validateTitle(value) {
        // console.log(value);
        let error;
        let flag = false;
        if (!value) {
            error = '* Required title not blank';
            // } else {
            //     await dispatch(getOwnArticle({ username: userData?.user?.username }))
            //         .then((response) => {
            //             if (type === 'UPDATE') {
            //                 const currentArticleTitle = article?.title || ''; 

            //                 if (value !== currentArticleTitle) {
            //                     flag = response.payload.articles.some((article, index) => article.title === value);
            //                 }
            //             } else {
            //                 flag = response.payload.articles.some((article, index) => article.title === value);
            //             }
            //         })
            //         .catch((error) => {
            //             console.error('Error', error);
            //         });

            //     console.log(flag);
            //     flag && (error = '* Title must be unique')
            // }
            return error;
        }
    }


    function validateBody(value) {
        // console.log(value)
        let error;
        if (value === '<p></p>') {
            error = '* Required body not blank';
            console.log(1);
        }
        else if (!value) {
            error = '* Required body not blank';
        }
        return error;
    }

    const handleKeyDown = (event) => {
        // console.log(inputRef);
        if (event.key === 'Enter') {
            event.preventDefault();
            // console.log(inputRef.current.value);
            const value = inputValue.trim();
            setTags([...tags, value]);
            setInputValue('');
        }
    };

    const handleRemoveTag = (indexToRemove) => {
        const updatedTags = tags.filter((_, index) => index !== indexToRemove);
        setTags(updatedTags);
    };


    useEffect(() => {
        // console.log('Execute use effect');
        if (type === 'UPDATE') {
            dispatch(getArticleDetail({ slug: `${param.slug}` }))
        }

    }, [dispatch, param.slug])

    if (type === 'UPDATE' && article === undefined) {
        return;
    }

    return (
        <NoFooter>
            <div className='container' style={{ minHeight: '42.9em' }}>
                <div className='row'>
                    <Formik
                        initialValues={
                            type === 'NEW' ?
                                ({
                                    title: '',
                                    description: '',
                                    body: '',
                                })
                                :
                                ({
                                    title: `${article?.title}`,
                                    description: `${article?.description}`,
                                    body: `${article?.body}`,
                                })
                        }
                        onSubmit={async (values) => {
                            if (type === 'NEW') {
                                // console.log(tags);
                                await dispatch(postNewArticle({ ...values, tagList: [...tags] }))
                                    .then(res => {
                                        nav(`/article/${res.payload.article.slug}`);
                                    })
                                    .catch(error => {
                                        console.log('Error: ', error);
                                    })
                            } else {
                                // console.log(tags);
                                let article = { ...values, tagList: [...tags] };
                                await dispatch(updateArticle({ article: article, slug: `${param.slug}` }))
                                    .then(res => {
                                        // console.log(res);
                                        nav(`/article/${res.payload.article.slug}`);
                                    })
                                    .catch(error => {
                                        console.log('Error:', error);
                                    })
                            }
                        }}
                    >
                        {({ errors, touched, isValidating, values }) => (
                            <Form className='col-12 mt-5'>
                                <div className='form-group'>
                                    <Field name="title" type="text" validate={validateTitle} className={`form-control form-control-lg ${errors.title && touched.title ? 'border-danger' : ''}`} placeholder="Article Title" values={values.title} />
                                    <span className='error-message'><ErrorMessage name="title" /></span>
                                </div>
                                <div className='form-group'>
                                    <Field name="description" type="text" validate={validateDescription} className={`form-control ${errors.description && touched.description ? 'border-danger' : ''}`} placeholder="What's your article about?" values={values.description} />
                                    <span className='error-message'><ErrorMessage name="description" /></span>
                                </div>
                                <div className='form-group'>
                                    <Field name="body" validate={validateBody}>
                                        {({ field, form, meta, helpers }) => (
                                            <>
                                                <TipTap
                                                    data={field.value}
                                                    onChange={(content) => {
                                                        form.setFieldValue('body', content);
                                                    }}
                                                />
                                            </>
                                        )}
                                    </Field>
                                    <span className='error-message'><ErrorMessage name="body" /></span>
                                </div>
                                <div className='form-group'>
                                    <input
                                        type="text"
                                        value={inputValue}
                                        ref={inputRef}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        className="form-control"
                                        placeholder="Type your hashtag & click enter"
                                    />
                                    <div id="hashList" className="hash-list">
                                        {
                                            tags && tags?.length > 0 && tags.map((tag, index) => (
                                                <span key={index} className='tag hash-tag'>
                                                    #{tag}
                                                    <input type="hidden" name="hashMin" value="#" />
                                                    <span className="remove-tag" onClick={() => handleRemoveTag(index)}>x</span>
                                                </span>
                                            ))
                                        }
                                    </div>

                                </div>
                                <div className='form-group'>
                                    <button type="submit" className='btn btn-lg d-flex float-right my-3' style={{ backgroundColor: '#1A32BA', color: "#fff" }}>Publish Article</button>
                                </div>
                            </Form>
                        )
                        }
                    </Formik>
                </div>
            </div>
        </NoFooter>
    );
};

export default NewArticle;