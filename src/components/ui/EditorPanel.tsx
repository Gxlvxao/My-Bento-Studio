'use client'

import { useBrandStore } from '@/store/brandStore'
import { Settings, X, Trash2, Upload, Layers, Grid, LayoutTemplate, Square, Circle, Type, Play, Image as ImageIcon, Sliders, Move, Link as LinkIcon, Monitor, Plus, File, Triangle, Hexagon, Star, MessageSquare } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function EditorPanel() {
  const [isOpen, setIsOpen] = useState(true)
  const [activeTab, setActiveTab] = useState<'pages' | 'add' | 'edit'>('add')
  const [isMounted, setIsMounted] = useState(false)
  const store = useBrandStore()
  
  useEffect(() => setIsMounted(true), [])
  
  const selectedLayer = store.pages.find(p => p.id === store.activePageId)?.layers.find(l => l.id === store.selectedId)

  // Auto-switch tab on select
  useEffect(() => {
    if (selectedLayer) setActiveTab('edit')
  }, [selectedLayer])

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && store.selectedId) {
        const url = URL.createObjectURL(file)
        store.updateLayer(store.selectedId, { image: url })
    }
  }

  if (!isMounted) return null

  if (!isOpen) {
    return (
      <button onClick={() => setIsOpen(true)} className="fixed bottom-4 right-4 z-[9999] bg-black text-white p-4 rounded-full shadow-xl hover:scale-110 transition-transform">
        <Settings size={24} />
      </button>
    )
  }

  return (
    <div className="fixed top-4 right-4 bottom-4 z-[9999] w-80 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">
      
      {/* Header Fixo */}
      <div className="flex-none flex justify-between items-center p-4 border-b border-gray-100 bg-white/50">
        <h2 className="font-bold text-sm">Bento Builder V5</h2>
        <div className="flex gap-1">
            <button onClick={store.resetAnimations} className="p-1.5 rounded bg-green-100 text-green-600"><Play size={14} /></button>
            <button onClick={store.toggleGrid} className={`p-1.5 rounded ${store.showGrid ? 'bg-blue-100 text-blue-600' : 'bg-gray-100'}`}><Grid size={14} /></button>
            <button onClick={() => setIsOpen(false)} className="p-1.5 hover:bg-gray-100 rounded"><X size={14} /></button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 bg-gray-50/50">
          <button onClick={() => setActiveTab('pages')} className={`flex-1 py-3 text-xs font-bold uppercase ${activeTab === 'pages' ? 'border-b-2 border-black bg-white' : 'text-gray-400'}`}>Páginas</button>
          <button onClick={() => setActiveTab('add')} className={`flex-1 py-3 text-xs font-bold uppercase ${activeTab === 'add' ? 'border-b-2 border-black bg-white' : 'text-gray-400'}`}>Adicionar</button>
          <button onClick={() => setActiveTab('edit')} className={`flex-1 py-3 text-xs font-bold uppercase ${activeTab === 'edit' ? 'border-b-2 border-black bg-white' : 'text-gray-400'}`}>Editar</button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide">
        
        {/* ABA PÁGINAS */}
        {activeTab === 'pages' && (
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-[10px] font-bold uppercase text-gray-400">Estrutura do Site</h3>
                    <button onClick={store.addPage} className="p-1 bg-black text-white rounded hover:bg-gray-800"><Plus size={14} /></button>
                </div>
                <div className="space-y-2">
                    {store.pages.map(page => (
                        <div key={page.id} className={`flex justify-between items-center p-3 rounded-lg border ${store.activePageId === page.id ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-100'}`}>
                            <button onClick={() => store.setActivePage(page.id)} className="text-xs font-bold flex-1 text-left">{page.name}</button>
                            <div className="flex gap-1">
                                <button onClick={() => store.deletePage(page.id)} disabled={store.pages.length === 1} className="p-1 hover:bg-red-100 text-red-500 rounded disabled:opacity-30"><Trash2 size={12} /></button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="pt-4 border-t border-gray-100">
                    <h3 className="text-[10px] font-bold uppercase text-gray-400 mb-2">Zoom Panorama</h3>
                    <input type="range" min="0.2" max="1.5" step="0.1" value={store.viewportZoom} onChange={(e) => store.setZoom(Number(e.target.value))} className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                    <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>20%</span><span>150%</span></div>
                </div>
            </div>
        )}

        {/* ABA ADICIONAR */}
        {activeTab === 'add' && (
            <div className="space-y-6">
                <div>
                    <h3 className="text-[10px] font-bold uppercase text-gray-400 mb-3">Básico</h3>
                    <div className="grid grid-cols-3 gap-2">
                        <button onClick={() => store.addLayer('custom-text')} className="flex flex-col items-center justify-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200"><Type size={18} className="mb-1" /><span className="text-[9px]">Texto</span></button>
                        <button onClick={() => store.addLayer('header')} className="flex flex-col items-center justify-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200"><LayoutTemplate size={18} className="mb-1 text-pink-400" /><span className="text-[9px]">Header</span></button>
                        <button onClick={() => store.addLayer('image-zone')} className="flex flex-col items-center justify-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200"><ImageIcon size={18} className="mb-1 text-green-400" /><span className="text-[9px]">Image</span></button>
                    </div>
                </div>
                <div>
                    <h3 className="text-[10px] font-bold uppercase text-gray-400 mb-3">Formas</h3>
                    <div className="grid grid-cols-4 gap-2">
                        <button onClick={() => store.addLayer('shape', 'rect')} className="p-2 bg-gray-50 hover:bg-gray-100 rounded border flex justify-center"><Square size={16} /></button>
                        <button onClick={() => store.addLayer('shape', 'circle')} className="p-2 bg-gray-50 hover:bg-gray-100 rounded border flex justify-center"><Circle size={16} /></button>
                        <button onClick={() => store.addLayer('shape', 'triangle')} className="p-2 bg-gray-50 hover:bg-gray-100 rounded border flex justify-center"><Triangle size={16} /></button>
                        <button onClick={() => store.addLayer('shape', 'star')} className="p-2 bg-gray-50 hover:bg-gray-100 rounded border flex justify-center"><Star size={16} /></button>
                        <button onClick={() => store.addLayer('shape', 'hexagon')} className="p-2 bg-gray-50 hover:bg-gray-100 rounded border flex justify-center"><Hexagon size={16} /></button>
                        <button onClick={() => store.addLayer('shape', 'message')} className="p-2 bg-gray-50 hover:bg-gray-100 rounded border flex justify-center"><MessageSquare size={16} /></button>
                    </div>
                </div>
            </div>
        )}

        {/* ABA EDITAR */}
        {activeTab === 'edit' && selectedLayer ? (
            <div className="space-y-4 pb-12">
                <div className="flex justify-between items-center bg-blue-50 p-2 rounded-lg border border-blue-100">
                    <span className="text-xs font-bold text-blue-600 uppercase">{selectedLayer.type}</span>
                    <div className="flex gap-1">
                        <button onClick={() => store.bringToFront(selectedLayer.id)} className="p-1 hover:bg-white rounded"><Layers size={14} /></button>
                        <button onClick={() => store.removeLayer(selectedLayer.id)} className="p-1 hover:bg-red-100 text-red-500 rounded"><Trash2 size={14} /></button>
                    </div>
                </div>

                <div className="space-y-3 p-3 border border-gray-100 rounded-xl">
                    <h4 className="text-[10px] font-bold uppercase text-gray-400 flex items-center gap-2"><LinkIcon size={10} /> Link / Interação</h4>
                    <div className="flex gap-2 text-xs mb-2">
                        <button onClick={() => store.updateLayer(selectedLayer.id, { linkType: 'external' })} className={`flex-1 py-1 rounded ${selectedLayer.linkType === 'external' ? 'bg-black text-white' : 'bg-gray-100'}`}>URL</button>
                        <button onClick={() => store.updateLayer(selectedLayer.id, { linkType: 'internal' })} className={`flex-1 py-1 rounded ${selectedLayer.linkType === 'internal' ? 'bg-black text-white' : 'bg-gray-100'}`}>Página</button>
                    </div>
                    {selectedLayer.linkType === 'external' ? (
                        <input type="text" value={selectedLayer.linkUrl || ''} onChange={(e) => store.updateLayer(selectedLayer.id, { linkUrl: e.target.value })} className="w-full text-xs p-2 bg-gray-50 border rounded" placeholder="https://..." />
                    ) : (
                        <select value={selectedLayer.targetPageId || ''} onChange={(e) => store.updateLayer(selectedLayer.id, { targetPageId: e.target.value })} className="w-full text-xs p-2 bg-gray-50 border rounded">
                            <option value="">Selecione a Página...</option>
                            {store.pages.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                        </select>
                    )}
                </div>

                <div className="space-y-3 p-3 border border-gray-100 rounded-xl">
                    <h4 className="text-[10px] font-bold uppercase text-gray-400 flex items-center gap-2"><Sliders size={10} /> Estilo</h4>
                    <div className="flex justify-between items-center">
                        <label className="text-xs font-medium">Cor</label>
                        <input type="color" value={selectedLayer.bgColor} onChange={(e) => store.updateLayer(selectedLayer.id, { bgColor: e.target.value })} className="w-6 h-6 rounded cursor-pointer border-0" />
                    </div>
                    <div className="space-y-1">
                        <div className="flex justify-between text-xs"><span>Opacidade</span> <span>{selectedLayer.opacity}%</span></div>
                        <input type="range" min="0" max="100" value={selectedLayer.opacity} onChange={(e) => store.updateLayer(selectedLayer.id, { opacity: Number(e.target.value) })} className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                    </div>
                    {selectedLayer.type !== 'shape' && (
                         <div className="space-y-1">
                            <div className="flex justify-between text-xs"><span>Radius</span></div>
                            <input type="text" value={selectedLayer.borderRadius} onChange={(e) => store.updateLayer(selectedLayer.id, { borderRadius: e.target.value })} className="w-full text-xs p-1 bg-gray-50 border rounded" />
                        </div>
                    )}
                </div>

                <div className="space-y-3 p-3 border border-gray-100 rounded-xl">
                     <h4 className="text-[10px] font-bold uppercase text-gray-400 flex items-center gap-2"><ImageIcon size={10} /> Imagem</h4>
                     <label className="flex items-center justify-center gap-2 w-full p-2 bg-blue-50 border border-dashed border-blue-200 rounded cursor-pointer hover:bg-blue-100">
                        <Upload size={12} className="text-blue-500" />
                        <span className="text-xs text-blue-500 font-bold">Carregar</span>
                        <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                    </label>
                    {selectedLayer.image && (
                        <div className="space-y-2 pt-2 border-t border-gray-100">
                             <div className="flex justify-between items-center">
                                <label className="text-xs">Modo</label>
                                <select value={selectedLayer.objectFit || 'cover'} onChange={(e) => store.updateLayer(selectedLayer.id, { objectFit: e.target.value as any })} className="text-xs p-1 bg-gray-50 border rounded">
                                    <option value="cover">Cobrir</option>
                                    <option value="contain">Conter</option>
                                    <option value="fill">Esticar</option>
                                    <option value="none">Livre</option>
                                </select>
                            </div>
                            <div className="space-y-1">
                                <div className="flex justify-between text-xs"><span>Escala</span> <span>{selectedLayer.imgScale}%</span></div>
                                <input type="range" min="10" max="300" value={selectedLayer.imgScale} onChange={(e) => store.updateLayer(selectedLayer.id, { imgScale: Number(e.target.value) })} className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                            </div>
                        </div>
                    )}
                </div>

                <div className="space-y-3 p-3 border border-gray-100 rounded-xl">
                    <h4 className="text-[10px] font-bold uppercase text-gray-400 flex items-center gap-2"><Type size={10} /> Tipografia</h4>
                    <textarea value={selectedLayer.content || ''} onChange={(e) => store.updateLayer(selectedLayer.id, { content: e.target.value })} className="w-full text-xs p-2 bg-gray-50 border rounded" rows={2} />
                    <div className="grid grid-cols-2 gap-2">
                         <select value={selectedLayer.fontFamily} onChange={(e) => store.updateLayer(selectedLayer.id, { fontFamily: e.target.value as any })} className="w-full text-xs p-1 bg-gray-50 border rounded">
                                <option value="Space Grotesk">Space Grotesk</option>
                                <option value="Inter">Inter</option>
                                <option value="Playfair Display">Playfair</option>
                                <option value="Roboto Mono">Mono</option>
                                <option value="Lobster">Lobster</option>
                                <option value="Oswald">Oswald</option>
                                <option value="Pacifico">Pacifico</option>
                                <option value="Anton">Anton</option>
                                <option value="Dancing Script">Dancing Script</option>
                                <option value="Bebas Neue">Bebas Neue</option>
                                <option value="Abril Fatface">Abril Fatface</option>
                                <option value="Shadows Into Light">Shadows</option>
                        </select>
                        <input type="number" value={selectedLayer.fontSize} onChange={(e) => store.updateLayer(selectedLayer.id, { fontSize: Number(e.target.value) })} className="w-full text-xs p-1 bg-gray-50 border rounded" />
                    </div>
                </div>

            </div>
        ) : activeTab === 'edit' && (
            <div className="text-center py-10 text-gray-300 text-xs">Selecione um elemento para editar</div>
        )}
      </div>
    </div>
  )
}