"use client";

import { useState, useEffect } from 'react';
import { getStorageData, UserData } from '@/lib/storage';
import { PLANTS_DATA } from '@/lib/game/levels';
import { ArrowLeft, Coins, Lock, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function GardenPage() {
    const [userData, setUserData] = useState<UserData | null>(null);

    useEffect(() => {
        setUserData(getStorageData());
    }, []);

    if (!userData) return null;

    return (
        <main className="min-h-screen p-6 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-green-500/5 blur-[100px] rounded-full" />

            <div className="max-w-md mx-auto relative z-10">
                <header className="flex items-center justify-between mb-10 animate-in fade-in slide-in-from-top-4 duration-500">
                    <Link href="/" className="p-3 glass rounded-2xl hover:bg-white/10 transition-all active:scale-95 group">
                        <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                    </Link>
                    <h1 className="text-xl font-black tracking-widest uppercase text-white/90">Meu Jardim</h1>
                    <div className="flex items-center gap-2 glass px-4 py-2 rounded-2xl border border-white/10">
                        <Coins size={18} className="text-yellow-400" />
                        <span className="font-black text-yellow-400 text-lg">{userData.coins}</span>
                    </div>
                </header>

                <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                    {PLANTS_DATA.map((plant, index) => {
                        const isUnlocked = userData.unlockedPlants.includes(plant.id);
                        return (
                            <motion.div
                                key={plant.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className={`relative p-8 rounded-[2rem] border transition-all duration-500 ${isUnlocked
                                    ? 'glass-card border-white/10 hover:border-green-500/30 group'
                                    : 'bg-black/20 border-white/5 opacity-40'
                                    }`}
                            >
                                <div className={`text-5xl mb-4 flex justify-center transition-transform duration-500 ${isUnlocked ? 'group-hover:scale-110 drop-shadow-lg' : ''}`}>
                                    {isUnlocked ? plant.icon : <Lock size={28} className="text-white/10" />}
                                </div>
                                <div className="text-center">
                                    <h3 className={`font-black text-xs tracking-widest uppercase ${isUnlocked ? 'text-white' : 'text-white/30'}`}>
                                        {isUnlocked ? plant.name : 'Bloqueado'}
                                    </h3>
                                    {!isUnlocked && plant.price > 0 && (
                                        <div className="flex items-center justify-center gap-1 mt-2 px-2 py-1 glass rounded-full text-[10px] text-yellow-500 font-black">
                                            <Coins size={10} /> {plant.price}
                                        </div>
                                    )}
                                </div>
                                {isUnlocked && (
                                    <div className="absolute top-4 right-4 animate-pulse">
                                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>

                <div className="mt-12 glass p-8 rounded-[2.5rem] border border-white/5 text-center transform transition-all hover:border-white/10 animate-in fade-in duration-1000 delay-500">
                    <Sparkles size={24} className="mx-auto mb-4 text-green-400 opacity-50" />
                    <p className="text-sm font-medium text-white/50 leading-relaxed italic px-4">
                        "Cada planta tem seu próprio tempo. Continue jogando para florescer seu jardim."
                    </p>
                </div>
            </div>
        </main>
    );
}
