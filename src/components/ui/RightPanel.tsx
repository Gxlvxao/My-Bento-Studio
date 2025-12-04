'use client'

import { useBrandStore, fontFamilies } from '@/store/brandStore'
import { Type, Image as ImageIcon, Sliders, LayoutTemplate, Square, Circle, Triangle, Hexagon, Star, MessageSquare, MonitorPlay, Eraser, Link as LinkIcon, Trash2, Layers as LayersIcon, Upload, AlignLeft, Settings } from 'lucide-react'
import { useState } from 'react'

export default function RightPanel() {
  const [activeTab, setActiveTab] = useState<'add' | 'edit'>('add')
  const store = useBrandStore()
  
  const activePage = store.pages.find(p => p.id === store.activePageId)
  const selectedLayer = activePage?.layers.find(l => l.id === store.selectedLayerId)

  // Se tiver layer, foca em edit, senão permite navegar
  if (selectedLayer && activeTab !== 'edit') setActiveTab('edit')
  
  if (store.isPreviewMode) return null

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && store.activePageId && store.selectedLayerId) {
        const url = URL.createObjectURL(file)
        store.updateLayer(store.activePageId, store.selectedLayerId, { image: url })
    }
  }

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col h-full shrink-0 z-40 shadow-xl shadow-gray-100">
        
        <div className="flex border-b border-gray-100">
            <button onClick={() => setActiveTab('add')} className={`flex-1 py-3 text-xs font-bold uppercase transition-colors ${activeTab === 'add' ? 'border-b-2 border-black text-black' : 'text-gray-400 hover:text-gray-600'}`}>Adicionar</button>
            <button onClick={() => setActiveTab('edit')} className={`flex-1 py-3 text-xs font-bold uppercase transition-colors ${activeTab === 'edit' ? 'border-b-2 border-black text-black' : 'text-gray-400 hover:text-gray-600'}`}>Propriedades</button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide bg-gray-50/30">
            
            {activeTab === 'add' && store.activePageId && (
                <div className="space-y-6 animate-in fade-in duration-300">
                    <div>
                        <h3 className="text-[10px] font-bold uppercase text-gray-400 mb-3 tracking-wider">UI Kits</h3>
                        <div className="grid grid-cols-2 gap-2">
                            <button onClick={() => store.addLayer(store.activePageId!, 'header')} className="flex flex-col items-center gap-2 p-4 bg-white hover:bg-gray-50 rounded-xl border border-gray-200 hover:border-blue-400 transition-all group shadow-sm">
                                <div className="p-2 bg-pink-100 rounded-lg group-hover:scale-110 transition-transform"><LayoutTemplate size={20} className="text-pink-500" /></div>
                                <span className="text-[10px] font-bold text-gray-600">Header</span>
                            </button>
                            <button onClick={() => store.addLayer(store.activePageId!, 'text-zone')} className="flex flex-col items-center gap-2 p-4 bg-white hover:bg-gray-50 rounded-xl border border-gray-200 hover:border-blue-400 transition-all group shadow-sm">
                                <div className="p-2 bg-blue-100 rounded-lg group-hover:scale-110 transition-transform"><AlignLeft size={20} className="text-blue-500" /></div>
                                <span className="text-[10px] font-bold text-gray-600">Bloco Texto</span>
                            </button>
                            <button onClick={() => store.addLayer(store.activePageId!, 'image-zone')} className="flex flex-col items-center gap-2 p-4 bg-white hover:bg-gray-50 rounded-xl border border-gray-200 hover:border-blue-400 transition-all group shadow-sm">
                                <div className="p-2 bg-green-100 rounded-lg group-hover:scale-110 transition-transform"><ImageIcon size={20} className="text-green-500" /></div>
                                <span className="text-[10px] font-bold text-gray-600">Imagem</span>
                            </button>
                            <button onClick={() => store.addLayer(store.activePageId!, 'marquee')} className="flex flex-col items-center gap-2 p-4 bg-white hover:bg-gray-50 rounded-xl border border-gray-200 hover:border-blue-400 transition-all group shadow-sm">
                                <div className="p-2 bg-purple-100 rounded-lg group-hover:scale-110 transition-transform"><MonitorPlay size={20} className="text-purple-500" /></div>
                                <span className="text-[10px] font-bold text-gray-600">Marquee</span>
                            </button>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-[10px] font-bold uppercase text-gray-400 mb-3 tracking-wider">Primitivos</h3>
                        <div className="grid grid-cols-4 gap-2">
                            <button onClick={() => store.addLayer(store.activePageId!, 'custom-text')} className="aspect-square bg-white hover:bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center hover:border-black transition-colors" title="Texto"><Type size={18} /></button>
                            <button onClick={() => store.addLayer(store.activePageId!, 'shape', 'rect')} className="aspect-square bg-white hover:bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center hover:border-black transition-colors"><Square size={18} /></button>
                            <button onClick={() => store.addLayer(store.activePageId!, 'shape', 'circle')} className="aspect-square bg-white hover:bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center hover:border-black transition-colors"><Circle size={18} /></button>
                            <button onClick={() => store.addLayer(store.activePageId!, 'shape', 'triangle')} className="aspect-square bg-white hover:bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center hover:border-black transition-colors"><Triangle size={18} /></button>
                            <button onClick={() => store.addLayer(store.activePageId!, 'shape', 'star')} className="aspect-square bg-white hover:bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center hover:border-black transition-colors"><Star size={18} /></button>
                            <button onClick={() => store.addLayer(store.activePageId!, 'shape', 'hexagon')} className="aspect-square bg-white hover:bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center hover:border-black transition-colors"><Hexagon size={18} /></button>
                            <button onClick={() => store.addLayer(store.activePageId!, 'shape', 'message')} className="aspect-square bg-white hover:bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center hover:border-black transition-colors"><MessageSquare size={18} /></button>
                        </div>
                    </div>
                </div>
            )}

            {/* SELEÇÃO DE PÁGINA (Sem layer selecionada) */}
            {activeTab === 'edit' && !selectedLayer && activePage && (
                <div className="space-y-5 animate-in slide-in-from-right-4 duration-300">
                    <div className="flex items-center gap-2 bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
                        <Settings size={14} className="text-gray-500" />
                        <span className="text-xs font-bold text-gray-700">Configurações da Página</span>
                    </div>

                    <div className="space-y-3">
                        <h4 className="text-[10px] font-bold uppercase text-gray-400">Dimensões & Estilo</h4>
                        <div className="bg-white p-3 rounded-xl border border-gray-200 space-y-3">
                            <div>
                                <label className="text-[9px] text-gray-400 font-bold mb-1 block">Nome</label>
                                <input 
                                    type="text" 
                                    value={activePage.name} 
                                    onChange={(e) => store.updatePage(activePage.id, { name: e.target.value })} 
                                    className="w-full text-xs p-2 bg-gray-50 border rounded-lg font-bold" 
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label className="text-[9px] text-gray-400 font-bold mb-1 block">Largura</label>
                                    <input type="number" value={activePage.width} onChange={(e) => store.updatePage(activePage.id, { width: Number(e.target.value) })} className="w-full text-xs p-2 bg-gray-50 border rounded-lg" />
                                </div>
                                <div>
                                    <label className="text-[9px] text-gray-400 font-bold mb-1 block">Altura</label>
                                    <input type="number" value={activePage.height} onChange={(e) => store.updatePage(activePage.id, { height: Number(e.target.value) })} className="w-full text-xs p-2 bg-gray-50 border rounded-lg" />
                                </div>
                            </div>
                            <div className="flex justify-between items-center pt-2">
                                <label className="text-xs font-bold text-gray-600">Cor de Fundo</label>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-mono text-gray-400">{activePage.bgColor}</span>
                                    <input type="color" value={activePage.bgColor} onChange={(e) => store.updatePage(activePage.id, { bgColor: e.target.value })} className="w-6 h-6 rounded-full overflow-hidden cursor-pointer border-2 border-gray-100" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* SELEÇÃO DE LAYER */}
            {activeTab === 'edit' && selectedLayer && store.activePageId && (
                <div className="space-y-5 pb-10 animate-in slide-in-from-right-4 duration-300">
                    
                    <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-blue-500" />
                            <span className="text-xs font-bold uppercase text-gray-700">{selectedLayer.type}</span>
                        </div>
                        <div className="flex gap-1">
                            <button onClick={() => store.bringToFront(store.activePageId!, selectedLayer.id)} className="p-1.5 hover:bg-gray-100 rounded text-gray-500" title="Trazer para frente"><LayersIcon size={14} /></button>
                            <button onClick={() => store.removeLayer(store.activePageId!, selectedLayer.id)} className="p-1.5 hover:bg-red-50 text-red-500 rounded" title="Deletar"><Trash2 size={14} /></button>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h4 className="text-[10px] font-bold uppercase text-gray-400 flex items-center gap-2"><Type size={12} /> Texto & Fonte</h4>
                        <div className="bg-white p-3 rounded-xl border border-gray-200 space-y-3">
                            <textarea 
                                value={selectedLayer.content} 
                                onChange={(e) => store.updateLayer(store.activePageId!, selectedLayer.id, { content: e.target.value })} 
                                className="w-full text-xs p-2 bg-gray-50 border border-gray-200 rounded-lg h-20 resize-none focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                                placeholder="Conteúdo do texto..."
                            />
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label className="text-[9px] text-gray-400 font-bold mb-1 block">Fonte</label>
                                    <select 
                                        value={selectedLayer.fontFamily} 
                                        onChange={(e) => store.updateLayer(store.activePageId!, selectedLayer.id, { fontFamily: e.target.value as any })}
                                        className="w-full text-xs p-1.5 bg-gray-50 border rounded-lg"
                                    >
                                        {fontFamilies.map(font => <option key={font} value={font}>{font}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-[9px] text-gray-400 font-bold mb-1 block">Tamanho</label>
                                    <input type="number" value={selectedLayer.fontSize} onChange={(e) => store.updateLayer(store.activePageId!, selectedLayer.id, { fontSize: Number(e.target.value) })} className="w-full text-xs p-1.5 bg-gray-50 border rounded-lg" />
                                </div>
                            </div>
                            <button onClick={() => store.updateLayer(store.activePageId!, selectedLayer.id, { content: '' })} className="w-full py-1.5 text-xs text-red-500 bg-red-50 hover:bg-red-100 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors"><Eraser size={12} /> Limpar Texto</button>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h4 className="text-[10px] font-bold uppercase text-gray-400 flex items-center gap-2"><LinkIcon size={12} /> Interatividade</h4>
                        <div className="bg-white p-3 rounded-xl border border-gray-200 space-y-3">
                            <div className="flex gap-2 p-1 bg-gray-50 rounded-lg">
                                {['none', 'internal', 'external'].map((type) => (
                                    <button 
                                        key={type}
                                        onClick={() => store.updateLayer(store.activePageId!, selectedLayer.id, { linkType: type as any })}
                                        className={`flex-1 py-1 text-[9px] font-bold uppercase rounded-md transition-all ${selectedLayer.linkType === type ? 'bg-white shadow text-black' : 'text-gray-400'}`}
                                    >
                                        {type === 'none' ? 'Nada' : type === 'internal' ? 'Página' : 'Web'}
                                    </button>
                                ))}
                            </div>

                            {selectedLayer.linkType === 'internal' && (
                                <select 
                                    value={selectedLayer.targetPageId || ''} 
                                    onChange={(e) => store.updateLayer(store.activePageId!, selectedLayer.id, { targetPageId: e.target.value })}
                                    className="w-full text-xs p-2 bg-blue-50 border border-blue-200 rounded-lg text-blue-700 font-medium outline-none"
                                >
                                    <option value="">Selecione a página...</option>
                                    {store.pages.map(p => (
                                        <option key={p.id} value={p.id} disabled={p.id === store.activePageId}>{p.name}</option>
                                    ))}
                                </select>
                            )}

                            {selectedLayer.linkType === 'external' && (
                                <input 
                                    type="text" 
                                    value={selectedLayer.linkUrl || ''} 
                                    onChange={(e) => store.updateLayer(store.activePageId!, selectedLayer.id, { linkUrl: e.target.value })}
                                    placeholder="https://..."
                                    className="w-full text-xs p-2 bg-green-50 border border-green-200 rounded-lg text-green-700 font-medium outline-none placeholder:text-green-300"
                                />
                            )}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h4 className="text-[10px] font-bold uppercase text-gray-400 flex items-center gap-2"><Sliders size={12} /> Estilo</h4>
                        <div className="bg-white p-3 rounded-xl border border-gray-200 space-y-3">
                            <div className="flex justify-between items-center">
                                <label className="text-xs font-bold text-gray-600">Cor Fundo</label>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-mono text-gray-400">{selectedLayer.bgColor}</span>
                                    <input type="color" value={selectedLayer.bgColor} onChange={(e) => store.updateLayer(store.activePageId!, selectedLayer.id, { bgColor: e.target.value })} className="w-6 h-6 rounded-full overflow-hidden cursor-pointer border-2 border-gray-100" />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-[10px] text-gray-400 mb-1"><span>Arredondamento</span><span>{selectedLayer.borderRadius}</span></div>
                                <input type="text" value={selectedLayer.borderRadius} onChange={(e) => store.updateLayer(store.activePageId!, selectedLayer.id, { borderRadius: e.target.value })} className="w-full text-xs p-1.5 bg-gray-50 border rounded-lg" />
                            </div>
                            <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                                <label className="text-xs font-bold text-gray-600">Sombra</label>
                                <input type="checkbox" checked={selectedLayer.shadow} onChange={(e) => store.updateLayer(store.activePageId!, selectedLayer.id, { shadow: e.target.checked })} className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h4 className="text-[10px] font-bold uppercase text-gray-400 flex items-center gap-2"><ImageIcon size={12} /> Mídia</h4>
                        <div className="bg-white p-3 rounded-xl border border-gray-200 space-y-3">
                            <label className="flex flex-col items-center justify-center gap-1 w-full h-20 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:bg-blue-50 hover:border-blue-200 transition-colors group">
                                <Upload size={16} className="text-gray-400 group-hover:text-blue-400" />
                                <span className="text-[9px] font-bold text-gray-400 group-hover:text-blue-400">Escolher Imagem</span>
                                <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                            </label>
                            {selectedLayer.image && (
                                <div className="flex justify-between items-center bg-gray-50 p-2 rounded-lg">
                                    <label className="text-xs text-gray-500">Ajuste</label>
                                    <select value={selectedLayer.objectFit || 'cover'} onChange={(e) => store.updateLayer(store.activePageId!, selectedLayer.id, { objectFit: e.target.value as any })} className="text-xs p-1 bg-white border rounded">
                                        <option value="cover">Cobrir</option>
                                        <option value="contain">Conter</option>
                                        <option value="fill">Esticar</option>
                                    </select>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            )}
        </div>
    </div>
  )
}