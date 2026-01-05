import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, Ruler, Scissors, Shirt, CreditCard, Sparkles, Truck, RefreshCw } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col w-full bg-beige-light font-sans text-black">
      {/* Hero Section - Estilo Boceto */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 pt-12">
        <div className="mb-12">
          <h1 className="text-8xl md:text-[12rem] font-black tracking-tighter text-black leading-none uppercase">
            Mera's
          </h1>
          <p className="text-2xl md:text-3xl font-light italic text-black/40 tracking-[0.2em] mt-2">
            wear your world
          </p>
        </div>

        {/* Las 3 Cajas del Boceto */}
        <div className="grid grid-cols-1 md:grid-cols-3 w-full max-w-5xl border-2 border-black mb-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-beige-light">
          {/* Caja 1: Hasta 6XL */}
          <div className="border-b-2 md:border-b-0 md:border-r-2 border-black p-8 flex flex-col items-center justify-center bg-transparent group hover:bg-beige-medium transition-colors">
            <span className="text-[10px] font-black tracking-[0.3em] mb-4 self-start uppercase">Indumentaria</span>
            <Shirt size={100} strokeWidth={1} className="text-black mb-4" />
            <span className="text-[10px] font-bold tracking-widest uppercase">Hasta 6XL</span>
          </div>

          {/* Caja 2: Icono/Prenda */}
          <div className="border-b-2 md:border-b-0 md:border-r-2 border-black p-8 flex flex-col items-center justify-center bg-transparent group hover:bg-beige-medium transition-colors uppercase">
            <span className="text-[10px] font-black tracking-[0.3em] mb-4 self-start opacity-30">Accesorios</span>
            <div className="w-32 h-32 border-2 border-black rounded-full flex items-center justify-center relative overflow-hidden">
               <span className="text-[10px] font-black italic tracking-widest z-10">GORRAS / PILUSOS</span>
               <div className="absolute inset-0 bg-black/5 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            </div>
          </div>

          {/* Caja 3: Telas */}
          <div className="p-8 flex flex-col items-center justify-center bg-transparent group hover:bg-beige-medium transition-colors relative overflow-hidden uppercase">
             <span className="text-[10px] font-black tracking-[0.3em] mb-4 self-start opacity-30">Sublimación</span>
             <span className="text-4xl font-light italic tracking-tighter transform -rotate-12 group-hover:rotate-0 transition-transform duration-500">Telas</span>
             <Scissors className="absolute bottom-4 right-4 text-black/10" size={40} />
          </div>
        </div>

        {/* Botones del Boceto */}
        <div className="flex flex-col gap-4 w-full max-w-xs">
          <Link 
            to="/catalogo/remeras-diseno" 
            className="w-full border-2 border-black py-4 text-xl font-bold tracking-widest bg-black text-beige-light hover:bg-transparent hover:text-black transition-all uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] text-center"
          >
            Ver Catálogo
          </Link>
          <Link 
            to="/personalizar" 
            className="w-full border-2 border-black py-4 text-xl font-bold tracking-widest hover:bg-black hover:text-beige-light transition-all uppercase text-center"
          >
            Crear mi Prenda
          </Link>
            <Link to="/quienes-somos" className="text-[10px] font-black tracking-[0.4em] mt-6 hover:underline underline-offset-8 uppercase opacity-60 hover:opacity-100 transition-opacity">
            ¿QUIÉNES SOMOS?
          </Link>
          <Link to="/cuidados" className="text-[10px] font-black tracking-[0.4em] mt-2 hover:underline underline-offset-8 uppercase opacity-60 hover:opacity-100 transition-opacity">
            CUIDADOS DE LA PRENDA
          </Link>
        </div>
      </section>

      {/* MERA CARD Section (NUEVO REQUERIMIENTO) */}
      <section className="py-24 border-t-2 border-black bg-beige-light overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 space-y-8">
              <div className="inline-block border-2 border-black px-4 py-1 text-xs font-black tracking-[0.3em] uppercase">Mera Experience</div>
              <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none uppercase italic">Mera Card</h2>
              <p className="text-xl font-light italic text-black/70 leading-relaxed">
                El regalo perfecto para quienes quieren diseñar su propio mundo. Comprá un monto y recibí un voucher virtual exclusivo para usar en cualquier prenda.
              </p>
              <div className="flex gap-4 pt-4">
                <button className="bg-black text-beige-light px-8 py-4 font-black tracking-[0.2em] uppercase text-xs hover:scale-105 transition-transform">
                  Comprar Card
                </button>
                <button className="border-2 border-black px-8 py-4 font-black tracking-[0.2em] uppercase text-xs hover:bg-black hover:text-beige-light transition-all">
                  Ver Detalles
                </button>
              </div>
            </div>
            <div className="flex-1 relative">
              {/* Representación visual de la Mera Card */}
              <div className="w-full aspect-[1.6/1] bg-black text-beige-light p-8 flex flex-col justify-between border-2 border-black shadow-[15px_15px_0px_0px_rgba(0,0,0,0.1)] relative group">
                <div className="flex justify-between items-start">
                  <span className="text-4xl font-black italic tracking-tighter uppercase">Mera Card</span>
                  <Sparkles className="text-beige-medium animate-pulse" />
                </div>
                <div className="space-y-2">
                  <div className="h-px w-full bg-beige-light/20"></div>
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] font-black tracking-[0.5em] uppercase opacity-40">Gift Voucher</span>
                    <span className="text-5xl font-black tracking-tighter">$000.00</span>
                  </div>
                </div>
                {/* Elementos decorativos */}
                <div className="absolute -top-4 -right-4 bg-beige-medium text-black px-4 py-2 font-black text-[10px] tracking-widest uppercase border-2 border-black transform rotate-12">
                   VIRTUAL TICKET
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mira todo lo que podés hacer (Refinado por requerimiento) */}
      <section className="py-24 bg-black text-beige-light">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter italic uppercase leading-none mb-6">MIRA TODO LO QUE PODÉS HACER</h2>
            <div className="h-1 w-40 bg-beige-medium mx-auto mb-8"></div>
            <p className="text-xl text-beige-medium/60 font-light italic max-w-2xl mx-auto">
              Diseñamos tus momentos más importantes. Personalización exclusiva para cada ocasión.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Egresados', desc: 'Prendas únicas para tu promo.' },
              { title: 'Eventos', desc: 'Diseños exclusivos para empresas y marcas.' },
              { title: 'Recibidas', desc: 'Festejá con tu propia remera personalizada.' },
              { title: 'Despedidas', desc: 'Momentos divertidos con diseños grupales.' }
            ].map((item, index) => (
              <div key={index} className="border-2 border-beige-light/20 p-8 flex flex-col items-center text-center group hover:border-beige-light transition-all cursor-pointer bg-beige-light/5">
                <div className="w-full aspect-square bg-beige-medium/10 mb-6 flex items-center justify-center italic text-beige-medium/20 text-xs font-bold uppercase group-hover:bg-beige-medium/20 transition-all">
                   FOTO ILUSTRATIVA
                </div>
                <h3 className="text-2xl font-black tracking-tighter uppercase mb-2">{item.title}</h3>
                <p className="text-xs font-light text-beige-medium/40 uppercase tracking-widest">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <div className="bg-beige-light text-black p-12 max-w-4xl mx-auto shadow-[15px_15px_0px_0px_rgba(245,240,225,0.1)] border-2 border-black">
              <h3 className="text-3xl font-black mb-6 tracking-tighter uppercase italic">¿Tenés una idea en mente?</h3>
              <p className="mb-10 text-black/60 font-light italic text-lg leading-relaxed">
                Consultanos por colores especiales, talles grandes y pedidos personalizados para grupos o eventos. 
                Respondemos todas tus dudas por WhatsApp.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <a 
                  href="https://wa.me/tu_numero" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-4 bg-green-600 text-white px-10 py-5 text-xl font-bold hover:bg-green-700 transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] w-full sm:w-auto"
                >
                  <MessageCircle size={28} /> WHATSAPP
                </a>
                <a 
                  href="mailto:contacto@meras.com" 
                  className="flex items-center justify-center gap-4 border-2 border-black px-10 py-5 text-xl font-bold hover:bg-black hover:text-white transition-all w-full sm:w-auto uppercase"
                >
                  Enviar Mail
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Info Utils Section (NUEVO REQUERIMIENTO) */}
      <section className="py-24 bg-beige-medium/30 border-t-2 border-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <Ruler className="text-black" />
                <h4 className="font-black tracking-widest text-sm uppercase">Tabla de Talles</h4>
              </div>
              <p className="text-xs text-black/60 font-medium leading-relaxed uppercase tracking-widest">
                Consultá las medidas exactas de nuestras prendas para elegir el talle perfecto (Hasta 6XL).
              </p>
              <Link to="/tabla-talles" className="inline-block text-[10px] font-black underline underline-offset-4 tracking-[0.2em] uppercase">Ver Tabla</Link>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <Truck className="text-black" />
                <h4 className="font-black tracking-widest text-sm uppercase">Envíos y Entregas</h4>
              </div>
              <p className="text-xs text-black/60 font-medium leading-relaxed uppercase tracking-widest">
                Realizamos envíos a todo el país. Conocé nuestras políticas y tiempos de entrega.
              </p>
              <Link to="/politicas-envio" className="inline-block text-[10px] font-black underline underline-offset-4 tracking-[0.2em] uppercase">Info Envíos</Link>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <RefreshCw className="text-black" />
                <h4 className="font-black tracking-widest text-sm uppercase">Cambios y Reembolsos</h4>
              </div>
              <p className="text-xs text-black/60 font-medium leading-relaxed uppercase tracking-widest">
                Tu satisfacción es lo primero. Conocé cómo gestionar tus cambios.
              </p>
              <Link to="/reembolsos" className="inline-block text-[10px] font-black underline underline-offset-4 tracking-[0.2em] uppercase">Ver Políticas</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
