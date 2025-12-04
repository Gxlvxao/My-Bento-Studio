'use client'

import { useBrandStore } from '@/store/brandStore'
import { Settings, X, Trash2, Upload, Layers, Grid, LayoutTemplate, Square, Circle, Type, Play, Image as ImageIcon, Sliders, Link as LinkIcon, Monitor, Plus, Triangle, Hexagon, Star, MessageSquare, MonitorPlay, Eye } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function EditorPanel() {
  const [isOpen, setIsOpen] = useState(true)
  const [activeTab, setActiveTab] = useState<'pages' | 'add' | 'edit'>('pages')
  const [isMounted, setIsMounted] = useState(false)
  const store = useBrandStore()
  
  useEffect(() => setIsMounted(true), [])
  
  
  const activePage = store.pages.find(p => p.id === store.activePageId) || store.pages[0]
  const selectedLayer = activePage?.layers.find(l => l.id === store.selectedLayerId)

  useEffect(() => {
    if (store.selectedLayerId) setActiveTab('edit')
  }, [store.selectedLayerId])

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && store.activePageId && store.selectedLayerId) {
        const url = URL.createObjectURL(file)
        store.updateLayer(store.activePageId, store.selectedLayerId, { image: url })
    }
  }

  if (!isMounted) return null

  
  if (store.isPreviewMode) {
      return (
          <button 
            onClick={() => store.setPreviewMode(false)}
            className="fixed bottom-8 right-8 z-[9999] bg-black text-white px-6 py-3 rounded-full shadow-2xl font-bold flex items-center gap-2 hover:bg-gray-900 transition-all"
          >
              <X size={16} /> Sair do Modo Preview
          </button>
      )
  }

  
  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-[9999] flex gap-2">
           <button onClick={() => store.setPreviewMode(true)} className="bg-green-500 text-white p-4 rounded-full shadow-xl hover:scale-110 transition-transform">
                <Play size={24} fill="currentColor" />
           </button>
           <button onClick={() => setIsOpen(true)} className="bg-black text-white p-4 rounded-full shadow-xl hover:scale-110 transition-transform">
                <Settings size={24} />
           </button>
      </div>
    )
  }

  return (
    <div className="fixed top-4 right-4 bottom-4 z-[9999] w-80 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">
      
    
      <div className="flex-none flex justify-between items-center p-4 border-b border-gray-100 bg-white/50">
        <h2 className="font-bold text-sm">Figma Builder V6</h2>
        <div className="flex gap-1">
            <button onClick={() => store.setPreviewMode(true)} className="p-1.5 rounded bg-green-500 text-white shadow-sm flex items-center gap-1 px-3">
                <Play size={12} fill="currentColor" /> <span className="text-[10px] font-bold">PLAY</span>
            </button>
            <button onClick={() => setIsOpen(false)} className="p-1.5 hover:bg-gray-100 rounded"><X size={14} /></button>
        </div>
      </div>

     
      <div className="flex border-b border-gray-200 bg-gray-50/50">
          <button onClick={() => setActiveTab('pages')} className={`flex-1 py-3 text-xs font-bold uppercase ${activeTab === 'pages' ? 'border-b-2 border-black bg-white' : 'text-gray-400'}`}>Artboards</button>
          <button onClick={() => setActiveTab('add')} className={`flex-1 py-3 text-xs font-bold uppercase ${activeTab === 'add' ? 'border-b-2 border-black bg-white' : 'text-gray-400'}`}>Criar</button>
          <button onClick={() => setActiveTab('edit')} className={`flex-1 py-3 text-xs font-bold uppercase ${activeTab === 'edit' ? 'border-b-2 border-black bg-white' : 'text-gray-400'}`}>Editar</button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide">
        
       
        {activeTab === 'pages' && (
            <div className="space-y-6">
                <div className="bg-blue-50 p-3 rounded-xl border border-blue-100">
                    <h3 className="text-[10px] font-bold uppercase text-blue-500 mb-2">Artboard Ativo</h3>
                    <div className="space-y-2">
                        <input 
                            type="text" 
                            value={activePage?.name || ''} 
                            onChange={(e) => store.updatePage(activePage.id, { name: e.target.value })} 
                            className="w-full text-sm font-bold bg-white p-2 rounded border border-blue-200" 
                        />
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <label className="text-[9px] text-gray-500">Largura</label>
                                <input type="number" value={activePage?.width} onChange={(e) => store.updatePage(activePage.id, { width: Number(e.target.value) })} className="w-full text-xs p-1 bg-white border rounded" />
                            </div>
                            <div>
                                <label className="text-[9px] text-gray-500">Altura</label>
                                <input type="number" value={activePage?.height} onChange={(e) => store.updatePage(activePage.id, { height: Number(e.target.value) })} className="w-full text-xs p-1 bg-white border rounded" />
                            </div>
                        </div>
                        <div>
                             <label className="text-[9px] text-gray-500">Cor de Fundo</label>
                             <div className="flex gap-2">
                                <input type="color" value={activePage?.bgColor} onChange={(e) => store.updatePage(activePage.id, { bgColor: e.target.value })} className="w-6 h-6 rounded cursor-pointer border-0" />
                                <span className="text-xs text-gray-500">{activePage?.bgColor}</span>
                             </div>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-[10px] font-bold uppercase text-gray-400">Todos Artboards</h3>
                        <button onClick={store.addPage} className="p-1 bg-black text-white rounded hover:bg-gray-800"><Plus size={14} /></button>
                    </div>
                    <div className="space-y-2">
                        {store.pages.map(page => (
                            <div key={page.id} onClick={() => store.selectLayer(null, page.id)} className={`flex justify-between items-center p-3 rounded-lg border cursor-pointer hover:bg-gray-50 ${store.activePageId === page.id ? 'bg-gray-100 border-black' : 'bg-white border-gray-100'}`}>
                                <span className="text-xs font-bold">{page.name}</span>
                                <button onClick={(e) => { e.stopPropagation(); store.deletePage(page.id) }} disabled={store.pages.length === 1} className="p-1 hover:bg-red-100 text-red-500 rounded disabled:opacity-30"><Trash2 size={12} /></button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )}

       
        {activeTab === 'add' && store.activePageId && (
            <div className="space-y-6">
                <div>
                    <h3 className="text-[10px] font-bold uppercase text-gray-400 mb-3">Elementos UI</h3>
                    <div className="grid grid-cols-2 gap-2">
                        <button onClick={() => store.addLayer(store.activePageId!, 'header')} className="flex items-center gap-2 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200"><LayoutTemplate size={16} className="text-pink-400" /><span className="text-[10px] font-bold">Header</span></button>
                        <button onClick={() => store.addLayer(store.activePageId!, 'text-zone')} className="flex items-center gap-2 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200"><LayoutTemplate size={16} className="text-blue-400" /><span className="text-[10px] font-bold">Text Zone</span></button>
                        <button onClick={() => store.addLayer(store.activePageId!, 'image-zone')} className="flex items-center gap-2 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200"><ImageIcon size={16} className="text-green-400" /><span className="text-[10px] font-bold">Image Zone</span></button>
                        <button onClick={() => store.addLayer(store.activePageId!, 'marquee')} className="flex items-center gap-2 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200"><MonitorPlay size={16} className="text-purple-400" /><span className="text-[10px] font-bold">Marquee</span></button>
                    </div>
                </div>
                <div>
                    <h3 className="text-[10px] font-bold uppercase text-gray-400 mb-3">Formas & Texto</h3>
                    <div className="grid grid-cols-4 gap-2">
                        <button onClick={() => store.addLayer(store.activePageId!, 'custom-text')} className="p-2 bg-gray-50 hover:bg-gray-100 rounded border flex justify-center" title="Texto"><Type size={16} /></button>
                        <button onClick={() => store.addLayer(store.activePageId!, 'shape', 'rect')} className="p-2 bg-gray-50 hover:bg-gray-100 rounded border flex justify-center"><Square size={16} /></button>
                        <button onClick={() => store.addLayer(store.activePageId!, 'shape', 'circle')} className="p-2 bg-gray-50 hover:bg-gray-100 rounded border flex justify-center"><Circle size={16} /></button>
                        <button onClick={() => store.addLayer(store.activePageId!, 'shape', 'triangle')} className="p-2 bg-gray-50 hover:bg-gray-100 rounded border flex justify-center"><Triangle size={16} /></button>
                        <button onClick={() => store.addLayer(store.activePageId!, 'shape', 'star')} className="p-2 bg-gray-50 hover:bg-gray-100 rounded border flex justify-center"><Star size={16} /></button>
                        <button onClick={() => store.addLayer(store.activePageId!, 'shape', 'hexagon')} className="p-2 bg-gray-50 hover:bg-gray-100 rounded border flex justify-center"><Hexagon size={16} /></button>
                        <button onClick={() => store.addLayer(store.activePageId!, 'shape', 'message')} className="p-2 bg-gray-50 hover:bg-gray-100 rounded border flex justify-center"><MessageSquare size={16} /></button>
                    </div>
                </div>
            </div>
        )}

       
        {activeTab === 'edit' && selectedLayer && store.activePageId ? (
            <div className="space-y-4 pb-12 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="flex justify-between items-center bg-blue-50 p-2 rounded-lg border border-blue-100 sticky top-0 z-10">
                    <span className="text-xs font-bold text-blue-600 uppercase">{selectedLayer.type}</span>
                    <div className="flex gap-1">
                        <button onClick={() => store.bringToFront(store.activePageId!, selectedLayer.id)} className="p-1 hover:bg-white rounded"><Layers size={14} /></button>
                        <button onClick={() => store.removeLayer(store.activePageId!, selectedLayer.id)} className="p-1 hover:bg-red-100 text-red-500 rounded"><Trash2 size={14} /></button>
                    </div>
                </div>

                <div className="space-y-3 p-3 border border-gray-100 rounded-xl">
                    <h4 className="text-[10px] font-bold uppercase text-gray-400 flex items-center gap-2"><Sliders size={10} /> Efeitos Visuais</h4>
                    
                    <div className="flex justify-between items-center">
                        <label className="text-xs font-medium">Cor</label>
                        <input type="color" value={selectedLayer.bgColor} onChange={(e) => store.updateLayer(store.activePageId!, selectedLayer.id, { bgColor: e.target.value })} className="w-6 h-6 rounded cursor-pointer border-0" />
                    </div>

                    <div className="space-y-1">
                        <div className="flex justify-between text-xs"><span>Opacidade</span> <span>{selectedLayer.opacity}%</span></div>
                        <input type="range" min="0" max="100" value={selectedLayer.opacity} onChange={(e) => store.updateLayer(store.activePageId!, selectedLayer.id, { opacity: Number(e.target.value) })} className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                    </div>

                    <div className="space-y-1">
                        <div className="flex justify-between text-xs"><span>Radius</span></div>
                        <input type="text" value={selectedLayer.borderRadius} onChange={(e) => store.updateLayer(store.activePageId!, selectedLayer.id, { borderRadius: e.target.value })} className="w-full text-xs p-1 bg-gray-50 border rounded" />
                    </div>

                    <div className="flex items-center justify-between">
                         <label className="text-xs">Sombra Drop</label>
                         <input type="checkbox" checked={selectedLayer.shadow} onChange={(e) => store.updateLayer(store.activePageId!, selectedLayer.id, { shadow: e.target.checked })} />
                    </div>
                </div>

               
                <div className="space-y-3 p-3 border border-gray-100 rounded-xl">
                    <h4 className="text-[10px] font-bold uppercase text-gray-400 flex items-center gap-2"><Play size={10} /> Animação Entrada</h4>
                    
                    <select value={selectedLayer.animation} onChange={(e) => store.updateLayer(store.activePageId!, selectedLayer.id, { animation: e.target.value as any })} className="w-full text-xs p-1 bg-gray-50 border rounded">
                        <option value="none">Nenhuma</option>
                        <option value="fade">Fade In</option>
                        <option value="slide-up">Slide Up</option>
                        <option value="slide-right">Slide Right</option>
                        <option value="zoom">Zoom In</option>
                        <option value="float">Flutuar (Loop)</option>
                        <option value="pulse">Pulsar (Loop)</option>
                    </select>

                    <div className="space-y-1">
                        <div className="flex justify-between text-xs"><span>Delay</span> <span>{selectedLayer.animationDelay}s</span></div>
                        <input type="range" min="0" max="2" step="0.1" value={selectedLayer.animationDelay} onChange={(e) => store.updateLayer(store.activePageId!, selectedLayer.id, { animationDelay: Number(e.target.value) })} className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                    </div>
                </div>

               
                <div className="space-y-3 p-3 border border-gray-100 rounded-xl">
                     <h4 className="text-[10px] font-bold uppercase text-gray-400 flex items-center gap-2"><ImageIcon size={10} /> Imagem / Filtros</h4>
                     
                     <label className="flex items-center justify-center gap-2 w-full p-2 bg-blue-50 border border-dashed border-blue-200 rounded cursor-pointer hover:bg-blue-100">
                        <Upload size={12} className="text-blue-500" />
                        <span className="text-xs text-blue-500 font-bold">Carregar</span>
                        <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                    </label>

                    {selectedLayer.image && (
                        <div className="space-y-2 pt-2 border-t border-gray-100">
                             <div className="flex justify-between items-center">
                                <label className="text-xs">Modo</label>
                                <select value={selectedLayer.objectFit || 'cover'} onChange={(e) => store.updateLayer(store.activePageId!, selectedLayer.id, { objectFit: e.target.value as any })} className="text-xs p-1 bg-gray-50 border rounded">
                                    <option value="cover">Cobrir</option>
                                    <option value="contain">Conter</option>
                                    <option value="fill">Esticar</option>
                                    <option value="none">Livre</option>
                                </select>
                            </div>
                            
                            <div className="space-y-1">
                                <div className="flex justify-between text-xs"><span>Blur</span> <span>{selectedLayer.blur}px</span></div>
                                <input type="range" min="0" max="20" value={selectedLayer.blur || 0} onChange={(e) => store.updateLayer(store.activePageId!, selectedLayer.id, { blur: Number(e.target.value) })} className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                            </div>
                            
                            <div className="space-y-1">
                                <div className="flex justify-between text-xs"><span>P&B</span> <span>{selectedLayer.grayscale}%</span></div>
                                <input type="range" min="0" max="100" value={selectedLayer.grayscale || 0} onChange={(e) => store.updateLayer(store.activePageId!, selectedLayer.id, { grayscale: Number(e.target.value) })} className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        ) : activeTab === 'edit' && (
            <div className="text-center py-10 text-gray-300 text-xs">Selecione um elemento para editar</div>
        )}
      </div>
    </div>
  )
}