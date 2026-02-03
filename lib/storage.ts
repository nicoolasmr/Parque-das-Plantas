"use client";

const STORAGE_KEY = 'parque-das-plantas-data';

export interface UserData {
    highestLevel: number;
    coins: number;
    unlockedPlants: number[]; // plant IDs
}

const DEFAULT_DATA: UserData = {
    highestLevel: 1,
    coins: 0,
    unlockedPlants: [1]
};

export const getStorageData = (): UserData => {
    if (typeof window === 'undefined') return DEFAULT_DATA;
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return DEFAULT_DATA;
    try {
        return JSON.parse(saved);
    } catch {
        return DEFAULT_DATA;
    }
};

export const saveStorageData = (data: Partial<UserData>) => {
    if (typeof window === 'undefined') return;
    const current = getStorageData();
    const updated = { ...current, ...data };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

export const resetStorageData = () => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_DATA));
};
