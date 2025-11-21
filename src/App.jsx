import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Home from './pages/Home';
import Test from './pages/Test';
import Plats from './pages/Plats';
import DishProduct from './pages/DishProduct';
import NosRecettes from './pages/NosRecettes';
import NosPacks from './pages/NosPacks';
import PackDetail from './pages/PackDetail';
import Panier from './pages/Panier';
import NotreHistoire from './pages/NotreHistoire';
import Commander from './pages/Commander';
import Quiz from './pages/Quiz';
import Results from './pages/Results';
import Inscription from './pages/Inscription';
import MonCompte from './pages/MonCompte';
import './App.css';

function App() {
  return (
    <CartProvider>
      <Header />
      <div style={{ paddingTop: '120px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<Test />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/results" element={<Results />} />
          <Route path="/plats" element={<Plats />} />
          <Route path="/plats/:slug" element={<DishProduct />} />
          <Route path="/nos-recettes" element={<NosRecettes />} />
          <Route path="/nos-packs" element={<NosPacks />} />
          <Route path="/nos-packs/:slug" element={<PackDetail />} />
          <Route path="/panier" element={<Panier />} />
          <Route path="/notre-histoire" element={<NotreHistoire />} />
          <Route path="/commander" element={<Commander />} />
          <Route path="/inscription" element={<Inscription />} />
          <Route path="/mon-compte" element={<MonCompte />} />
        </Routes>
      </div>
    </CartProvider>
  );
}

export default App;
