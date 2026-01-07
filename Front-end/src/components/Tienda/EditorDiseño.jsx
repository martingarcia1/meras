import { useEffect, useRef, useState } from 'react';
import { Type, Image as ImageIcon, Trash2, Save, Move, Layers, RotateCcw, Eye, Maximize2, Upload, Shapes, Image as GalleryIcon } from 'lucide-react';

// Galería de diseños predefinidos
const predefinedDesigns = [
  { id: 1, name: 'Cine Clásico', url: '/src/img/Cine/IMG_1406.JPG', category: 'Cine' },
  { id: 2, name: 'Cine Vintage', url: '/src/img/Cine/IMG_7284.JPG', category: 'Cine' },
  { id: 3, name: 'Cine Moderno', url: '/src/img/Cine/IMG_7285.JPG', category: 'Cine' },
  { id: 4, name: 'Música Rock', url: '/src/img/music/IMG_7295.JPG', category: 'Música' },
  { id: 5, name: 'Música Clásica', url: '/src/img/music/IMG_7296.JPG', category: 'Música' },
  { id: 6, name: 'Música Vintage', url: '/src/img/music/IMG_7301.JPG', category: 'Música' },
  { id: 7, name: 'Cine Especial', url: '/src/img/Cine/015F3118-CC9D-4078-9C9F-7F08791E38D2.JPEG', category: 'Cine' },
  { id: 8, name: 'Música Alternativa', url: '/src/img/music/IMG_7318.JPG', category: 'Música' },
];

const EditorDiseño = ({ colorBase, selectedModel, selectedSize, onSave, onBack, onElementsChange }) => {
  const canvasRef = useRef(null);
  const canvasInstanceRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const previewCanvasInstanceRef = useRef(null);
  const [selectedTool, setSelectedTool] = useState('select');
  const [textValue, setTextValue] = useState('');
  const [fontSize, setFontSize] = useState(40);
  const [textColor, setTextColor] = useState('#000000');
  const [selectedObject, setSelectedObject] = useState(null);
  const [fabricLib, setFabricLib] = useState(null);
  const [elementCount, setElementCount] = useState(0);
  const [viewSide, setViewSide] = useState('Frente');
  const [showGallery, setShowGallery] = useState(false);

  // Cargar Fabric.js
  useEffect(() => {
    import('fabric').then((fabricModule) => {
      const fabric = fabricModule.fabric || fabricModule.default || fabricModule;
      setFabricLib(fabric);
    });
  }, []);

  // Función para obtener el color hex
  const getColorHex = (colorName) => {
    const colorMap = {
      'Blanco': '#FFFFFF',
      'Negro': '#000000',
      'Gris': '#9CA3AF',
      'Azul Oscuro': '#1E3A8A',
      'Rojo': '#DC2626',
      'Verde': '#16A34A',
      'Rosa': '#EC4899',
      'Amarillo': '#EAB308',
    };
    return colorMap[colorName] || '#FFFFFF';
  };

  // Inicializar canvas principal de Fabric.js
  useEffect(() => {
    if (!canvasRef.current || !fabricLib) return;

    const canvas = new fabricLib.Canvas(canvasRef.current, {
      width: 500,
      height: 600,
      backgroundColor: getColorHex(colorBase),
    });

    canvasInstanceRef.current = canvas;

    // Crear forma de remera como fondo no seleccionable
    const remeraShape = new fabricLib.Path(
      'M 100 50 L 400 50 L 450 100 L 450 500 L 400 550 L 100 550 L 50 500 L 50 100 Z',
      {
        fill: 'transparent',
        stroke: '#000000',
        strokeWidth: 2,
        selectable: false,
        evented: false,
      }
    );
    canvas.add(remeraShape);
    canvas.sendToBack(remeraShape);

    // Manejar selección de objetos
    canvas.on('selection:created', (e) => {
      setSelectedObject(e.selected[0]);
    });

    canvas.on('selection:updated', (e) => {
      setSelectedObject(e.selected[0]);
    });

    canvas.on('selection:cleared', () => {
      setSelectedObject(null);
    });

    // Actualizar contador de elementos
    canvas.on('object:added', () => {
      const count = canvas.getObjects().filter((obj) => obj.selectable !== false).length;
      setElementCount(count);
      if (onElementsChange) onElementsChange(count);
    });

    canvas.on('object:removed', () => {
      const count = canvas.getObjects().filter((obj) => obj.selectable !== false).length;
      setElementCount(count);
      if (onElementsChange) onElementsChange(count);
    });

    // Limpiar al desmontar
    return () => {
      canvas.dispose();
    };
  }, [colorBase, fabricLib, onElementsChange]);

  // Actualizar preview en tiempo real
  useEffect(() => {
    if (!canvasInstanceRef.current || !previewCanvasRef.current || !fabricLib) return;

    const updatePreview = () => {
      const mainCanvas = canvasInstanceRef.current;
      if (!mainCanvas) return;

      // Crear preview canvas si no existe
      if (!previewCanvasInstanceRef.current) {
        previewCanvasInstanceRef.current = new fabricLib.StaticCanvas(previewCanvasRef.current, {
          width: 320,
          height: 384,
          backgroundColor: getColorHex(colorBase),
        });
      }

      const previewCanvas = previewCanvasInstanceRef.current;
      previewCanvas.setBackgroundColor(getColorHex(colorBase), () => {
        previewCanvas.renderAll();
      });

      // Copiar objetos al preview (solo los de diseño, no el fondo)
      const objects = mainCanvas.getObjects().filter((obj) => obj.selectable !== false);
      previewCanvas.clear();
      
      // Agregar forma de remera al preview
      const remeraPreview = new fabricLib.Path(
        'M 50 30 L 270 30 L 300 60 L 300 350 L 270 380 L 50 380 L 20 350 L 20 60 Z',
        {
          fill: 'transparent',
          stroke: '#000000',
          strokeWidth: 1,
          selectable: false,
          evented: false,
        }
      );
      previewCanvas.add(remeraPreview);
      previewCanvas.sendToBack(remeraPreview);

      // Clonar objetos de diseño
      objects.forEach((obj) => {
        obj.clone((cloned) => {
          // Escalar para el preview
          cloned.scale(0.64); // 320/500 = 0.64
          cloned.set({
            left: cloned.left * 0.64,
            top: cloned.top * 0.64,
          });
          previewCanvas.add(cloned);
        });
      });

      previewCanvas.renderAll();
    };

    // Actualizar preview cuando cambie el canvas principal
    const canvas = canvasInstanceRef.current;
    if (canvas) {
      canvas.on('object:added', updatePreview);
      canvas.on('object:removed', updatePreview);
      canvas.on('object:modified', updatePreview);
      canvas.on('after:render', updatePreview);
    }

    updatePreview();
  }, [colorBase, fabricLib, elementCount]);

  // Agregar texto al canvas
  const addText = () => {
    if (!textValue.trim() || !canvasInstanceRef.current || !fabricLib) return;

    const text = new fabricLib.Text(textValue, {
      left: 250,
      top: 300,
      fontSize: fontSize,
      fill: textColor,
      fontFamily: 'Arial',
      fontWeight: 'bold',
    });

    canvasInstanceRef.current.add(text);
    canvasInstanceRef.current.setActiveObject(text);
    setTextValue('');
    setSelectedTool('select');
  };

  // Agregar imagen al canvas
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file || !canvasInstanceRef.current || !fabricLib) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      fabricLib.Image.fromURL(event.target.result, (img) => {
        img.scaleToWidth(200);
        img.set({
          left: 250,
          top: 300,
        });
        canvasInstanceRef.current.add(img);
        canvasInstanceRef.current.setActiveObject(img);
        setSelectedTool('select');
      });
    };
    reader.readAsDataURL(file);
  };

  // Agregar diseño predefinido desde la galería
  const addPredefinedDesign = (designUrl) => {
    if (!canvasInstanceRef.current || !fabricLib) return;

    fabricLib.Image.fromURL(designUrl, (img) => {
      img.scaleToWidth(200);
      img.set({
        left: 250,
        top: 300,
      });
      canvasInstanceRef.current.add(img);
      canvasInstanceRef.current.setActiveObject(img);
      setShowGallery(false);
      setSelectedTool('select');
    }, {
      crossOrigin: 'anonymous'
    });
  };

  // Eliminar objeto seleccionado
  const deleteSelected = () => {
    if (!canvasInstanceRef.current) return;
    const activeObjects = canvasInstanceRef.current.getActiveObjects();
    activeObjects.forEach((obj) => {
      canvasInstanceRef.current.remove(obj);
    });
    canvasInstanceRef.current.discardActiveObject();
    canvasInstanceRef.current.renderAll();
    setSelectedObject(null);
  };

  // Duplicar objeto seleccionado
  const duplicateSelected = () => {
    if (!canvasInstanceRef.current || !selectedObject) return;
    selectedObject.clone((cloned) => {
      cloned.set({
        left: cloned.left + 20,
        top: cloned.top + 20,
      });
      canvasInstanceRef.current.add(cloned);
      canvasInstanceRef.current.setActiveObject(cloned);
    });
  };

  // Guardar diseño
  const saveDesign = () => {
    if (!canvasInstanceRef.current) return;

    const json = canvasInstanceRef.current.toJSON();
    const preview = canvasInstanceRef.current.toDataURL('image/png');

    const designObjects = json.objects.filter((obj) => obj.selectable !== false);

    const designData = {
      colorBase: colorBase,
      modelo: selectedModel,
      talla: selectedSize,
      capas: designObjects.map((obj) => ({
        tipo: obj.type === 'text' ? 'texto' : obj.type === 'image' ? 'imagen' : 'estampado',
        contenido: obj.type === 'text' ? obj.text : obj.src || '',
        posicion: { x: obj.left, y: obj.top },
        tamaño: { width: obj.width * obj.scaleX, height: obj.height * obj.scaleY },
        rotacion: obj.angle || 0,
        opacidad: obj.opacity || 1,
        color: obj.fill || '#000000',
        fuente: obj.fontFamily || 'Arial',
        tamañoTexto: obj.fontSize || 40,
      })),
      previewImageUrl: preview,
    };

    if (onSave) {
      onSave(designData);
    }
  };

  if (!fabricLib) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-black mx-auto mb-4"></div>
          <p className="text-black/40 font-bold tracking-widest uppercase text-sm">Cargando editor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white text-black">
      {/* Contenido principal */}
      <div className="flex flex-col lg:flex-row">
        {/* Panel izquierdo - Herramientas */}
        <div className="lg:w-1/3 border-r border-black/10 bg-beige-light/20 p-6 overflow-y-auto">
          <div className="mb-6">
            <button
              onClick={onBack}
              className="text-black/40 hover:text-black font-bold tracking-widest text-xs uppercase mb-4"
            >
              ← Volver
            </button>
            <h2 className="text-2xl font-black tracking-tight uppercase mb-2">Herramientas de Diseño</h2>
            <p className="text-sm text-black/60">Agregá textos, imágenes y estampados</p>
          </div>

          {/* Herramientas principales */}
          <div className="mb-6">
            <h3 className="text-sm font-black uppercase tracking-wider mb-4">Herramientas</h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  setShowGallery(true);
                  setSelectedTool('gallery');
                }}
                className={`p-4 border-2 font-black text-xs tracking-widest uppercase transition-all flex items-center justify-center gap-2 ${
                  selectedTool === 'gallery'
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-black border-black/20 hover:border-black'
                }`}
              >
                <GalleryIcon size={18} /> Galería
              </button>
              <label className="p-4 border-2 font-black text-xs tracking-widest uppercase transition-all flex items-center justify-center gap-2 bg-white text-black border-black/20 hover:border-black cursor-pointer">
                <Upload size={18} /> Subir
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
              <button
                onClick={() => setSelectedTool('text')}
                className={`p-4 border-2 font-black text-xs tracking-widest uppercase transition-all flex items-center justify-center gap-2 ${
                  selectedTool === 'text'
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-black border-black/20 hover:border-black'
                }`}
              >
                <Type size={18} /> Texto
              </button>
              <button
                onClick={() => setSelectedTool('select')}
                className={`p-4 border-2 font-black text-xs tracking-widest uppercase transition-all flex items-center justify-center gap-2 ${
                  selectedTool === 'select'
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-black border-black/20 hover:border-black'
                }`}
              >
                <Move size={18} /> Seleccionar
              </button>
            </div>
          </div>

          {/* Galería de Diseños Predefinidos */}
          {showGallery && (
            <div className="mb-6 p-4 bg-white border-2 border-black">
              <h3 className="font-black text-xs tracking-widest uppercase mb-4">Diseños Predefinidos</h3>
              <div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                {predefinedDesigns.map((design) => (
                  <button
                    key={design.id}
                    onClick={() => addPredefinedDesign(design.url)}
                    className="aspect-square border-2 border-black/20 hover:border-black transition-all overflow-hidden bg-white group"
                    title={design.name}
                  >
                    <img
                      src={design.url}
                      alt={design.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center text-xs font-bold text-black/40">${design.name}</div>`;
                      }}
                    />
                  </button>
                ))}
              </div>
              <button
                onClick={() => setShowGallery(false)}
                className="w-full mt-4 p-2 border-2 border-black/20 hover:border-black transition-all text-xs font-black uppercase"
              >
                Cerrar Galería
              </button>
            </div>
          )}

          {/* Editor de texto */}
          {selectedTool === 'text' && (
            <div className="mb-6 p-4 bg-white border-2 border-black space-y-4">
              <h4 className="font-black text-xs tracking-widest uppercase">Agregar Texto</h4>
              <input
                type="text"
                value={textValue}
                onChange={(e) => setTextValue(e.target.value)}
                placeholder="Escribí tu texto..."
                className="w-full px-4 py-3 border-2 border-black bg-white font-bold text-lg"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') addText();
                }}
              />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest block mb-2">Tamaño</label>
                  <input
                    type="range"
                    min="20"
                    max="100"
                    value={fontSize}
                    onChange={(e) => setFontSize(Number(e.target.value))}
                    className="w-full"
                  />
                  <span className="text-xs font-bold">{fontSize}px</span>
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest block mb-2">Color</label>
                  <input
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="w-full h-10 border-2 border-black"
                  />
                </div>
              </div>
              <button
                onClick={addText}
                className="w-full bg-black text-white font-black py-3 tracking-widest uppercase text-sm hover:bg-black/80 transition-all"
              >
                Agregar Texto
              </button>
            </div>
          )}

          {/* Controles de objeto seleccionado */}
          {selectedObject && (
            <div className="mb-6 p-4 bg-black text-white">
              <h4 className="font-black text-xs tracking-widest uppercase mb-3">Objeto Seleccionado</h4>
              <div className="flex gap-2">
                <button
                  onClick={deleteSelected}
                  className="flex-1 p-2 bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
                >
                  <Trash2 size={18} /> Eliminar
                </button>
                <button
                  onClick={duplicateSelected}
                  className="flex-1 p-2 bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
                >
                  <Layers size={18} /> Duplicar
                </button>
              </div>
            </div>
          )}

          {/* Botón guardar */}
          <button
            onClick={saveDesign}
            className="w-full bg-black text-white font-black py-4 tracking-widest uppercase text-sm hover:bg-black/80 transition-all"
          >
            Guardar y Continuar
          </button>
        </div>

        {/* Panel derecho - Canvas y Preview */}
        <div className="lg:w-2/3 p-6 bg-white">
          <div className="mb-6">
            <h2 className="text-2xl font-black tracking-tight uppercase mb-2">Editor de Diseño</h2>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-6 h-6 rounded-full border-2 border-black"
                  style={{ backgroundColor: getColorHex(colorBase) }}
                />
                <span className="text-sm font-bold">
                  {selectedModel} • Talla {selectedSize}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewSide(viewSide === 'Frente' ? 'Espalda' : 'Frente')}
                  className="p-2 border border-black/20 hover:border-black transition-all"
                  title="Ver Atrás"
                >
                  <RotateCcw size={18} />
                </button>
                <button
                  className="p-2 border border-black/20 hover:border-black transition-all"
                  title="Vista"
                >
                  <Eye size={18} />
                </button>
                <button
                  className="p-2 border border-black/20 hover:border-black transition-all"
                  title="Expandir"
                >
                  <Maximize2 size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Canvas principal */}
          <div className="mb-6 flex items-center justify-center bg-beige-light/30 border-2 border-black/10 p-4">
            <canvas ref={canvasRef} className="border-2 border-black shadow-lg" />
          </div>

          {/* Preview en tiempo real */}
          <div className="mb-6">
            <h3 className="text-sm font-black uppercase tracking-wider mb-3">Preview en Tiempo Real</h3>
            <div className="flex items-center justify-center bg-beige-light/30 border-2 border-black/10 p-4">
              <div className="relative">
                <canvas ref={previewCanvasRef} className="border border-black/20" />
                <p className="text-center mt-2 text-xs text-black/40 font-bold uppercase tracking-wider">
                  Vista: {viewSide}
                </p>
              </div>
            </div>
          </div>

          {/* Barra de estado */}
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Type size={18} className="text-blue-600" />
                <span className="text-xs font-bold uppercase text-blue-600">Diseños</span>
              </div>
              <p className="text-sm font-bold">{elementCount} elemento{elementCount !== 1 ? 's' : ''} aplicado{elementCount !== 1 ? 's' : ''}</p>
            </div>
            <div className="p-4 bg-green-50 border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <Eye size={18} className="text-green-600" />
                <span className="text-xs font-bold uppercase text-green-600">Vista</span>
              </div>
              <p className="text-sm font-bold">{viewSide} • Editor</p>
            </div>
            <div className="p-4 bg-purple-50 border border-purple-200">
              <div className="flex items-center gap-2 mb-2">
                <ImageIcon size={18} className="text-purple-600" />
                <span className="text-xs font-bold uppercase text-purple-600">Producto</span>
              </div>
              <p className="text-sm font-bold">{selectedModel?.toLowerCase() || 'clásica'} • Talla {selectedSize}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorDiseño;
