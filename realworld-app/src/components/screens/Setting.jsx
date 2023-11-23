import React from 'react';
import '../../styles/setting.css'
import NoFooter from '../layout/NoFooter';
import { Field, Formik } from 'formik';
import { Form } from 'react-router-dom';
const Setting = () => {
    return (
        <NoFooter>
            {/* <div className='container'>
                <div className='row'>
                    <div className='col-md-12 col-12'>
                        <h4 className='heading-setting'>Your Settings</h4>
                    </div>
                </div>
                <Formik
                 onSubmit={(values, { setSubmitting, setErrors }) => {
                    console.log(values);
                 }}
                >
                    <Form className='col-12'>
                        <div className='row form-group'>
                            <div className='col-md-12 col-12'>
                                <Field name="img_url" type="text" className={`form-control`} />
                            </div>
                        </div>
                        <div className='row form-group'>
                            <div className='col-md-12 col-12'>
                                <Field name="username" type="text" className={`form-control`} />
                            </div>
                        </div>
                        <div className='row form-group'>
                            <div className='col-md-12 col-12'>
                                <Field name="username" type="text" className={`form-control`} />
                            </div>
                        </div>
                        <div className='row form-group'>
                            <div className='col-md-12 col-12'>
                                <Field name="email" type="email" className={`form-control`} />
                            </div>
                        </div>
                        <div className='row form-group'>
                            <div className='col-md-12 col-12'>
                                <Field name="npassword" type="password" className={`form-control`} />
                            </div>
                        </div>
                        <div className='row form-group border-bottom'>
                            <div className='col-md-6 col-6'>
                            <button type="submit" className='btn btn-lg d-flex float-right my-3' style={{ backgroundColor: '#1A32BA', color: "#fff" }}>Update Settings</button>
                            </div>
                        </div>
                    </Form>
                </Formik>
                <div className='row'>
                    <div className='col-md-6 col-6'></div>
                </div>
            </div> */}
        </NoFooter>
    );
};

export default Setting;