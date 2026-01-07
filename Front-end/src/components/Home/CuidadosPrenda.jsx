import { ArrowLeft, Sparkles, Droplets, Wind, ThermometerSnowflake, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

const CuidadosPrenda = () => {
  return (
    <div className="min-h-screen bg-beige-light text-black py-20 px-4 font-sans">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-black/40 hover:text-black mb-12 transition-colors group font-bold tracking-widest text-xs uppercase">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Volver al inicio
        </Link>
        
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-4 uppercase leading-none italic">
          Cuidados <br /> de la prenda
        </h1>
        <p className="text-xl font-light italic text-black/40 mb-16 tracking-widest uppercase">Mera's Quality Guide</p>

        {/* Espacio para el Flyer o Contenido */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-12">
            <p className="text-xl font-light leading-relaxed italic text-black/80">
              Queremos que tu prenda <span className="font-bold text-black not-italic uppercase">Mera's</span> te acompañe por mucho tiempo. Aquí te dejamos los consejos esenciales para mantener la calidad de nuestras telas y estampados (DTF, Sublimación y Bordado).
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-black text-beige-light p-3 shrink-0">
                  <Droplets size={24} />
                </div>
                <div>
                  <h3 className="font-black text-sm tracking-widest uppercase mb-2">Lavado Precavido</h3>
                  <p className="text-sm text-black/60 italic">Lavar del revés con agua fría. No usar blanqueadores fuertes.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-black text-beige-light p-3 shrink-0">
                  <ThermometerSnowflake size={24} />
                </div>
                <div>
                  <h3 className="font-black text-sm tracking-widest uppercase mb-2">Secado Natural</h3>
                  <p className="text-sm text-black/60 italic">No usar secarropas de calor intenso. Secar a la sombra para proteger los colores.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-black text-beige-light p-3 shrink-0">
                  <Sparkles size={24} />
                </div>
                <div>
                  <h3 className="font-black text-sm tracking-widest uppercase mb-2">Planchado Inteligente</h3>
                  <p className="text-sm text-black/60 italic">Nunca planchar directamente sobre el estampado. Usar plancha tibia del revés.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-4 border-dashed border-black/10 flex items-center justify-center aspect-[3/4] bg-beige-medium/10 relative overflow-hidden group">
            <div className="text-center p-8">
              <span className="text-black/20 font-black italic text-2xl uppercase tracking-tighter">Espacio para el Flyer <br /> de Cuidados</span>
              <p className="text-[10px] text-black/30 font-bold uppercase tracking-[0.2em] mt-4 italic">Diseñado por el cliente</p>
            </div>
            <div className="absolute top-4 right-4 animate-bounce">
              <Info size={20} className="text-black/20" />
            </div>
          </div>
        </div>

        <div className="mt-24 p-12 bg-black text-beige-light text-center">
          <h2 className="text-3xl font-black tracking-tighter uppercase italic mb-4">¿Tenés dudas?</h2>
          <p className="text-sm font-light italic mb-8 opacity-60 uppercase tracking-widest">Si no estás segura de cómo lavar una prenda especial, consultanos.</p>
          <a href="https://wa.me/+543815987621" className="inline-block border-2 border-beige-light px-8 py-4 font-black tracking-widest uppercase hover:bg-beige-light hover:text-black transition-all">Consultar por WhatsApp</a>
        </div>
      </div>
    </div>
  );
};

export default CuidadosPrenda;

