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
  layers: Layer[]
  bgColor: string
}

type BrandState = {
  pages: Page[]
  activePageId: string
  selectedId: string | null
  
  // Viewport Settings
  showGrid: boolean
  gridSize: number
  canvasHeight: number
  viewportZoom: number
  
  // Actions
  selectLayer: (id: string | null) => void
  updateLayer: (id: string, data: Partial<Layer>) => void
  addLayer: (type: LayerType, shape?: ShapeType) => void
  removeLayer: (id: string) => void
  bringToFront: (id: string) => void
  
  // Page Actions
  addPage: () => void
  setActivePage: (id: string) => void
  deletePage: (id: string) => void
  renamePage: (id: string, name: string) => void
  
  // View Actions
  toggleGrid: () => void
  setCanvasHeight: (height: number) => void
  setZoom: (zoom: number) => void
  resetAnimations: () => void
}

export const useBrandStore = create<BrandState>()(
  persist(
    (set, get) => ({
      pages: [{ id: 'home', name: 'Home', layers: [], bgColor: '#ffffff' }],
      activePageId: 'home',
      selectedId: null,
      showGrid: true,
      gridSize: 20,
      canvasHeight: 1080,
      viewportZoom: 1,

      selectLayer: (id) => set({ selectedId: id }),
      toggleGrid: () => set((state) => ({ showGrid: !state.showGrid })),
      setCanvasHeight: (h) => set({ canvasHeight: h }),
      setZoom: (z) => set({ viewportZoom: z }),
      
      addPage: () => set((state) => {
        const newId = crypto.randomUUID()
        return {
            pages: [...state.pages, { id: newId, name: `Página ${state.pages.length + 1}`, layers: [], bgColor: '#ffffff' }],
            activePageId: newId,
            selectedId: null
        }
      }),

      setActivePage: (id) => set({ activePageId: id, selectedId: null }),

      deletePage: (id) => set((state) => {
        if (state.pages.length <= 1) return state
        const remaining = state.pages.filter(p => p.id !== id)
        return { pages: remaining, activePageId: remaining[0].id, selectedId: null }
      }),

      renamePage: (id, name) => set((state) => ({
        pages: state.pages.map(p => p.id === id ? { ...p, name } : p)
      })),

      resetAnimations: () => {
        const state = get()
        const currentPage = state.pages.find(p => p.id === state.activePageId)
        if (!currentPage) return
        
        const originalLayers = currentPage.layers
        set((state) => ({
             pages: state.pages.map(p => p.id === state.activePageId ? { ...p, layers: [] } : p)
        }))
        setTimeout(() => {
            set((state) => ({
                pages: state.pages.map(p => p.id === state.activePageId ? { ...p, layers: originalLayers } : p)
           }))
        }, 10)
      },

      updateLayer: (id, data) => set((state) => ({
        pages: state.pages.map(page => 
            page.id === state.activePageId 
            ? { ...page, layers: page.layers.map(l => l.id === id ? { ...l, ...data } : l) }
            : page
        )
      })),

      addLayer: (type, shapeType = 'rect') => set((state) => {
        const baseLayer: Layer = {
          id: crypto.randomUUID(),
          type,
          shapeType,
          x: 100, y: 100,
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
                page.id === state.activePageId 
                ? { ...page, layers: [...page.layers, baseLayer] }
                : page
            ),
            selectedId: baseLayer.id
        }
      }),

      removeLayer: (id) => set((state) => ({
        pages: state.pages.map(page => 
            page.id === state.activePageId 
            ? { ...page, layers: page.layers.filter(l => l.id !== id) }
            : page
        ),
        selectedId: null
      })),

      bringToFront: (id) => set((state) => {
        const page = state.pages.find(p => p.id === state.activePageId)
        if (!page) return state
        const maxZ = Math.max(...page.layers.map(l => l.zIndex)) || 1
        return {
            pages: state.pages.map(p => 
                p.id === state.activePageId 
                ? { ...p, layers: p.layers.map(l => l.id === id ? { ...l, zIndex: maxZ + 1 } : l) }
                : p
            )
        }
      })
    }),
    {
      name: 'bento-pro-v5',
      storage: createJSONStorage(() => localStorage),
    }
  )
)