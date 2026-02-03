"use client";

class AudioManager {
    private static instance: AudioManager;
    private sounds: { [key: string]: HTMLAudioElement } = {};
    private isMuted: boolean = false;

    private constructor() { }

    static getInstance() {
        if (!AudioManager.instance) {
            AudioManager.instance = new AudioManager();
        }
        return AudioManager.instance;
    }

    setMuted(muted: boolean) {
        this.isMuted = muted;
        Object.values(this.sounds).forEach(sound => {
            sound.muted = muted;
        });
    }

    playSound(name: string, volume: number = 0.5) {
        if (this.isMuted) return;

        // In a real MVP, we'd load actual assets. 
        // For now, we'll use a silent approach or log to avoid errors until assets are added.
        console.log(`[Audio] Playing SFX: ${name}`);

        /* 
        if (!this.sounds[name]) {
            this.sounds[name] = new Audio(`/audio/${name}.mp3`);
        }
        this.sounds[name].volume = volume;
        this.sounds[name].currentTime = 0;
        this.sounds[name].play().catch(() => {});
        */
    }

    playBGM(name: string, volume: number = 0.3) {
        if (this.isMuted) return;
        console.log(`[Audio] Starting BGM: ${name}`);
    }
}

export const audioManager = AudioManager.getInstance();
