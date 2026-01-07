import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { productsApi } from '../../services/api';
import { getImagePath } from '../../utils/imageHelper';
import { ArrowLeft, ShoppingCart, Ruler, Palette } from 'lucide-react';

const ProductoDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await productsApi.getById(Number(id));
        setProduct(response.data);
        if (response.data.variantes && response.data.variantes.length > 0) {
          setSelectedVariant(response.data.variantes[0]);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        navigate('/catalogo');
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProduct();
  }, [id, navigate]);

  const handleAddToCart = () => {
    // TODO: Implementar lógica del carrito
    alert('Producto agregado al carrito');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-beige-light flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-black mx-auto mb-4"></div>
          <p className="text-black/40 font-bold tracking-widest uppercase text-sm">Cargando producto...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-beige-light flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-light italic text-black/40 mb-4">Producto no encontrado</p>
          <Link to="/catalogo" className="inline-block border-2 border-black px-8 py-4 font-black tracking-widest uppercase hover:bg-black hover:text-beige-light transition-all">
            Volver al Catálogo
          </Link>
        </div>
      </div>
    );
  }

  const images = product.imagenesSecundarias && product.imagenesSecundarias.length > 0
    ? [product.imagenPrincipalUrl, ...product.imagenesSecundarias]
    : [product.imagenPrincipalUrl];

  return (
    <div className="min-h-screen bg-beige-light text-black py-12 px-4 font-sans">
      <div className="max-w-7xl mx-auto">
        <Link to="/catalogo" className="inline-flex items-center gap-2 text-black/40 hover:text-black mb-8 transition-colors group font-bold tracking-widest text-xs uppercase">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Volver al catálogo
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Galería de Imágenes */}
          <div>
            <div className="aspect-square bg-beige-medium/20 border-2 border-black mb-4 overflow-hidden relative">
              {images[selectedImage] ? (
                <img
                  src={getImagePath(images[selectedImage])}
                  alt={product.nombre}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                />
              ) : null}
              <div className={`w-full h-full flex items-center justify-center text-black/20 italic font-bold uppercase ${images[selectedImage] ? 'hidden' : ''}`}>
                {product.nombre}
              </div>
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square border-2 overflow-hidden transition-all ${
                      selectedImage === index
                        ? 'border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                        : 'border-black/20 hover:border-black/40'
                    }`}
                  >
                    <img src={getImagePath(img)} alt={`Vista ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Información del Producto */}
          <div className="flex flex-col">
            <div className="mb-8">
              <span className="text-xs font-black tracking-[0.3em] uppercase text-black/40 mb-2 block">
                {product.categoria?.nombre || 'Sin categoría'}
              </span>
              <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase mb-4 leading-none italic">
                {product.nombre}
              </h1>
              <p className="text-3xl font-light mb-6">${product.precioBase?.toLocaleString('es-AR') || '0'}</p>
              {product.descripcion && (
                <p className="text-lg font-light italic text-black/70 leading-relaxed mb-8">
                  {product.descripcion}
                </p>
              )}
            </div>

            {/* Variantes (Colores y Talles) */}
            {product.variantes && product.variantes.length > 0 && (
              <div className="space-y-6 mb-8">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Palette size={18} />
                    <h3 className="font-black text-sm tracking-widest uppercase">Color</h3>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {[...new Set(product.variantes.map((v) => v.color))].map((color) => {
                      const variant = product.variantes.find((v) => v.color === color);
                      return (
                        <button
                          key={color}
                          onClick={() => setSelectedVariant(variant)}
                          className={`px-4 py-2 border-2 font-black text-xs tracking-widest uppercase transition-all ${
                            selectedVariant?.color === color
                              ? 'bg-black text-beige-light border-black'
                              : 'bg-transparent text-black border-black/20 hover:border-black'
                          }`}
                        >
                          {color}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {selectedVariant && (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Ruler size={18} />
                      <h3 className="font-black text-sm tracking-widest uppercase">Talle</h3>
                      {selectedVariant.stock !== undefined && (
                        <span className="text-xs text-black/40 italic">
                          (Stock: {selectedVariant.stock})
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {product.variantes
                        .filter((v) => v.color === selectedVariant.color)
                        .map((variant) => (
                          <button
                            key={variant.id}
                            onClick={() => setSelectedVariant(variant)}
                            className={`px-4 py-2 border-2 font-black text-xs tracking-widest uppercase transition-all ${
                              selectedVariant.id === variant.id
                                ? 'bg-black text-beige-light border-black'
                                : variant.stock === 0
                                ? 'bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed'
                                : 'bg-transparent text-black border-black/20 hover:border-black'
                            }`}
                            disabled={variant.stock === 0}
                          >
                            {variant.talle}
                          </button>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Botón Agregar al Carrito */}
            <div className="mt-auto space-y-4">
              <button
                onClick={handleAddToCart}
                disabled={!selectedVariant || selectedVariant.stock === 0}
                className="w-full bg-black text-beige-light font-black py-6 tracking-[0.3em] hover:bg-black/80 transition-all uppercase text-lg border-2 border-black disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                <ShoppingCart size={24} />
                Agregar al Carrito
              </button>
              {selectedVariant && selectedVariant.stock === 0 && (
                <p className="text-xs font-bold text-red-600 uppercase tracking-widest text-center">
                  Sin stock disponible
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductoDetalle;

