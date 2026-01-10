# 🚂 Pasos Rápidos para Configurar Railway + Render

## ✅ Lo que ya tienes:
- Username: `root`
- Password: `xOWPowvbqVZPjJOrnwViqMDzemxMOdHj`

## 📋 Lo que necesitas obtener de Railway:

1. **Ve a Railway Dashboard** → Tu proyecto → Servicio MySQL → Pestaña "Variables" o "Connect"

2. **Anota estos valores:**
   - `MYSQLHOST` = ? (ejemplo: `containers-us-west-XXX.railway.app`)
   - `MYSQLPORT` = ? (generalmente `3306`)
   - `MYSQLDATABASE` = ? (ejemplo: `railway`)

## 🔧 Configurar en Render:

Una vez que tengas los valores anteriores, ve a **Render Dashboard** → Tu servicio backend → **Environment Variables** y agrega:

```
NODE_ENV=production
PORT=10000
MYSQLHOST=[valor de MYSQLHOST que obtuviste]
MYSQLPORT=3306
MYSQLUSER=root
MYSQLPASSWORD=xOWPowvbqVZPjJOrnwViqMDzemxMOdHj
MYSQLDATABASE=[valor de MYSQLDATABASE que obtuviste]
```

## 🚀 Crear las Tablas:

### Opción Rápida (Recomendada para empezar):

1. En Render, **temporalmente** cambia `NODE_ENV=development`
2. Haz un deploy
3. Espera a que se creen las tablas automáticamente
4. **Cambia de vuelta** `NODE_ENV=production`
5. Haz otro deploy

### Opción con Datos Locales:

Si tienes datos en tu base de datos local que quieres migrar:

1. **Exportar desde local:**
   ```bash
   cd Back-end/api/scripts
   export-database.bat  # Windows
   # o
   ./export-database.sh  # Linux/Mac
   ```

2. **Importar a Railway:**
   ```bash
   mysql -h [MYSQLHOST] -u root -p[MYSQLPASSWORD] [MYSQLDATABASE] < backup_XXXXXX.sql
   ```
   
   Ejemplo:
   ```bash
   mysql -h containers-us-west-XXX.railway.app -u root -pxOWPowvbqVZPjJOrnwViqMDzemxMOdHj railway < backup_20241201_120000.sql
   ```

## ✅ Verificar:

1. Revisa los logs en Render
2. Deberías ver: "Application is running on port XXXX"
3. Prueba: `curl https://tu-backend.onrender.com/products`

## 🆘 Si algo falla:

- Revisa que todas las variables estén correctas
- Verifica los logs en Render Dashboard
- Asegúrate de que `MYSQLHOST` y `MYSQLDATABASE` estén correctos
