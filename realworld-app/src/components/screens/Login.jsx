import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import NoFooter from '../layout/NoFooter';
import '../../styles/login.css'
import { useDispatch } from 'react-redux';
import { loginFailed, loginStart, loginSuccess } from '../../redux/authSlice';
const Login = () => {
    const nav = useNavigate();
    const dispatch = useDispatch();

    return (
        <NoFooter>
            <div className='signin container-fluid'>
                <div className='row container-signin' style={{ margin: "0 auto" }}>
                    <div className='col-12 text-center mb-4'>
                        <h2 className='heading-signin'>Sign in</h2>
                        <Link to="/register">Need an account?</Link>
                    </div>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validationSchema={Yup.object({
                            email: Yup.string().email('* Invalid email address').required('* Required'),
                            password: Yup.string()
                                .required('* Required')
                        })}
                        onSubmit={(values, { setSubmitting, setErrors }) => {
                            dispatch(loginStart());
                            axios.post('https://api.realworld.io/api/users/login', {
                                user: {
                                    email: values.email,
                                    password: values.password
                                }
                            })
                                .then((response) => {
                                    dispatch(loginSuccess(response.data));
                                    nav('/');

                                })
                                .catch((error) => {
                                    console.error(error);
                                    if (error.response) {
                                        dispatch(loginFailed());
                                        setErrors({
                                            email: 'Incorrect email or password',
                                            password: 'Incorrect email or password'

                                        });
                                    }
                                })
                                .finally(() => {
                                    setSubmitting(false);
                                });
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form className='col-12'>
                                <div className='form-group'>
<Field name="email" type="email" placeholder='Email' className={`form-control  ${errors.email && touched.email ? 'border-danger' : ''}`} />
                                    <span className='error-message'><ErrorMessage name="email" /></span>
                                </div>
                                <div className='form-group'>
                                    <Field name="password" type="password" placeholder='Password' className={`form-control ${errors.password && touched.password ? 'border-danger' : ''}`} />
                                    <span className='error-message'><ErrorMessage name="password" /></span>
                                </div>
                                <button type="submit" className='btn btn-lg d-flex float-right my-3' style={{ backgroundColor: '#1A32BA', color: "#fff" }}>Sign in</button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </NoFooter>
    );
};

export default Login;