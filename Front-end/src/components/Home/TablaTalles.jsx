import { ArrowLeft, Ruler, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

const TablaTalles = () => {
  return (
    <div className="min-h-screen bg-beige-light text-black py-20 px-4 font-sans">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-black/40 hover:text-black mb-12 transition-colors group font-bold tracking-widest text-xs uppercase">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Volver al inicio
        </Link>
        
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-4 uppercase leading-none italic">
          Tabla de <br /> Talles
        </h1>
        <p className="text-xl font-light italic text-black/40 mb-16 tracking-widest uppercase">Mera's Size Chart (Hasta 6XL)</p>

        <div className="bg-white border-2 border-black shadow-[15px_15px_0px_0px_rgba(0,0,0,1)] p-8 md:p-12 mb-16 overflow-x-auto">
          <div className="min-w-[500px]">
            <div className="flex items-center gap-3 mb-8">
              <Ruler size={24} />
              <h2 className="font-black text-xl tracking-widest uppercase italic">Remeras / Buzos</h2>
            </div>
            
            {/* Espacio para la Tabla Maquetada */}
            <div className="border-4 border-dashed border-black/10 p-12 text-center">
              <span className="text-black/20 font-black italic text-2xl uppercase tracking-tighter">Espacio para la tabla <br /> detallada del cliente</span>
              <p className="text-[10px] text-black/30 font-bold uppercase tracking-[0.2em] mt-4 italic">Se maquetará con los datos exactos recibidos (Ancho, Largo, Mangas)</p>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-black/5">
              <div className="flex gap-4">
                <div className="h-10 w-10 shrink-0 bg-black text-beige-light flex items-center justify-center font-black">!</div>
                <p className="text-[10px] font-bold uppercase tracking-widest leading-relaxed opacity-60 italic">
                  Las medidas son aproximadas y pueden variar 1-2 cm. Te recomendamos medir una prenda que te quede cómoda sobre una superficie plana.
                </p>
              </div>
              <div className="flex gap-4">
                <div className="h-10 w-10 shrink-0 bg-black text-beige-light flex items-center justify-center font-black italic">6XL</div>
                <p className="text-[10px] font-bold uppercase tracking-widest leading-relaxed opacity-60 italic">
                  Contamos con talles especiales hasta 6XL en modelos seleccionados. Consultá por WhatsApp si el talle que buscás está disponible en tu color favorito.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-black text-beige-light p-10 flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="text-center md:text-left">
              <h3 className="text-2xl font-black uppercase tracking-tighter italic mb-2 leading-none">¿No estás seguro?</h3>
              <p className="text-xs font-light italic tracking-widest opacity-60">Te asesoramos personalmente para elegir tu talle.</p>
           </div>
           <a href="https://wa.me/tu_numero" className="bg-white text-black px-10 py-4 font-black tracking-widest uppercase hover:bg-beige-medium transition-colors whitespace-nowrap">Consultar Talle</a>
        </div>
      </div>
    </div>
  );
};

export default TablaTalles;

