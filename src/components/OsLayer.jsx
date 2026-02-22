import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, Cpu, Settings, Terminal, LayoutTemplate } from 'lucide-react';

export default function OsLayers() {
  const [activeLayer, setActiveLayer] = useState(null);

  // Ordenamos de mayor a menor radio para que los círculos grandes
  // se dibujen primero en el SVG y queden por detrás de los pequeños.
  const layers = [
    { 
      id: 'user', r: 160, bg: '#f8fafc', border: '#e2e8f0', text: '#64748b', 
      title: 'User Space', name: 'Capa 4: Shell & Apps',
      desc: 'Donde viven tus aplicaciones. En Docker, solo empaquetamos esta capa.',
      icon: LayoutTemplate, iconColor: 'text-blue-500', bgIcon: 'bg-blue-100'
    },
    { 
      id: 'services', r: 120, bg: '#e2e8f0', border: '#cbd5e1', text: '#475569', 
      title: 'System Calls', name: 'Capa 3: System Calls',
      desc: 'La API del sistema. Los contenedores usan esta interfaz para pedir recursos.',
      icon: Terminal, iconColor: 'text-emerald-500', bgIcon: 'bg-emerald-100'
    },
    { 
      id: 'kernel', r: 80, bg: '#cbd5e1', border: '#94a3b8', text: '#334155', 
      title: 'Kernel (Núcleo)', name: 'Capa 2: Kernel',
      desc: 'El motor del SO. Gestiona memoria y procesos. Se comparte entre contenedores.',
      icon: Settings, iconColor: 'text-amber-500', bgIcon: 'bg-amber-100'
    },
    { 
      id: 'hw', r: 40, bg: '#1e293b', border: '#0f172a', text: '#ffffff', 
      title: 'Hardware', name: 'HARDWARE',
      desc: 'La fuerza bruta: CPU, RAM y Almacenamiento físico.',
      icon: Cpu, iconColor: 'text-rose-500', bgIcon: 'bg-rose-100'
    }
  ];

  return (
    <div className="w-full min-h-screen bg-slate-50 flex items-center justify-center p-8 font-sans">
      <div className="max-w-6xl w-full flex flex-col lg:flex-row items-center gap-12">
        
        {/* COLUMNA IZQUIERDA: TEXTOS Y TARJETAS */}
        <div className="flex-1 space-y-6">
          <div>
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4 leading-tight">
              Capas del <span className="text-blue-600">Sistema Operativo</span>
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              Para entender cómo funcionan los contenedores, primero debemos diseccionar la arquitectura de un Sistema Operativo (SO) tradicional. Un SO actúa como intermediario entre el hardware y los programas del usuario.
            </p>
          </div>

          <div className="space-y-4 mt-8">
            <h3 className="text-sm font-bold text-slate-400 tracking-widest uppercase mb-4">
              Componentes Clave
            </h3>
            {/* Renderizamos las tarjetas de las capas invirtiendo el array para mostrar HW primero */}
            {[...layers].reverse().map((l) => (
              <div 
                key={`card-${l.id}`} 
                className="flex items-start gap-4 p-4 rounded-xl bg-white border border-slate-100 shadow-sm transition-all hover:shadow-md"
                onMouseEnter={() => setActiveLayer(l)}
                onMouseLeave={() => setActiveLayer(null)}
              >
                <div className={`p-3 rounded-lg ${l.bgIcon} ${l.iconColor}`}>
                  <l.icon size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{l.title}</h4>
                  <p className="text-sm text-slate-500 mt-1 leading-relaxed">{l.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* COLUMNA DERECHA: EL DIAGRAMA DE CÍRCULOS */}
        <div className="flex-1 w-full max-w-[550px] relative">
          <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8 aspect-square relative flex items-center justify-center overflow-hidden">
            
            <p className="absolute top-8 left-8 text-xs font-bold text-slate-400 tracking-widest uppercase">
              Fig 1.1: Modelo de Capas
            </p>

            <svg viewBox="0 0 400 400" className="w-full h-full mt-6">
              {layers.map((l) => (
                <g key={l.id}>
                  <motion.circle
                    cx="200" cy="200" r={l.r}
                    fill={l.bg}
                    stroke={l.border}
                    strokeWidth="1"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    whileHover={{ scale: 1.02, strokeWidth: 2 }}
                    onHoverStart={() => setActiveLayer(l)}
                    onHoverEnd={() => setActiveLayer(null)}
                    className="cursor-pointer origin-center drop-shadow-sm"
                  />
                  {/* Texto dentro del círculo */}
                  {l.id === 'hw' ? (
                    <text x="200" y="204" textAnchor="middle" fill={l.text} fontSize="11" fontWeight="bold" className="pointer-events-none tracking-widest">
                      {l.name}
                    </text>
                  ) : (
                    <text x="200" y={200 - l.r + 20} textAnchor="middle" fill={l.text} fontSize="12" fontWeight="600" className="pointer-events-none">
                      {l.name}
                    </text>
                  )}
                </g>
              ))}
            </svg>

            {/* INFO CARD FLOTANTE */}
            <AnimatePresence>
              {activeLayer && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
                  className="absolute z-10 pointer-events-none bg-white/95 backdrop-blur-md border border-slate-100 p-5 rounded-2xl shadow-xl max-w-[260px]"
                  style={{ top: '15%', right: '5%' }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Info size={16} className="text-blue-500" />
                    <h3 className="font-bold text-slate-900 text-sm">{activeLayer.title}</h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{activeLayer.desc}</p>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
          <p className="text-center text-xs text-slate-400 mt-6 italic">
            * Pasa el cursor sobre el diagrama o las tarjetas para explorar cada capa.
          </p>
        </div>

      </div>
    </div>
  );
}