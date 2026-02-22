import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, Cpu, Settings, Terminal, LayoutTemplate } from 'lucide-react';

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

// ... (mismos imports y definición de layers)

export default function OsLayers() {
  const [activeLayer, setActiveLayer] = useState(null);

  return (
    // CAMBIO: Eliminamos min-h-screen y p-8. Usamos h-full para llenar el slot de Astro.
    <div className="w-full h-full flex items-center justify-center font-sans">
      <div className="w-full flex flex-col lg:flex-row items-center gap-8">
        
        {/* COLUMNA IZQUIERDA: TEXTO DINÁMICO */}
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-widest">
            <span className="w-6 h-[2px] bg-blue-600"></span>
            Módulo 01: Fundamentos
          </div>
          <h2 className="text-4xl font-black text-slate-900 leading-tight">
            Capas del <br/><span className="text-blue-600">Sistema Operativo</span>
          </h2>
          <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
            Interactúa con el diagrama para explorar cómo se organiza el software antes de llegar al silicio.
          </p>
          
          {/* Pequeño detalle: leyenda de colores que cambian según el hover */}
          <div className="pt-4 space-y-2">
            {layers.map((l) => (
              <div 
                key={l.id}
                onMouseEnter={() => setActiveLayer(l)}
                className={`flex items-center gap-3 p-2 rounded-lg transition-all cursor-pointer ${activeLayer?.id === l.id ? 'bg-white shadow-sm ring-1 ring-slate-200' : 'opacity-60'}`}
              >
                <div className={`w-2 h-2 rounded-full`} style={{ backgroundColor: l.id === 'hw' ? '#1e293b' : l.border }}></div>
                <span className="text-xs font-bold text-slate-700">{l.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* COLUMNA DERECHA: EL DIAGRAMA */}
        <div className="flex-[1.5] w-full max-w-[480px] relative">
          <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 p-6 aspect-square relative flex items-center justify-center">
            
            <svg viewBox="0 0 400 400" className="w-full h-full overflow-visible">
              {layers.map((l) => (
                <g key={l.id} className="transition-all duration-300">
                  <motion.circle
                    cx="200" cy="200" r={l.r}
                    fill={l.bg}
                    stroke={l.border}
                    strokeWidth={activeLayer?.id === l.id ? "3" : "1"}
                    animate={{ 
                      scale: activeLayer?.id === l.id ? 1.03 : 1,
                      opacity: activeLayer && activeLayer.id !== l.id ? 0.4 : 1 
                    }}
                    onHoverStart={() => setActiveLayer(l)}
                    onHoverEnd={() => setActiveLayer(null)}
                    className="cursor-pointer origin-center"
                  />
                  <text x="200" y={l.id === 'hw' ? 205 : 200 - l.r + 20} textAnchor="middle" fill={l.text} fontSize="10" fontWeight="800" className="pointer-events-none uppercase tracking-tighter">
                    {l.name}
                  </text>
                </g>
              ))}
            </svg>

            {/* INFO CARD FLOTANTE MEJORADA */}
            <AnimatePresence>
              {activeLayer && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="absolute -right-4 top-1/4 z-20 bg-slate-900 text-white p-4 rounded-2xl shadow-2xl max-w-[200px]"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <activeLayer.icon size={14} className="text-blue-400" />
                    <h3 className="font-bold text-[11px] uppercase tracking-wider">{activeLayer.title}</h3>
                  </div>
                  <p className="text-[10px] text-slate-300 leading-tight">{activeLayer.desc}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
