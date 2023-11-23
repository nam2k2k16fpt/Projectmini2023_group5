import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import '../../styles/login.css'
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import NoFooter from '../layout/NoFooter';
import { useDispatch } from 'react-redux';
import { registerFailed, registerStart, registerSuccess } from '../../redux/authSlice';
import axios from 'axios';

const Register = () => {
    const dispatch = useDispatch();
    const nav = useNavigate();
    return (
        <NoFooter>
            <div className='signin container-fluid'>
                <div className='row container-signin' style={{ margin: "0 auto" }}>
                    <div className='col-12 text-center mb-4'>
                        <h2 className='heading-signin'>Sign up</h2>
                        <Link to="/login">Have an account?</Link>
                    </div>
                    <Formik
                        initialValues={{ usename: '', email: '', password: '' }}
                        validationSchema={Yup.object({
                            usename: Yup.string()
                                .required('* Required'),
                            email: Yup.string().email('* Invalid email address').required('* Required'),
                            password: Yup.string()
                                .required('* Required')
                        })}
                        onSubmit={(values, { setSubmitting, setErrors }) => {
                            dispatch(registerStart());
                            axios.post('https://api.realworld.io/api/users', {
                                user: {
                                    username: values.usename,
                                    email: values.email,
                                    password: values.password
                                }
                            })
                                .then((res) => {
                                    dispatch(registerSuccess());
                                    nav('/login');
                                })
                                .catch((error) => {
                                    console.log(error);
                                    if (error.response) {
                                        dispatch(registerFailed());
                                        setErrors({
                                            usename: 'Username has already been taken',
                                            email: 'Email has already been taken'
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
                                    <Field name="usename" type="text" placeholder='Usename' className={`form-control  ${errors.usename && touched.usename ? 'border-danger' : ''}`} />
                                    <span className='error-message'><ErrorMessage name="usename" /></span>
                                </div>
                                <div className='form-group'>
                                    <Field name="email" type="email" placeholder='Email' className={`form-control  ${errors.email && touched.email ? 'border-danger' : ''}`} />
                                    <span className='error-message'><ErrorMessage name="email" /></span>
                                </div>
                                <div className='form-group'>
                                    <Field name="password" type="password" placeholder='Password' className={`form-control ${errors.password && touched.password ? 'border-danger' : ''}`} />
                                    <span className='error-message'><ErrorMessage name="password" /></span>
                                </div>
                                <button type="submit" className='btn btn-lg d-flex float-right my-3' style={{ backgroundColor: '#1A32BA', color: "#fff" }}>Sign up</button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </NoFooter>
    );
};

export default Register;