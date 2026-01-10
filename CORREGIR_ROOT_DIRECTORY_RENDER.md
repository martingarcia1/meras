# 🔧 Solución: Error "Cannot find module" en Render

## ⚠️ El Problema

El error muestra:
```
Error: Cannot find module '/opt/render/project/src/Back-end/api/dist/main'
```

Esto significa que **el Root Directory en Render no está configurado correctamente**.

## ✅ Solución: Configurar Root Directory en Render

### Paso 1: Ir a Render Dashboard

1. Ve a https://render.com
2. Selecciona tu servicio del backend
3. Ve a **Settings** (⚙️ Configuración)

### Paso 2: Configurar Root Directory

1. Busca la sección **"Build & Deploy"** o **"Build Settings"**
2. Busca el campo **"Root Directory"**
3. Cambia el valor a exactamente:
   ```
   Back-end/api
   ```
   **Importante:**
   - Usa barras `/` (no `\`)
   - Sin espacios extra
   - Sin barra al final (`Back-end/api` no `Back-end/api/`)

### Paso 3: Guardar y Re-Deploy

1. **Guarda los cambios** (click en "Save Changes" o "Save")
2. **Haz un nuevo deploy**:
   - Click en **"Manual Deploy"** → **"Deploy latest commit"**
   - O haz un nuevo commit y push (Render lo detectará automáticamente)

## ✅ Verificación

Después del nuevo deploy, los logs deberían mostrar:

**Antes (❌ Error):**
```
Error: Cannot find module '/opt/render/project/src/Back-end/api/dist/main'
```

**Después (✅ Debería funcionar):**
```
[NestFactory] Starting Nest application...
[InstanceLoader] TypeOrmModule dependencies initialized
Application is running on port XXXX
```

## 📋 Configuración Completa en Render

Asegúrate de que en Render Dashboard tengas:

### Build Settings:
- **Root Directory**: `Back-end/api` ⚠️ **MUY IMPORTANTE**
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm run start:prod`
- **Environment**: `Node`

### Environment Variables:
```
NODE_ENV=production
PORT=10000
MYSQLHOST=mysql-production-bb1e.up.railway.app
MYSQLPORT=52319
MYSQLUSER=root
MYSQLPASSWORD=xOWPowvbqVZPjJOrnwViqMDzemxMOdHj
MYSQLDATABASE=railway
```

## 🆘 Si Aún No Funciona

### Verificar que el Build Funciona

Si el Root Directory está correcto pero sigue fallando, verifica:

1. **El build se completa correctamente:**
   - En los logs, deberías ver: `Build successful 🎉`
   - No debería haber errores durante el build

2. **El directorio `dist` existe:**
   - Si el build falla, el directorio `dist` no se crea
   - Revisa los logs del build para ver si hay errores

3. **El archivo `dist/main.js` existe:**
   - Verifica que el build genere correctamente `dist/main.js`
   - Puede que haya un problema con el build

### Probar Localmente

Prueba construir localmente para verificar que funciona:

```bash
cd Back-end/api
npm install
npm run build
ls dist/main.js  # Debería existir este archivo
```

Si esto funciona localmente, el problema está en Render.
Si esto NO funciona localmente, hay un problema con el código.

## 📝 Resumen

**Problema:** Root Directory no configurado correctamente
**Solución:** Configurar `Back-end/api` en Render Dashboard → Settings → Root Directory
**Próximo paso:** Guardar y hacer un nuevo deploy

## ✅ Checklist

- [ ] Root Directory configurado: `Back-end/api` (con `/`, no `\`)
- [ ] Sin espacios extra
- [ ] Sin barra al final
- [ ] Cambios guardados en Render
- [ ] Nuevo deploy iniciado
- [ ] Logs revisados para verificar que funciona
