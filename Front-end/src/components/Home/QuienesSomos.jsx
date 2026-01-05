import { ArrowLeft, Check, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const QuienesSomos = () => {
  return (
    <div className="min-h-screen bg-beige-light text-black py-12 md:py-20 px-4 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Botón Volver */}
        <Link to="/" className="inline-flex items-center gap-2 text-black/40 hover:text-black mb-12 transition-colors group font-bold tracking-widest text-xs uppercase">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Volver al inicio
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Columna Izquierda: Texto e Info */}
          <div className="flex flex-col">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 uppercase leading-[0.9]">
              Nuestra <br /> Esencia
            </h1>
            
            <p className="text-lg md:text-xl font-light leading-relaxed italic text-black/80 mb-8">
              En <span className="font-black text-black not-italic uppercase tracking-tighter">Meras</span> nos especializamos en crear prendas personalizadas que se adaptan a tu estilo, tu esencia y tus necesidades. Cada diseño que hacemos está pensado para reflejar tu mundo y convertir tus ideas en algo real.
            </p>

            {/* Lista de Características (Estilo Ejemplo) */}
            <div className="space-y-4 mb-10">
              <div className="flex items-start gap-3">
                <div className="mt-1 bg-black text-beige-light p-1">
                  <Check size={16} strokeWidth={4} />
                </div>
                <div>
                  <h3 className="font-bold uppercase text-sm tracking-widest">Variedad de Técnicas</h3>
                  <p className="text-sm text-black/60 italic">DTF, sublimación y bordado de alta calidad.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 bg-black text-beige-light p-1">
                  <Check size={16} strokeWidth={4} />
                </div>
                <div>
                  <h3 className="font-bold uppercase text-sm tracking-widest">Atención Exclusiva</h3>
                  <p className="text-sm text-black/60 italic">Trabajamos por mayor y por menor con cuidado en cada detalle.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 bg-black text-beige-light p-1">
                  <Check size={16} strokeWidth={4} />
                </div>
                <div>
                  <h3 className="font-bold uppercase text-sm tracking-widest">Proceso Creativo</h3>
                  <p className="text-sm text-black/60 italic">Te incluimos desde el principio para que el resultado sea auténticamente tuyo.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 bg-black text-beige-light p-1">
                  <Check size={16} strokeWidth={4} />
                </div>
                <div>
                  <h3 className="font-bold uppercase text-sm tracking-widest">Sin Límites</h3>
                  <p className="text-sm text-black/60 italic">Para eventos, grupos, emprendimientos o simplemente un gusto personal.</p>
                </div>
              </div>
            </div>

            {/* Botón de Acción */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/personalizar" 
                className="bg-black text-beige-light px-10 py-5 text-lg font-black uppercase tracking-[0.2em] hover:bg-black/80 transition-all text-center shadow-[6px_6px_0px_0px_rgba(0,0,0,0.2)]"
              >
                Comenzar a Diseñar
              </Link>
            </div>
          </div>

          {/* Columna Derecha: Imagen Estilo Taller */}
          <div className="relative group">
            <div className="aspect-[4/5] md:aspect-square overflow-hidden border-2 border-black shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] bg-beige-medium/20">
              {/* Aquí irá la foto del taller o proceso */}
              <div className="w-full h-full flex flex-col items-center justify-center p-12 text-center border-4 border-dashed border-black/10 m-2">
                 <div className="italic text-black/20 font-light text-2xl mb-4">ESPACIO PARA FOTO <br /> DEL TALLER / PROCESO</div>
                 <div className="h-px w-20 bg-black/10 mb-4"></div>
                 <div className="text-[10px] tracking-[0.5em] font-black uppercase opacity-10">Mera's Workshop</div>
              </div>
            </div>
            
            {/* Pequeño detalle flotante */}
            <div className="absolute -bottom-6 -left-6 bg-black text-beige-light p-6 hidden md:block border-2 border-black">
               <p className="text-xs font-black tracking-[0.3em] uppercase italic">Handmade with love</p>
            </div>
          </div>

        </div>

        {/* Footer de la página */}
        <div className="mt-32 pt-12 border-t-2 border-black flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
                <h2 className="text-2xl font-black tracking-[0.2em] uppercase italic">MERA'S</h2>
                <p className="text-xs font-bold tracking-[0.3em] text-black/40 uppercase">wear your world</p>
            </div>
            <div className="flex gap-10 text-black/40 font-bold text-xs tracking-[0.2em]">
                <span className="hover:text-black cursor-pointer transition-colors uppercase">Instagram</span>
                <span className="hover:text-black cursor-pointer transition-colors uppercase">WhatsApp</span>
                <span className="hover:text-black cursor-pointer transition-colors uppercase">Mail</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default QuienesSomos;
