'use client'

import { useBrandStore } from '@/store/brandStore'
import { Plus, Layout, Layers, ChevronRight, MousePointer2 } from 'lucide-react'

export default function LeftPanel() {
  const store = useBrandStore()

  if (store.isPreviewMode) return null

  return (
    <div className="w-60 bg-white border-r border-gray-200 flex flex-col h-full shrink-0 z-40">
        <div className="p-3 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <span className="text-[10px] font-bold uppercase text-gray-400 flex items-center gap-1">
                <Layout size={12} /> Páginas
            </span>
            <button onClick={store.addPage} className="p-1 hover:bg-gray-200 rounded text-gray-600 transition-colors">
                <Plus size={14} />
            </button>
        </div>
        
        <div className="flex-1 overflow-y-auto scrollbar-hide p-2 space-y-1">
            {store.pages.map(page => (
                <div key={page.id} className="space-y-1">
                    <div 
                        onClick={() => store.selectLayer(null, page.id)}
                        className={`flex items-center gap-2 p-2 rounded-md cursor-pointer text-xs font-medium transition-all group ${store.activePageId === page.id ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50 text-gray-600'}`}
                    >
                        <ChevronRight size={12} className={`transition-transform ${store.activePageId === page.id ? 'rotate-90' : ''}`} />
                        <span className="truncate">{page.name}</span>
                    </div>

                    {store.activePageId === page.id && (
                        <div className="ml-4 pl-2 border-l border-gray-100 space-y-0.5 animate-in slide-in-from-left-2 duration-200">
                            {page.layers.slice().reverse().map(layer => (
                                <div 
                                    key={layer.id}
                                    onClick={(e) => { e.stopPropagation(); store.selectLayer(layer.id, page.id) }}
                                    className={`flex items-center gap-2 p-1.5 rounded cursor-pointer text-[10px] transition-colors ${store.selectedLayerId === layer.id ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
                                >
                                    {layer.type === 'shape' ? <Layers size={10} /> : <MousePointer2 size={10} />}
                                    <span className="truncate w-full">
                                        {layer.content ? layer.content.substring(0, 15) : layer.type}
                                    </span>
                                </div>
                            ))}
                            {page.layers.length === 0 && (
                                <div className="text-[9px] text-gray-300 italic p-1">Vazio</div>
                            )}
                        </div>
                    )}
                </div>
            ))}
        </div>
    </div>
  )
}