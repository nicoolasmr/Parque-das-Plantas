"use client";

import React, { useEffect, useRef, useState } from 'react';
import { GameEngine, GameStatus } from '@/lib/game/engine';
import { LEVELS, LevelConfig } from '@/lib/game/levels';
import { audioManager } from '@/lib/game/audioManager';
import { Save, RefreshCcw, Home, Play, ChevronRight, Flower2, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface GameCanvasProps {
    levelIndex: number;
    onWin: (coins: number) => void;
    onLost: () => void;
}

class Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    color: string;

    constructor(x: number, y: number, color: string) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 10;
        this.vy = (Math.random() - 0.5) * 10;
        this.life = 1.0;
        this.color = color;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= 0.02;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.globalAlpha = this.life;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;
    }
}

export default function GameCanvas({ levelIndex, onWin, onLost }: GameCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const engineRef = useRef<GameEngine | null>(null);
    const [status, setStatus] = useState<GameStatus>('idle');
    const [timeLeft, setTimeLeft] = useState(0);
    const [isShaking, setIsShaking] = useState(false);
    const [showTutorial, setShowTutorial] = useState(false);
    const [assetsLoaded, setAssetsLoaded] = useState(false);
    const seedsSpriteRef = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
        const img = new Image();
        img.src = '/seeds.png';
        img.onload = () => {
            seedsSpriteRef.current = img;
            setAssetsLoaded(true);
        };
    }, []);

    useEffect(() => {
        if (!assetsLoaded) return;
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let particles: Particle[] = [];

        const penalty = () => {
            setIsShaking(true);
            audioManager.playSound('error');
            setTimeout(() => setIsShaking(false), 300);
            if (navigator.vibrate) navigator.vibrate(50);
        };

        const win = () => {
            audioManager.playSound('victory');
            setStatus('won');
            const coins = (levelIndex + 1) * 20 + Math.floor(engineRef.current?.timeLeft || 0);
            onWin(coins);
        };

        const loss = () => {
            audioManager.playSound('lost');
            setStatus('lost');
            onLost();
        };

        const engine = new GameEngine(penalty, win, loss);
        engineRef.current = engine;

        // Hook into engine to spawn particles on correct placement
        const originalHandlePointerUp = engine.handlePointerUp.bind(engine);
        engine.handlePointerUp = (penaltyVal: number) => {
            const beforeScore = engine.score;
            originalHandlePointerUp(penaltyVal);
            if (engine.score > beforeScore) {
                audioManager.playSound('success');
                const seed = engine.seeds.find(s => s.isCorrected && !s.particlesSpawned);
                if (seed) {
                    (seed as any).particlesSpawned = true;
                    for (let i = 0; i < 20; i++) {
                        particles.push(new Particle(seed.x, seed.y, seed.color));
                    }
                }
            }
        };

        const resize = () => {
            canvas.width = Math.min(window.innerWidth, 600);
            canvas.height = Math.min(window.innerHeight - 200, 800);
            engine.initLevel(levelIndex, LEVELS, canvas.width, canvas.height);
        };

        window.addEventListener('resize', resize);
        resize();

        let animationFrame: number;
        const render = (time: number) => {
            engine.update(time);
            engine.draw(ctx, canvas.width, canvas.height, seedsSpriteRef.current || undefined);

            // Render Particles
            particles = particles.filter(p => p.life > 0);
            particles.forEach(p => {
                p.update();
                p.draw(ctx);
            });

            setTimeLeft(Math.max(0, Math.ceil(engine.timeLeft)));
            setStatus(engine.status);
            animationFrame = requestAnimationFrame(render);
        };

        animationFrame = requestAnimationFrame(render);

        return () => {
            cancelAnimationFrame(animationFrame);
            window.removeEventListener('resize', resize);
        };
    }, [levelIndex]);

    const handleStart = () => setShowTutorial(false);

    const handlePointerDown = (e: React.PointerEvent) => {
        const canvas = canvasRef.current;
        if (!canvas || !engineRef.current) return;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        engineRef.current.handlePointerDown(x, y);
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        const canvas = canvasRef.current;
        if (!canvas || !engineRef.current) return;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        engineRef.current.handlePointerMove(x, y);
    };

    const handlePointerUp = () => {
        engineRef.current?.handlePointerUp(LEVELS[levelIndex].penalty);
    };

    return (
        <div className="flex flex-col items-center w-full max-w-lg mx-auto p-4 select-none">
            {/* HUD */}
            <div className="flex justify-between w-full mb-4 bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/20">
                <div className="flex flex-col">
                    <span className="text-xs uppercase tracking-wider opacity-60">Nível</span>
                    <span className="text-xl font-bold">{levelIndex + 1}</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-xs uppercase tracking-wider opacity-60">Tempo</span>
                    <span className={`text-xl font-mono font-bold ${timeLeft < 5 ? 'text-red-500 animate-pulse' : ''}`}>
                        {timeLeft}s
                    </span>
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-xs uppercase tracking-wider opacity-60">Sementes</span>
                    <span className="text-xl font-bold">
                        {engineRef.current?.seeds.filter(s => s.isCorrected).length} / {LEVELS[levelIndex].seedsCount}
                    </span>
                </div>
            </div>

            {/* Canvas Area */}
            <div className={`relative rounded-2xl overflow-hidden shadow-2xl transition-transform ${isShaking ? 'animate-shake' : ''}`}>
                <canvas
                    ref={canvasRef}
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    className="bg-[#2d3436] cursor-crosshair"
                />

                {showTutorial && (
                    <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center p-8 text-center backdrop-blur-sm">
                        <Flower2 size={64} className="text-green-400 mb-4 animate-bounce" />
                        <h2 className="text-2xl font-bold mb-4">Como Jogar</h2>
                        <p className="mb-2 text-lg">Arraste a semente até o canteiro da mesma cor.</p>
                        <p className="text-sm opacity-70 mb-8 font-semibold text-red-400">⚠️ Erros tiram tempo!</p>
                        <button
                            onClick={handleStart}
                            className="bg-green-500 hover:bg-green-600 px-8 py-3 rounded-full font-bold transition-all transform active:scale-95 shadow-lg"
                        >
                            Começar
                        </button>
                    </div>
                )}
            </div>

            <style jsx global>{`
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-8px); }
                    75% { transform: translateX(8px); }
                }
                .animate-shake {
                    animation: shake 0.3s ease-in-out;
                }
            `}</style>
        </div>
    );
}
