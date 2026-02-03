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
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-[#22c55e] p-8 rounded-[3rem] w-full max-w-sm text-center shadow-2xl border-4 border-green-400"
                    >
                        <Trophy className="mx-auto mb-4 text-yellow-300 drop-shadow-lg" size={80} />
                        <h2 className="text-4xl font-black mb-2 tracking-tight">VITÓRIA!</h2>

                        <div className="flex justify-center gap-2 mb-6">
                            {[1, 2, 3].map((s) => (
                                <motion.div
                                    key={s}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2 + s * 0.1, type: "spring" }}
                                >
                                    <Star
                                        size={32}
                                        className={s <= stars ? "text-yellow-400 fill-yellow-400" : "text-white/20"}
                                    />
                                </motion.div>
                            ))}
                        </div>

                        <div className="bg-green-600/50 p-6 rounded-3xl mb-8 flex flex-col items-center gap-2">
                            <span className="text-xs font-bold opacity-60 uppercase tracking-widest">Recompensa</span>
                            <div className="flex items-center gap-3">
                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                >
                                    <Coins className="text-yellow-400" size={32} />
                                </motion.div>
                                <span className="text-4xl font-black text-white">{earnedCoins}</span>
                            </div>
                        </div>

                        {PLANTS_DATA[currentLevelIndex + 1] && (
                            <div className="flex justify-between items-center p-3 bg-green-500/20 rounded-2xl border border-green-500/20 mb-6">
                                <span className="text-sm">Nova Planta:</span>
                                <span className="text-2xl">{PLANTS_DATA[currentLevelIndex + 1].icon}</span>
                            </div>
                        )}

                        <div className="flex flex-col gap-3 w-full">
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
                    </motion.div>
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
