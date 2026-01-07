# 📦 Productos de Ejemplo para Mera's

Este archivo contiene ejemplos de productos listos para crear en la base de datos usando Postman o cualquier cliente HTTP.

## 🚀 Cómo usar estos ejemplos

1. **Primero, creá las categorías** (si no las tenés):
   - Remeras Básicas
   - Catálogo Diseño
   - Accesorios
   - Sublimación

2. **Luego, creá los productos** usando los ejemplos de abajo.

3. **Finalmente, agregá las variantes** (colores y talles) a cada producto.

---

## 📋 PASO 1: Crear Categorías

### POST http://localhost:3000/products/categories

```json
{
  "nombre": "Remeras Básicas",
  "slug": "remeras-basicas",
  "descripcion": "Remeras básicas de algodón premium",
  "orden": 1
}
```

```json
{
  "nombre": "Catálogo Diseño",
  "slug": "catalogo-diseno",
  "descripcion": "Remeras con diseños exclusivos: Cine, Música, Anime, Series",
  "orden": 2
}
```

```json
{
  "nombre": "Accesorios",
  "slug": "accesorios",
  "descripcion": "Gorras y pilusos",
  "orden": 3
}
```

```json
{
  "nombre": "Sublimación",
  "slug": "sublimacion",
  "descripcion": "Telas sublimadas y banderas",
  "orden": 4
}
```

---

## 👕 PASO 2: Crear Productos - REMERAS BÁSICAS

### POST http://localhost:3000/products

```json
{
  "nombre": "Remera Básica Blanca",
  "slug": "remera-basica-blanca",
  "descripcion": "Remera básica de algodón 100% premium. Disponible en todos los talles hasta 6XL.",
  "categoriaId": 1,
  "tipoPrenda": "remera",
  "imagenPrincipalUrl": "/src/img/indumentaria/IMG_0605.jpg",
  "imagenesSecundarias": [
    "/src/img/indumentaria/IMG_2129.jpg",
    "/src/img/indumentaria/IMG_3954.jpg"
  ],
  "precioBase": 15000
}
```

```json
{
  "nombre": "Remera Básica Negra",
  "slug": "remera-basica-negra",
  "descripcion": "Remera básica negra de algodón premium. Ideal para cualquier ocasión.",
  "categoriaId": 1,
  "tipoPrenda": "remera",
  "imagenPrincipalUrl": "/src/img/indumentaria/IMG_7129_Original.jpg",
  "precioBase": 15000
}
```

---

## 🎬 PASO 3: Crear Productos - CATÁLOGO DISEÑO (CINE)

### POST http://localhost:3000/products

```json
{
  "nombre": "Remera Cine - Clásico del Séptimo Arte",
  "slug": "remera-cine-clasico-septimo-arte",
  "descripcion": "Remera con diseño exclusivo de cine. Para los amantes del séptimo arte.",
  "categoriaId": 2,
  "tipoPrenda": "remera",
  "imagenPrincipalUrl": "/src/img/Cine/IMG_1406.JPG",
  "imagenesSecundarias": [
    "/src/img/Cine/IMG_1413.PNG",
    "/src/img/Cine/IMG_1417.PNG",
    "/src/img/Cine/IMG_1418.PNG"
  ],
  "precioBase": 18000
}
```

```json
{
  "nombre": "Remera Cine - Película Favorita",
  "slug": "remera-cine-pelicula-favorita",
  "descripcion": "Diseño exclusivo de películas icónicas. Disponible en varios estilos.",
  "categoriaId": 2,
  "tipoPrenda": "remera",
  "imagenPrincipalUrl": "/src/img/Cine/IMG_7284.JPG",
  "imagenesSecundarias": [
    "/src/img/Cine/IMG_7285.JPG",
    "/src/img/Cine/IMG_7286.JPG"
  ],
  "precioBase": 18000
}
```

```json
{
  "nombre": "Remera Cine - Edición Especial",
  "slug": "remera-cine-edicion-especial",
  "descripcion": "Edición limitada con diseños únicos de películas.",
  "categoriaId": 2,
  "tipoPrenda": "remera",
  "imagenPrincipalUrl": "/src/img/Cine/IMG_7287.JPG",
  "precioBase": 20000
}
```

---

## 🎵 PASO 4: Crear Productos - CATÁLOGO DISEÑO (MÚSICA)

### POST http://localhost:3000/products

```json
{
  "nombre": "Remera Música Rock",
  "slug": "remera-musica-rock",
  "descripcion": "Para los amantes del rock. Diseños exclusivos de bandas y géneros musicales.",
  "categoriaId": 2,
  "tipoPrenda": "remera",
  "imagenPrincipalUrl": "/src/img/music/IMG_7295.JPG",
  "imagenesSecundarias": [
    "/src/img/music/IMG_7296.JPG",
    "/src/img/music/IMG_7297.JPG"
  ],
  "precioBase": 18000
}
```

```json
{
  "nombre": "Remera Música - Estilo Vintage",
  "slug": "remera-musica-estilo-vintage",
  "descripcion": "Diseños retro de música. Estilo único y exclusivo.",
  "categoriaId": 2,
  "tipoPrenda": "remera",
  "imagenPrincipalUrl": "/src/img/music/IMG_7301.JPG",
  "imagenesSecundarias": [
    "/src/img/music/IMG_7302.JPG",
    "/src/img/music/IMG_7303.JPG"
  ],
  "precioBase": 19000
}
```

---

## 🧢 PASO 5: Crear Productos - ACCESORIOS (PILUSOS)

### POST http://localhost:3000/products

```json
{
  "nombre": "Piluso Clásico",
  "slug": "piluso-clasico",
  "descripcion": "Piluso de alta calidad. Perfecto para el verano.",
  "categoriaId": 3,
  "tipoPrenda": "otro",
  "imagenPrincipalUrl": "/src/img/pilusos/IMG_2808.jpg",
  "imagenesSecundarias": [
    "/src/img/pilusos/IMG_4479.jpg"
  ],
  "precioBase": 12000
}
```

```json
{
  "nombre": "Piluso Estampado",
  "slug": "piluso-estampado",
  "descripcion": "Piluso con estampados exclusivos. Varios diseños disponibles.",
  "categoriaId": 3,
  "tipoPrenda": "otro",
  "imagenPrincipalUrl": "/src/img/pilusos/20230419_160121_Original.jpg",
  "precioBase": 13000
}
```

---

## 🎨 PASO 6: Crear Productos - SUBLIMACIÓN (TELAS)

### POST http://localhost:3000/products

```json
{
  "nombre": "Tela Sublimada - Diseño Exclusivo",
  "slug": "tela-sublimada-diseno-exclusivo",
  "descripcion": "Tela de alta calidad con sublimación personalizada. Ideal para proyectos creativos.",
  "categoriaId": 4,
  "tipoPrenda": "otro",
  "imagenPrincipalUrl": "/src/img/lisas y fondos/IMG_1109.JPG",
  "imagenesSecundarias": [
    "/src/img/lisas y fondos/IMG_1110.JPG",
    "/src/img/lisas y fondos/IMG_1164.JPG"
  ],
  "precioBase": 25000
}
```

---

## 🎯 PASO 7: Agregar Variantes a los Productos

Una vez creados los productos, agregá variantes (colores y talles) usando el ID del producto.

### POST http://localhost:3000/products/variants

**Ejemplo para Remera Básica Blanca (asumiendo que el producto tiene ID 1):**

```json
{
  "productId": 1,
  "color": "Blanco",
  "talle": "S",
  "sku": "REM-BAS-BLAN-S",
  "stock": 50,
  "precio": null
}
```

```json
{
  "productId": 1,
  "color": "Blanco",
  "talle": "M",
  "sku": "REM-BAS-BLAN-M",
  "stock": 50
}
```

```json
{
  "productId": 1,
  "color": "Blanco",
  "talle": "L",
  "sku": "REM-BAS-BLAN-L",
  "stock": 50
}
```

```json
{
  "productId": 1,
  "color": "Blanco",
  "talle": "XL",
  "sku": "REM-BAS-BLAN-XL",
  "stock": 30
}
```

```json
{
  "productId": 1,
  "color": "Blanco",
  "talle": "XXL",
  "sku": "REM-BAS-BLAN-XXL",
  "stock": 20
}
```

**Para agregar el mismo producto en Negro:**

```json
{
  "productId": 1,
  "color": "Negro",
  "talle": "M",
  "sku": "REM-BAS-NEG-M",
  "stock": 40
}
```

---

## 📝 Notas Importantes

1. **IDs de Categorías**: Asegurate de usar los IDs correctos de las categorías que creaste. Si creaste las categorías en el orden sugerido:
   - ID 1 = Remeras Básicas
   - ID 2 = Catálogo Diseño
   - ID 3 = Accesorios
   - ID 4 = Sublimación

2. **IDs de Productos**: Cuando crees variantes, necesitás el ID del producto. Podés obtenerlo de la respuesta cuando creás el producto, o listando todos los productos con `GET /products`.

3. **Precios**: Los precios están en pesos argentinos. Ajustalos según corresponda.

4. **Stock**: El stock es opcional, pero recomendado para controlar inventario.

5. **SKU**: El SKU debe ser único. Usá un formato consistente como: `CATEGORIA-TIPO-COLOR-TALLE`

---

## ✅ Orden Recomendado de Creación

1. ✅ Crear categorías (4 categorías)
2. ✅ Crear productos básicos (2-3 remeras básicas)
3. ✅ Crear productos de diseño (cine y música)
4. ✅ Crear accesorios (pilusos)
5. ✅ Crear productos de sublimación
6. ✅ Agregar variantes a cada producto

---

## 🔍 Verificar Productos Creados

Después de crear los productos, podés verificar que todo esté bien:

- **GET http://localhost:3000/products** - Ver todos los productos
- **GET http://localhost:3000/products/1** - Ver un producto específico (cambiar el 1 por el ID)
- **GET http://localhost:3000/products/categories** - Ver todas las categorías

---

¡Listo! Con estos ejemplos ya podés tener un catálogo completo funcionando. 🎉

