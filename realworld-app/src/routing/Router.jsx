import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from '../components/screens/Home';
import Login from '../components/screens/Login';
import Register from '../components/screens/Register';
import Setting from '../components/screens/Setting';
import NewArticle from '../components/screens/NewArticle';
import ProtectedRoute from './ProtectedRoute';
import Profile from '../components/screens/Profile';
import ArticleDetail from '../components/screens/ArticleDetail';
import { useSelector } from 'react-redux';
const Router = () => {
    const currentUser = useSelector((state) => state.user.saveUserData.currentUser);
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/:titleArticle' element={<ArticleDetail />} />
            <Route element={<ProtectedRoute />}>
                <Route path='/settings' element={<Setting />} />
                <Route path='/editor' element={<NewArticle />} />
                <Route path={`/@${currentUser?.user?.username}`} element={<Profile />} />
            </Route>
            <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
    );
};

export default Router;