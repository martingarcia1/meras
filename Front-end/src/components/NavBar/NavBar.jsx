import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, ChevronDown } from 'lucide-react';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-beige-light border-b border-black/5 sticky top-0 z-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="shrink-0 flex items-center">
            <Link to="/" className="text-3xl font-black tracking-tighter text-black uppercase italic">
              MERA'S
            </Link>
          </div>

          {/* Links Desktop */}
          <div className="hidden md:flex space-x-8 items-center">
            <div className="relative group">
              <button className="flex items-center gap-1 text-black/60 hover:text-black transition-colors font-bold text-xs tracking-widest uppercase py-8">
                Indumentaria <ChevronDown size={12} />
              </button>
              <div className="absolute top-full left-0 bg-beige-light border border-black/5 shadow-xl py-4 min-w-[200px] hidden group-hover:block">
                <Link to="/catalogo/remeras-basicas" className="block px-6 py-2 text-[10px] font-bold tracking-widest hover:bg-beige-medium transition-colors uppercase">REMERAS BÁSICAS</Link>
                <Link to="/catalogo/remeras-diseno" className="block px-6 py-2 text-[10px] font-bold tracking-widest hover:bg-beige-medium transition-colors uppercase">CATÁLOGO DISEÑO</Link>
                <Link to="/catalogo/argento" className="block px-6 py-2 text-[10px] font-bold tracking-widest hover:bg-beige-medium transition-colors uppercase">ARGENTO 🇦🇷</Link>
                <Link to="/personalizar" className="block px-6 py-2 text-[10px] font-black tracking-widest hover:bg-beige-medium transition-colors text-green-700 uppercase">Personalizá tu remera</Link>
              </div>
            </div>

            <div className="relative group">
              <button className="flex items-center gap-1 text-black/60 hover:text-black transition-colors font-bold text-xs tracking-widest uppercase py-8">
                Accesorios <ChevronDown size={12} />
              </button>
              <div className="absolute top-full left-0 bg-beige-light border border-black/5 shadow-xl py-4 min-w-[200px] hidden group-hover:block">
                <Link to="/catalogo/gorras" className="block px-6 py-2 text-[10px] font-bold tracking-widest hover:bg-beige-medium transition-colors uppercase">Gorras</Link>
                <Link to="/catalogo/pilusos" className="block px-6 py-2 text-[10px] font-bold tracking-widest hover:bg-beige-medium transition-colors uppercase">Pilusos</Link>
              </div>
            </div>

            <div className="relative group">
              <button className="flex items-center gap-1 text-black/60 hover:text-black transition-colors font-bold text-xs tracking-widest uppercase py-8">
                Sublimación <ChevronDown size={12} />
              </button>
              <div className="absolute top-full left-0 bg-beige-light border border-black/5 shadow-xl py-4 min-w-[200px] hidden group-hover:block">
                <Link to="/catalogo/telas" className="block px-6 py-2 text-[10px] font-bold tracking-widest hover:bg-beige-medium transition-colors uppercase">Telas Sublimadas</Link>
                <Link to="/catalogo/banderas" className="block px-6 py-2 text-[10px] font-bold tracking-widest hover:bg-beige-medium transition-colors uppercase">Banderas</Link>
              </div>
            </div>

            <Link to="/quienes-somos" className="text-black/60 hover:text-black transition-colors font-bold text-xs tracking-widest uppercase">Nosotros</Link>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-5">
            <button className="text-black/60 hover:text-black transition-transform hover:scale-110">
              <User size={22} strokeWidth={1.5} />
            </button>
            <button className="text-black/60 hover:text-black relative transition-transform hover:scale-110">
              <ShoppingCart size={22} strokeWidth={1.5} />
              <span className="absolute -top-1.5 -right-1.5 bg-black text-beige-light text-[9px] rounded-full h-4 w-4 flex items-center justify-center font-black">0</span>
            </button>
            <button 
              className="md:hidden text-black p-1"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú Mobile */}
      {isOpen && (
        <div className="md:hidden bg-beige-medium/50 border-t border-black/5 px-4 py-8 space-y-6">
          <div className="space-y-4">
            <p className="text-[10px] font-black tracking-[0.3em] text-black/30 uppercase">Indumentaria</p>
            <Link to="/catalogo/remeras-basicas" className="block text-sm font-bold tracking-widest uppercase pl-4">Remeras Básicas</Link>
            <Link to="/catalogo/remeras-diseno" className="block text-sm font-bold tracking-widest uppercase pl-4">Catálogo Diseño</Link>
            <Link to="/personalizar" className="block text-sm font-black tracking-widest uppercase pl-4 text-green-700">Personalizá tu remera</Link>
          </div>
          <div className="space-y-4">
            <p className="text-[10px] font-black tracking-[0.3em] text-black/30 uppercase">Accesorios</p>
            <Link to="/catalogo/gorras" className="block text-sm font-bold tracking-widest uppercase pl-4">Gorras</Link>
            <Link to="/catalogo/pilusos" className="block text-sm font-bold tracking-widest uppercase pl-4">Pilusos</Link>
          </div>
          <div className="space-y-4 pt-4">
            <Link to="/quienes-somos" className="block text-sm font-black tracking-widest uppercase">¿Quiénes Somos?</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
