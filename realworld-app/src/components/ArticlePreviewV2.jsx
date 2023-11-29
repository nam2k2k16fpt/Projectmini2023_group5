import React from 'react';
import ThumbnailImg from '../image/thumbnail2.png'
import { CiHeart } from "react-icons/ci";
import { Link } from 'react-router-dom';
import '../styles/articleV2.css'
const ArticlePreviewV2 = () => {
    return (
        <div className='row mt-5 mx-auto articlePreviewV2'>
            <div className='col-12 col-md-5 px-0'>
                <div className='article-content-left'>
                    <div className='article-mmeta'>
                        <div className='heart-article'>
                            <span style={{ fontSize: "1.4em" }}><CiHeart />&nbsp;</span>
                            <span>2000</span>
                        </div>
                    </div>
                    <div className='title-heading mt-4 text-left'>
                        <h3>If we quantify the alarm, we can get to the FTP pixel through the online SSL interface!</h3>
                    </div>
                    <div className='article-tag mt-4'>
                        <ul className='list-tag'>
                            <li className='item-tag'> #tag1 </li>
                            <li className='item-tag'> #tag2 </li>
                            <li className='item-tag'> #tag3 </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='col-12 col-md-7 px-0'>
                <div className='article-content-right'>
                    <div className='description-article position-relative'>
                        <img src={ThumbnailImg} alt='thumbnail.png' style={{ width: '100%' }} />
                        <div className="ccontent_description">
                            <div className='aarticle-author'>
                                <div className="avatar-name ml-2">
                                    <Link to="/" className="">
                                        <img src='https://beebom.com/wp-content/uploads/2020/11/how-to-create-reddit-avatar-feat..jpg?w=750&quality=75' alt='' className='img-thumbnail' style={{ width: '42px', height: '43px' }} />
                                    </Link>
                                </div>
                                <div className='post-author__info'>
                                    <div className=''>
                                        <Link to="/" className='link_author'>NamNH22</Link>
                                    </div>
                                    <div className='post_date'>
                                        <span>December 9, 2022</span>
                                    </div>
                                </div>

                            </div>
                            <div style={{ marginTop: '8em' }}>
                                <p className="text-right" style={{ color: '#B7C7DB' }}>
                                    Omnis perspiciatis qui quia commodi sequi modi.
                                    Nostrum quam aut cupiditate est facere omnis possimus. Tenetur similique nemo illo soluta molestias facere quo. Ipsam totam facilis delectus nihil quidem soluta vel est omnis.
                                </p>
                            </div>
                            <div className='d-inline-block'>
                                <p className='read-more'>Read more ...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArticlePreviewV2;
