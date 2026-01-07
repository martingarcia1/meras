# Configuración de Vercel para Mera's

## Variables de Entorno

En el dashboard de Vercel, configura estas variables de entorno:

### Frontend
- `VITE_API_URL`: URL de tu backend (ej: `https://tu-backend.vercel.app` o `http://localhost:3000` para desarrollo)

## Estructura del Proyecto

El proyecto está configurado para construir solo el Front-end:
- **Directorio raíz del build**: `Front-end`
- **Directorio de salida**: `Front-end/dist`
- **Framework**: Vite

## Rutas

Todas las rutas de React Router están configuradas para redirigir a `index.html` (SPA).

## Despliegue

1. Conecta tu repositorio de GitHub a Vercel
2. Configura el **Root Directory** como `Front-end` en la configuración del proyecto
3. O usa el `vercel.json` en la raíz que ya está configurado
4. Agrega las variables de entorno necesarias
5. Haz el deploy

## Nota sobre Imágenes

Las imágenes en `src/img/` se sirven correctamente en desarrollo, pero en producción deberían estar en `public/img/` para mejor rendimiento. El helper `imageHelper.js` maneja ambas opciones.

