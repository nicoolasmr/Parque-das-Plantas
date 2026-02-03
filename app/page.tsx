import Link from 'next/link'
import { Flower, Play, BookOpen, Settings as SettingsIcon, ShoppingBag } from 'lucide-react'

export default function Home() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-green-900 via-green-800 to-green-950 text-white">
            <div className="mb-12 flex flex-col items-center">
                <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center shadow-xl mb-4 border-4 border-green-400">
                    <Flower size={48} className="text-white" />
                </div>
                <h1 className="text-5xl font-black tracking-tighter mb-2">PARQUE</h1>
                <h2 className="text-2xl font-bold tracking-[0.2em] text-green-400">DAS PLANTAS</h2>
            </div>

            <div className="flex flex-col gap-4 w-full max-w-xs">
                <Link href="/play" className="group relative">
                    <div className="absolute -inset-1 bg-green-400 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                    <button className="relative flex items-center justify-center gap-3 w-full bg-green-500 hover:bg-green-400 py-4 rounded-2xl font-bold text-xl transition-all transform active:scale-95 shadow-xl">
                        <Play fill="currentColor" /> JOGAR
                    </button>
                </Link>

                <Link href="/garden">
                    <button className="flex items-center justify-center gap-3 w-full bg-white/10 hover:bg-white/20 py-4 rounded-2xl font-bold text-lg backdrop-blur-sm transition-all border border-white/10 transform active:scale-95">
                        <BookOpen size={20} /> MEU JARDIM
                    </button>
                </Link>

                <Link href="/shop">
                    <button className="flex items-center justify-center gap-3 w-full bg-white/10 hover:bg-white/20 py-4 rounded-2xl font-bold text-lg backdrop-blur-sm transition-all border border-white/10 transform active:scale-95">
                        <ShoppingBag size={20} /> LOJA
                    </button>
                </Link>

                <div className="flex gap-4 mt-8">
                    <Link href="/settings" className="flex-1">
                        <button className="flex items-center justify-center gap-2 w-full bg-white/5 hover:bg-white/10 py-3 rounded-xl font-medium text-sm transition-all border border-white/5 opacity-60">
                            <SettingsIcon size={16} /> CONFIGURAÇÕES
                        </button>
                    </Link>
                </div>
            </div>

            <div className="mt-20 text-center opacity-40">
                <p className="text-xs font-mono">v1.0.0-MVP</p>
            </div>
        </main>
    )
}
