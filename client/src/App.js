import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import Main from './pages/Main';
import Category from './pages/Category/Category';
import RecipeDetail from './pages/RecipeDetail/RecipeDetail';

import Community from './pages/Community/Community';
import LostPage from './pages/LostPage';
import Mypage from './pages/User/Mypage';

import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Routing />
      <Footer />
    </div>
  );
}

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/category" element={<Category />} />
      <Route path="/detail/:id" element={<RecipeDetail />} />
      <Route path="/community" element={<Community />} />
      <Route path="/mypage" element={<Mypage />} />
      <Route path="*" element={<LostPage />} />
    </Routes>
  );
};

export default App;
