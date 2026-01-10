# 🗄️ Guía de Base de Datos en Producción

Esta guía te ayudará a subir tu base de datos MySQL a producción para que tu aplicación funcione completamente.

## 🎯 Opciones Recomendadas para MySQL

### ⭐ Opción 1: PlanetScale (RECOMENDADO)

**PlanetScale** es la mejor opción para MySQL. Es gratis hasta cierto punto y muy fácil de configurar.

#### Pasos:

1. **Crear cuenta en PlanetScale**
   - Ve a https://planetscale.com
   - Crea una cuenta gratis (puedes usar GitHub para acelerar)

2. **Crear una base de datos**
   - Click en "Create database"
   - Nombre: `ecommerce_indumentaria` (o el que prefieras)
   - Región: Elige la más cercana a tus usuarios (US East es bueno)
   - Plan: Free (para empezar)

3. **Obtener las credenciales**
   - Ve a tu base de datos → "Settings" → "Passwords"
   - Click en "New password"
   - Copia las credenciales:
     - `DB_HOST` (ej: `xxxxx.us-east-2.psdb.cloud`)
     - `DB_USERNAME` (ej: `xxxxx`)
     - `DB_PASSWORD` (copiar el password generado)
     - `DB_DATABASE` (el nombre que elegiste)
     - `DB_PORT` (generalmente `3306`)

4. **Migrar tus datos locales a PlanetScale**
   
   **Opción A: Usando un dump de MySQL**
   ```bash
   # 1. Exportar tu base de datos local
   mysqldump -u root -p ecommerce_indumentaria > backup.sql
   
   # 2. Importar a PlanetScale (usa la connection string desde PlanetScale dashboard)
   mysql -h [TU_HOST] -u [TU_USERNAME] -p[TU_PASSWORD] [TU_DATABASE] < backup.sql
   ```

   **Opción B: Usando TypeORM migrations (más seguro)**
   - Ver la sección de migraciones más abajo

5. **Configurar variables de entorno en Render**
   - Ve a tu servicio en Render
   - Settings → Environment Variables
   - Agrega:
     ```
     DB_HOST=xxxxx.us-east-2.psdb.cloud
     DB_PORT=3306
     DB_USERNAME=xxxxx
     DB_PASSWORD=xxxxx
     DB_DATABASE=ecommerce_indumentaria
     NODE_ENV=production
     ```

6. **Actualizar la configuración de SSL**
   - PlanetScale requiere SSL
   - Tu código ya está configurado para esto en `app.module.ts`

---

### 🌐 Opción 2: Railway

**Railway** también es excelente y muy fácil de usar.

#### Pasos:

1. **Crear cuenta en Railway**
   - Ve a https://railway.app
   - Crea una cuenta (puedes usar GitHub)

2. **Crear servicio MySQL**
   - Click en "New Project"
   - Selecciona "Database" → "MySQL"
   - Se creará automáticamente

3. **Obtener las credenciales**
   - Click en el servicio MySQL
   - Ve a la pestaña "Variables"
   - Copia:
     - `MYSQLHOST`
     - `MYSQLUSER`
     - `MYSQLPASSWORD`
     - `MYSQLDATABASE`
     - `MYSQLPORT`

4. **Configurar en Render**
   - Usa las variables que obtuviste de Railway
   - Configura las variables de entorno según los nombres que usa tu código:
     ```
     DB_HOST=[MYSQLHOST de Railway]
     DB_PORT=[MYSQLPORT de Railway]
     DB_USERNAME=[MYSQLUSER de Railway]
     DB_PASSWORD=[MYSQLPASSWORD de Railway]
     DB_DATABASE=[MYSQLDATABASE de Railway]
     NODE_ENV=production
     ```

5. **Migrar datos**
   - Similar a PlanetScale, puedes usar mysqldump o migrations

---

### 🐘 Opción 3: Supabase (PostgreSQL - Requiere Cambios)

**Nota:** Supabase usa PostgreSQL, no MySQL. Si quieres usar esta opción, necesitarás cambiar algunas cosas en tu código.

**Ventajas:** Muy fácil, generoso plan gratis, excelente documentación.

**Desventajas:** Necesitas cambiar de MySQL a PostgreSQL en tu código.

---

### ☁️ Opción 4: AWS RDS o Google Cloud SQL

Para proyectos más grandes, pero requieren más configuración y pueden tener costos.

---

## 📋 Configuración en Render para el Backend

Una vez que tengas tu base de datos configurada, asegúrate de configurar Render correctamente:

### 1. Archivo `render.yaml` (crear en la raíz del backend)

```yaml
services:
  - type: web
    name: api-meras
    env: node
    plan: free
    buildCommand: cd Back-end/api && npm install && npm run build
    startCommand: cd Back-end/api && npm run start:prod
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 10000
      - key: DB_HOST
        sync: false
      - key: DB_PORT
        sync: false
      - key: DB_USERNAME
        sync: false
      - key: DB_PASSWORD
        sync: false
      - key: DB_DATABASE
        sync: false
```

### 2. Configurar el servicio en Render Dashboard

1. Ve a https://render.com
2. Nuevo servicio → "Web Service"
3. Conecta tu repositorio de GitHub
4. Configuración:
   - **Name:** `api-meras` (o el que prefieras)
   - **Root Directory:** `Back-end/api`
   - **Environment:** `Node`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm run start:prod`
   - **Plan:** Free (para empezar)

5. **Variables de Entorno:**
   - `NODE_ENV` = `production`
   - `PORT` = `10000` (o el que Render te asigne)
   - `DB_HOST` = (de tu base de datos)
   - `DB_PORT` = (de tu base de datos, generalmente `3306`)
   - `DB_USERNAME` = (de tu base de datos)
   - `DB_PASSWORD` = (de tu base de datos)
   - `DB_DATABASE` = (nombre de tu base de datos)

---

## 🔄 Migrar Datos de Local a Producción

### Método 1: Exportar/Importar SQL (Rápido)

```bash
# 1. Exportar desde tu base de datos local
mysqldump -u root -p ecommerce_indumentaria > backup_local.sql

# 2. Importar a producción (PlanetScale ejemplo)
mysql -h [TU_HOST] -u [TU_USERNAME] -p[TU_PASSWORD] [TU_DATABASE] < backup_local.sql
```

### Método 2: Usar TypeORM Migrations (Recomendado para producción)

#### Crear migraciones:

1. **Instalar TypeORM CLI** (si no lo tienes):
   ```bash
   npm install -g typeorm
   ```

2. **Crear estructura de migraciones:**
   ```bash
   cd Back-end/api
   mkdir -p src/migrations
   ```

3. **Crear archivo de configuración de TypeORM:**
   
   Crea `ormconfig.js` en `Back-end/api/`:
   ```javascript
   module.exports = {
     type: 'mysql',
     host: process.env.DB_HOST || 'localhost',
     port: parseInt(process.env.DB_PORT || '3306'),
     username: process.env.DB_USERNAME || 'root',
     password: process.env.DB_PASSWORD || '',
     database: process.env.DB_DATABASE || 'ecommerce_indumentaria',
     entities: ['dist/**/*.entity.js'],
     migrations: ['dist/migrations/*.js'],
     cli: {
       migrationsDir: 'src/migrations',
     },
     synchronize: false, // NUNCA true en producción
     ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
   };
   ```

4. **Generar migración inicial:**
   ```bash
   # Conectar a tu base de datos de producción primero
   typeorm migration:generate -n InitialSchema
   ```

5. **Ejecutar migraciones en producción:**
   - Las migraciones se ejecutan automáticamente con `npm run start:prod` (ya lo tienes configurado)

---

## ✅ Verificar que Todo Funciona

1. **Verifica la conexión:**
   - Revisa los logs de Render
   - Deberías ver: "Application is running on port XXXX"
   - No deberías ver errores de conexión a la base de datos

2. **Prueba un endpoint:**
   ```bash
   curl https://tu-backend.render.com/products
   ```

3. **Verifica en el frontend:**
   - Asegúrate de que `VITE_API_URL` en Vercel apunte a tu backend de Render
   - Ej: `VITE_API_URL=https://tu-backend.onrender.com`

---

## 🔐 Seguridad

1. **Nunca subas tus `.env` a Git**
2. **Usa variables de entorno en Render/Vercel**
3. **PlanetScale y Railway generan passwords seguros automáticamente**
4. **No uses `synchronize: true` en producción** (tu código ya está bien configurado)

---

## 🆘 Solución de Problemas

### Error: "ECONNREFUSED" o "Connection refused"
- Verifica que `DB_HOST`, `DB_PORT` están correctos
- Asegúrate de que la base de datos permita conexiones externas
- En PlanetScale, verifica que la conexión esté habilitada

### Error: "Access denied"
- Verifica `DB_USERNAME` y `DB_PASSWORD`
- Asegúrate de usar las credenciales correctas de tu base de datos en producción

### Error: "SSL required"
- Tu código ya está configurado para SSL en producción
- Verifica que `NODE_ENV=production` esté configurado

### Error en Render: "Build failed"
- Verifica que el `Root Directory` esté correcto: `Back-end/api`
- Verifica que `package.json` esté en el directorio correcto
- Revisa los logs de build en Render para más detalles

---

## 📞 Recomendación Final

**Para empezar rápido:** Usa **PlanetScale** - es gratis, fácil, y funciona perfectamente con MySQL/TypeORM.

**Para proyectos más complejos:** Considera **Railway** o migrar a **PostgreSQL con Supabase**.

---

## 🔗 Enlaces Útiles

- PlanetScale: https://planetscale.com/docs
- Railway: https://docs.railway.app
- Render Docs: https://render.com/docs
- TypeORM Migrations: https://typeorm.io/migrations
