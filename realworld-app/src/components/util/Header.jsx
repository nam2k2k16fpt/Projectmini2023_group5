import React, { useState } from 'react';
import logo from '../../image/logo.jpg'
import { Link, NavLink } from 'react-router-dom';
import { RxHamburgerMenu } from "react-icons/rx";
import { RiMenu5Line } from "react-icons/ri";
import { VscNewFile } from "react-icons/vsc";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import '../../styles/header.css'
import { useSelector } from 'react-redux';
const Header = () => {
    const [statec, setstatec] = useState(false);
    const currentUser = useSelector((state) => state.user.saveUserData.currentUser);
    console.log('start');
    
    return (
        <>
            <nav>
                <Link className="navbar-brand d-flex" to="/">
                    <img src={logo} width="30" height="30" className="d-inline-block align-top rounded-circle" style={{ filter: "invert(1)" }} alt="" />{'  '}
                    <span className='name_page font-weight-bold'>&nbsp; KNOWLEDGE ADDICT</span>
                </Link>

                <div>
                    <ul id='navbar' className={statec ? "#navbar active mb-1" : "#navbar mb-1"}>
                        {
                             currentUser && currentUser.user ?
                                (
                                    <>
                                        <li className="">
                                            <NavLink className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} to="/">Home</NavLink>
                                        </li>
                                        <li className="">
                                            <NavLink className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} to="/editor"> <i><VscNewFile /></i>&nbsp;&nbsp;New&nbsp;Article</NavLink>
                                        </li>
                                        <li className="">
                                            <NavLink className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} to="/settings"><i><HiOutlineWrenchScrewdriver /></i>&nbsp;&nbsp;Settings</NavLink>
                                        </li>
                                        <li className="">
                                            <NavLink className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} to={`/@${currentUser?.user?.username}`}><img className='img-avatar' src={currentUser?.user?.image} alt='img_ava.png' />&nbsp;&nbsp;{currentUser?.user?.username}</NavLink>
                                        </li>
                                        <li className="">
                                            <NavLink className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} to="/aboutus">Contact</NavLink>
                                        </li>
                                    </>
                                )
                                :
                                (
                                    <>
                                        <li className="">
                                            <NavLink className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} to="/">Home</NavLink>
                                        </li>
                                        <li className="">
                                            <NavLink className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} to="/login">Sign&nbsp;in</NavLink>
                                        </li>
                                        <li className="">
                                            <NavLink className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} to="/register">Sign&nbsp;up</NavLink>
                                        </li>
                                        <li className="">
                                            <NavLink className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} to="/aboutus">Contact</NavLink>
                                        </li>
                                    </>
                                )
                        }
                    </ul>
                </div>
                <div id='mobile' onClick={() => setstatec(!statec)}>
                    <i>
                        {
                            statec ? <RiMenu5Line /> : <RxHamburgerMenu />
                        }
                    </i>


                </div>
            </nav>
        </>
    );
};

export default Header;