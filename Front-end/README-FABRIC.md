# 🎨 Integración de Fabric.js - Editor de Diseño 2D

## 📦 Instalación

Ejecutá este comando en la carpeta `Front-end`:

```bash
npm install fabric
```

## ✅ Lo que ya está implementado

1. **Componente EditorDiseño** (`EditorDiseño.jsx`):
   - Canvas interactivo con Fabric.js
   - Agregar textos personalizados
   - Subir imágenes/estampados
   - Seleccionar, mover, rotar y eliminar objetos
   - Duplicar elementos
   - Cambiar colores y tamaños de texto
   - Guardar diseño como JSON
   - Descargar imagen del diseño

2. **Integración con Personalizador**:
   - Flujo de 2 pasos:
     - **Paso 1**: Selección de color y talle
     - **Paso 2**: Editor de diseño (Fabric.js)

## 🚀 Cómo funciona

1. El usuario selecciona color y talle en el Personalizador
2. Hace clic en "Siguiente: Agregar Diseño"
3. Se abre el EditorDiseño con un canvas interactivo
4. Puede agregar textos, imágenes, estampados
5. Guarda el diseño (se genera un JSON con toda la configuración)
6. El diseño se puede enviar al backend para crear un CustomDesign

## 📝 Estructura del JSON del Diseño

Cuando el usuario guarda un diseño, se genera un objeto así:

```json
{
  "colorBase": "Blanco",
  "capas": [
    {
      "tipo": "texto",
      "contenido": "MERA'S",
      "posicion": { "x": 200, "y": 250 },
      "tamaño": { "width": 120, "height": 40 },
      "rotacion": 0,
      "opacidad": 1,
      "color": "#000000",
      "fuente": "Arial",
      "tamañoTexto": 40
    },
    {
      "tipo": "imagen",
      "contenido": "data:image/png;base64...",
      "posicion": { "x": 150, "y": 300 },
      "tamaño": { "width": 200, "height": 200 },
      "rotacion": 0,
      "opacidad": 1
    }
  ],
  "previewImageUrl": "data:image/png;base64..."
}
```

## 🔄 Próximos pasos

1. **Conectar con el Backend**: Enviar el diseño al endpoint `POST /custom-designs`
2. **Mejorar el canvas**: Agregar más herramientas (formas, filtros, etc.)
3. **Vista previa mejorada**: Mostrar cómo se verá en la prenda real
4. **Plantillas**: Ofrecer diseños pre-hechos para que el usuario personalice

## ⚠️ Nota sobre Fabric.js v5

Si tenés problemas con el import, podés probar:

```javascript
import { Canvas, Text, Image, Rect } from 'fabric';
```

O si usás la versión 4.x:

```javascript
import { fabric } from 'fabric';
```

El código actual está preparado para Fabric.js v5.

