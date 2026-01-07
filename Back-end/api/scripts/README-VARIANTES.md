# 📝 Guía de Uso del Script de Variantes

## 🚀 Ejecutar el Script

### Opción 1: Crear variantes para TODOS los productos

```bash
cd Back-end/api
npm run variantes:all
```

Este comando:
- Obtiene todos los productos de la base de datos
- Crea variantes para cada producto automáticamente
- Ajusta los colores según el tipo de producto:
  - **Remeras Básicas**: Blanco, Negro, Gris
  - **Catálogo Diseño**: Negro, Blanco
  - **Accesorios**: Negro, Blanco, Gris, Beige
- Crea todos los talles: S, M, L, XL, XXL, 3XL, 4XL, 5XL, 6XL

### Opción 2: Crear variantes para UN producto específico

```bash
cd Back-end/api
node scripts/crear-variantes.js --producto 1
```

Reemplazá el `1` por el ID del producto que querés.

## ⚙️ Configuración

El script está configurado con:

- **Talles**: S, M, L, XL, XXL, 3XL, 4XL, 5XL, 6XL
- **Colores base**: Blanco, Negro, Gris
- **Stock por talle**:
  - S, M, L, XL: 50 unidades
  - XXL, 3XL: 20 unidades
  - 4XL, 5XL: 10 unidades
  - 6XL: 5 unidades

## 📋 Ejemplo de Salida

```
🚀 Iniciando creación de variantes...

🌐 Modo: Todos los productos

📋 Encontrados 9 productos

📦 Creando variantes para producto ID: 1
   Colores: Blanco, Negro, Gris
   Talles: S, M, L, XL, XXL, 3XL, 4XL, 5XL, 6XL
✅ Variante creada: Blanco - S para producto 1 (SKU: PROD-1-BLA-S)
✅ Variante creada: Blanco - M para producto 1 (SKU: PROD-1-BLA-M)
...
✅ Total variantes creadas para producto 1: 27

🎉 ¡Proceso completado!

📊 Resumen:
   Productos procesados: 9
   Variantes por producto: ~27
   Total estimado de variantes: ~243
```

## ⚠️ Notas Importantes

1. **El servidor debe estar corriendo**: Asegurate de que el backend esté activo en `http://localhost:3000`

2. **Variantes duplicadas**: Si una variante ya existe, el script la salteará y continuará

3. **SKU automático**: El script genera SKUs automáticamente con el formato: `PROD-{productId}-{color}-{talle}`

4. **Precio**: Las variantes usan el precio base del producto (precio: null)

## 🔧 Personalizar el Script

Si querés cambiar los colores o talles, editá el archivo `scripts/crear-variantes.js`:

```javascript
const talles = ['S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL', '5XL', '6XL'];
const colores = ['Blanco', 'Negro', 'Gris'];
```

## ❓ Solución de Problemas

**Error: ECONNREFUSED**
- Verificá que el backend esté corriendo: `npm run start:dev`

**Error: 400 Bad Request**
- Probablemente el SKU ya existe. El script lo maneja automáticamente.

**Error: 404 Not Found**
- Verificá que el endpoint `/products/variants` exista en tu backend.

