"use client";

import { useState, useEffect } from 'react';
import { resetStorageData } from '@/lib/storage';
import { ArrowLeft, Volume2, VolumeX, Trash2, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
    const [sound, setSound] = useState(true);
    const [resetSuccess, setResetSuccess] = useState(false);
    const router = useRouter();

    const handleReset = () => {
        if (confirm('Tem certeza que deseja apagar todo seu progresso? Esta ação não pode ser desfeita.')) {
            resetStorageData();
            setResetSuccess(true);
            setTimeout(() => {
                router.push('/');
            }, 1000);
        }
    };

    return (
        <main className="min-h-screen bg-[#1a1a1a] text-white p-6">
            <div className="max-w-md mx-auto">
                <header className="flex items-center gap-4 mb-12">
                    <Link href="/" className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <ArrowLeft size={28} />
                    </Link>
                    <h1 className="text-2xl font-black tracking-tight uppercase">Configurações</h1>
                </header>

                <div className="space-y-6">
                    <section className="bg-white/5 p-6 rounded-3xl border border-white/10">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                {sound ? <Volume2 className="text-green-400" /> : <VolumeX className="text-red-400" />}
                                <div>
                                    <h3 className="font-bold">Efeitos Sonoros</h3>
                                    <p className="text-xs opacity-50">Sons de jogo e feedback</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setSound(!sound)}
                                className={`w-14 h-8 rounded-full transition-all relative ${sound ? 'bg-green-500' : 'bg-white/10'}`}
                            >
                                <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${sound ? 'left-7' : 'left-1'}`} />
                            </button>
                        </div>
                    </section>

                    <section className="bg-white/5 p-6 rounded-3xl border border-white/10">
                        <h3 className="font-bold mb-4">Progresso do Jogo</h3>
                        <button
                            onClick={handleReset}
                            disabled={resetSuccess}
                            className={`flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-bold text-sm transition-all shadow-lg ${resetSuccess
                                    ? 'bg-green-500 text-white'
                                    : 'bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white border border-red-500/20'
                                }`}
                        >
                            {resetSuccess ? (
                                <><CheckCircle2 size={18} /> PROGRESSO RESETADO!</>
                            ) : (
                                <><Trash2 size={18} /> APAGAR TODOS OS DADOS</>
                            )}
                        </button>
                        <p className="text-[10px] text-center mt-4 opacity-40">
                            Ao clicar, as moedas, níveis e plantas desbloqueadas serão excluídos permanentemente.
                        </p>
                    </section>
                </div>

                <div className="mt-12 text-center opacity-20">
                    <p className="text-xs font-mono">Developed with ❤️ for nature enthusiasts.</p>
                </div>
            </div>
        </main>
    );
}
