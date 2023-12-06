import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import NoFooter from '../layout/NoFooter';
import '../../styles/profile.css'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import MyArticle from '../MyArticle';
import { resetOption } from '../../redux/articleSlice';
import { deleteFollow, postFollow } from '../../redux/followSlice';

const Profile = () => {
    const dispatch = useDispatch();
    const nav = useNavigate();
    const { profile } = useSelector(state => state.profile.profile);
    const currentUser = useSelector((state) => state.user.saveUserData.currentUser);
    const [follow, setFollow] = useState(profile?.following || false);
    const jwtToken = useSelector(state => state.auth.login.jwtToken);
    const [toggle, setToggle] = useState(true);
    // console.log(profile);

    const handleClickNavigate = () => {
        setToggle(!toggle);
        dispatch(resetOption({ resetPage: 1, resetOffset: 0, resetTag: '', resetTotal: 0 }))
    }

    const handleFollow = async () => {
        if (!jwtToken) {
            nav('/register');
        } else {
            try {
                const resultAction = await dispatch(follow ? deleteFollow({ username: profile.username }) : postFollow({ username: profile.username }));
                console.log(resultAction.payload.profile.following);
                setFollow(resultAction.payload.profile.following);
            } catch (error) {
                console.log(error);
            } finally {

            }
        }
    }

    return (
        <NoFooter>
            <div className="row py-2">
                <div className="col-md-12 mx-auto">
                    {/* <!-- Profile widget --> */}
                    <div className="overflow-hidden">
                        <div className="px-4 pt-0 pb-4 cover">
                            <div className="media align-items-end profile-head row">
                                <div className="profile mr-3">
                                    <img src={profile.image} alt="..." width="130" className="rounded mb-2 img-thumbnailll" />
                                    {currentUser?.user?.username === profile?.username ? <Link to="/settings" className="btn btn-outline-dark btn-sm btn-block">Edit profile</Link>
                                        : <div> <button className='btn btn-outline-dark btn-sm btn-block' onClick={handleFollow}><span>➕{' '}{follow ? 'Unfollow' : 'Follow'}{' '}{profile.username}</span></button></div>
                                    }
                                </div>
                                <div className="media-body mb-5" style={{ color: '#F8F5EE' }}>
                                    <h4 className="mt-0 mb-0 py-3">{profile.username}</h4>
                                </div>
                            </div>
                        </div>
                        <div className="px-4 py-3" style={{ color: "#1A32BA" }}>
                            <h5 className="mb-0">About</h5>
                            <div className="p-4">
                                <p className="font-italic mb-0">{profile.bio || 'null'}</p>
                            </div>
                        </div>
                        <div className="px-4">
                            <div className="feed-toggle">
                                <ul className='nav-optionArticle p-0 mb-0'>
                                    <li className={toggle ? 'nav-item active' : 'nav-item'} onClick={handleClickNavigate}>
                                        <Link to={`/@${profile.username}`}>My Articles</Link>
                                    </li>
                                    <li className={toggle ? 'nav-item' : 'nav-item active'} onClick={handleClickNavigate}>
                                        <Link to='favorites'>Favorited Articles</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-md-12 mx-auto'>
                    {
                        toggle ?
                            <MyArticle profile={profile} /> : <Outlet />
                    }
                </div>
            </div>
        </NoFooter>
    );
};

export default Profile;