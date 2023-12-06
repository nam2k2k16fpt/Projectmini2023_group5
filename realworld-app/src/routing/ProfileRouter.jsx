import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import axios from 'axios';
import Profile from '../components/screens/Profile';
import Loading from '../components/util/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { setProfileCurrent } from '../redux/profileSlice';
import { resetOption } from '../redux/articleSlice';

const ProfileRouter = () => {
    const [isUsernameValid, setIsUsernameValid] = useState(null);
    const { username } = useParams();
    const [initialRender, setInitialRender] = useState(true);
    const jwtToken = useSelector((state) => state.auth.login.jwtToken);
    const dispatch = useDispatch();

    useEffect(() => {
        if (initialRender) {
            setInitialRender(false);
            return;
        }

        const checkUsernameExistence = async () => {

            if (username.includes('@')) {
                try {
                    const config = {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    }
                    if (jwtToken) {
                        config.headers['Authorization'] = `Bearer ${jwtToken}`;
                    }
                    const response = await axios.get(`https://api.realworld.io/api/profiles/${username.split('@')[1]}`, config);
                    if (response.status === 200) {
                        console.log(response.data);
                        dispatch(setProfileCurrent(response.data));
                        dispatch(resetOption({ resetPage: 1, resetOffset: 0, resetTag: '', resetTotal: 0 }))
                        setIsUsernameValid(true);
                    } else {
                        setIsUsernameValid(false);
                    }
                } catch (error) {
                    setIsUsernameValid(false);
                }
            }
            else {
                setIsUsernameValid(false);
            }
        };

        checkUsernameExistence();
    }, [username, initialRender, dispatch]);

    if (isUsernameValid === null) {
        return <Loading />
    }
    console.log(isUsernameValid);
    if (isUsernameValid) {
        return <Profile />;
    } else {
        return <Navigate to="/" />;
    }
};

export default ProfileRouter;
