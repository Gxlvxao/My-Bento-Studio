import Link from 'next/link'
import { Plus, Search, MoreVertical, Clock, Folder, Layout } from 'lucide-react'

export default function Dashboard() {
  const projects = [
    { id: 1, name: 'Portfólio 2025', updatedAt: '2 horas atrás', thumbnail: 'bg-gradient-to-br from-pink-200 to-red-100', link: '/' },
    { id: 2, name: 'Landing SaaS', updatedAt: 'ontem', thumbnail: 'bg-gradient-to-br from-blue-200 to-cyan-100', link: '/' },
    { id: 3, name: 'Link Bio', updatedAt: '3 dias atrás', thumbnail: 'bg-gradient-to-br from-purple-200 to-indigo-100', link: '/' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Fixa do Dashboard */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col fixed h-full z-10">
        <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-black text-white rounded-lg flex items-center justify-center font-black text-xs">BE</div>
                <span className="font-bold tracking-tight">Bento Studio</span>
            </div>
        </div>
        
        <div className="p-4 space-y-1 flex-1">
            <button className="w-full flex items-center gap-3 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-bold">
                <Layout size={18} /> Projetos
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 text-gray-500 hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors">
                <Folder size={18} /> Arquivos
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 text-gray-500 hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors">
                <Clock size={18} /> Recentes
            </button>
        </div>

        <div className="p-4 border-t border-gray-100">
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-gray-200 border border-gray-300" />
                <div className="flex flex-col">
                    <span className="text-xs font-bold text-gray-900">Designer</span>
                    <span className="text-[10px] text-gray-400">Pro Plan</span>
                </div>
            </div>
        </div>
      </aside>

      {/* Área Principal */}
      <main className="flex-1 ml-64 p-8">
        <header className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-black text-gray-900">Seus Projetos</h1>
            <div className="flex gap-4">
                <div className="relative">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" placeholder="Buscar..." className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-full text-sm focus:outline-none focus:border-black transition-colors" />
                </div>
                <button className="px-4 py-2 bg-black text-white rounded-full text-sm font-bold flex items-center gap-2 hover:bg-gray-800 transition-colors shadow-lg shadow-black/10">
                    <Plus size={16} /> Novo Projeto
                </button>
            </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card de Novo Projeto */}
            <button className="aspect-[4/3] bg-white border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center gap-3 text-gray-400 hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50 transition-all group">
                <div className="w-12 h-12 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center group-hover:bg-white group-hover:scale-110 transition-transform">
                    <Plus size={24} />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider">Criar em branco</span>
            </button>

            {/* Lista de Projetos */}
            {projects.map((project) => (
                <Link href={project.link} key={project.id} className="group flex flex-col gap-3">
                    <div className={`aspect-[4/3] rounded-2xl ${project.thumbnail} relative overflow-hidden shadow-sm group-hover:shadow-xl group-hover:-translate-y-1 transition-all border border-black/5`}>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10 backdrop-blur-[2px]">
                            <span className="px-4 py-2 bg-white rounded-full text-xs font-bold shadow-sm">Editar</span>
                        </div>
                    </div>
                    <div className="flex justify-between items-start px-1">
                        <div>
                            <h3 className="font-bold text-gray-900 text-sm">{project.name}</h3>
                            <p className="text-[10px] text-gray-500 font-medium">Editado {project.updatedAt}</p>
                        </div>
                        <button className="p-1 hover:bg-gray-200 rounded text-gray-400 hover:text-black transition-colors">
                            <MoreVertical size={14} />
                        </button>
                    </div>
                </Link>
            ))}
        </div>
      </main>
    </div>
  )
}