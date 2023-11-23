import React from 'react';
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaFlickr } from "react-icons/fa";
import '../../styles/footer.css'
import { Link } from 'react-router-dom';
const Footer = () => {
    return (
        <div className='footer text-center mt-5'>
            <div className='pt-4 pb-2'>
                <h4 className='h4 intro-footer mb-0 mt-4'>Let’s get started on something great</h4>
                <p className='pharagraph'>Join us to share your knowledge and experience.</p>
            </div>
            <div className='link-network pb-3'>
                <ul className='list-group d-flex flex-row justify-content-center'>
                    <li className='item-list'>
                        <Link to="https://www.facebook.com/">
                            <FaFacebook />
                        </Link>
                    </li>
                    <li className='item-list'>
                        <Link to="https://twitter.com/home">
                            <FaSquareXTwitter />
                        </Link>
                    </li>
                    <li className='item-list'>
                        <Link to="https://www.youtube.com/">
                            <FaYoutube />
                        </Link>
                    </li>
                    <li className='item-list'>
                        <Link to="https://www.pinterest.com/">
                            <FaPinterest />
                        </Link>
                    </li>
                    <li className='item-list'>
                        <Link to="https://www.linkedin.com/">
                            <FaLinkedin />
                        </Link>
                    </li>
                    <li className='item-list'>
                        <Link to="https://www.flickr.com/">
                            <FaFlickr />
                        </Link>
                    </li>
                </ul>
            </div>
            <div className='pb-3'>
                <p className='pharagraph-end'>Knowledge Addict is a one-stop for budding content writers who loves to share their experiences with the world.
                    <br /> Copyright © Addicts community  @ 2023</p>
            </div>
        </div>
    );
};

export default Footer;