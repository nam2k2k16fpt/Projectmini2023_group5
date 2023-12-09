import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Home from '../components/screens/Home';
import Login from '../components/screens/Login';
import Register from '../components/screens/Register';
import Setting from '../components/screens/Setting';
import NewArticle from '../components/screens/NewArticle';
import ProtectedRoute from './ProtectedRoute';
import ArticleDetail from '../components/screens/ArticleDetail';
import ProfileRouter from '../routing/ProfileRouter'
import FavoriteArticle from '../components/FavoriteArticle';
import { useDispatch } from 'react-redux';
import { resetOption } from '../redux/articleSlice';
import { useEffect } from 'react';
const Router = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/') {
            dispatch(resetOption({ resetPage: 1, resetOffset: 0, resetTag: '', resetTotal: 0 }));
        }
    }, [location.pathname, dispatch]);
    return (
        <div className="App container-fluid p-0">
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='article/:titleArticle' element={<ArticleDetail />} />
                <Route path='/:username/*' element={<ProfileRouter />}>
                    <Route path='favorites' element={<FavoriteArticle />} />
                </Route>
                <Route element={<ProtectedRoute />}>
                    <Route path='/settings' element={<Setting />} />
                    <Route path='/editor/*' element={<NewArticle type={'NEW'} />} />
                    <Route path='/editor/:slug' element={<NewArticle type={'UPDATE'} />} />
                </Route>
                <Route path='*' element={<Navigate to="/" />} />
            </Routes>
        </div>
    );
};

export default Router;
