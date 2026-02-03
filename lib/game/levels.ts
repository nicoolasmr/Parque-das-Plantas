export interface LevelConfig {
    id: number;
    colors: string[];
    seedsCount: number;
    timeLimit: number;
    penalty: number;
}

export const LEVELS: LevelConfig[] = [
    {
        id: 1,
        colors: ['#FF5E5E', '#5E7DFF', '#FFF35E'], // Red, Blue, Yellow
        seedsCount: 6,
        timeLimit: 20,
        penalty: 2
    },
    {
        id: 2,
        colors: ['#FF5E5E', '#5E7DFF', '#FFF35E', '#5EFF7D'], // Red, Blue, Yellow, Green
        seedsCount: 10,
        timeLimit: 25,
        penalty: 3
    },
    {
        id: 3,
        colors: ['#FF5E5E', '#5E7DFF', '#FFF35E', '#5EFF7D'], // 4 colors + wildcard
        seedsCount: 12,
        timeLimit: 25,
        penalty: 4
    }
];

export const PLANTS_DATA = [
    { id: 1, name: 'Margarida', icon: '🌼', price: 0 },
    { id: 2, name: 'Girassol', icon: '🌻', price: 50 },
    { id: 3, name: 'Cacto', icon: '🌵', price: 100 },
    { id: 4, name: 'Rosa', icon: '🌹', price: 200 },
    { id: 5, name: 'Tulipa', icon: '🌷', price: 350 },
];
