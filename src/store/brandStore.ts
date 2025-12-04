import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export type LayerType = 'header' | 'text-zone' | 'image-zone' | 'marquee' | 'shape' | 'custom-text'
export type ShapeType = 'rect' | 'circle' | 'triangle' | 'star' | 'hexagon' | 'rhombus' | 'message'
export type AnimationType = 'none' | 'fade' | 'slide-up' | 'slide-right' | 'zoom' | 'float' | 'pulse'
export type ObjectFitType = 'cover' | 'contain' | 'fill' | 'none'
export type FontFamily = 'Space Grotesk' | 'Inter' | 'Playfair Display' | 'Roboto Mono' | 'Lobster' | 'Oswald' | 'Pacifico' | 'Anton' | 'Dancing Script' | 'Bebas Neue' | 'Abril Fatface' | 'Shadows Into Light'

export type Layer = {
  id: string
  type: LayerType
  shapeType?: ShapeType
  x: number
  y: number
  width: string | number
  height: string | number
  bgColor: string
  content: string
  linkType: 'external' | 'internal'
  linkUrl: string
  targetPageId: string
  image: string
  objectFit: ObjectFitType
  imgScale: number
  imgPosX: number
  imgPosY: number
  fontSize: number
  fontFamily: FontFamily
  zIndex: number
  borderRadius: string
  opacity: number
  blur: number
  grayscale: number
  shadow: boolean
  animation: AnimationType
  animationDelay: number
}

export type Page = {
  id: string
  name: string
  x: number
  y: number
  width: number
  height: number
  layers: Layer[]
  bgColor: string
}

type BrandState = {
  pages: Page[]
  activePageId: string | null // Se null, nenhum artboard selecionado especificamente
  selectedLayerId: string | null
  
  // Viewport (Câmera)
  isPreviewMode: boolean
  showGrid: boolean
  gridSize: number
  viewX: number
  viewY: number
  viewZoom: number
  
  // Actions
  selectLayer: (id: string | null, pageId?: string) => void
  updateLayer: (pageId: string, layerId: string, data: Partial<Layer>) => void
  addLayer: (pageId: string, type: LayerType, shape?: ShapeType) => void
  removeLayer: (pageId: string, layerId: string) => void
  bringToFront: (pageId: string, layerId: string) => void
  
  // Page Actions
  addPage: () => void
  updatePage: (id: string, data: Partial<Page>) => void
  deletePage: (id: string) => void
  
  // View Actions
  setPreviewMode: (mode: boolean) => void
  toggleGrid: () => void
  setCamera: (x: number, y: number, zoom: number) => void
  resetAnimations: () => void
}

export const useBrandStore = create<BrandState>()(
  persist(
    (set, get) => ({
      pages: [{ id: 'home', name: 'Home', x: 100, y: 100, width: 1200, height: 800, layers: [], bgColor: '#ffffff' }],
      activePageId: 'home',
      selectedLayerId: null,
      
      isPreviewMode: false,
      showGrid: true,
      gridSize: 20,
      viewX: 0,
      viewY: 0,
      viewZoom: 0.8,

      selectLayer: (id, pageId) => set({ selectedLayerId: id, activePageId: pageId || null }),
      setPreviewMode: (mode) => set({ isPreviewMode: mode, selectedLayerId: null }),
      toggleGrid: () => set((state) => ({ showGrid: !state.showGrid })),
      setCamera: (x, y, zoom) => set({ viewX: x, viewY: y, viewZoom: zoom }),
      
      addPage: () => set((state) => {
        const lastPage = state.pages[state.pages.length - 1]
        const newX = lastPage ? lastPage.x + lastPage.width + 100 : 100
        const newId = crypto.randomUUID()
        
        return {
            pages: [...state.pages, { 
                id: newId, 
                name: `Page ${state.pages.length + 1}`, 
                x: newX, 
                y: 100, 
                width: 1200, 
                height: 800, 
                layers: [], 
                bgColor: '#ffffff' 
            }],
            activePageId: newId
        }
      }),

      updatePage: (id, data) => set((state) => ({
        pages: state.pages.map(p => p.id === id ? { ...p, ...data } : p)
      })),

      deletePage: (id) => set((state) => {
        if (state.pages.length <= 1) return state
        return { pages: state.pages.filter(p => p.id !== id) }
      }),

      resetAnimations: () => {
        const state = get()
        const storedPages = JSON.parse(JSON.stringify(state.pages))
        
        // Remove layers temporarily to force re-mount
        set((s) => ({ pages: s.pages.map(p => ({ ...p, layers: [] })) }))
        
        setTimeout(() => {
            set({ pages: storedPages })
        }, 50)
      },

      updateLayer: (pageId, layerId, data) => set((state) => ({
        pages: state.pages.map(page => 
            page.id === pageId 
            ? { ...page, layers: page.layers.map(l => l.id === layerId ? { ...l, ...data } : l) }
            : page
        )
      })),

      addLayer: (pageId, type, shapeType = 'rect') => set((state) => {
        const baseLayer: Layer = {
          id: crypto.randomUUID(),
          type,
          shapeType,
          x: 50, y: 50,
          width: 200, height: 200,
          zIndex: 10,
          bgColor: '#EAFFD0',
          content: '',
          linkType: 'external',
          linkUrl: '',
          targetPageId: '',
          image: '',
          objectFit: 'cover',
          imgScale: 100,
          imgPosX: 50,
          imgPosY: 50,
          fontSize: 2,
          fontFamily: 'Space Grotesk',
          borderRadius: '0px',
          opacity: 100,
          blur: 0,
          grayscale: 0,
          shadow: false,
          animation: 'fade',
          animationDelay: 0,
        }

        if (type === 'header') { baseLayer.width = '100%'; baseLayer.height = 100; baseLayer.bgColor = '#F8B5AF'; baseLayer.content = 'HEADER'; baseLayer.x = 0; baseLayer.y = 0; }
        if (type === 'text-zone') { baseLayer.width = 400; baseLayer.height = 300; baseLayer.bgColor = '#C6E2FF'; baseLayer.content = 'TEXT'; baseLayer.borderRadius = '40px'; baseLayer.fontSize = 6; }
        if (type === 'custom-text') { baseLayer.width = 300; baseLayer.height = 80; baseLayer.bgColor = 'transparent'; baseLayer.content = 'Novo Texto'; }
        if (type === 'shape' && shapeType === 'circle') { baseLayer.width = 150; baseLayer.height = 150; baseLayer.borderRadius = '50%'; }
        
        return {
            pages: state.pages.map(page => 
                page.id === pageId 
                ? { ...page, layers: [...page.layers, baseLayer] }
                : page
            ),
            selectedLayerId: baseLayer.id,
            activePageId: pageId
        }
      }),

      removeLayer: (pageId, layerId) => set((state) => ({
        pages: state.pages.map(page => 
            page.id === pageId 
            ? { ...page, layers: page.layers.filter(l => l.id !== layerId) }
            : page
        ),
        selectedLayerId: null
      })),

      bringToFront: (pageId, layerId) => set((state) => {
        const page = state.pages.find(p => p.id === pageId)
        if (!page) return state
        const maxZ = Math.max(...page.layers.map(l => l.zIndex)) || 1
        return {
            pages: state.pages.map(p => 
                p.id === pageId 
                ? { ...p, layers: p.layers.map(l => l.id === layerId ? { ...l, zIndex: maxZ + 1 } : l) }
                : p
            )
        }
      })
    }),
    {
      name: 'bento-pro-v6',
      storage: createJSONStorage(() => localStorage),
    }
  )
)