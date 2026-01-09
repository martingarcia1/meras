import { useState } from 'react';
import { RotateCcw, Eye, Maximize2, Palette, Shirt, ShoppingCart, User, Package, Factory, Truck, Calendar, Check } from 'lucide-react';

const Pedido = ({ selectedModel, selectedColor, selectedSize, designData, designElements, modelData, onBack, getColorHex }) => {
  const [viewSide, setViewSide] = useState('Frente');
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    ciudad: '',
    codigoPostal: '',
    notas: '',
  });

  // Calcular precios
  const precioBase = modelData?.price || 0;
  const precioDiseños = designElements > 0 ? designElements * 5000 : 0;
  const subtotal = precioBase + precioDiseños;
  const impuestos = subtotal * 0.1; // 10% de impuestos
  const envio = 8000;
  const total = subtotal + impuestos + envio;

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí se enviaría el pedido al backend
    alert('¡Pedido confirmado! Te enviaremos un email con los detalles.');
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-200px)]">
        {/* Panel izquierdo - Formulario */}
        <div className="lg:w-1/2 border-r border-black/10 bg-beige-light/20 p-6 overflow-y-auto">
          {/* Resumen del Pedido */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <ShoppingCart size={20} />
              <h2 className="text-2xl font-black tracking-tight uppercase">Resumen del Pedido</h2>
            </div>
            <p className="text-sm text-black/60 mb-6">Completa tus datos para finalizar la compra</p>

            {/* Detalles del Producto */}
            <div className="mb-6 p-4 bg-white border-2 border-black/10">
              <h3 className="font-black uppercase tracking-wider mb-4 flex items-center gap-2">
                <ShoppingCart size={18} /> Detalles del Producto
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-black/60">Producto:</span>
                  <span className="font-bold">Remera {selectedModel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black/60">Color y Talla:</span>
                  <span className="font-bold">{selectedColor} - Talla {selectedSize}</span>
                </div>
                {designElements > 0 && (
                  <div className="flex justify-between">
                    <span className="text-black/60">Personalización:</span>
                    <span className="font-bold">{designElements} diseño{designElements > 1 ? 's' : ''} personalizado{designElements > 1 ? 's' : ''}</span>
                  </div>
                )}
                <div className="flex justify-between pt-2 border-t border-black/10">
                  <span className="text-black/60">Precio base:</span>
                  <span className="font-bold">${precioBase.toLocaleString()}</span>
                </div>
                {precioDiseños > 0 && (
                  <div className="flex justify-between">
                    <span className="text-black/60">Diseños:</span>
                    <span className="font-bold">+${precioDiseños.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between pt-2 border-t border-black/10">
                  <span className="font-bold">Subtotal:</span>
                  <span className="font-bold">${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black/60">Impuestos:</span>
                  <span className="font-bold">${impuestos.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black/60">Envío:</span>
                  <span className="font-bold">${envio.toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-2 border-t-2 border-black font-black text-lg">
                  <span>TOTAL:</span>
                  <span>${total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Información de Contacto */}
            <div className="mb-6 p-4 bg-white border-2 border-black/10">
              <h3 className="font-black uppercase tracking-wider mb-4 flex items-center gap-2">
                <User size={18} /> Información de Contacto
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider mb-2">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    required
                    placeholder="Tu nombre"
                    className="w-full px-4 py-3 border-2 border-black/20 focus:border-black focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="tu@email.com"
                    className="w-full px-4 py-3 border-2 border-black/20 focus:border-black focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    placeholder="+54 381 123 4567"
                    className="w-full px-4 py-3 border-2 border-black/20 focus:border-black focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider mb-2">
                    Dirección *
                  </label>
                  <input
                    type="text"
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleInputChange}
                    required
                    placeholder="Calle y número"
                    className="w-full px-4 py-3 border-2 border-black/20 focus:border-black focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold uppercase tracking-wider mb-2">
                      Ciudad *
                    </label>
                    <input
                      type="text"
                      name="ciudad"
                      value={formData.ciudad}
                      onChange={handleInputChange}
                      required
                      placeholder="Tu ciudad"
                      className="w-full px-4 py-3 border-2 border-black/20 focus:border-black focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold uppercase tracking-wider mb-2">
                      Código Postal *
                    </label>
                    <input
                      type="text"
                      name="codigoPostal"
                      value={formData.codigoPostal}
                      onChange={handleInputChange}
                      required
                      placeholder="12345"
                      className="w-full px-4 py-3 border-2 border-black/20 focus:border-black focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider mb-2">
                    Notas adicionales
                  </label>
                  <textarea
                    name="notas"
                    value={formData.notas}
                    onChange={handleInputChange}
                    placeholder="Instrucciones especiales, preferencias de entrega, etc."
                    rows="4"
                    className="w-full px-4 py-3 border-2 border-black/20 focus:border-black focus:outline-none resize-none"
                  />
                </div>
              </form>
            </div>

            {/* Información de Envío */}
            <div className="mb-6 p-4 bg-white border-2 border-black/10">
              <h3 className="font-black uppercase tracking-wider mb-4 flex items-center gap-2">
                <Package size={18} /> Información de Envío
              </h3>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <Factory size={24} className="mx-auto mb-2 text-black/60" />
                  <p className="text-xs font-bold uppercase mb-1">Producción</p>
                  <p className="text-sm font-bold">3-5 días hábiles</p>
                </div>
                <div className="text-center">
                  <Truck size={24} className="mx-auto mb-2 text-black/60" />
                  <p className="text-xs font-bold uppercase mb-1">Envío</p>
                  <p className="text-sm font-bold">2-3 días hábiles</p>
                </div>
                <div className="text-center">
                  <Calendar size={24} className="mx-auto mb-2 text-black/60" />
                  <p className="text-xs font-bold uppercase mb-1">Entrega</p>
                  <p className="text-sm font-bold">5-8 días total</p>
                </div>
              </div>
              <p className="text-xs text-black/60 italic">
                Te enviaremos un email con el tracking una vez que tu pedido esté en camino.
              </p>
            </div>

            {/* Botones */}
            <div className="space-y-3">
              <button
                onClick={onBack}
                className="w-full p-4 border-2 border-black/20 bg-white text-black font-black tracking-widest uppercase text-sm hover:border-black transition-all"
              >
                Volver al Preview
              </button>
              <button
                onClick={handleSubmit}
                className="w-full p-4 bg-black text-white font-black tracking-widest uppercase text-sm hover:bg-black/80 transition-all flex items-center justify-center gap-2"
              >
                <Check size={18} /> Confirmar Pedido - ${total.toLocaleString()}
              </button>
            </div>
          </div>
        </div>

        {/* Panel derecho - Preview */}
        <div className="lg:w-1/2 p-6 bg-white">
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

          {/* Barra de estado */}
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

export default Pedido;

