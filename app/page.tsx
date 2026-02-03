import Link from 'next/link'
import { Flower, Play, BookOpen, Settings as SettingsIcon, ShoppingBag } from 'lucide-react'

export default function Home() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-green-400/10 blur-[120px] rounded-full animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-400/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />

            <div className="z-10 flex flex-col items-center">
                <div className="mb-12 flex flex-col items-center transform transition-all duration-1000 animate-in fade-in slide-in-from-bottom-8">
                    <div className="w-28 h-28 glass-card rounded-full flex items-center justify-center mb-6 ring-4 ring-green-500/20 shadow-[0_0_50px_rgba(16,185,129,0.2)]">
                        <Flower size={56} className="text-green-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                    </div>
                    <h1 className="text-6xl font-black tracking-tighter mb-2 bg-clip-text text-transparent bg-gradient-to-b from-white to-green-200">
                        PARQUE
                    </h1>
                    <h2 className="text-xl font-bold tracking-[0.4em] text-green-400/80 uppercase">
                        Das Plantas
                    </h2>
                </div>

                <div className="flex flex-col gap-4 w-full max-w-sm animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
                    <Link href="/play" className="group relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-400 rounded-2xl blur opacity-25 group-hover:opacity-60 transition duration-500"></div>
                        <button className="relative flex items-center justify-center gap-4 w-full bg-green-500 hover:bg-green-400 text-green-950 py-5 rounded-2xl font-black text-2xl transition-all transform active:scale-95 shadow-xl">
                            <Play fill="currentColor" size={24} /> JOGAR
                        </button>
                    </Link>

                    <div className="grid grid-cols-2 gap-4">
                        <Link href="/garden">
                            <button className="flex flex-col items-center justify-center gap-2 w-full glass hover:bg-white/10 py-6 rounded-3xl font-bold text-sm transition-all border border-white/5 transform active:scale-95 group">
                                <BookOpen size={24} className="group-hover:text-green-400 transition-colors" />
                                MEU JARDIM
                            </button>
                        </Link>

                        <Link href="/shop">
                            <button className="flex flex-col items-center justify-center gap-2 w-full glass hover:bg-white/10 py-6 rounded-3xl font-bold text-sm transition-all border border-white/5 transform active:scale-95 group">
                                <ShoppingBag size={24} className="group-hover:text-green-400 transition-colors" />
                                LOJA
                            </button>
                        </Link>
                    </div>

                    <Link href="/settings" className="mt-4">
                        <button className="flex items-center justify-center gap-3 w-full glass hover:bg-white/5 py-4 rounded-2xl font-semibold text-xs transition-all border border-white/5 opacity-50 hover:opacity-100 group">
                            <SettingsIcon size={16} className="group-hover:rotate-90 transition-transform duration-500" />
                            CONFIGURAÇÕES
                        </button>
                    </Link>
                </div>

                <div className="mt-20 text-center opacity-20 hover:opacity-50 transition-opacity">
                    <p className="text-[10px] font-mono tracking-widest uppercase">v1.2.0-PREMIUM</p>
                </div>
            </div>
        </main>
    )
}
