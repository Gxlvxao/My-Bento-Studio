'use client'

import { useBrandStore } from '@/store/brandStore'
import { Rnd } from 'react-rnd'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function BentoGrid() {
  const store = useBrandStore()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => setIsMounted(true), [])

  if (!isMounted) return null

  const activePage = store.pages.find(p => p.id === store.activePageId)
  if (!activePage) return null

  const handleInteraction = (layerId: string, linkType: string, url: string, targetPage: string) => {
     if (store.selectedId === layerId) return; 

     if (linkType === 'internal' && targetPage) {
        store.setActivePage(targetPage)
     } else if (linkType === 'external' && url) {
        window.open(url, '_blank')
     }
  }

  return (
    <div 
        className="w-full h-screen bg-gray-900 overflow-hidden relative flex items-center justify-center"
        onClick={() => store.selectLayer(null)}
    >
      {/* Canvas Wrapper com Zoom */}
      <div 
        className={`relative bg-white shadow-2xl transition-transform duration-200 ease-out ${store.showGrid ? 'photoshop-grid' : ''}`}
        style={{
            width: '100%',
            height: `${store.canvasHeight}px`,
            maxWidth: '1920px',
            transform: `scale(${store.viewportZoom})`,
            transformOrigin: 'top center',
            backgroundSize: `${store.gridSize}px ${store.gridSize}px`
        }}
      >
          {activePage.layers.map((layer) => (
            <Rnd
              key={layer.id}
              size={{ width: layer.width, height: layer.height }}
              position={{ x: layer.x, y: layer.y }}
              dragGrid={store.showGrid ? [store.gridSize, store.gridSize] : [1, 1]}
              resizeGrid={store.showGrid ? [store.gridSize, store.gridSize] : [1, 1]}
              scale={store.viewportZoom}
              onDragStop={(e: any, d: any) => {
                store.updateLayer(layer.id, { x: d.x, y: d.y })
                store.selectLayer(layer.id)
              }}
              onResizeStop={(e: any, direction: any, ref: any, delta: any, position: any) => {
                store.updateLayer(layer.id, {
                  width: ref.style.width,
                  height: ref.style.height,
                  ...position,
                })
              }}
              disableDragging={store.selectedId !== layer.id}
              enableResizing={store.selectedId === layer.id ? undefined : false}
              bounds="parent"
              className={`group ${store.selectedId === layer.id ? 'ring-2 ring-blue-500 z-[999] !important' : ''}`}
              style={{ 
                  zIndex: layer.zIndex,
                  animationDelay: `${layer.animationDelay}s`,
                  opacity: layer.opacity / 100
              }}
              onClick={(e: any) => {
                e.stopPropagation()
                store.selectLayer(layer.id)
                handleInteraction(layer.id, layer.linkType, layer.linkUrl, layer.targetPageId)
              }}
            >
                <div 
                    className={`w-full h-full relative overflow-hidden flex items-center justify-center anim-${layer.animation} ${layer.type === 'shape' && layer.shapeType !== 'rect' && layer.shapeType !== 'circle' ? `shape-${layer.shapeType}` : ''}`}
                    style={{ 
                        backgroundColor: layer.bgColor, 
                        borderRadius: layer.borderRadius,
                        filter: `blur(${layer.blur}px) grayscale(${layer.grayscale}%) drop-shadow(${layer.shadow ? '0 10px 20px rgba(0,0,0,0.3)' : '0 0 0 transparent'})`,
                        fontFamily: layer.fontFamily
                    }}
                >
                    {layer.image && (
                        <>
                            <Image 
                                src={layer.image} 
                                alt="Layer" 
                                fill 
                                className="pointer-events-none"
                                style={{ 
                                    objectFit: layer.objectFit || 'cover',
                                    transform: `scale(${layer.imgScale / 100}) translate(${layer.imgPosX - 50}%, ${layer.imgPosY - 50}%)`
                                }}
                            />
                            {layer.type !== 'image-zone' && <div className="absolute inset-0 bg-black/10 mix-blend-multiply" />}
                        </>
                    )}

                    {layer.type === 'marquee' && (
                        <div className="flex gap-4 w-full h-full items-center overflow-hidden mask-linear-fade">
                            <div className="flex gap-4 animate-marquee-infinite min-w-full">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div key={i} className="h-[80%] aspect-square bg-layout-green rounded-xl border-4 border-white shadow-sm flex-shrink-0" />
                                ))}
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div key={`clone-${i}`} className="h-[80%] aspect-square bg-layout-green rounded-xl border-4 border-white shadow-sm flex-shrink-0" />
                                ))}
                            </div>
                        </div>
                    )}

                    {layer.content && (
                        <div className="w-full h-full flex flex-col justify-center items-center p-4 relative z-10 pointer-events-none">
                            <span 
                                className="whitespace-pre-wrap font-black text-black leading-none text-center" 
                                style={{ 
                                    fontSize: `${layer.fontSize || (layer.type === 'header' ? 1.5 : 4)}rem`,
                                    textShadow: layer.image ? '0 2px 10px rgba(255,255,255,0.5)' : 'none'
                                }}
                            >
                                {layer.content}
                            </span>
                        </div>
                    )}
                </div>
                
                {store.selectedId === layer.id && (
                    <div className="absolute -top-6 left-0 bg-blue-500 text-white text-[10px] px-2 py-0.5 rounded-t font-bold tracking-wider flex items-center gap-2">
                        {layer.type.toUpperCase()}
                    </div>
                )}
            </Rnd>
          ))}
      </div>
    </div>
  )
}