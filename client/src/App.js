import { useEffect, Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router';

import Header from './components/Header/Header';
import Footer from './components/Footer';

const Main = lazy(() => import('./pages/Main/Main'));
const Category = lazy(() => import('./pages/Category/Category'));
const RecipeDetail = lazy(() => import('./pages/RecipeDetail/RecipeDetail'));
const LostPage = lazy(() => import('./pages/LostPage'));
const UserPage = lazy(() => import('./pages/UserPage/UserPage'));
const CocktailForm = lazy(() => import('./pages/CocktailForm/CocktailForm'));
const Signup = lazy(() => import('./pages/Signup/Signup'));
const CommentPage = lazy(() => import('./pages/Comment/CommentPage'));
const SuccessPage = lazy(() => import('./pages/SuccessPage'));

import './App.css';

function App() {
  const location = useLocation();
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

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     if (document.hasFocus()) getAccessToken();
  //   }, 1800000);

  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, []);

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
    <Suspense>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/category" element={<Category />} />
        <Route path="/detail/:id" element={<RecipeDetail />} />
        <Route path="/userpage/:id" element={<UserPage />} />
        <Route path="/cocktail" element={<CocktailForm />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/comment" element={<CommentPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="*" element={<LostPage />} />
      </Routes>
    </Suspense>
  );
};

export default App;
