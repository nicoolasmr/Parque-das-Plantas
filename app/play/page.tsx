"use client";

import { useState, useEffect } from 'react';
import GameCanvas from '@/components/GameCanvas';
import { getStorageData, saveStorageData, UserData } from '@/lib/storage';
import { LEVELS, PLANTS_DATA } from '@/lib/game/levels';
import { Trophy, AlertTriangle, ArrowLeft, RefreshCcw, Home, Sparkles, Coins } from 'lucide-react';
import Link from 'next/link';

export default function PlayPage() {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [gameState, setGameState] = useState<'playing' | 'paused' | 'won' | 'lost'>('playing');
    const [earnedCoins, setEarnedCoins] = useState(0);
    const [currentLevelIndex, setCurrentLevelIndex] = useState(0);

    useEffect(() => {
        const data = getStorageData();
        setUserData(data);
        setCurrentLevelIndex(Math.min(data.highestLevel - 1, LEVELS.length - 1));
    }, []);

    const handleWin = (coins: number) => {
        setEarnedCoins(coins);
        setGameState('won');

        const nextLevel = Math.min(currentLevelIndex + 2, LEVELS.length);
        const unlockedPlant = PLANTS_DATA[currentLevelIndex + 1]?.id;

        const updates: Partial<UserData> = {
            coins: (userData?.coins || 0) + coins,
            highestLevel: Math.max(userData?.highestLevel || 1, nextLevel)
        };

        if (unlockedPlant && !userData?.unlockedPlants.includes(unlockedPlant)) {
            updates.unlockedPlants = [...(userData?.unlockedPlants || []), unlockedPlant];
        }

        saveStorageData(updates);
    };

    const handleLoss = () => setGameState('lost');

    const handleNextLevel = () => {
        if (currentLevelIndex < LEVELS.length - 1) {
            setCurrentLevelIndex(prev => prev + 1);
            setGameState('playing');
        }
    };

    const handleRetry = () => {
        setGameState('playing');
    };

    if (!userData) return null;

    return (
        <main className="min-h-screen bg-[#1a1a1a] text-white flex flex-col items-center">
            {/* Header / Game Controls */}
            <div className="w-full max-w-lg p-4 flex items-center justify-between">
                <Link href="/" className="p-3 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors">
                    <ArrowLeft size={24} />
                </Link>
                <div className="flex items-center gap-2 bg-yellow-500/20 px-4 py-2 rounded-2xl border border-yellow-500/20">
                    <Coins size={20} className="text-yellow-500" />
                    <span className="font-bold text-yellow-500">{userData.coins}</span>
                </div>
            </div>

            {gameState === 'playing' ? (
                <GameCanvas
                    levelIndex={currentLevelIndex}
                    onWin={handleWin}
                    onLost={handleLoss}
                />
            ) : null}

            {/* Overlays */}
            {gameState === 'won' && (
                <div className="fixed inset-0 bg-green-950/90 backdrop-blur-md z-50 flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500">
                    <div className="w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center mb-6 shadow-[0_0_50px_rgba(250,204,21,0.5)]">
                        <Trophy size={48} className="text-green-900" />
                    </div>
                    <h2 className="text-4xl font-black mb-2 tracking-tight">VITÓRIA!</h2>
                    <p className="text-green-300 mb-8 font-medium">Você cultivou as sementes com perfeição.</p>

                    <div className="bg-white/10 p-6 rounded-3xl border border-white/10 mb-8 w-full max-w-xs">
                        <div className="flex justify-between items-center mb-4">
                            <span className="opacity-60">Recompensa</span>
                            <div className="flex items-center gap-2 font-bold text-xl">
                                <Coins size={20} className="text-yellow-400" />
                                {earnedCoins}
                            </div>
                        </div>
                        {PLANTS_DATA[currentLevelIndex + 1] && (
                            <div className="flex justify-between items-center p-3 bg-green-500/20 rounded-2xl border border-green-500/20">
                                <span className="text-sm">Nova Planta:</span>
                                <span className="text-2xl">{PLANTS_DATA[currentLevelIndex + 1].icon}</span>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-3 w-full max-w-xs">
                        {currentLevelIndex < LEVELS.length - 1 ? (
                            <button
                                onClick={handleNextLevel}
                                className="bg-green-500 hover:bg-green-400 py-4 rounded-2xl font-bold text-xl transition-all shadow-xl"
                            >
                                PRÓXIMO NÍVEL
                            </button>
                        ) : (
                            <Link href="/garden" className="w-full">
                                <button className="w-full bg-green-500 hover:bg-green-400 py-4 rounded-2xl font-bold text-xl transition-all shadow-xl">
                                    IR PARA O JARDIM
                                </button>
                            </Link>
                        )}
                        <Link href="/" className="text-white/40 hover:text-white transition-colors py-2 font-medium">
                            MENU PRINCIPAL
                        </Link>
                    </div>
                </div>
            )}

            {gameState === 'lost' && (
                <div className="fixed inset-0 bg-red-950/90 backdrop-blur-md z-50 flex flex-col items-center justify-center p-8 text-center">
                    <div className="w-24 h-24 bg-red-500 rounded-full flex items-center justify-center mb-6">
                        <AlertTriangle size={48} className="text-white" />
                    </div>
                    <h2 className="text-4xl font-black mb-2 tracking-tight">TEMPO ESGOTADO!</h2>
                    <p className="text-red-300 mb-8">Não desanime, a natureza tem seu tempo.</p>

                    <div className="flex flex-col gap-3 w-full max-w-xs">
                        <button
                            onClick={handleRetry}
                            className="flex items-center justify-center gap-3 bg-white text-black py-4 rounded-2xl font-bold text-xl transition-all transform active:scale-95"
                        >
                            <RefreshCcw size={20} /> TENTAR NOVAMENTE
                        </button>
                        <Link href="/" className="text-white/40 hover:text-white transition-colors py-2 font-medium">
                            MENU PRINCIPAL
                        </Link>
                    </div>
                </div>
            )}
        </main>
    );
}
