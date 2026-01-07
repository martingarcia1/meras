import { useState } from 'react';
import { RotateCcw, Eye, Maximize2, Palette, Shirt } from 'lucide-react';
import EditorDiseño from './EditorDiseño';
import PreviewFinal from './PreviewFinal';
import Pedido from './Pedido';

// Componente de barra de progreso reutilizable
const ProgressBar = ({ step }) => (
  <div className="border-b border-black/10 bg-white px-6 py-4">
    <div className="flex items-center justify-center gap-8 max-w-4xl mx-auto">
      {[
        { num: 1, label: 'Elegir Remera' },
        { num: 2, label: 'Diseñar' },
        { num: 3, label: 'Preview' },
        { num: 4, label: 'Pedido' },
      ].map((s) => (
        <div key={s.num} className="flex items-center gap-4">
          <div
            className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-black text-sm transition-all ${
              step === s.num
                ? 'bg-black text-white border-black'
                : step > s.num
                ? 'bg-black/20 text-black border-black/30'
                : 'bg-white text-black/40 border-black/20'
            }`}
          >
            {s.num}
          </div>
          <span
            className={`text-sm font-bold uppercase tracking-wider ${
              step === s.num ? 'text-black' : 'text-black/40'
            }`}
          >
            {s.label}
          </span>
          {s.num < 4 && (
            <div
              className={`w-12 h-0.5 ${
                step > s.num ? 'bg-black' : 'bg-black/20'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  </div>
);

const Personalizador = () => {
  const [step, setStep] = useState(1); // 1: Elegir Remera, 2: Diseñar, 3: Preview, 4: Pedido
  const [selectedModel, setSelectedModel] = useState('Clásica');
  const [selectedColor, setSelectedColor] = useState('Blanco');
  const [selectedSize, setSelectedSize] = useState('M');
  const [viewSide, setViewSide] = useState('Frente');
  const [designData, setDesignData] = useState(null);
  const [designElements, setDesignElements] = useState(0);

  const models = [
    {
      name: 'Clásica',
      price: 15000,
      description: 'Corte regular, cómoda para uso diario',
    },
    {
      name: 'Entallada',
      price: 18000,
      description: 'Corte ajustado, estilo moderno',
    },
    {
      name: 'Oversized',
      price: 20000,
      description: 'Corte holgado, tendencia actual',
    },
  ];

  const colors = [
    { name: 'Blanco', hex: '#FFFFFF', class: 'bg-white' },
    { name: 'Negro', hex: '#000000', class: 'bg-black' },
    { name: 'Gris', hex: '#9CA3AF', class: 'bg-gray-400' },
    { name: 'Azul Oscuro', hex: '#1E3A8A', class: 'bg-blue-900' },
    { name: 'Rojo', hex: '#DC2626', class: 'bg-red-600' },
    { name: 'Verde', hex: '#16A34A', class: 'bg-green-600' },
    { name: 'Rosa', hex: '#EC4899', class: 'bg-pink-500' },
    { name: 'Amarillo', hex: '#EAB308', class: 'bg-yellow-400' },
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL', '5XL', '6XL'];

  const selectedModelData = models.find((m) => m.name === selectedModel);

  // Función para obtener el color hex del nombre
  const getColorHex = (colorName) => {
    const color = colors.find((c) => c.name === colorName);
    return color?.hex || '#FFFFFF';
  };

  // Paso 2: Diseñar
  if (step === 2) {
    return (
      <div className="min-h-screen bg-white text-black">
        <div className="border-b border-black/10 bg-beige-light/30 py-8 px-6">
          <h1 className="text-4xl font-black tracking-tighter uppercase mb-2">Ropa Personalizada</h1>
          <p className="text-lg text-black/60 italic">Diseña tu remera perfecta</p>
        </div>
        <ProgressBar step={step} />
        <EditorDiseño
          colorBase={selectedColor}
          selectedModel={selectedModel}
          selectedSize={selectedSize}
          onSave={(data) => {
            setDesignData(data);
            setDesignElements(data.capas?.length || 0);
            setStep(3);
          }}
          onBack={() => setStep(1)}
          onElementsChange={(count) => setDesignElements(count)}
        />
      </div>
    );
  }

  // Paso 3: Preview Final
  if (step === 3) {
    return (
      <div className="min-h-screen bg-white text-black">
        <div className="border-b border-black/10 bg-beige-light/30 py-8 px-6">
          <h1 className="text-4xl font-black tracking-tighter uppercase mb-2">Ropa Personalizada</h1>
          <p className="text-lg text-black/60 italic">Diseña tu remera perfecta</p>
        </div>
        <ProgressBar step={step} />
        <PreviewFinal
          selectedModel={selectedModel}
          selectedColor={selectedColor}
          selectedSize={selectedSize}
          designData={designData}
          designElements={designElements}
          onEdit={() => setStep(2)}
          onContinue={() => setStep(4)}
          getColorHex={getColorHex}
        />
      </div>
    );
  }

  // Paso 4: Pedido
  if (step === 4) {
    return (
      <div className="min-h-screen bg-white text-black">
        <div className="border-b border-black/10 bg-beige-light/30 py-8 px-6">
          <h1 className="text-4xl font-black tracking-tighter uppercase mb-2">Ropa Personalizada</h1>
          <p className="text-lg text-black/60 italic">Diseña tu remera perfecta</p>
        </div>
        <ProgressBar step={step} />
        <Pedido
          selectedModel={selectedModel}
          selectedColor={selectedColor}
          selectedSize={selectedSize}
          designData={designData}
          designElements={designElements}
          modelData={selectedModelData}
          onBack={() => setStep(3)}
          getColorHex={getColorHex}
        />
      </div>
    );
  }

  // Paso 1: Elegir Remera
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header con título */}
      <div className="border-b border-black/10 bg-beige-light/30 py-8 px-6">
        <h1 className="text-4xl font-black tracking-tighter uppercase mb-2">Ropa Personalizada</h1>
        <p className="text-lg text-black/60 italic">Diseña tu remera perfecta</p>
      </div>

      <ProgressBar />

      {/* Contenido principal */}
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-200px)]">
        {/* Panel izquierdo - Opciones */}
        <div className="lg:w-1/3 border-r border-black/10 bg-beige-light/20 p-6 overflow-y-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-black tracking-tight uppercase mb-2">Elige tu Remera</h2>
            <p className="text-sm text-black/60">Selecciona el modelo, color y talla que prefieras</p>
          </div>

          {/* Modelo */}
          <div className="mb-8">
            <h3 className="text-sm font-black uppercase tracking-wider mb-4">Modelo</h3>
            <div className="space-y-3">
              {models.map((model) => (
                <button
                  key={model.name}
                  onClick={() => setSelectedModel(model.name)}
                  className={`w-full p-4 border-2 text-left transition-all ${
                    selectedModel === model.name
                      ? 'border-black bg-beige-medium/40 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                      : 'border-black/20 bg-white hover:border-black/40'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-black text-lg uppercase">{model.name}</span>
                    <span className="font-bold text-lg">${model.price.toLocaleString()}</span>
                  </div>
                  <p className="text-xs text-black/60 italic">{model.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Color */}
          <div className="mb-8">
            <h3 className="text-sm font-black uppercase tracking-wider mb-4">Color</h3>
            <div className="grid grid-cols-4 gap-3">
              {colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  className={`aspect-square rounded-full border-2 transition-all ${
                    color.class
                  } ${
                    selectedColor === color.name
                      ? 'ring-4 ring-black ring-offset-2 scale-110'
                      : 'border-black/20 hover:border-black/40'
                  }`}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Talla */}
          <div className="mb-8">
            <h3 className="text-sm font-black uppercase tracking-wider mb-4">Talla</h3>
            <div className="grid grid-cols-5 gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-3 border-2 text-sm font-black transition-all ${
                    selectedSize === size
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-black border-black/20 hover:border-black/40'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Resumen */}
          <div className="mb-8 p-4 bg-black/5 border border-black/10">
            <h3 className="text-sm font-black uppercase tracking-wider mb-3">Resumen</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-black/60">Modelo:</span>
                <span className="font-bold">{selectedModel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-black/60">Talla:</span>
                <span className="font-bold">{selectedSize}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-black/60">Precio base:</span>
                <span className="font-bold">${selectedModelData?.price.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Botón continuar */}
          <button
            onClick={() => setStep(2)}
            className="w-full bg-black text-white font-black py-4 tracking-widest uppercase text-sm hover:bg-black/80 transition-all"
          >
            Continuar al Diseño
          </button>
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

          {/* Vista de la remera */}
          <div className="flex items-center justify-center min-h-[500px] bg-beige-light/30 border-2 border-black/10">
            <div className="relative">
              {/* Remera plana mejorada con SVG */}
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
                {/* Zona de diseño (placeholder) */}
                {designElements > 0 && (
                  <rect
                    x="110"
                    y="180"
                    width="100"
                    height="100"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1"
                    strokeDasharray="5,5"
                    opacity="0.3"
                  />
                )}
              </svg>
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

export default Personalizador;
