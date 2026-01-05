import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import NavBar from './components/NavBar/NavBar';
import Personalizador from './components/Tienda/Personalizador';
import QuienesSomos from './components/Home/QuienesSomos';
import CuidadosPrenda from './components/Home/CuidadosPrenda';
import Politicas from './components/Home/Politicas';
import TablaTalles from './components/Home/TablaTalles';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-beige-light">
        <NavBar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/personalizar" element={<Personalizador />} />
            <Route path="/quienes-somos" element={<QuienesSomos />} />
            <Route path="/cuidados" element={<CuidadosPrenda />} />
            <Route path="/politicas-envio" element={<Politicas />} />
            <Route path="/tabla-talles" element={<TablaTalles />} />
            {/* Próximamente: */}
            {/* <Route path="/catalogo" element={<Catalogo />} /> */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
