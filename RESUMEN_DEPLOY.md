# 📋 Resumen Rápido - Deploy del Backend y Base de Datos

Esta es una guía rápida para subir tu backend a Render y tu base de datos a producción.

## 🎯 Pasos Rápidos

### 1. Base de Datos en Producción (Elige una opción)

#### ⭐ Opción Recomendada: PlanetScale

1. **Crear cuenta:** https://planetscale.com
2. **Crear base de datos:** Click "Create database"
3. **Obtener credenciales:** Settings → Passwords → New password
4. **Exportar datos locales:**
   ```bash
   cd Back-end/api/scripts
   # Windows:
   export-database.bat
   # Linux/Mac:
   ./export-database.sh
   ```
5. **Importar a PlanetScale:**
   ```bash
   mysql -h [TU_HOST] -u [TU_USERNAME] -p[TU_PASSWORD] [TU_DATABASE] < backup_XXXXXX.sql
   ```

**Variables que necesitas de PlanetScale:**
- `DB_HOST`
- `DB_PORT` (generalmente 3306)
- `DB_USERNAME`
- `DB_PASSWORD`
- `DB_DATABASE`

---

### 2. Backend en Render

1. **Crear cuenta:** https://render.com
2. **Nuevo servicio:** "New" → "Web Service"
3. **Configuración:**
   - Root Directory: `Back-end/api` ⚠️ **MUY IMPORTANTE**
   - Build Command: `npm install && npm run build`
   - Start Command: `npm run start:prod`
   - Plan: Free (para empezar)

4. **Variables de Entorno en Render:**
   ```
   NODE_ENV=production
   PORT=10000
   DB_HOST=[de PlanetScale o Railway]
   DB_PORT=3306
   DB_USERNAME=[de PlanetScale o Railway]
   DB_PASSWORD=[de PlanetScale o Railway]
   DB_DATABASE=ecommerce_indumentaria
   ```

5. **Desplegar:** Click "Create Web Service" y espera 5-10 minutos

---

### 3. Conectar Frontend (Vercel) con Backend (Render)

1. **Obtener URL del backend:** Render te dará una URL tipo `https://tu-backend.onrender.com`

2. **En Vercel Dashboard:**
   - Settings → Environment Variables
   - Agrega o actualiza:
     ```
     VITE_API_URL=https://tu-backend.onrender.com
     ```

3. **Nuevo deploy en Vercel** para aplicar los cambios

---

## ✅ Checklist

- [ ] Base de datos creada en PlanetScale/Railway
- [ ] Datos exportados desde local
- [ ] Datos importados a producción
- [ ] Credenciales de base de datos obtenidas
- [ ] Backend creado en Render
- [ ] Root Directory configurado: `Back-end/api`
- [ ] Variables de entorno configuradas en Render
- [ ] Deploy exitoso en Render
- [ ] Backend funcionando (probar endpoints)
- [ ] Frontend actualizado con URL del backend
- [ ] Todo funcionando en producción

---

## 🔗 Enlaces Rápidos

- **PlanetScale:** https://planetscale.com (Gratis para empezar)
- **Railway:** https://railway.app (Alternativa fácil)
- **Render:** https://render.com (Para el backend)
- **Vercel:** https://vercel.com (Ya lo tienes configurado)

---

## 🆘 Si Algo Falla

### Error en Render: "Cannot find module"
- ✅ Verifica que `Root Directory` sea: `Back-end/api` (no `Back-end\api`)

### Error de conexión a la base de datos
- ✅ Verifica todas las variables de entorno
- ✅ Asegúrate de que los valores no tengan espacios extra
- ✅ Verifica que la base de datos permita conexiones externas

### Backend "duerme" después de 15 minutos
- ✅ Es normal en el plan Free de Render
- ✅ La primera petición puede tardar 30-60 segundos
- ✅ Considera el plan Starter ($7/mes) para producción

---

## 📚 Guías Detalladas

- **Guía completa de base de datos:** Ver `GUIA_BASE_DATOS.md`
- **Guía completa de Render:** Ver `GUIA_RENDER.md`

---

## 💡 Recomendación Final

**Para empezar rápido:**
1. **Base de datos:** PlanetScale (gratis, fácil, funciona perfecto con MySQL)
2. **Backend:** Render (gratis, fácil, funciona bien con NestJS)
3. **Frontend:** Vercel (ya lo tienes configurado)

**Total estimado:** 15-30 minutos para configurar todo.
