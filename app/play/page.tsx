"use client";

import { useState, useEffect } from 'react';
import GameCanvas from '@/components/GameCanvas';
import { getStorageData, saveStorageData, UserData } from '@/lib/storage';
import { LEVELS, PLANTS_DATA } from '@/lib/game/levels';
import { Trophy, AlertTriangle, ArrowLeft, RefreshCcw, Home, Sparkles, Coins, Star } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function PlayPage() {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [gameState, setGameState] = useState<'playing' | 'paused' | 'won' | 'lost'>('playing');
    const [earnedCoins, setEarnedCoins] = useState(0);
    const [stars, setStars] = useState(0);
    const [currentLevelIndex, setCurrentLevelIndex] = useState(0);

    useEffect(() => {
        const data = getStorageData();
        setUserData(data);
        setCurrentLevelIndex(Math.min(data.highestLevel - 1, LEVELS.length - 1));
    }, []);

    const handleWin = (coins: number, earnedStars: number) => {
        setEarnedCoins(coins);
        setStars(earnedStars);
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
            <div className="w-full max-w-lg p-6 flex items-center justify-between z-10">
                <Link href="/" className="p-4 glass rounded-3xl hover:bg-white/10 transition-all active:scale-95 group">
                    <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                </Link>
                <div className="flex items-center gap-3 glass px-6 py-3 rounded-[2rem] border border-white/10 shadow-xl">
                    <Coins size={22} className="text-yellow-400" />
                    <span className="font-black text-yellow-400 text-xl">{userData.coins}</span>
                </div>
            </div>

            {gameState === 'playing' ? (
                <div className="w-full h-full flex items-center justify-center animate-in fade-in zoom-in-95 duration-700">
                    <GameCanvas
                        levelIndex={currentLevelIndex}
                        onWin={handleWin}
                        onLost={handleLoss}
                    />
                </div>
            ) : null}

            {/* Overlays */}
            {gameState === 'won' && (
                <div className="fixed inset-0 bg-green-950/40 backdrop-blur-2xl z-50 flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-700">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 40 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        transition={{ type: "spring", damping: 20, stiffness: 100 }}
                        className="glass-card p-10 rounded-[3.5rem] w-full max-w-sm text-center border-white/20 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)]"
                    >
                        <div className="relative mb-8">
                            <motion.div
                                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                                transition={{ repeat: Infinity, duration: 3 }}
                            >
                                <Trophy className="mx-auto text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" size={100} />
                            </motion.div>
                            <Sparkles className="absolute -top-4 -right-4 text-white animate-pulse" size={32} />
                        </div>

                        <h2 className="text-5xl font-black mb-2 tracking-tighter text-white">VITÓRIA!</h2>
                        <p className="text-green-300/60 font-medium mb-8">Nível {currentLevelIndex + 1} Concluído</p>

                        <div className="flex justify-center gap-3 mb-10">
                            {[1, 2, 3].map((s) => (
                                <motion.div
                                    key={s}
                                    initial={{ scale: 0, rotate: -45 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ delay: 0.3 + s * 0.15, type: "spring" }}
                                >
                                    <Star
                                        size={40}
                                        className={s <= stars ? "text-yellow-400 fill-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.4)]" : "text-white/10"}
                                    />
                                </motion.div>
                            ))}
                        </div>

                        <div className="glass bg-white/5 p-8 rounded-[2.5rem] mb-10 flex flex-col items-center gap-3 border border-white/10">
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Recompensa Obtida</span>
                            <div className="flex items-center gap-4">
                                <Coins className="text-yellow-400" size={32} />
                                <span className="text-5xl font-black text-white">{earnedCoins}</span>
                            </div>
                        </div>

                        {PLANTS_DATA[currentLevelIndex + 1] && (
                            <div className="flex justify-between items-center px-6 py-4 glass rounded-[1.5rem] border border-white/10 mb-8 overflow-hidden group">
                                <span className="text-xs font-bold text-white/60">Nova Planta desbloqueada!</span>
                                <span className="text-3xl group-hover:scale-125 transition-transform duration-500 drop-shadow-md">
                                    {PLANTS_DATA[currentLevelIndex + 1].icon}
                                </span>
                            </div>
                        )}

                        <div className="flex flex-col gap-4 w-full">
                            {currentLevelIndex < LEVELS.length - 1 ? (
                                <button
                                    onClick={handleNextLevel}
                                    className="bg-green-500 hover:bg-green-400 text-green-950 py-5 rounded-[1.5rem] font-black text-xl transition-all shadow-[0_20px_40px_-10px_rgba(34,197,94,0.4)] transform active:scale-95"
                                >
                                    PRÓXIMO NÍVEL
                                </button>
                            ) : (
                                <Link href="/garden" className="w-full">
                                    <button className="w-full bg-green-500 hover:bg-green-400 text-green-950 py-5 rounded-[1.5rem] font-black text-xl transition-all shadow-[0_20px_40px_-10px_rgba(34,197,94,0.4)] transform active:scale-95">
                                        VER MEU JARDIM
                                    </button>
                                </Link>
                            )}
                            <Link href="/" className="text-white/30 hover:text-white transition-colors py-2 font-black text-xs tracking-widest uppercase">
                                MENU PRINCIPAL
                            </Link>
                        </div>
                    </motion.div>
                </div>
            )}

            {gameState === 'lost' && (
                <div className="fixed inset-0 bg-red-950/40 backdrop-blur-2xl z-50 flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-700">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="glass-card p-12 rounded-[3.5rem] w-full max-w-sm border-red-500/20 shadow-[0_32px_64px_-12px_rgba(220,38,38,0.3)]"
                    >
                        <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mb-8 mx-auto border-2 border-red-500/30">
                            <AlertTriangle size={48} className="text-red-500 animate-pulse" />
                        </div>
                        <h2 className="text-4xl font-black mb-2 tracking-tighter text-white uppercase">Tempo Esgotado</h2>
                        <p className="text-red-300/60 mb-10 font-medium">A natureza tem seu próprio ritmo. Tente novamente!</p>

                        <div className="flex flex-col gap-4 w-full">
                            <button
                                onClick={handleRetry}
                                className="flex items-center justify-center gap-3 bg-white text-black py-5 rounded-[1.5rem] font-black text-xl transition-all transform active:scale-95 hover:bg-red-50 shadow-xl"
                            >
                                <RefreshCcw size={22} /> TENTAR NOVAMENTE
                            </button>
                            <Link href="/" className="text-white/30 hover:text-white transition-colors py-2 font-black text-xs tracking-widest uppercase">
                                MENU PRINCIPAL
                            </Link>
                        </div>
                    </motion.div>
                </div>
            )}
        </main>
    );
}
