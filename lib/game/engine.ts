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

    // Phase 3 additions
    combo: number = 0;
    maxCombo: number = 0;
    lastMatchTime: number = 0;
    totalTime: number = 0;
    stars: number = 0;

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
        this.totalTime = config.timeLimit;
        this.lastTime = performance.now();
        this.combo = 0;
        this.maxCombo = 0;

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

    draw(ctx: CanvasRenderingContext2D, width: number, height: number, seedsSprite?: HTMLImageElement, highlightedBedId?: string) {
        ctx.clearRect(0, 0, width, height);

        // Draw Beds
        this.beds.forEach(bed => {
            const isHighlighted = bed.id === highlightedBedId;

            ctx.fillStyle = bed.color;
            ctx.globalAlpha = isHighlighted ? 0.3 : 0.2;

            if (isHighlighted) {
                ctx.shadowBlur = 20;
                ctx.shadowColor = bed.color;
            }

            ctx.beginPath();
            ctx.roundRect(bed.x - 40, bed.y - 40, 80, 80, 20);
            ctx.fill();

            ctx.shadowBlur = 0; // Reset shadow

            ctx.strokeStyle = bed.color;
            ctx.lineWidth = isHighlighted ? 4 : 2;
            ctx.globalAlpha = isHighlighted ? 0.8 : 0.5;
            ctx.stroke();
            ctx.globalAlpha = 1.0;
        });

        // Draw Seeds
        this.seeds.forEach(seed => {
            if (seed.isCorrected) return;

            if (seedsSprite) {
                // Determine sprite index based on color
                // Sprite sheet has: Ruby (Red), Sapphire (Blue), Sunflower (Yellow), Forest (Green), Star (White)
                let spriteIdx = 0;
                if (seed.color === '#ef4444') spriteIdx = 0; // Red
                else if (seed.color === '#3b82f6') spriteIdx = 1; // Blue
                else if (seed.color === '#f59e0b') spriteIdx = 2; // Yellow
                else if (seed.color === '#22c55e') spriteIdx = 3; // Green
                if (seed.isWildcard) spriteIdx = 4; // Star

                // The generated sprite sheet has 5 items.
                // We'll calculate source rectangle (assuming 512x512 grid or similar)
                // For the specific generated sheet, it looks like a 2x3 grid or a row.
                // Let's assume a simplified 1x5 row for now or centered crop.
                const sSize = seedsSprite.width / 5;
                ctx.drawImage(
                    seedsSprite,
                    spriteIdx * sSize, 0, sSize, seedsSprite.height,
                    seed.x - 30, seed.y - 30, 60, 60
                );
            } else {
                ctx.fillStyle = seed.color;
                ctx.beginPath();
                ctx.arc(seed.x, seed.y, this.draggedSeedId === seed.id ? 25 : 20, 0, Math.PI * 2);
                ctx.fill();
            }

            if (seed.isWildcard && !seedsSprite) {
                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = 2;
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

                            // Combo Logic
                            const now = performance.now();
                            if (now - this.lastMatchTime < 3000) {
                                this.combo++;
                                if (this.combo > this.maxCombo) this.maxCombo = this.combo;
                            } else {
                                this.combo = 1;
                            }
                            this.lastMatchTime = now;

                            const multiplier = Math.min(3, 1 + Math.floor(this.combo / 3) * 0.5);
                            this.score += Math.round(10 * multiplier);

                            placed = true;
                            this.checkWin();
                        } else {
                            // Penalty
                            this.combo = 0;
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

            // Calculate Stars (1-3)
            const timeRatio = this.timeLeft / this.totalTime;
            if (timeRatio > 0.6) this.stars = 3;
            else if (timeRatio > 0.3) this.stars = 2;
            else this.stars = 1;

            this.winCallback();
        }
    }
}
