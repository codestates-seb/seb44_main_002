import { useEffect, Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './redux/slice/isLoginSlice';

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

import { PATH } from './constants/constants';

function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  const userinfoUserid = useSelector((state) => state.userinfo.userid);
  const isSignUp = location.pathname.includes(PATH.SIGNUP_PAGE);
  const isCommented = location.pathname.includes(PATH.COMMENT_PAGE);
  const RightPaths = [
    'category',
    'detail',
    'userpage',
    'cocktail',
    'signup',
    'comment',
  ];
  const isRightPath =
    location.pathname === PATH.MAIN_PAGE ||
    RightPaths.some(
      (path) => location.pathname.split(PATH.MAIN_PAGE)[1] === path
    );

  // 로그인상태유지
  useEffect(() => {
    const isToken = localStorage.getItem('accessToken');
    if (isToken && !userinfoUserid) {
      dispatch(login());
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
        <Route path={PATH.MAIN_PAGE} element={<Main />} />
        <Route path={PATH.CATEGORY_PAGE} element={<Category />} />
        <Route path={`${PATH.DETAIL_PAGE}:id`} element={<RecipeDetail />} />
        <Route path={`${PATH.USER_PAGE}:id`} element={<UserPage />} />
        <Route path={PATH.COCKTAIL_PAGE} element={<CocktailForm />} />
        <Route
          path={`${PATH.MODIFY_PAGE}:id`}
          element={<CocktailModifyForm />}
        />
        <Route path={PATH.SIGNUP_PAGE} element={<Signup />} />
        <Route path={PATH.COMMENT_PAGE} element={<CommentPage />} />
        <Route path={`${PATH.SUCCESS_PAGE}:id`} element={<SuccessPage />} />
        <Route path={PATH.NOT_FOUND} element={<LostPage />} />
      </Routes>
    </Suspense>
  );
};

export default App;
