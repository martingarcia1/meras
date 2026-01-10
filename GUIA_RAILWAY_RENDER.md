# 🚂 Guía: Configurar Railway + Render

Esta guía te ayudará a configurar tu base de datos MySQL en Railway y conectarla con tu backend en Render.

## 📋 Paso 1: Obtener Todas las Variables de Railway

En Railway, necesitas obtener **todas** las variables de entorno, no solo el username y password.

### Cómo obtenerlas:

1. Ve a tu proyecto en Railway: https://railway.app
2. Click en tu servicio de **MySQL**
3. Ve a la pestaña **"Variables"** (o **"Connect"**)
4. Deberías ver todas estas variables:

```
MYSQLHOST=xxxxx.railway.app (o una IP)
MYSQLPORT=3306 (o el puerto que te den)
MYSQLUSER=root
MYSQLPASSWORD=xOWPowvbqVZPjJOrnwViqMDzemxMOdHj
MYSQLDATABASE=railway (o el nombre que tenga)
```

**Anota TODOS estos valores**, los necesitarás.

---

## 📋 Paso 2: Crear/Verificar las Tablas en Railway

Primero, necesitas crear las tablas en Railway. Tienes dos opciones:

### Opción A: Usar el modo `synchronize` temporalmente (Rápido)

1. En Render, agrega esta variable temporal:
   ```
   NODE_ENV=development
   ```
   Esto activará `synchronize: true` que creará las tablas automáticamente.

2. Haz un deploy en Render
3. Una vez que las tablas se crearon, **cambia de vuelta** a:
   ```
   NODE_ENV=production
   ```

### Opción B: Exportar/Importar tus datos locales (Recomendado)

1. **Exportar tu base de datos local:**
   ```bash
   cd Back-end/api/scripts
   # Windows:
   export-database.bat
   # Linux/Mac:
   ./export-database.sh
   ```

2. **Importar a Railway:**
   ```bash
   mysql -h [MYSQLHOST] -u [MYSQLUSER] -p[MYSQLPASSWORD] [MYSQLDATABASE] < backup_XXXXXX.sql
   ```
   
   Reemplaza:
   - `[MYSQLHOST]` con el valor de `MYSQLHOST` de Railway
   - `[MYSQLUSER]` con el valor de `MYSQLUSER` (probablemente `root`)
   - `[MYSQLPASSWORD]` con tu password de Railway
   - `[MYSQLDATABASE]` con el nombre de la base de datos de Railway

**Ejemplo:**
```bash
mysql -h xxxxx.railway.app -u root -pxOWPowvbqVZPjJOrnwViqMDzemxMOdHj railway < backup_20241201_120000.sql
```

---

## 📋 Paso 3: Configurar Variables de Entorno en Render

En Render Dashboard, ve a tu servicio del backend y agrega estas variables de entorno:

### Opción 1: Usar Variables de Railway Directamente (Más fácil)

Railway usa nombres específicos, y tu código ya los soporta:

```
NODE_ENV=production
PORT=10000
MYSQLHOST=[valor de MYSQLHOST de Railway]
MYSQLPORT=[valor de MYSQLPORT de Railway]
MYSQLUSER=[valor de MYSQLUSER de Railway - probablemente "root"]
MYSQLPASSWORD=[valor de MYSQLPASSWORD de Railway]
MYSQLDATABASE=[valor de MYSQLDATABASE de Railway]
```

### Opción 2: Usar Variables Estándar (Alternativa)

Si prefieres usar nombres estándar:

```
NODE_ENV=production
PORT=10000
DB_HOST=[valor de MYSQLHOST de Railway]
DB_PORT=[valor de MYSQLPORT de Railway]
DB_USERNAME=[valor de MYSQLUSER de Railway]
DB_PASSWORD=[valor de MYSQLPASSWORD de Railway]
DB_DATABASE=[valor de MYSQLDATABASE de Railway]
```

**Tu código soporta ambas opciones**, así que elige la que prefieras.

---

## 📋 Paso 4: Verificar la Configuración

1. **Haz un deploy en Render**
2. **Revisa los logs** en Render Dashboard
3. Deberías ver:
   - ✅ "Application is running on port XXXX"
   - ✅ No deberías ver errores de conexión a la base de datos

4. **Prueba un endpoint:**
   ```bash
   curl https://tu-backend.onrender.com/products
   ```

---

## 🆘 Solución de Problemas

### Error: "Access denied"

**Causa:** El username o password están incorrectos.

**Solución:**
- Verifica que copiaste exactamente los valores de Railway
- Asegúrate de que no haya espacios extra en las variables de entorno
- Verifica que el usuario sea `root` (o el que Railway te dio)

### Error: "Connection refused" o "ECONNREFUSED"

**Causa:** El `MYSQLHOST` o `MYSQLPORT` están incorrectos.

**Solución:**
- Verifica que copiaste correctamente el `MYSQLHOST` de Railway
- Verifica el `MYSQLPORT` (generalmente es `3306` pero puede variar)

### Error: "Unknown database"

**Causa:** El nombre de la base de datos no existe.

**Solución:**
- Verifica el nombre exacto de `MYSQLDATABASE` en Railway
- Si no existe, crea la base de datos en Railway o usa la que Railway creó automáticamente

### Error: "Can't connect to MySQL server"

**Causa:** La base de datos no está accesible desde fuera, o las credenciales están mal.

**Solución:**
- Railway permite conexiones externas por defecto
- Verifica que todas las variables estén configuradas correctamente
- Revisa los logs de Render para ver el error exacto

---

## 📝 Ejemplo de Configuración Completa

Basado en tus credenciales, aquí está un ejemplo de cómo deberían verse las variables:

```
NODE_ENV=production
PORT=10000
MYSQLHOST=containers-us-west-XXX.railway.app
MYSQLPORT=3306
MYSQLUSER=root
MYSQLPASSWORD=xOWPowvbqVZPjJOrnwViqMDzemxMOdHj
MYSQLDATABASE=railway
```

**Nota:** Reemplaza los valores `XXX` y el nombre de la base de datos con los valores reales que Railway te proporciona.

---

## ✅ Checklist

- [ ] Obtenidas todas las variables de Railway (MYSQLHOST, MYSQLPORT, MYSQLUSER, MYSQLPASSWORD, MYSQLDATABASE)
- [ ] Exportados datos locales (si los tienes)
- [ ] Importados datos a Railway (si los exportaste)
- [ ] Variables de entorno configuradas en Render
- [ ] Deploy exitoso en Render
- [ ] Backend funcionando sin errores de base de datos
- [ ] Endpoints probados y funcionando

---

## 🔐 Seguridad

**Importante:**
- ✅ Nunca subas tus `.env` a Git
- ✅ Las credenciales están seguras en Render (solo tú las puedes ver)
- ✅ Railway genera passwords seguros automáticamente
- ⚠️ Si compartes este proyecto, asegúrate de no incluir credenciales en el código

---

## 🔗 Próximos Pasos

Una vez que tu backend esté funcionando:

1. **Conecta tu frontend (Vercel) con el backend (Render):**
   - En Vercel Dashboard → Settings → Environment Variables
   - Agrega: `VITE_API_URL=https://tu-backend.onrender.com`
   - Haz un nuevo deploy en Vercel

2. **Prueba todo:**
   - Verifica que el frontend pueda conectarse al backend
   - Prueba crear un usuario, ver productos, etc.

---

## 📞 Si Necesitas Ayuda

Si algo no funciona:
1. Revisa los logs completos en Render Dashboard
2. Verifica todas las variables de entorno una por una
3. Prueba conectarte a Railway directamente usando MySQL Workbench o línea de comandos
