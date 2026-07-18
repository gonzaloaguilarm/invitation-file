import { create } from 'zustand';

type MusicState = {
  enabled: boolean;
  volume: number;
  userInteracted: boolean;
  setEnabled: (enabled: boolean) => void;
  setVolume: (volume: number) => void;
  markInteracted: () => void;
};

export const useMusicStore = create<MusicState>((set) => ({
  enabled: true,
  volume: 0.5,
  userInteracted: false,
  setEnabled: (enabled) => set({ enabled, userInteracted: true }),
  setVolume: (volume) => set({ volume }),
  markInteracted: () => set({ userInteracted: true })
}));