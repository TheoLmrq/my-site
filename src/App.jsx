import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Test from './pages/Test';
import Plats from './pages/Plats';
import './App.css';

function App() {
  return (
    <>
      <Header />
      <div style={{ paddingTop: '80px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<Test />} />
          <Route path="/plats" element={<Plats />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
