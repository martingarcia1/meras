# 🚀 Guía de Despliegue en Vercel - Mera's

## ⚠️ Problema Actual: Error 404

El error 404 ocurre porque Vercel no está configurado correctamente para manejar las rutas de React Router.

## ✅ Solución: Configuración en Vercel Dashboard

### Opción 1: Configurar Root Directory (Recomendado)

1. Ve a tu proyecto en Vercel: https://vercel.com/martingarciacode-gmailcoms-projects/meras-4m1g
2. Ve a **Settings** → **General**
3. En **Root Directory**, selecciona `Front-end`
4. Guarda los cambios
5. Ve a **Deployments** y haz un nuevo deploy

### Opción 2: Usar vercel.json (Ya configurado)

El archivo `vercel.json` en la raíz ya está configurado. Si prefieres esta opción:

1. Asegúrate de que el `vercel.json` esté en la raíz del repositorio
2. En Vercel, ve a **Settings** → **General**
3. Deja **Root Directory** vacío (raíz del repo)
4. Vercel usará automáticamente el `vercel.json`

## 📋 Variables de Entorno

Configura estas variables en **Settings** → **Environment Variables**:

```
VITE_API_URL=https://tu-backend-url.com
```

Si tu backend está en otro servidor, usa esa URL. Si está en localhost, déjalo como `http://localhost:3000` para desarrollo.

## 🔧 Configuración del Proyecto

### Build Settings (si usas Root Directory = Front-end):

- **Framework Preset**: Vite
- **Build Command**: `npm run build` (o dejar vacío, Vercel lo detecta)
- **Output Directory**: `dist`
- **Install Command**: `npm install` (o dejar vacío)

### Build Settings (si usas vercel.json en raíz):

- **Framework Preset**: Other
- **Build Command**: `cd Front-end && npm install && npm run build`
- **Output Directory**: `Front-end/dist`

## 🖼️ Nota sobre Imágenes

Las imágenes en `src/img/` funcionan en desarrollo, pero para mejor rendimiento en producción, considera moverlas a `public/img/` y actualizar las rutas.

## ✅ Pasos para Resolver el 404

1. **Revisa la configuración del Root Directory** en Vercel
2. **Haz un nuevo deploy** después de cambiar la configuración
3. **Verifica los logs del build** en Vercel para ver si hay errores
4. **Prueba la URL** después del deploy

## 🔍 Verificar el Deploy

Después del deploy, verifica:
- ✅ La página principal carga (`/`)
- ✅ Las rutas funcionan (`/personalizar`, `/catalogo`, etc.)
- ✅ Las imágenes se cargan correctamente
- ✅ No hay errores en la consola del navegador

## 📞 Si el problema persiste

1. Revisa los **Build Logs** en Vercel para ver errores específicos
2. Verifica que todas las dependencias estén en `package.json`
3. Asegúrate de que el build local funcione: `cd Front-end && npm run build`

