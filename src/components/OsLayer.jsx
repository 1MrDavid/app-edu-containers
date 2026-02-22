import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, MousePointer2 } from 'lucide-react';

export default function OsLayers() {
  const [activeLayer, setActiveLayer] = useState(null);

  const layers = [
    { id: 'user', r: 160, color: 'rgba(59, 130, 246, 0.1)', border: '#3b82f6', title: 'User Space', desc: 'Donde viven tus aplicaciones. En Docker, solo empaquetamos esta capa.' },
    { id: 'services', r: 120, color: 'rgba(16, 185, 129, 0.1)', border: '#10b981', title: 'System Calls', desc: 'La API del sistema. Los contenedores usan esta interfaz para pedir recursos al Kernel.' },
    { id: 'kernel', r: 80, color: 'rgba(245, 158, 11, 0.1)', border: '#f59e0b', title: 'Kernel (Núcleo)', desc: 'El motor del SO. Gestiona memoria y procesos. Todos los contenedores comparten el mismo Kernel.' },
    { id: 'hw', r: 40, color: 'rgba(239, 68, 68, 0.2)', border: '#ef4444', title: 'Hardware', desc: 'La fuerza bruta: CPU, RAM y Almacenamiento físico.' }
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center p-20 bg-white">
      {/* TEXTO DE APOYO A LA IZQUIERDA */}
      <div className="absolute left-20 max-w-sm">
        <h2 className="text-5xl font-black text-slate-900 mb-6 leading-tight">Anatomía del <br/><span class="text-blue-600">Sistema Operativo</span></h2>
        <p className="text-slate-500 text-lg">Pasa el cursor sobre los círculos para entender cómo se comunican las capas.</p>
      </div>

      {/* EL DIAGRAMA DE CÍRCULOS */}
      <div className="relative flex items-center justify-center w-[500px] h-[500px]">
        <svg viewBox="0 0 400 400" className="w-full h-full">
          {layers.map((l) => (
            <motion.circle
              key={l.id}
              cx="200" cy="200" r={l.r}
              fill={l.color}
              stroke={l.border}
              strokeWidth="2"
              strokeDasharray="4 4"
              whileHover={{ scale: 1.02, strokeWidth: 4, strokeDasharray: "0" }}
              onHoverStart={() => setActiveLayer(l)}
              className="cursor-help transition-all duration-300"
            />
          ))}
          <circle cx="200" cy="200" r="5" fill="#1e293b" />
        </svg>

        {/* INFO CARD FLOTANTE (SE PARECE A TU BOCETO) */}
        <AnimatePresence>
          {activeLayer && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute pointer-events-none bg-white/90 backdrop-blur-md border border-slate-200 p-6 rounded-2xl shadow-2xl max-w-[280px]"
              style={{ top: '10%', right: '-10%' }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white" style={{ background: activeLayer.border }}>
                  <Info size={16} />
                </div>
                <h3 className="font-bold text-slate-900">{activeLayer.title}</h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">{activeLayer.desc}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <div className="absolute bottom-10 animate-bounce text-slate-400 flex flex-col items-center">
        <p class="text-[10px] font-bold uppercase tracking-widest mb-2">Desliza para continuar</p>

      </div>
    </div>
  );
}