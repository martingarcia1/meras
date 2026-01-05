import { useState } from 'react';
import { MessageCircle, Info, Palette } from 'lucide-react';

const Personalizador = () => {
  const [selectedColor, setSelectedColor] = useState('Blanco');
  const [selectedSize, setSelectedSize] = useState('M');

  const colors = [
    { name: 'Blanco', class: 'bg-white border-black/10' },
    { name: 'Negro', class: 'bg-black border-black' },
    { name: 'Gris', class: 'bg-gray-400 border-gray-500' },
  ];

  // Según el requerimiento: "En la parte donde estén los talles voy a poner todos esos colores"
  // Interpretación: Mostrar la amplia gama pero avisar que están sujetos a disponibilidad.
  const extraColors = [
    { name: 'Rojo', class: 'bg-red-600' },
    { name: 'Azul', class: 'bg-blue-600' },
    { name: 'Verde', class: 'bg-green-600' },
    { name: 'Amarillo', class: 'bg-yellow-400' },
    { name: 'Rosa', class: 'bg-pink-300' },
    { name: 'Beige', class: 'bg-[#f5f0e1]' },
  ];

  const sizes = ['S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL', '5XL', '6XL'];

  return (
    <div className="min-h-screen bg-beige-light text-black px-4 py-16 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Lado Izquierdo: El Boceto (VISTA PRINCIPAL) */}
          <div className="flex-1 bg-beige-medium/30 aspect-square flex items-center justify-center border-2 border-black relative shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] bg-white/50">
            <div className="text-center group cursor-crosshair">
              {/* Imagen del Boceto */}
              <div className={`w-72 h-96 ${selectedColor === 'Negro' ? 'bg-black text-white' : selectedColor === 'Gris' ? 'bg-gray-400' : 'bg-white'} border-4 border-black flex flex-col items-center justify-center transition-all duration-500 shadow-2xl relative`}>
                 <span className="font-black text-3xl tracking-tighter opacity-10 uppercase transform -rotate-45">Boceto Mera's</span>
                 <span className="text-[10px] font-bold opacity-30 mt-4 tracking-[0.3em] uppercase">{selectedColor}</span>
                 
                 {/* Indicador de zona de estampado */}
                 <div className="absolute inset-x-8 top-20 bottom-24 border-2 border-dashed border-black/10 flex items-center justify-center">
                    <span className="text-[10px] font-black tracking-widest opacity-20 uppercase">Zona de Diseño</span>
                 </div>
              </div>
              <p className="mt-8 text-black/30 italic font-medium tracking-widest text-sm uppercase">Frente de la prenda</p>
            </div>
            
            <div className="absolute top-6 right-6 flex flex-col gap-3">
               <button className="p-3 bg-black text-beige-light hover:scale-110 transition-transform">
                  <Info size={24} />
               </button>
            </div>
          </div>

          {/* Lado Derecho: Controles */}
          <div className="flex-1 flex flex-col">
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-px w-8 bg-black"></div>
                <span className="text-[10px] font-black tracking-[0.4em] uppercase">Mera Custom</span>
              </div>
              <h1 className="text-6xl font-black tracking-tighter uppercase mb-4 leading-none italic">
                Personalizá <br /> tu remera
              </h1>
              <p className="text-xl text-black/60 italic font-light tracking-wide">
                Lo primero es la base. Elegí tu color y talle.
              </p>
            </div>

            {/* Selección de Color BASE */}
            <div className="mb-12">
              <h3 className="font-black mb-6 tracking-[0.2em] text-xs uppercase border-b border-black/10 pb-2 flex justify-between items-end">
                <span>1. Colores de Stock Inmediato</span>
                <span className="text-[9px] text-black/40 italic">Blanco / Negro / Gris</span>
              </h3>
              <div className="flex gap-6">
                {colors.map((color) => (
                  <div key={color.name} className="flex flex-col items-center gap-2">
                    <button
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-14 h-14 rounded-none border-2 transition-all ${color.class} ${selectedColor === color.name ? 'ring-4 ring-black ring-offset-4 ring-offset-beige-light scale-110 shadow-xl' : 'hover:scale-105 shadow-md'}`}
                    />
                    <span className="text-[10px] font-black tracking-widest uppercase">{color.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Selección de Otros Colores (Sujetos a disponibilidad) */}
            <div className="mb-12 p-6 bg-beige-medium/20 border-2 border-black/5">
              <div className="flex items-center gap-2 mb-6">
                <Palette size={16} />
                <h3 className="font-black tracking-[0.2em] text-xs uppercase">Más colores (Consultar Stock)</h3>
              </div>
              <div className="flex flex-wrap gap-4">
                {extraColors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => {
                      setSelectedColor(color.name);
                      // Aquí podríamos disparar un aviso
                    }}
                    className={`w-8 h-8 rounded-none border transition-all ${color.class} ${selectedColor === color.name ? 'ring-2 ring-black ring-offset-2 scale-110' : 'opacity-60 hover:opacity-100'}`}
                    title={color.name}
                  />
                ))}
              </div>
              <div className="mt-6 flex items-start gap-3 bg-black text-beige-light p-4">
                <Info size={18} className="shrink-0" />
                <p className="text-[10px] font-bold leading-relaxed tracking-widest uppercase">
                  Si elegís uno de estos colores, consultanos disponibilidad por WhatsApp antes de avanzar.
                </p>
              </div>
            </div>

            {/* Selección de Talle */}
            <div className="mb-12">
              <h3 className="font-black mb-6 tracking-[0.2em] text-xs uppercase border-b border-black/10 pb-2 flex justify-between">
                <span>2. Seleccioná tu talle</span>
                <span className="text-[9px] text-black/40">Disponible hasta 6XL</span>
              </h3>
              <div className="grid grid-cols-5 gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-4 border-2 text-sm font-black transition-all ${selectedSize === size ? 'bg-black text-beige-light border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' : 'bg-transparent text-black border-black/10 hover:border-black'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA Final */}
            <div className="mt-auto space-y-4">
              <a 
                href={`https://wa.me/tu_numero?text=Hola! Quiero consultar disponibilidad para una remera ${selectedColor} en talle ${selectedSize}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white font-black py-5 transition-all uppercase tracking-widest text-sm shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
              >
                <MessageCircle size={22} /> Consultar disponibilidad
              </a>
              <button className="w-full bg-black text-beige-light font-black py-6 tracking-[0.3em] hover:bg-beige-medium hover:text-black transition-all uppercase text-lg border-2 border-black">
                Siguiente: Agregar Diseño
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Personalizador;
