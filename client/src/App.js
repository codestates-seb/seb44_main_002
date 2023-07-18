import { useState, useEffect, Suspense, lazy } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './redux/slice/isLoginSlice';
import { userinfoLogin, userinfoGet } from './redux/slice/userInfoSlice';

import Header from './components/Header/Header';
import Footer from './components/Footer';

const Main = lazy(() => import('./pages/Main/Main'));
const Category = lazy(() => import('./pages/Category/Category'));
const RecipeDetail = lazy(() => import('./pages/RecipeDetail/RecipeDetail'));
const LostPage = lazy(() => import('./pages/LostPage'));
const UserPage = lazy(() => import('./pages/UserPage/UserPage'));
const CocktailForm = lazy(() => import('./pages/CocktailForm/CocktailForm'));
const CocktailModifyForm = lazy(() =>
  import('./pages/CocktailForm/CocktailModifyForm')
);
const Signup = lazy(() => import('./pages/Signup/Signup'));
const CommentPage = lazy(() => import('./pages/Comment/CommentPage'));
const SuccessPage = lazy(() => import('./pages/Success/SuccessPage'));

import './App.css';
import Loading from './components/Loading';

function App() {
  // const BASE_URL = process.env.REACT_APP_BASE_URL;
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userinfoUserid = useSelector((state) => state.userinfo.userid);
  const isSignUp = location.pathname.includes('/signup');
  const isCommented = location.pathname.includes('/comment');
  const RightPaths = [
    'category',
    'detail',
    'userpage',
    'cocktail',
    'signup',
    'comment',
  ];
  const isRightPath =
    location.pathname === '/' ||
    RightPaths.some((path) => location.pathname.split('/')[1] === path);

  // refresh token이 있을 경우 access token 주기적으로 재발급
  useEffect(() => {
    const isToken = localStorage.getItem('accessToken');
    // const timer = setInterval(() => {
    //   if (document.hasFocus()) getAccessToken();
    // }, 1800000);
    // return () => {
    //   clearInterval(timer);
    // };
    if (isToken && !userinfoUserid) {
      dispatch(login(() => login()));
    }
  }, []);

  return (
    <div className="App">
      {!isSignUp && isRightPath && !isCommented && <Header />}
      <Routing />
      {!isSignUp && isRightPath && !isCommented && <Footer />}
    </div>
  );
}

const Routing = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/category" element={<Category />} />
        <Route path="/detail/:id" element={<RecipeDetail />} />
        <Route path="/userpage/:id" element={<UserPage />} />
        <Route path="/cocktail" element={<CocktailForm />} />
        <Route path="/cocktail/:id" element={<CocktailModifyForm />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/comment" element={<CommentPage />} />
        <Route path="/success/:id" element={<SuccessPage />} />
        <Route path="*" element={<LostPage />} />
      </Routes>
    </Suspense>
  );
};

export default App;
