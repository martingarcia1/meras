# 🚀 Guía de Deploy del Backend en Render

Esta guía te ayudará a subir tu backend NestJS a Render correctamente.

## 📋 Pasos para Deploy en Render

### 1. Preparar el Repositorio

1. Asegúrate de que tu código esté en GitHub/GitLab/Bitbucket
2. Verifica que el archivo `Back-end/api/package.json` tenga el script `start:prod`

### 2. Crear Servicio en Render

1. Ve a https://render.com
2. Crea una cuenta (puedes usar GitHub para acelerar)
3. Click en "New" → "Web Service"
4. Conecta tu repositorio

### 3. Configurar el Servicio

#### Configuración Básica:

- **Name:** `api-meras-backend` (o el nombre que prefieras)
- **Environment:** `Node`
- **Region:** Elige la más cercana a tus usuarios
- **Branch:** `main` (o la rama que uses)

#### Build & Deploy:

- **Root Directory:** `Back-end/api` ⚠️ **IMPORTANTE**
- **Build Command:** `npm install && npm run build`
- **Start Command:** `npm run start:prod`

#### Plan:

- **Plan:** Free (para empezar) o Starter ($7/mes si necesitas más recursos)

### 4. Configurar Variables de Entorno

En la sección "Environment Variables", agrega:

```
NODE_ENV=production
PORT=10000
DB_HOST=xxxxx.us-east-2.psdb.cloud
DB_PORT=3306
DB_USERNAME=xxxxx
DB_PASSWORD=xxxxx
DB_DATABASE=ecommerce_indumentaria
```

**Importante:**
- Reemplaza los valores `xxxxx` con los valores reales de tu base de datos
- Si usas PlanetScale, obtén estos valores desde el dashboard de PlanetScale
- Si usas Railway, usa las variables que te proporciona Railway

### 5. Desplegar

1. Click en "Create Web Service"
2. Render empezará a construir y desplegar tu aplicación
3. Espera a que termine (puede tomar 5-10 minutos la primera vez)

### 6. Verificar el Deploy

1. Una vez terminado, deberías ver "Live" en verde
2. Click en la URL (ej: `https://api-meras-backend.onrender.com`)
3. Deberías ver una respuesta (puede ser un error 404 si no tienes una ruta raíz, pero eso está bien)

### 7. Probar la API

```bash
# Probar un endpoint
curl https://tu-backend.onrender.com/products

# O desde el navegador
https://tu-backend.onrender.com/products
```

## ⚠️ Problemas Comunes y Soluciones

### Error: "Cannot find module"

**Causa:** El `Root Directory` no está configurado correctamente.

**Solución:**
- Verifica que `Root Directory` sea exactamente: `Back-end/api`
- Asegúrate de que `package.json` esté en ese directorio

### Error: "Build failed"

**Causa:** Hay errores en el código o faltan dependencias.

**Solución:**
1. Revisa los logs de build en Render
2. Prueba construir localmente:
   ```bash
   cd Back-end/api
   npm install
   npm run build
   ```
3. Si funciona localmente, verifica las variables de entorno

### Error: "Connection refused" o error de base de datos

**Causa:** Las variables de entorno de la base de datos están mal configuradas.

**Solución:**
1. Verifica que todas las variables estén configuradas:
   - `DB_HOST`
   - `DB_PORT`
   - `DB_USERNAME`
   - `DB_PASSWORD`
   - `DB_DATABASE`
2. Asegúrate de que los valores sean correctos (sin espacios extra)
3. Si usas PlanetScale, verifica que la conexión esté habilitada

### Error: "Application failed to respond"

**Causa:** El servidor no está escuchando en el puerto correcto.

**Solución:**
- Render asigna el puerto automáticamente en `process.env.PORT`
- Tu código ya está configurado correctamente: `await app.listen(process.env.PORT ?? 3000);`
- Asegúrate de que no haya un puerto hardcodeado en tu código

### El servicio se "duerme" después de 15 minutos (plan Free)

**Causa:** En el plan gratuito, Render "duerme" servicios que no reciben tráfico.

**Solución:**
1. La primera petición puede tardar 30-60 segundos en despertar el servicio
2. Para evitar esto, considera:
   - Usar el plan Starter ($7/mes) - nunca se duerme
   - Configurar un "cron job" que haga ping al servicio cada 10 minutos
   - Usar un servicio como https://uptimerobot.com para mantener el servicio activo

## 🔧 Optimizaciones

### Habilitar Auto-Deploy

En Render Dashboard:
1. Ve a tu servicio
2. Settings → "Auto-Deploy"
3. Activa "Auto-Deploy" para la rama `main` (o la que uses)

Esto hará que cada push a `main` despliegue automáticamente.

### Agregar Health Check

Render puede verificar que tu servicio está funcionando:

1. En tu código, agrega una ruta `/health`:
   ```typescript
   // En app.controller.ts
   @Get('health')
   health() {
     return { status: 'ok', timestamp: new Date() };
   }
   ```

2. En Render Dashboard:
   - Settings → "Health Check Path"
   - Agrega: `/health`

### Configurar Custom Domain (Opcional)

1. Settings → "Custom Domain"
2. Agrega tu dominio
3. Render te dará instrucciones para configurar DNS

## 🔗 Conectar Frontend (Vercel) con Backend (Render)

1. Obtén la URL de tu backend en Render (ej: `https://api-meras-backend.onrender.com`)

2. En Vercel Dashboard:
   - Ve a tu proyecto del frontend
   - Settings → Environment Variables
   - Agrega o actualiza:
     ```
     VITE_API_URL=https://api-meras-backend.onrender.com
     ```
   - Asegúrate de seleccionar "Production", "Preview", y "Development"

3. Haz un nuevo deploy en Vercel para que tome los nuevos valores

4. Verifica que el frontend pueda conectarse al backend

## 📝 Notas Importantes

1. **Primer deploy puede tardar:** El primer build en Render puede tardar 5-10 minutos

2. **Plan Free tiene limitaciones:**
   - El servicio "duerme" después de 15 minutos sin tráfico
   - La primera petición después de dormir puede tardar 30-60 segundos
   - Para producción, considera el plan Starter

3. **Variables de entorno:**
   - Nunca subas archivos `.env` a Git
   - Siempre usa las variables de entorno en Render Dashboard
   - Las variables sensibles (como passwords) deben estar en Render, no en el código

4. **Logs:**
   - Siempre revisa los logs en Render si algo falla
   - Los logs están en: Render Dashboard → Tu servicio → "Logs"

5. **Backups:**
   - Render no hace backups automáticos en el plan Free
   - Asegúrate de tener tus datos respaldados en tu base de datos (PlanetScale/Railway hacen backups automáticos)

## ✅ Checklist Final

- [ ] Repositorio conectado a Render
- [ ] Root Directory configurado: `Back-end/api`
- [ ] Build Command: `npm install && npm run build`
- [ ] Start Command: `npm run start:prod`
- [ ] Variables de entorno configuradas (DB_HOST, DB_PORT, etc.)
- [ ] `NODE_ENV=production` configurado
- [ ] Base de datos configurada y funcionando
- [ ] Deploy exitoso
- [ ] Endpoints probados y funcionando
- [ ] Frontend (Vercel) conectado al backend (Render)

## 🆘 Si Sigue Fallando

1. Revisa los logs completos en Render Dashboard
2. Prueba construir localmente primero:
   ```bash
   cd Back-end/api
   npm install
   npm run build
   npm run start:prod
   ```
3. Verifica que la base de datos esté accesible desde internet
4. Verifica todas las variables de entorno
5. Contacta a Render support si el problema persiste
