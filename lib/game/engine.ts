export type GameStatus = 'idle' | 'playing' | 'won' | 'lost';

export interface Point {
    x: number;
    y: number;
}

export interface Seed extends Point {
    id: string;
    color: string;
    radius: number;
    targetX: number;
    targetY: number;
    originalX: number;
    originalY: number;
    isCorrected: boolean;
    isWildcard?: boolean;
    particlesSpawned?: boolean;
}

export interface Bed extends Point {
    id: string;
    color: string;
    width: number;
    height: number;
}

export class GameEngine {
    seeds: Seed[] = [];
    beds: Bed[] = [];
    status: GameStatus = 'idle';
    score: number = 0;
    timeLeft: number = 0;
    lastTime: number = 0;
    draggedSeedId: string | null = null;
    penaltyCallback: () => void;
    winCallback: () => void;
    lossCallback: () => void;

    constructor(
        penaltyCallback: () => void,
        winCallback: () => void,
        lossCallback: () => void
    ) {
        this.penaltyCallback = penaltyCallback;
        this.winCallback = winCallback;
        this.lossCallback = lossCallback;
    }

    initLevel(levelIndex: number, levels: any[], width: number, height: number) {
        const config = levels[levelIndex];
        this.beds = [];
        this.seeds = [];
        this.status = 'playing';
        this.score = 0;
        this.timeLeft = config.timeLimit;
        this.lastTime = performance.now();

        // Init Beds
        const bedWidth = 80;
        const bedHeight = 100;
        const spacing = (width - (config.colors.length * bedWidth)) / (config.colors.length + 1);

        config.colors.forEach((color: string, i: number) => {
            this.beds.push({
                id: `bed-${i}`,
                color,
                x: spacing + i * (bedWidth + spacing),
                y: 50,
                width: bedWidth,
                height: bedHeight
            });
        });

        // Init Seeds
        for (let i = 0; i < config.seedsCount; i++) {
            const isWildcard = (levelIndex === 2 && i === config.seedsCount - 1);
            const color = isWildcard ? '#FFFFFF' : config.colors[Math.floor(Math.random() * config.colors.length)];
            const x = Math.random() * (width - 60) + 30;
            const y = Math.random() * (height / 2) + (height / 2 - 100);

            this.seeds.push({
                id: `seed-${i}`,
                color,
                radius: 15,
                x,
                y,
                targetX: x,
                targetY: y,
                originalX: x,
                originalY: y,
                isCorrected: false,
                isWildcard
            });
        }
    }

    update(currentTime: number) {
        if (this.status !== 'playing') return;

        const deltaTime = (currentTime - this.lastTime) / 1000;
        this.lastTime = currentTime;
        this.timeLeft -= deltaTime;

        if (this.timeLeft <= 0) {
            this.timeLeft = 0;
            this.status = 'lost';
            this.lossCallback();
        }

        // Simple interpolation for dragging and floating animation
        this.seeds.forEach((seed, i) => {
            if (this.draggedSeedId !== seed.id && !seed.isCorrected) {
                // Floating effect
                const floatOffset = Math.sin(currentTime / 500 + i) * 5;
                seed.x += (seed.targetX - seed.x) * 0.2;
                seed.y += (seed.targetY + floatOffset - seed.y) * 0.2;
            }
        });
    }

    draw(ctx: CanvasRenderingContext2D, width: number, height: number) {
        ctx.clearRect(0, 0, width, height);

        // Draw Beds
        this.beds.forEach(bed => {
            ctx.strokeStyle = bed.color;
            ctx.lineWidth = 4;
            ctx.strokeRect(bed.x, bed.y, bed.width, bed.height);

            // Fill slightly
            ctx.fillStyle = bed.color + '22';
            ctx.fillRect(bed.x, bed.y, bed.width, bed.height);
        });

        // Draw Seeds
        this.seeds.forEach(seed => {
            if (seed.isCorrected) return;

            ctx.beginPath();
            ctx.arc(seed.x, seed.y, seed.radius, 0, Math.PI * 2);
            ctx.fillStyle = seed.color;
            ctx.fill();

            if (seed.isWildcard) {
                ctx.strokeStyle = '#000';
                ctx.lineWidth = 1;
                ctx.stroke();
                ctx.fillStyle = '#000';
                ctx.font = '12px Arial';
                ctx.fillText('★', seed.x - 5, seed.y + 4);
            }
        });
    }

    handlePointerDown(x: number, y: number) {
        if (this.status !== 'playing') return;

        for (let i = this.seeds.length - 1; i >= 0; i--) {
            const seed = this.seeds[i];
            if (seed.isCorrected) continue;

            const dist = Math.sqrt((seed.x - x) ** 2 + (seed.y - y) ** 2);
            if (dist < seed.radius * 2) {
                this.draggedSeedId = seed.id;
                break;
            }
        }
    }

    handlePointerMove(x: number, y: number) {
        if (this.draggedSeedId) {
            const seed = this.seeds.find(s => s.id === this.draggedSeedId);
            if (seed) {
                seed.x = x;
                seed.y = y;
                seed.targetX = x;
                seed.targetY = y;
            }
        }
    }

    handlePointerUp(levelPenalty: number) {
        if (this.draggedSeedId) {
            const seed = this.seeds.find(s => s.id === this.draggedSeedId);
            if (seed) {
                // Check collision with beds
                let placed = false;
                for (const bed of this.beds) {
                    if (seed.x > bed.x && seed.x < bed.x + bed.width &&
                        seed.y > bed.y && seed.y < bed.y + bed.height) {

                        if (seed.color === bed.color || seed.isWildcard) {
                            seed.isCorrected = true;
                            this.score += 10;
                            placed = true;
                            this.checkWin();
                        } else {
                            // Penalty
                            this.timeLeft -= levelPenalty;
                            this.penaltyCallback();
                            // Reset position
                            seed.targetX = seed.originalX;
                            seed.targetY = seed.originalY;
                        }
                        break;
                    }
                }

                if (!placed) {
                    seed.targetX = seed.originalX;
                    seed.targetY = seed.originalY;
                }
            }
            this.draggedSeedId = null;
        }
    }

    checkWin() {
        if (this.seeds.every(s => s.isCorrected)) {
            this.status = 'won';
            this.winCallback();
        }
    }
}
