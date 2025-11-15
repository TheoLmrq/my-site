import { Routes, Route, useLocation } from 'react-router-dom';
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
  const location = useLocation();
  const hideHeaderPaths = ['/quiz', '/results'];
  const showHeader = !hideHeaderPaths.includes(location.pathname);

  return (
    <>
      {showHeader && <Header />}
      <div style={{ paddingTop: showHeader ? '80px' : '0' }}>
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
