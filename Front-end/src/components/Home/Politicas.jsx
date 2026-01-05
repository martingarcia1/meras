import { ArrowLeft, Truck, RefreshCw, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const Politicas = () => {
  return (
    <div className="min-h-screen bg-beige-light text-black py-20 px-4 font-sans">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-black/40 hover:text-black mb-12 transition-colors group font-bold tracking-widest text-xs uppercase">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Volver al inicio
        </Link>
        
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-4 uppercase leading-none">
          Políticas <br /> y Envíos
        </h1>
        <p className="text-xl font-light italic text-black/40 mb-16 tracking-widest uppercase">Mera's Service Agreement</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="space-y-12">
            <section>
              <div className="flex items-center gap-3 mb-6">
                <Truck size={24} />
                <h2 className="font-black text-lg tracking-widest uppercase italic">Envíos</h2>
              </div>
              <div className="space-y-4 text-black/70 italic text-lg font-light leading-relaxed">
                <p>Realizamos envíos a todo el país a través de Correo Argentino y transportes seleccionados.</p>
                <p className="border-l-4 border-black pl-4">El tiempo de despacho para productos personalizados es de X a Y días hábiles una vez aprobado el diseño.</p>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-6">
                <RefreshCw size={24} />
                <h2 className="font-black text-lg tracking-widest uppercase italic">Cambios y Reembolsos</h2>
              </div>
              <div className="space-y-4 text-black/70 italic text-lg font-light leading-relaxed">
                <p>Las prendas personalizadas no tienen cambio, excepto por fallas de fabricación evidentes.</p>
                <p>Los productos del catálogo estándar tienen un plazo de X días para cambios por talle.</p>
              </div>
            </section>
          </div>

          <div className="bg-beige-medium/30 border-2 border-black p-10 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
            <div>
              <ShieldCheck size={40} className="mb-6" />
              <h3 className="text-2xl font-black tracking-tighter uppercase mb-4 italic leading-tight">Tu seguridad es <br /> nuestra prioridad</h3>
              <p className="text-sm font-medium tracking-widest uppercase text-black/40 italic leading-relaxed">
                Trabajamos con transparencia para que tu experiencia en Mera's sea siempre excelente. 
                Cada pedido es revisado manualmente antes de ser despachado.
              </p>
            </div>
            <div className="pt-10 border-t border-black/10">
              <p className="text-[10px] font-black tracking-[0.3em] uppercase mb-2">¿Necesitás el texto completo?</p>
              <p className="text-xs italic text-black/60">Aquí se incluirá el texto legal detallado que el cliente proporcione.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Politicas;

