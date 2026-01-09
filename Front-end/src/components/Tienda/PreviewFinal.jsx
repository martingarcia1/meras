import { useState } from 'react';
import { RotateCcw, Eye, Maximize2, Palette, Shirt, Edit, ShoppingCart } from 'lucide-react';

const PreviewFinal = ({ selectedModel, selectedColor, selectedSize, designData, designElements, onEdit, onContinue, getColorHex }) => {
  const [viewSide, setViewSide] = useState('Frente');

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-200px)]">
        {/* Panel izquierdo - Preview Final */}
        <div className="lg:w-1/3 border-r border-black/10 bg-beige-light/20 p-6 overflow-y-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-black tracking-tight uppercase mb-2">Preview Final</h2>
            <p className="text-sm text-black/60 mb-6">Revisa tu diseño antes de hacer el pedido</p>
            
            <div className="space-y-4">
              <button
                onClick={onEdit}
                className="w-full p-4 border-2 border-black/20 bg-white text-black font-black tracking-widest uppercase text-sm hover:border-black transition-all flex items-center justify-center gap-2"
              >
                <Edit size={18} /> Editar
              </button>
              <button
                onClick={onContinue}
                className="w-full p-4 bg-black text-white font-black tracking-widest uppercase text-sm hover:bg-black/80 transition-all flex items-center justify-center gap-2"
              >
                <ShoppingCart size={18} /> Hacer Pedido
              </button>
            </div>
          </div>
        </div>

        {/* Panel derecho - Preview en tiempo real */}
        <div className="lg:w-2/3 p-6 bg-white">
          <div className="mb-6">
            <h2 className="text-2xl font-black tracking-tight uppercase mb-2">Preview en Tiempo Real</h2>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-6 h-6 rounded-full border-2 border-black"
                  style={{ backgroundColor: getColorHex(selectedColor) }}
                />
                <span className="text-sm font-bold">
                  {selectedModel} • Talla {selectedSize}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewSide(viewSide === 'Frente' ? 'Espalda' : 'Frente')}
                  className="p-2 border border-black/20 hover:border-black transition-all text-xs"
                  title="Ver Atrás"
                >
                  <RotateCcw size={18} />
                </button>
                <button
                  className="p-2 border border-black/20 hover:border-black transition-all"
                  title="Vista"
                >
                  <Eye size={18} />
                </button>
                <button
                  className="p-2 border border-black/20 hover:border-black transition-all"
                  title="Expandir"
                >
                  <Maximize2 size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Vista de la remera con diseño */}
          <div className="flex items-center justify-center min-h-[500px] bg-beige-light/30 border-2 border-black/10">
            <div className="relative">
              {/* Mostrar el preview completo (ya incluye la remera y el diseño) */}
              {designData?.previewImageUrl ? (
                <img
                  src={designData.previewImageUrl}
                  alt="Diseño de remera"
                  className="drop-shadow-lg max-w-full h-auto"
                  style={{ maxHeight: '500px' }}
                />
              ) : (
                /* Fallback: mostrar solo el SVG de la remera si no hay diseño guardado */
                <svg
                  width="320"
                  height="400"
                  viewBox="0 0 320 400"
                  className="drop-shadow-lg"
                >
                  {/* Cuerpo de la remera */}
                  <path
                    d={selectedModel === 'Oversized'
                      ? 'M 50 40 L 270 40 L 300 80 L 300 360 L 270 380 L 50 380 L 20 360 L 20 80 Z'
                      : selectedModel === 'Entallada'
                      ? 'M 60 30 L 260 30 L 290 70 L 290 350 L 260 370 L 60 370 L 30 350 L 30 70 Z'
                      : 'M 55 35 L 265 35 L 295 75 L 295 355 L 265 375 L 55 375 L 25 355 L 25 75 Z'}
                    fill={getColorHex(selectedColor)}
                    stroke="#000000"
                    strokeWidth="2"
                  />
                  {/* Manga izquierda */}
                  <path
                    d="M 20 80 Q 10 100 0 120 L 0 200 Q 10 220 20 240 L 20 80 Z"
                    fill={getColorHex(selectedColor)}
                    stroke="#000000"
                    strokeWidth="2"
                  />
                  {/* Manga derecha */}
                  <path
                    d="M 300 80 Q 310 100 320 120 L 320 200 Q 310 220 300 240 L 300 80 Z"
                    fill={getColorHex(selectedColor)}
                    stroke="#000000"
                    strokeWidth="2"
                  />
                  {/* Cuello redondo */}
                  <ellipse
                    cx="160"
                    cy="40"
                    rx="35"
                    ry="20"
                    fill={selectedColor === 'Negro' ? '#1a1a1a' : '#f5f5f5'}
                    stroke="#000000"
                    strokeWidth="1.5"
                    opacity="0.3"
                  />
                </svg>
              )}
              <p className="text-center mt-4 text-sm text-black/40 font-bold uppercase tracking-wider">
                Vista: {viewSide}
              </p>
            </div>
          </div>

          {/* Barra de estado inferior */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Palette size={18} className="text-blue-600" />
                <span className="text-xs font-bold uppercase text-blue-600">Diseños</span>
              </div>
              <p className="text-sm font-bold">{designElements} elemento{designElements !== 1 ? 's' : ''} aplicado{designElements !== 1 ? 's' : ''}</p>
            </div>
            <div className="p-4 bg-green-50 border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <Eye size={18} className="text-green-600" />
                <span className="text-xs font-bold uppercase text-green-600">Vista</span>
              </div>
              <p className="text-sm font-bold">{viewSide} • Solo vista</p>
            </div>
            <div className="p-4 bg-purple-50 border border-purple-200">
              <div className="flex items-center gap-2 mb-2">
                <Shirt size={18} className="text-purple-600" />
                <span className="text-xs font-bold uppercase text-purple-600">Producto</span>
              </div>
              <p className="text-sm font-bold">{selectedModel.toLowerCase()} • Talla {selectedSize}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewFinal;

