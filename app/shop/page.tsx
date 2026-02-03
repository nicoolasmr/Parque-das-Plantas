"use client";

import { useState, useEffect } from 'react';
import { getStorageData, saveStorageData, UserData } from '@/lib/storage';
import { ArrowLeft, Coins, Check, ShoppingBag, Sparkles } from 'lucide-react';
import Link from 'next/link';

const SHOP_ITEMS = [
    {
        id: 'time_freeze',
        name: 'Congelar Tempo',
        description: 'Pausa o timer por 3 segundos (Uso único)',
        price: 150,
        icon: '❄️'
    },
    {
        id: 'extra_time',
        name: 'Tempo Extra',
        description: 'Adiciona +5 segundos ao timer inicial',
        price: 300,
        icon: '⏳'
    },
    {
        id: 'rainbow_seed',
        name: 'Semente Arco-íris',
        description: 'Começa o nível com 1 coringa extra',
        price: 500,
        icon: '🌈'
    }
];

export default function ShopPage() {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [purchaseSuccess, setPurchaseSuccess] = useState<string | null>(null);

    useEffect(() => {
        setUserData(getStorageData());
    }, []);

    const handleBuy = (item: typeof SHOP_ITEMS[0]) => {
        if (!userData || userData.coins < item.price) return;

        const updatedCoins = userData.coins - item.price;
        saveStorageData({ coins: updatedCoins });
        setUserData({ ...userData, coins: updatedCoins });

        setPurchaseSuccess(item.id);
        setTimeout(() => setPurchaseSuccess(null), 2000);
    };

    if (!userData) return null;

    return (
        <main className="min-h-screen bg-[#1a1a1a] text-white p-6">
            <div className="max-w-md mx-auto">
                <header className="flex items-center justify-between mb-8">
                    <Link href="/" className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <ArrowLeft size={28} />
                    </Link>
                    <h1 className="text-2xl font-black tracking-tight">LOJA DO PARQUE</h1>
                    <div className="flex items-center gap-2 bg-yellow-500/20 px-3 py-1 rounded-full border border-yellow-500/30">
                        <Coins size={16} className="text-yellow-500" />
                        <span className="font-bold text-yellow-500 text-sm">{userData.coins}</span>
                    </div>
                </header>

                <div className="space-y-4">
                    {SHOP_ITEMS.map((item) => {
                        const canAfford = userData.coins >= item.price;
                        const isSuccess = purchaseSuccess === item.id;

                        return (
                            <div
                                key={item.id}
                                className="bg-white/5 border border-white/10 p-5 rounded-3xl flex items-center justify-between transition-all hover:border-white/20"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-3xl shadow-inner">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-sm tracking-tight">{item.name}</h3>
                                        <p className="text-[10px] opacity-40 max-w-[150px]">{item.description}</p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleBuy(item)}
                                    disabled={!canAfford || !!isSuccess}
                                    className={`px-4 py-2 rounded-xl font-bold text-xs transition-all flex items-center gap-2 ${isSuccess
                                            ? 'bg-green-500 text-white'
                                            : canAfford
                                                ? 'bg-yellow-500 text-[#1a1a1a] hover:scale-105 active:scale-95'
                                                : 'bg-white/5 text-white/20 cursor-not-allowed'
                                        }`}
                                >
                                    {isSuccess ? (
                                        <><Check size={14} /> ADQUIRIDO!</>
                                    ) : (
                                        <><Coins size={14} /> {item.price}</>
                                    )}
                                </button>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-12 p-8 bg-gradient-to-br from-green-500/10 to-transparent rounded-3xl border border-green-500/10 text-center">
                    <Sparkles className="mx-auto text-green-400 mb-2 opacity-50" size={32} />
                    <p className="text-xs opacity-60 leading-relaxed italic">
                        "Equipamentos de alta qualidade para um jardineiro profissional. Novos itens em breve!"
                    </p>
                </div>
            </div>
        </main>
    );
}
