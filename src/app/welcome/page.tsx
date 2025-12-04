import Link from 'next/link'
import { ArrowRight, LayoutTemplate, Layers, Palette, Zap } from 'lucide-react'

export default function Welcome() {
  return (
    <main className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">
      <nav className="fixed w-full z-50 flex justify-between items-center px-8 py-6 backdrop-blur-sm bg-white/80 border-b border-black/5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black text-white rounded-lg flex items-center justify-center font-black text-xs">BE</div>
          <span className="font-bold tracking-tight">Bento Studio</span>
        </div>
        <div className="flex gap-4 items-center">
          <Link href="/auth" className="text-sm font-bold text-gray-500 hover:text-black transition-colors">Login</Link>
          <Link href="/auth?mode=signup" className="px-5 py-2.5 bg-black text-white rounded-full text-xs font-bold hover:bg-gray-800 transition-all hover:scale-105">
            Começar Grátis
          </Link>
        </div>
      </nav>

      <section className="pt-40 pb-20 px-6 flex flex-col items-center text-center relative overflow-hidden">
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
        <div className="absolute top-20 right-1/4 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 border border-gray-200 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">v1.0 Beta Disponível</span>
        </div>

        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 max-w-4xl relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
          Design sem limites,<br/> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">Vibes</span> instantâneas.
        </h1>
        
        <p className="text-xl text-gray-500 max-w-2xl mb-10 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
          Crie interfaces estilo Bento, portfólios e landing pages com uma ferramenta visual focada em estética e fluidez. Seu próprio estúdio digital.
        </p>

        <div className="flex gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          <Link href="/dashboard" className="px-8 py-4 bg-black text-white rounded-full font-bold text-lg hover:scale-105 transition-transform flex items-center gap-2 shadow-xl shadow-black/20">
            Criar meu Projeto <ArrowRight size={18} />
          </Link>
          <button className="px-8 py-4 bg-white border border-gray-200 text-black rounded-full font-bold text-lg hover:bg-gray-50 transition-colors">
            Ver Galeria
          </button>
        </div>
      </section>

      <section className="py-20 border-t border-gray-100">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
                { icon: LayoutTemplate, title: "Grid System", desc: "Arraste, solte e redimensione com nosso sistema magnético inteligente." },
                { icon: Palette, title: "Estilo & Vibes", desc: "Tokens de design modernos, formas orgânicas e tipografia curada." },
                { icon: Zap, title: "Exportação Clean", desc: "Código limpo, pronto para produção em React e Tailwind CSS." }
            ].map((item, i) => (
                <div key={i} className="p-8 rounded-3xl bg-gray-50 hover:bg-white border border-transparent hover:border-gray-200 transition-all hover:shadow-lg group">
                    <div className="w-12 h-12 bg-white rounded-2xl border border-gray-200 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm">
                        <item.icon size={24} className="text-black" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
            ))}
        </div>
      </section>
    </main>
  )
}