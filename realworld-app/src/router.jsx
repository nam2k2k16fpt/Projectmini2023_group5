import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/screens/Home';
import Login from './components/screens/Login';
import Register from './components/screens/Register';
import Setting from './components/screens/Setting';
import NewArticle from './components/screens/NewArticle';

const router = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/settings' element={<Setting />} />
            <Route path='/editor' element={<NewArticle />} />
        </Routes>
    );
};

export default router;