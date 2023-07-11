import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router';

import Header from './components/Header/Header';
import Footer from './components/Footer';

import Main from './pages/Main/Main';
import Category from './pages/Category/Category';
import RecipeDetail from './pages/RecipeDetail/RecipeDetail';
import LostPage from './pages/LostPage';
import UserPage from './pages/UserPage/UserPage';
import CocktailForm from './pages/CocktailForm';
import Signup from './pages/Signup/Signup';

import './App.css';

function App() {
  const location = useLocation();
  const isSignUp = location.pathname.includes('/signup');
  const RightPaths = ['category', 'detail', 'userpage', 'cocktail', 'signup'];
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
      {!isSignUp && isRightPath && <Header />}
      <Routing />
      {!isSignUp && isRightPath && <Footer />}
    </div>
  );
}

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/category" element={<Category />} />
      <Route path="/detail/:id" element={<RecipeDetail />} />
      <Route path="/userpage/:id" element={<UserPage />} />
      <Route path="/cocktail" element={<CocktailForm />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<LostPage />} />
    </Routes>
  );
};

export default App;
