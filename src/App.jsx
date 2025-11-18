import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Test from './pages/Test';
import Plats from './pages/Plats';
import NosRecettes from './pages/NosRecettes';
import NosPacks from './pages/NosPacks';
import NotreHistoire from './pages/NotreHistoire';
import Commander from './pages/Commander';
import Quiz from './pages/Quiz';
import Results from './pages/Results';
import './App.css';

function App() {
  return (
    <>
      <Header />
      <div style={{ paddingTop: '120px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<Test />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/results" element={<Results />} />
          <Route path="/plats" element={<Plats />} />
          <Route path="/nos-recettes" element={<NosRecettes />} />
          <Route path="/nos-packs" element={<NosPacks />} />
          <Route path="/notre-histoire" element={<NotreHistoire />} />
          <Route path="/commander" element={<Commander />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
