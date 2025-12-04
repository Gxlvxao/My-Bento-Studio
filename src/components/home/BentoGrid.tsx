'use client'

import { useBrandStore } from '@/store/brandStore'
import { Rnd } from 'react-rnd'
import Image from 'next/image'
import { useEffect, useState, useRef } from 'react'

export default function BentoGrid() {
  const store = useBrandStore()
  const [isMounted, setIsMounted] = useState(false)
  const [isPanning, setIsPanning] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => setIsMounted(true), [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (store.isPreviewMode) return
        
        const target = e.target as HTMLElement
        const isEditingText = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA'

        if (e.ctrlKey || e.metaKey) {
            if (e.key === 'c' && !isEditingText) {
                e.preventDefault()
                store.copyLayer()
            }
            if (e.key === 'v' && !isEditingText) {
                e.preventDefault()
                store.pasteLayer()
            }
        }
        
        if ((e.key === 'Delete' || e.key === 'Backspace') && !isEditingText) {
            if (store.activePageId && store.selectedLayerId) {
                store.removeLayer(store.activePageId, store.selectedLayerId)
            }
        }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [store])

  useEffect(() => {
    if (store.isPreviewMode && isMounted) {
        const targetId = store.activePageId || 'home'
        const page = store.pages.find(p => p.id === targetId)
        
        if (page) {
            const viewportWidth = window.innerWidth
            
            const scale = viewportWidth / page.width
            
            store.setCamera(
                -page.x * scale, 
                -page.y * scale, 
                scale
            )
        }
    }
  }, [store.isPreviewMode, store.activePageId, isMounted, store.pages])

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      
      if (store.isPreviewMode) return

      if (e.ctrlKey || e.metaKey) {
        e.preventDefault()
        const delta = e.deltaY > 0 ? 0.9 : 1.1
        const newZoom = Math.min(Math.max(store.viewZoom * delta, 0.1), 5)
        store.setCamera(store.viewX, store.viewY, newZoom)
      }
    }
    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [store.viewZoom, store.viewX, store.viewY, store.isPreviewMode])

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.button === 1 || e.button === 0) && !store.isPreviewMode && !store.isPanLocked) {
      setIsPanning(true)
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning) {
      store.setCamera(store.viewX + e.movementX, store.viewY + e.movementY, store.viewZoom)
    }
  }

  const handleMouseUp = () => setIsPanning(false)

  if (!isMounted) return null

  const handleInteraction = (pageId: string, layerId: string, linkType: string, url: string, targetPageId: string) => {
     if (store.isPreviewMode) {
         if (linkType === 'internal' && targetPageId) {
            store.selectLayer(null, targetPageId)
         } else if (linkType === 'external' && url) {
            window.open(url, '_blank')
         }
     } else {
        store.selectLayer(layerId, pageId)
     }
  }

  return (
    <div 
        ref={containerRef}
        className={`w-full h-full overflow-hidden relative ${isPanning ? 'cursor-grabbing' : store.isPanLocked ? 'cursor-default' : 'cursor-grab'} bg-[#1e1e1e]`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onContextMenu={(e) => e.preventDefault()}
    >
      <div 
        className="absolute top-0 left-0 origin-top-left will-change-transform transition-transform duration-300 ease-out"
        style={{
            transform: `translate(${store.viewX}px, ${store.viewY}px) scale(${store.viewZoom})`
        }}
      >
          {store.pages.map((page) => (
            <div
                key={page.id}
                className={`absolute bg-white shadow-2xl transition-shadow ${!store.isPreviewMode ? 'hover:shadow-[0_0_50px_rgba(0,0,0,0.3)] ring-1 ring-black/5' : ''}`}
                style={{
                    left: page.x,
                    top: page.y,
                    width: page.width,
                    height: page.height,
                    backgroundColor: page.bgColor,
                    backgroundImage: store.showGrid && !store.isPreviewMode ? 'radial-gradient(#ddd 1px, transparent 1px)' : 'none',
                    backgroundSize: `${store.gridSize}px ${store.gridSize}px`
                }}
                onMouseDown={(e) => {
                    if (!store.isPreviewMode) {
                        e.stopPropagation() 
                        store.selectLayer(null, page.id)
                    }
                }}
            >
                {!store.isPreviewMode && (
                    <div className="absolute -top-8 left-0 text-white/50 text-xs font-bold uppercase tracking-widest pointer-events-none select-none">
                        {page.name}
                    </div>
                )}

                {page.layers.map((layer) => (
                    <Rnd
                    key={layer.id}
                    size={{ width: layer.width, height: layer.height }}
                    position={{ x: layer.x, y: layer.y }}
                    dragGrid={store.showGrid ? [store.gridSize, store.gridSize] : [1, 1]}
                    resizeGrid={store.showGrid ? [store.gridSize, store.gridSize] : [1, 1]}
                    scale={store.viewZoom} 
                    onDragStop={(e: any, d: any) => {
                        store.updateLayer(page.id, layer.id, { x: d.x, y: d.y })
                        store.selectLayer(layer.id, page.id)
                    }}
                    onResizeStop={(e: any, direction: any, ref: any, delta: any, position: any) => {
                        store.updateLayer(page.id, layer.id, {
                        width: ref.style.width,
                        height: ref.style.height,
                        ...position,
                        })
                    }}
                    disableDragging={store.selectedLayerId !== layer.id || store.isPreviewMode}
                    enableResizing={store.selectedLayerId === layer.id && !store.isPreviewMode ? undefined : false}
                    bounds="parent"
                    className={`group ${store.selectedLayerId === layer.id && !store.isPreviewMode ? 'ring-2 ring-blue-500 z-[999] !important' : ''} ${layer.linkType !== 'none' && store.isPreviewMode ? 'cursor-pointer hover:ring-2 hover:ring-blue-400/50' : ''}`}
                    style={{ 
                        zIndex: layer.zIndex,
                        animationDelay: `${layer.animationDelay}s`,
                        opacity: layer.opacity / 100
                    }}
                    onClick={(e: any) => {
                        e.stopPropagation()
                        handleInteraction(page.id, layer.id, layer.linkType, layer.linkUrl, layer.targetPageId)
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
                                    </div>
                                </div>
                            )}

                            {layer.content && (
                                <div className="w-full h-full flex flex-col justify-center items-center p-4 relative z-10 pointer-events-none">
                                    <span 
                                        className="whitespace-pre-wrap font-black text-black leading-none text-center" 
                                        style={{ 
                                            fontSize: `${layer.fontSize}rem`,
                                            textShadow: layer.image ? '0 2px 10px rgba(255,255,255,0.5)' : 'none'
                                        }}
                                    >
                                        {layer.content}
                                    </span>
                                </div>
                            )}
                        </div>
                    </Rnd>
                ))}
            </div>
          ))}
      </div>
    </div>
  )
}