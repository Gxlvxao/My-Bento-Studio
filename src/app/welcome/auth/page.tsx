'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Mail, Lock, User, Github, Loader2 } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function Auth() {
  const searchParams = useSearchParams()
  const [isLogin, setIsLogin] = useState(searchParams.get('mode') !== 'signup')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulação de delay para "vibe" de loading
    setTimeout(() => {
        setIsLoading(false)
        router.push('/dashboard')
    }, 1500)
  }

  return (
    <div className="min-h-screen w-full flex bg-gray-50">
      {/* Lado Esquerdo - Visual */}
      <div className="hidden lg:flex w-1/2 bg-black relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] bg-purple-600/30 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-20%] w-[80%] h-[80%] bg-blue-600/30 rounded-full blur-[100px] animate-pulse delay-700" />
        
        <div className="relative z-10 text-white max-w-lg">
            <h2 className="text-5xl font-black mb-6 tracking-tight">Onde as ideias ganham forma.</h2>
            <p className="text-white/60 text-xl leading-relaxed">Junte-se a designers e desenvolvedores criando a próxima geração de interfaces web.</p>
            
            <div className="mt-12 grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white/10 backdrop-blur border border-white/10">
                    <div className="w-8 h-8 rounded-full bg-green-400 mb-3" />
                    <div className="w-20 h-2 bg-white/20 rounded-full mb-2" />
                    <div className="w-12 h-2 bg-white/10 rounded-full" />
                </div>
                <div className="p-4 rounded-2xl bg-white/10 backdrop-blur border border-white/10 mt-8">
                    <div className="w-8 h-8 rounded-full bg-pink-400 mb-3" />
                    <div className="w-20 h-2 bg-white/20 rounded-full mb-2" />
                    <div className="w-12 h-2 bg-white/10 rounded-full" />
                </div>
            </div>
        </div>
      </div>

      {/* Lado Direito - Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 relative">
        <Link href="/welcome" className="absolute top-8 left-8 flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-black transition-colors">
            <ArrowLeft size={14} /> Voltar
        </Link>

        <div className="w-full max-w-sm space-y-8">
            <div className="text-center">
                <h3 className="text-2xl font-black tracking-tight mb-2">{isLogin ? 'Bem-vindo de volta' : 'Crie sua conta'}</h3>
                <p className="text-sm text-gray-500">Entre com seus dados para acessar o estúdio.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Nome</label>
                        <div className="relative">
                            <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input type="text" className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all" placeholder="Seu nome" required />
                        </div>
                    </div>
                )}
                
                <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Email</label>
                    <div className="relative">
                        <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input type="email" className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all" placeholder="seu@email.com" required />
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Senha</label>
                    <div className="relative">
                        <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input type="password" className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all" placeholder="••••••••" required />
                    </div>
                </div>

                <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full py-3 bg-black text-white rounded-xl font-bold text-sm hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isLoading ? <Loader2 size={16} className="animate-spin" /> : (isLogin ? 'Entrar' : 'Criar Conta')}
                </button>
            </form>

            <div className="relative">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="bg-gray-50 px-2 text-gray-400">Ou continue com</span></div>
            </div>

            <button className="w-full py-3 bg-white border border-gray-200 text-black rounded-xl font-bold text-sm hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                <Github size={18} /> Github
            </button>

            <div className="text-center text-xs font-medium text-gray-500">
                {isLogin ? "Não tem uma conta? " : "Já tem uma conta? "}
                <button onClick={() => setIsLogin(!isLogin)} className="text-black underline hover:text-blue-600 transition-colors">
                    {isLogin ? 'Registre-se' : 'Faça login'}
                </button>
            </div>
        </div>
      </div>
    </div>
  )
}