'use client'

import { useBrandStore } from '@/store/brandStore'
import { Play, Grid, X, Lock, Unlock } from 'lucide-react'

export default function Toolbar() {
  const store = useBrandStore()

  if (store.isPreviewMode) {
    return (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] flex gap-2 bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-xl border border-gray-200">
            <span className="text-xs font-bold self-center mr-2 text-green-600 uppercase tracking-widest flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> Live Site
            </span>
            <button 
                onClick={() => store.setPreviewMode(false)}
                className="p-2 hover:bg-gray-100 rounded-full text-red-500 transition-colors"
                title="Sair"
            >
                <X size={16} />
            </button>
        </div>
    )
  }

  return (
    <div className="h-12 bg-white border-b border-gray-200 flex justify-between items-center px-4 z-50 shrink-0">
        <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black text-white rounded-lg flex items-center justify-center font-black text-xs shadow-lg shadow-black/20">
                BE
            </div>
            <h1 className="font-bold text-sm tracking-tight text-gray-900">Bento Editor</h1>
            <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded border border-gray-200 ml-2">Beta</span>
        </div>

        <div className="flex gap-2">
            <button 
                onClick={store.togglePanLock} 
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all border ${store.isPanLocked ? 'bg-red-50 text-red-600 border-red-200 shadow-inner' : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'}`}
                title={store.isPanLocked ? "Movimento Travado" : "Movimento Livre"}
            >
                {store.isPanLocked ? <Lock size={14} /> : <Unlock size={14} />} 
                {store.isPanLocked ? 'Travado' : 'Mover'}
            </button>

            <button 
                onClick={store.toggleGrid} 
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all border ${store.showGrid ? 'bg-blue-50 text-blue-600 border-blue-200 shadow-inner' : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'}`}
            >
                <Grid size={14} /> Grade
            </button>
            
            <div className="w-px h-6 bg-gray-200 mx-2 self-center" />

            <button 
                onClick={() => store.setPreviewMode(true)} 
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-md text-xs font-bold bg-green-500 text-white shadow-md hover:bg-green-600 hover:shadow-lg transition-all hover:-translate-y-0.5"
            >
                <Play size={14} fill="currentColor" /> Preview
            </button>
        </div>
    </div>
  )
}