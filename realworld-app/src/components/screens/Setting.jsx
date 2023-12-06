import React from 'react';
import '../../styles/setting.css'
import NoFooter from '../layout/NoFooter';
import { Field, Formik, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { updateUserInfo, updateUserInfoFailed, updateUserInfoStart } from '../../redux/userSlice';
import { updateToken } from '../../redux/authSlice';
import { persistor } from '../../redux/store';
import { getGlobalFeed } from '../../redux/articleSlice';
const Setting = () => {
    const currentUser = useSelector((state) => state.user.saveUserData.currentUser);
    const jwtToken = useSelector((state) => state.auth.login.jwtToken);
    const dispatch = useDispatch();
    const nav = useNavigate();
    const handleClick = () => {
        dispatch(updateUserInfo(null));
        persistor.purge();
        dispatch(getGlobalFeed());
        window.location.reload();
    }
    console.log(currentUser);



    return (
        <NoFooter>
            <div className='container' style={{ maxWidth: '548px' }}>
                <div className='row'>
                    <div className='col-md-12 col-12'>
                        <h3 className='heading-setting mt-4'>Your Settings</h3>
                    </div>
                </div>
                <div className='row'>
                    {
                        currentUser && currentUser.user && (
                            <Formik
                                initialValues={{
                                    image: `${currentUser.user.image}`,
                                    username: `${currentUser.user.username}`,
                                    bio: `${currentUser.user.bio}`,
                                    email: `${currentUser.user.email}`,
                                    password: ''
                                }}
                                onSubmit={(values) => {
                                    console.log(values);
                                    dispatch(updateUserInfoStart());
                                    axios.put('https://api.realworld.io/api/user', {
                                        user: {
                                            ...values,
                                        }
                                    }, {
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'Authorization': `Bearer ${jwtToken}`
                                        }
                                    })
                                        .then((response) => {
                                            dispatch(updateUserInfo(response.data));
                                            dispatch(updateToken(response.data.user.token));
                                            nav(`/@${response.data.user.username}`);
                                        })
                                        .catch((error) => {
                                            console.log(error);
                                            dispatch(updateUserInfoFailed());
                                        });
                                }}

                            >
                                {({ values }) => (
                                    <Form className='col-12'>
                                        <div className='form-group'>
                                            <Field name="image" type="text" className="form-control form-control-sm" value={values.image} />
                                        </div>
                                        <div className='form-group'>
                                            <Field name="username" type="text" className="form-control form-control-lg" value={values.username} />
                                        </div>
                                        <div className='form-group'>
                                            <Field name="bio" as="textarea" rows="7" className="form-control " value={values.bio !== "null" ? values.bio : ''} />
                                        </div>
                                        <div className='form-group'>
                                            <Field name="email" type="email" className="form-control form-control-lg" value={values.email} />
                                        </div>
                                        <div className='form-group'>
                                            <Field name="password" type="password" className="form-control form-control-lg" placeholder="New Password" />
                                        </div>
                                        <div className='form-group border-bottom overflow-auto'>
                                            <button type="submit" className='btn btn-lg d-flex float-right my-3' style={{ backgroundColor: '#1A32BA', color: "#fff" }}>Update Settings</button>
                                        </div>
                                    </Form>
                                )
                                }
                            </Formik>
                        )
                    }
                </div>
                <div className='row'>
                    <button type="button" className="btn btn-outline-danger" onClick={handleClick}>Or click here to logout</button>
                </div>
            </div>
        </NoFooter>
    );
};

export default Setting;