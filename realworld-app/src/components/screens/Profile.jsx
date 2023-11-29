import React from 'react';
import { Link } from 'react-router-dom';
import NoFooter from '../layout/NoFooter';
import '../../styles/profile.css'
import { useSelector } from 'react-redux';
import ArticlePreviewV2 from '../ArticlePreviewV2';
const Profile = () => {
    const { user } = useSelector((state) => state.user.saveUserData.currentUser);
    return (
        <NoFooter>
            <div className="row py-2">
                <div className="col-md-12 mx-auto">
                    {/* <!-- Profile widget --> */}
                    <div className="overflow-hidden">
                        <div className="px-4 pt-0 pb-4 cover">
                            <div className="media align-items-end profile-head">
                                <div className="profile mr-3">
                                    <img src={user.image} alt="..." width="130" className="rounded mb-2 img-thumbnailll" />
                                    <Link to="/settings" className="btn btn-outline-dark btn-sm btn-block">Edit profile</Link>
                                </div>
                                <div className="media-body mb-5" style={{ color: '#F8F5EE' }}>
                                    <h4 className="mt-0 mb-0 py-3">{user.username}</h4>
                                </div>
                            </div>
                        </div>
                        <div className="px-4 py-3" style={{ color: "#1A32BA" }}>
                            <h5 className="mb-0">About</h5>
                            <div className="p-4">
                                <p className="font-italic mb-0">Null</p>
                            </div>
                        </div>
                        <div className="px-4">
                            <div className="feed-toggle">
                                <ul className='nav-optionArticle p-0 mb-0'>
                                    <li className='nav-item active'>
                                        <Link className="">My Articles</Link>
                                    </li>
                                    <li className='nav-item'>
                                        <Link className="">Favorited Articles</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-md-12 mx-auto'>
                    <ArticlePreviewV2 />
                    <ArticlePreviewV2 />
                    <ArticlePreviewV2 />
                </div>
            </div>
        </NoFooter>
    );
};

export default Profile;