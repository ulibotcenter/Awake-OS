import type { NeuralGraphData } from './NeuralGraph';

export interface ActiveSignal {
  connectionIndex: number;
  progress: number;
  speed: number;
  intensity: number;
}

export interface SpecialNodeField {
  nodeId: number;
  position: [number, number, number];
  strength: number;
  baseStrength: number;
  boost: number;
}

export class NeuralSimulation {
  private graph: NeuralGraphData;
  public activeSignals: ActiveSignal[] = [];
  public specialNodeFields: SpecialNodeField[] = [];
  private simTime = 0;
  private maxSignals = 11;

  constructor(graph: NeuralGraphData) {
    this.graph = graph;
    this.initializeSpecialNodes();
  }

  private initializeSpecialNodes() {
    this.specialNodeFields = this.graph.nodes
      .filter(n => n.isSpecial)
      .map(n => ({
        nodeId: n.id,
        position: [...n.position] as [number, number, number],
        strength: 1.0,
        baseStrength: 0.9,
        boost: 0,
      }));
  }

  public update(delta: number) {
    this.simTime += delta;
    this.updateSignals(delta);
    this.updateSpecialFields(delta);
    this.trySpawnSignals(delta);
  }

  private updateSignals(delta: number) {
    const stillActive: ActiveSignal[] = [];
    for (const sig of this.activeSignals) {
      const prev = sig.progress;
      sig.progress += sig.speed * delta;

      if (prev < 0.96 && sig.progress >= 0.96) {
        this.handleArrival(sig);
      }
      if (sig.progress < 1.06) stillActive.push(sig);
    }
    this.activeSignals = stillActive;
  }

  private handleArrival(sig: ActiveSignal) {
    const conn = this.graph.connections[sig.connectionIndex];
    if (!conn) return;
    const from = this.graph.nodes[conn.from];
    const to = this.graph.nodes[conn.to];
    const special = [from, to].find(n => n?.isSpecial);
    if (!special) return;

    const field = this.specialNodeFields.find(f => f.nodeId === special.id);
    if (field) {
      field.boost = Math.min(field.boost + 0.42 + sig.intensity * 0.28, 1.35);
      if (Math.random() < 0.36 && this.activeSignals.length < this.maxSignals - 1) {
        this.spawnFromNode(special.id);
      }
    }
  }

  private spawnFromNode(nodeId: number) {
    const outs = this.graph.connections
      .map((c, i) => ({ c, i }))
      .filter(item => item.c.from === nodeId || item.c.to === nodeId);
    if (outs.length === 0) return;
    const chosen = outs[Math.floor(Math.random() * outs.length)];
    this.activeSignals.push({
      connectionIndex: chosen.i,
      progress: 0.03,
      speed: 0.14 + Math.random() * 0.1,
      intensity: 0.6 + Math.random() * 0.35,
    });
  }

  private updateSpecialFields(delta: number) {
    for (const f of this.specialNodeFields) {
      const breathe = Math.sin(this.simTime * 0.4 + f.nodeId * 0.6) * 0.11 + Math.sin(this.simTime * 0.18) * 0.03;
      f.strength = f.baseStrength + breathe + f.boost * 0.9;
      f.boost = Math.max(0, f.boost * (1 - delta * 1.7));
    }
  }

  private trySpawnSignals(delta: number) {
    if (this.activeSignals.length >= this.maxSignals) return;
    const chance = 0.028 * (delta * 60) * (1 + (1 - this.activeSignals.length / this.maxSignals) * 0.6);
    if (Math.random() < chance) this.spawnSignal(true);
  }

  public spawnSignal(preferSpecial = true) {
    if (this.graph.connections.length === 0) return;
    let idx = -1;

    if (preferSpecial) {
      const specials = this.graph.connections
        .map((_, i) => i)
        .filter(i => {
          const c = this.graph.connections[i];
          const a = this.graph.nodes[c.from];
          const b = this.graph.nodes[c.to];
          return a?.isSpecial || b?.isSpecial;
        });
      if (specials.length > 0) idx = specials[Math.floor(Math.random() * specials.length)];
    }
    if (idx === -1) idx = Math.floor(Math.random() * this.graph.connections.length);

    this.activeSignals.push({
      connectionIndex: idx,
      progress: 0,
      speed: 0.15 + Math.random() * 0.13,
      intensity: 0.7 + Math.random() * 0.55,
    });
  }

  public triggerCalmingWave(strength = 1.0) {
    for (const f of this.specialNodeFields) f.boost = Math.min(f.boost + 0.5 * strength, 1.4);
    this.spawnSignal(true);
    this.spawnSignal(true);
  }

  public getRenderData() {
    const signals = this.activeSignals.slice(0, 6).map(sig => {
      const c = this.graph.connections[sig.connectionIndex];
      const a = this.graph.nodes[c.from];
      const b = this.graph.nodes[c.to];
      if (!a || !b) return [0,0,0,0];
      const t = Math.min(Math.max(sig.progress, 0), 1);
      return [
        a.position[0] + (b.position[0] - a.position[0]) * t,
        a.position[1] + (b.position[1] - a.position[1]) * t,
        a.position[2] + (b.position[2] - a.position[2]) * t,
        sig.intensity
      ];
    });
    while (signals.length < 6) signals.push([0,0,0,0]);

    const sorted = [...this.specialNodeFields].sort((x,y) => y.strength - x.strength);
    const specials = sorted.slice(0, 4).map(f => [...f.position, f.strength] as [number,number,number,number]);
    while (specials.length < 4) specials.push([0,0,0,0]);

    return { signals, specialNodes: specials };
  }
}
