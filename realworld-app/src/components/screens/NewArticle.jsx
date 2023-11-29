import React from 'react';
import NoFooter from '../layout/NoFooter';
import { Field, Formik, Form } from 'formik';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
const NewArticle = () => {
    const CustomInputComponent = ({name}) => (
        <CKEditor
            editor={ClassicEditor}
            data="<p>Write your article (in markdown)</p>"
        />
    );
    return (
        <NoFooter>
            <div className='container'>
                <div className='row'>
                    <Formik
                        initialValues={{
                            title: '',
                            description: '',
                            body: '',
                            tagList: '',
                        }}
                        onSubmit={(values) => {
                            console.log(values);
                        }}
                    >
                        <Form className='col-12 mt-5'>
                            <div className='form-group'>
                                <Field name="title" type="text" className="form-control form-control-lg" placeholder="Article Title" />
                            </div>
                            <div className='form-group'>
                                <Field name="description" type="text" className="form-control" placeholder="What's your article about?" />
                            </div>
                            <div className='form-group'>
                                <Field name="body" as={CustomInputComponent} className="form-control " />
                            </div>
                            <div className='form-group'>
                                <Field name="tagList" type="text" className="form-control form-control-sm" placeholder="Enter tags" />
                            </div>
                            <div className='form-group'>
                                <button type="submit" className='btn btn-lg d-flex float-right my-3' style={{ backgroundColor: '#1A32BA', color: "#fff" }}>Publish Article</button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </NoFooter>
    );
};

export default NewArticle;