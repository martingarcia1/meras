import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import NavBar from './components/NavBar/NavBar';
import Personalizador from './components/Tienda/Personalizador';
import Catalogo from './components/Tienda/Catalogo';
import ProductoDetalle from './components/Tienda/ProductoDetalle';
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
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/catalogo/:categoria" element={<Catalogo />} />
            <Route path="/producto/:id" element={<ProductoDetalle />} />
            <Route path="/quienes-somos" element={<QuienesSomos />} />
            <Route path="/cuidados" element={<CuidadosPrenda />} />
            <Route path="/politicas-envio" element={<Politicas />} />
            <Route path="/tabla-talles" element={<TablaTalles />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
