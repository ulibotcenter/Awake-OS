export type NeuralMood = 'boot' | 'calm' | 'overload' | 'stable' | 'focus' | 'install';

export interface AwakeNeuralSim {
  triggerCalmingWave: (strength?: number) => void;
  setMood?: (mood: NeuralMood) => void;
  getRenderData?: () => {
    signals: [number, number, number, number][];
    specialNodes: [number, number, number, number][];
  };
}

export function getNeuralSim(): AwakeNeuralSim | undefined {
  if (typeof window === 'undefined') return undefined;
  return (window as Window & { __awakeNeuralSim?: AwakeNeuralSim }).__awakeNeuralSim;
}

export function triggerNeuralWave(strength = 1) {
  getNeuralSim()?.triggerCalmingWave?.(strength);
}

export function setNeuralMood(mood: NeuralMood) {
  getNeuralSim()?.setMood?.(mood);
  const root = document.documentElement;
  const map: Record<NeuralMood, { activity: number; strength: number }> = {
    boot: { activity: 0.2, strength: 0.75 },
    calm: { activity: 0.14, strength: 0.7 },
    overload: { activity: 0.48, strength: 0.95 },
    stable: { activity: 0.18, strength: 0.82 },
    focus: { activity: 0.26, strength: 0.88 },
    install: { activity: 0.38, strength: 1 },
  };
  const cfg = map[mood];
  root.style.setProperty('--neural-activity', String(cfg.activity));
  root.style.setProperty('--neural-strength', String(cfg.strength));
}
