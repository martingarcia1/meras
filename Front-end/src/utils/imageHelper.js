// Helper para obtener la ruta correcta de las imágenes en Vite
// Las imágenes en src/img/ se pueden acceder directamente con la ruta relativa

export const getImagePath = (imagePath) => {
  // Si ya es una URL completa (http/https), retornarla tal cual
  if (imagePath?.startsWith('http://') || imagePath?.startsWith('https://')) {
    return imagePath;
  }
  
  // Si es una ruta que empieza con /src/img/, retornarla tal cual (Vite la servirá)
  if (imagePath?.startsWith('/src/img/')) {
    return imagePath;
  }
  
  // Si es una ruta relativa desde img/, agregar /src/
  if (imagePath?.startsWith('img/')) {
    return `/src/${imagePath}`;
  }
  
  // Si es solo el nombre del archivo, buscar en img/indumentaria por defecto
  if (imagePath && !imagePath.includes('/')) {
    return `/src/img/indumentaria/${imagePath}`;
  }
  
  // Si viene con src/ pero sin la barra inicial
  if (imagePath?.startsWith('src/')) {
    return `/${imagePath}`;
  }
  
  // Imagen por defecto si no hay ruta
  return imagePath || '/src/img/logos/logo.png';
};

// Mapeo de categorías a carpetas de imágenes (para referencia)
export const imageFolders = {
  'remeras-basicas': '/src/img/indumentaria/',
  'remeras-diseno': {
    'cine': '/src/img/Cine/',
    'musica': '/src/img/music/',
    'anime': '/src/img/indumentaria/',
    'deportes': '/src/img/indumentaria/',
    'series': '/src/img/indumentaria/',
  },
  'argento': '/src/img/indumentaria/',
  'gorras': '/src/img/indumentaria/',
  'pilusos': '/src/img/pilusos/',
  'telas': '/src/img/lisas y fondos/',
  'banderas': '/src/img/indumentaria/',
};

// Función helper para construir rutas de imágenes por categoría
export const buildImagePath = (categoria, filename) => {
  if (categoria === 'remeras-diseno') {
    // Para catálogo diseño, detectar subcategoría por nombre de archivo o slug
    if (filename.includes('cine') || filename.includes('Cine')) {
      return `/src/img/Cine/${filename}`;
    }
    if (filename.includes('music') || filename.includes('musica')) {
      return `/src/img/music/${filename}`;
    }
    return `/src/img/indumentaria/${filename}`;
  }
  
  const folder = imageFolders[categoria];
  if (typeof folder === 'string') {
    return `${folder}${filename}`;
  }
  
  return `/src/img/indumentaria/${filename}`;
};
