import { Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router';

import Header from './components/Header/Header';
import Footer from './components/Footer';

import Main from './pages/Main/Main';
import Category from './pages/Category/Category';
import RecipeDetail from './pages/RecipeDetail/RecipeDetail';
import LostPage from './pages/LostPage';
import UserPage from './pages/User/UserPage';
import CocktailForm from './pages/CocktailForm';
import Signup from './pages/Signup';

import './App.css';

function App() {
  const location = useLocation();
  return (
    <div className="App">
      {!location.pathname.includes('/signup') && <Header />}
      <Routing />
      {!location.pathname.includes('/signup') && <Footer />}
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
