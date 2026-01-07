# Guía de Uso de Imágenes en el Catálogo

## 📁 Estructura de Carpetas

Las imágenes están organizadas en `Front-end/src/img/`:

```
src/img/
├── Cine/              → Productos de cine
├── indumentaria/      → Remeras básicas
├── music/             → Productos de música
├── pilusos/           → Accesorios pilusos
├── lisas y fondos/    → Telas y fondos
└── logos/             → Logos de la marca
```

## 🔗 Cómo usar las imágenes al crear productos

### Opción 1: Ruta relativa desde src/img/ (Recomendado)

Cuando crees un producto en la base de datos, usa la ruta así:

**Para productos de Cine:**
```json
{
  "imagenPrincipalUrl": "/src/img/Cine/IMG_1406.JPG"
}
```

**Para productos de Música:**
```json
{
  "imagenPrincipalUrl": "/src/img/music/IMG_7295.JPG"
}
```

**Para Remeras Básicas:**
```json
{
  "imagenPrincipalUrl": "/src/img/indumentaria/IMG_0605.jpg"
}
```

**Para Pilusos:**
```json
{
  "imagenPrincipalUrl": "/src/img/pilusos/IMG_2808.jpg"
}
```

### Opción 2: Solo el nombre del archivo (si está en la carpeta correcta)

El helper automáticamente buscará en `/src/img/`:
```json
{
  "imagenPrincipalUrl": "IMG_1406.JPG"
}
```

## 📝 Ejemplos de Productos

### Remera Básica
```json
POST /products
{
  "nombre": "Remera Básica Blanca",
  "slug": "remera-basica-blanca",
  "categoriaId": 1,
  "tipoPrenda": "remera",
  "imagenPrincipalUrl": "/src/img/indumentaria/IMG_0605.jpg",
  "precioBase": 15000
}
```

### Producto de Cine
```json
POST /products
{
  "nombre": "Remera Cine - Película Favorita",
  "slug": "remera-cine-pelicula-favorita",
  "categoriaId": 2,
  "tipoPrenda": "remera",
  "imagenPrincipalUrl": "/src/img/Cine/IMG_1406.JPG",
  "imagenesSecundarias": [
    "/src/img/Cine/IMG_1413.PNG",
    "/src/img/Cine/IMG_1417.PNG"
  ],
  "precioBase": 18000
}
```

### Producto de Música
```json
POST /products
{
  "nombre": "Remera Música Rock",
  "slug": "remera-musica-rock",
  "categoriaId": 2,
  "tipoPrenda": "remera",
  "imagenPrincipalUrl": "/src/img/music/IMG_7295.JPG",
  "precioBase": 18000
}
```

### Piluso
```json
POST /products
{
  "nombre": "Piluso Clásico",
  "slug": "piluso-clasico",
  "categoriaId": 3,
  "tipoPrenda": "otro",
  "imagenPrincipalUrl": "/src/img/pilusos/IMG_2808.jpg",
  "precioBase": 12000
}
```

## 🎨 Imágenes Secundarias

Para agregar múltiples imágenes a un producto:

```json
{
  "imagenPrincipalUrl": "/src/img/Cine/IMG_1406.JPG",
  "imagenesSecundarias": [
    "/src/img/Cine/IMG_1413.PNG",
    "/src/img/Cine/IMG_1417.PNG",
    "/src/img/Cine/IMG_1418.PNG"
  ]
}
```

## ⚠️ Notas Importantes

1. **Rutas absolutas**: Si las imágenes están en `src/img/`, siempre empezá con `/src/img/`
2. **Extensiones**: Respetá las extensiones exactas de los archivos (.JPG, .PNG, .jpeg, etc.)
3. **Nombres de archivos**: Los nombres son case-sensitive, respetá mayúsculas y minúsculas
4. **Fallback**: Si una imagen no se encuentra, se mostrará un placeholder con el nombre del producto

## 🔄 Migración Futura (Opcional)

Si en el futuro querés mover las imágenes a `public/img/` para mejor rendimiento, solo cambiá las rutas de `/src/img/` a `/img/` en la base de datos.

