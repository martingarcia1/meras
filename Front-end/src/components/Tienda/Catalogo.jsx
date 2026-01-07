import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productsApi } from '../../services/api';
import { getImagePath } from '../../utils/imageHelper';
import { ShoppingCart, ArrowLeft, Filter } from 'lucide-react';

// Mapeo de slugs de URL a nombres de categorías
const categoryMap = {
  'remeras-basicas': { nombre: 'Remeras Básicas', tipo: 'remera', subcategoria: 'basicas' },
  'remeras-diseno': { nombre: 'Catálogo Diseño', tipo: 'remera', subcategoria: 'diseno' },
  'argento': { nombre: 'Argento 🇦🇷', tipo: 'remera', subcategoria: 'argento' },
  'gorras': { nombre: 'Gorras', tipo: 'accesorio', subcategoria: 'gorras' },
  'pilusos': { nombre: 'Pilusos', tipo: 'accesorio', subcategoria: 'pilusos' },
  'telas': { nombre: 'Telas Sublimadas', tipo: 'sublimacion', subcategoria: 'telas' },
  'banderas': { nombre: 'Banderas', tipo: 'sublimacion', subcategoria: 'banderas' },
};

const Catalogo = () => {
  const { categoria } = useParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsRes, categoriesRes] = await Promise.all([
          productsApi.getAll(),
          productsApi.getCategories(),
        ]);
        setProducts(productsRes.data);
        setCategories(categoriesRes.data);
        
        // Si hay una categoría en la URL, buscar su ID
        if (categoria && categoryMap[categoria]) {
          const categoryInfo = categoryMap[categoria];
          // Buscar la categoría por nombre o slug
          const foundCategory = categoriesRes.data.find(
            (cat) => cat.slug === categoria || cat.nombre.toLowerCase().includes(categoryInfo.subcategoria)
          );
          if (foundCategory) {
            setSelectedCategory(foundCategory.id);
          }
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [categoria]);

  // Filtrar productos
  let filteredProducts = products;
  
  if (categoria && categoryMap[categoria]) {
    const categoryInfo = categoryMap[categoria];
    
    // Filtrar por tipo de prenda o categoría
    if (categoryInfo.tipo === 'remera') {
      filteredProducts = products.filter((p) => {
        // Filtrar remeras
        if (p.tipoPrenda !== 'remera') return false;
        
        // Filtrar por subcategoría según el slug
        if (categoryInfo.subcategoria === 'basicas') {
          // Remeras básicas: productos sin diseño especial
          return p.slug.includes('basica') || p.categoria?.slug === 'remeras-basicas';
        } else if (categoryInfo.subcategoria === 'diseno') {
          // Catálogo diseño: productos con diseños (anime, cine, música, etc.)
          const disenoSlugs = ['anime', 'cine', 'deportes', 'musica', 'series'];
          return disenoSlugs.some(slug => p.slug.includes(slug) || p.categoria?.slug?.includes(slug));
        } else if (categoryInfo.subcategoria === 'argento') {
          // Argento: productos relacionados con Argentina
          return p.slug.includes('argento') || p.slug.includes('argentina') || p.categoria?.slug === 'argento';
        }
        return true;
      });
    } else if (categoryInfo.tipo === 'accesorio') {
      // Filtrar accesorios
      filteredProducts = products.filter((p) => {
        if (categoryInfo.subcategoria === 'gorras') {
          return p.tipoPrenda === 'otro' && (p.slug.includes('gorra') || p.categoria?.slug === 'gorras');
        } else if (categoryInfo.subcategoria === 'pilusos') {
          return p.tipoPrenda === 'otro' && (p.slug.includes('piluso') || p.categoria?.slug === 'pilusos');
        }
        return p.tipoPrenda === 'otro';
      });
    } else if (categoryInfo.tipo === 'sublimacion') {
      // Filtrar sublimación
      filteredProducts = products.filter((p) => {
        if (categoryInfo.subcategoria === 'telas') {
          return p.slug.includes('tela') || p.categoria?.slug === 'telas-sublimadas';
        } else if (categoryInfo.subcategoria === 'banderas') {
          return p.slug.includes('bandera') || p.categoria?.slug === 'banderas';
        }
        return true;
      });
    }
  } else if (selectedCategory) {
    // Filtrar por categoría seleccionada manualmente
    filteredProducts = products.filter((p) => p.categoria?.id === selectedCategory);
  }

  const currentCategoryName = categoria && categoryMap[categoria] 
    ? categoryMap[categoria].nombre 
    : 'Todos nuestros productos';

  if (loading) {
    return (
      <div className="min-h-screen bg-beige-light flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-black mx-auto mb-4"></div>
          <p className="text-black/40 font-bold tracking-widest uppercase text-sm">Cargando catálogo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-beige-light text-black py-12 px-4 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Link to="/" className="inline-flex items-center gap-2 text-black/40 hover:text-black mb-8 transition-colors group font-bold tracking-widest text-xs uppercase">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Volver al inicio
          </Link>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-4 uppercase leading-none italic">
            {categoria && categoryMap[categoria] ? categoryMap[categoria].nombre : 'Catálogo'}
          </h1>
          <p className="text-xl font-light italic text-black/40 tracking-widest uppercase">{currentCategoryName}</p>
        </div>

        {/* Filtros de Categorías */}
        <div className="mb-12 flex flex-wrap gap-4 items-center">
          <Filter size={20} className="text-black/40" />
          <Link
            to="/catalogo"
            className={`px-6 py-2 border-2 font-black text-xs tracking-widest uppercase transition-all ${
              !categoria
                ? 'bg-black text-beige-light border-black'
                : 'bg-transparent text-black border-black/20 hover:border-black'
            }`}
          >
            Todos
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/catalogo/${cat.slug}`}
              className={`px-6 py-2 border-2 font-black text-xs tracking-widest uppercase transition-all ${
                categoria === cat.slug
                  ? 'bg-black text-beige-light border-black'
                  : 'bg-transparent text-black border-black/20 hover:border-black'
              }`}
            >
              {cat.nombre}
            </Link>
          ))}
        </div>

        {/* Grid de Productos */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-2xl font-light italic text-black/40 mb-4">No hay productos disponibles en esta categoría</p>
            <div className="flex gap-4 justify-center">
              <Link to="/catalogo" className="inline-block border-2 border-black px-8 py-4 font-black tracking-widest uppercase hover:bg-black hover:text-beige-light transition-all">
                Ver Todo el Catálogo
              </Link>
              <Link to="/personalizar" className="inline-block border-2 border-black px-8 py-4 font-black tracking-widest uppercase hover:bg-black hover:text-beige-light transition-all">
                Crear mi Prenda
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/producto/${product.id}`}
                className="group cursor-pointer"
              >
                <div className="aspect-3/4 bg-beige-medium/20 border-2 border-black mb-4 overflow-hidden relative shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-none transition-all">
                  {product.imagenPrincipalUrl ? (
                    <img
                      src={getImagePath(product.imagenPrincipalUrl)}
                      alt={product.nombre}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Si falla la carga, mostrar placeholder
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div className={`w-full h-full flex items-center justify-center text-black/20 italic font-bold uppercase text-sm ${product.imagenPrincipalUrl ? 'hidden' : ''}`}>
                    {product.nombre}
                  </div>
                  <div className="absolute top-4 right-4 bg-black text-beige-light px-3 py-1 text-[10px] font-black tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                    Ver
                  </div>
                </div>
                <h3 className="font-black text-lg tracking-tighter uppercase mb-1">{product.nombre}</h3>
                <p className="text-lg font-light">${product.precioBase?.toLocaleString('es-AR') || '0'}</p>
                {product.variantes && product.variantes.length > 0 && (
                  <p className="text-xs text-black/40 italic uppercase tracking-widest mt-1">
                    {product.variantes.length} variante{product.variantes.length > 1 ? 's' : ''}
                  </p>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Catalogo;
