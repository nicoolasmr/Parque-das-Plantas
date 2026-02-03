"use client";

import { useState, useEffect } from 'react';
import { getStorageData, UserData } from '@/lib/storage';
import { PLANTS_DATA } from '@/lib/game/levels';
import { ArrowLeft, Coins, Lock } from 'lucide-react';
import Link from 'next/link';

export default function GardenPage() {
    const [userData, setUserData] = useState<UserData | null>(null);

    useEffect(() => {
        setUserData(getStorageData());
    }, []);

    if (!userData) return null;

    return (
        <main className="min-h-screen bg-gradient-to-b from-green-900 to-green-950 text-white p-6">
            <div className="max-w-md mx-auto">
                <header className="flex items-center justify-between mb-8">
                    <Link href="/" className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <ArrowLeft size={28} />
                    </Link>
                    <h1 className="text-2xl font-black tracking-tight">MEU JARDIM</h1>
                    <div className="flex items-center gap-2 bg-yellow-500/20 px-3 py-1 rounded-full border border-yellow-500/30">
                        <Coins size={16} className="text-yellow-500" />
                        <span className="font-bold text-yellow-500 text-sm">{userData.coins}</span>
                    </div>
                </header>

                <div className="grid grid-cols-2 gap-4">
                    {PLANTS_DATA.map((plant) => {
                        const isUnlocked = userData.unlockedPlants.includes(plant.id);
                        return (
                            <div
                                key={plant.id}
                                className={`relative p-6 rounded-3xl border transition-all ${isUnlocked
                                        ? 'bg-white/10 border-white/20 shadow-lg'
                                        : 'bg-black/20 border-white/5 opacity-50'
                                    }`}
                            >
                                <div className="text-4xl mb-3 flex justify-center">
                                    {isUnlocked ? plant.icon : <Lock size={24} className="text-white/20" />}
                                </div>
                                <div className="text-center">
                                    <h3 className="font-bold text-sm tracking-tight">{isUnlocked ? plant.name : 'Bloqueado'}</h3>
                                    {!isUnlocked && plant.price > 0 && (
                                        <div className="flex items-center justify-center gap-1 mt-1 text-[10px] text-yellow-500 font-bold">
                                            <Coins size={10} /> {plant.price}
                                        </div>
                                    )}
                                </div>
                                {isUnlocked && (
                                    <div className="absolute top-2 right-2 w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                )}
                            </div>
                        );
                    })}
                </div>

                <div className="mt-12 bg-white/5 p-6 rounded-3xl border border-white/5 text-center">
                    <p className="text-sm opacity-60 leading-relaxed italic">
                        "Cada planta tem seu próprio tempo. Continue jogando para desbloquear novas espécies e florescer seu jardim."
                    </p>
                </div>
            </div>
        </main>
    );
}
