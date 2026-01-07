const axios = require('axios');

const API_BASE_URL = process.env.API_URL || 'http://localhost:3000';

// Configuración de variantes estándar
const talles = ['S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL', '5XL', '6XL'];
const colores = ['Blanco', 'Negro', 'Gris'];

// Función para crear una variante
async function crearVariante(productId, color, talle, stock = 50) {
  const sku = `PROD-${productId}-${color.substring(0, 3).toUpperCase()}-${talle}`;
  
  try {
    const response = await axios.post(`${API_BASE_URL}/products/variants`, {
      productId: productId,
      color: color,
      talle: talle,
      sku: sku,
      stock: stock,
      precio: null // Usa el precio base del producto
    });
    
    console.log(`✅ Variante creada: ${color} - ${talle} para producto ${productId} (SKU: ${sku})`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 400 && error.response?.data?.message?.includes('duplicate')) {
      console.log(`⚠️  Variante ya existe: ${color} - ${talle} para producto ${productId}`);
      return null;
    }
    console.error(`❌ Error creando variante ${color} - ${talle} para producto ${productId}:`, error.response?.data?.message || error.message);
    return null;
  }
}

// Función para crear todas las variantes de un producto
async function crearVariantesProducto(productId, coloresProducto = colores, tallesProducto = talles) {
  console.log(`\n📦 Creando variantes para producto ID: ${productId}`);
  console.log(`   Colores: ${coloresProducto.join(', ')}`);
  console.log(`   Talles: ${tallesProducto.join(', ')}`);
  
  const variantesCreadas = [];
  
  for (const color of coloresProducto) {
    for (const talle of tallesProducto) {
      // Ajustar stock según el talle (talles grandes tienen menos stock)
      let stock = 50;
      if (talle === 'XXL' || talle === '3XL') stock = 20;
      if (talle === '4XL' || talle === '5XL') stock = 10;
      if (talle === '6XL') stock = 5;
      
      const variante = await crearVariante(productId, color, talle, stock);
      if (variante) {
        variantesCreadas.push(variante);
      }
      
      // Pequeña pausa para no saturar el servidor
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
  
  console.log(`✅ Total variantes creadas para producto ${productId}: ${variantesCreadas.length}`);
  return variantesCreadas;
}

// Función principal
async function main() {
  const args = process.argv.slice(2);
  const productoEspecifico = args.includes('--producto') ? parseInt(args[args.indexOf('--producto') + 1]) : null;
  
  console.log('🚀 Iniciando creación de variantes...\n');
  
  try {
    if (productoEspecifico) {
      // Crear variantes solo para un producto específico
      console.log(`🎯 Modo: Producto específico (ID: ${productoEspecifico})\n`);
      await crearVariantesProducto(productoEspecifico);
      console.log('\n🎉 ¡Proceso completado!');
    } else {
      // Obtener todos los productos y crear variantes para cada uno
      console.log('🌐 Modo: Todos los productos\n');
      
      const productosResponse = await axios.get(`${API_BASE_URL}/products`);
      const productos = productosResponse.data;
      
      console.log(`📋 Encontrados ${productos.length} productos\n`);
      
      // Crear variantes para cada producto
      for (const producto of productos) {
        // Determinar colores según el tipo de producto
        let coloresProducto = colores;
        
        // Si es un producto de diseño (cine, música), solo usar Negro y Blanco
        if (producto.categoria?.slug === 'catalogo-diseno') {
          coloresProducto = ['Negro', 'Blanco'];
        }
        
        // Si es un accesorio (piluso), usar todos los colores
        if (producto.categoria?.slug === 'accesorios') {
          coloresProducto = ['Negro', 'Blanco', 'Gris', 'Beige'];
        }
        
        await crearVariantesProducto(producto.id, coloresProducto, talles);
        
        // Pausa entre productos
        await new Promise(resolve => setTimeout(resolve, 500));
      }
      
      console.log('\n🎉 ¡Proceso completado!');
      console.log('\n📊 Resumen:');
      console.log(`   Productos procesados: ${productos.length}`);
      console.log(`   Variantes por producto: ~${colores.length * talles.length}`);
      console.log(`   Total estimado de variantes: ~${productos.length * colores.length * talles.length}`);
    }
    
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
    if (error.code === 'ECONNREFUSED') {
      console.error('\n💡 Asegurate de que el servidor esté corriendo en http://localhost:3000');
    }
    process.exit(1);
  }
}

// Ejecutar el script
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { crearVariante, crearVariantesProducto };
