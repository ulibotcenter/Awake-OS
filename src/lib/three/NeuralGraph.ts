/**
 * Awake OS v2 — Neural Graph Generator
 * 
 * Generates a dense, organic, upward-growing neural network.
 * Designed to feel biological rather than technical.
 */

export interface NeuralNode {
  id: number;
  position: [number, number, number];
  size: number;
  isSpecial: boolean;
  phase: number;
  layer: number;
}

export interface NeuralConnection {
  from: number;
  to: number;
  strength: number;
  curvature: number;
}

export interface NeuralGraphData {
  nodes: NeuralNode[];
  connections: NeuralConnection[];
}

interface GenerateOptions {
  nodeCount?: number;
  specialNodeRatio?: number;
  upwardBias?: number;
  spread?: number;
  seed?: number;
  /** When true, uses exact V4 brainShape (puffy rounded layered rings for clean filaments) instead of tall upward cone */
  brainShape?: boolean;
  compact?: boolean;
}

export function generateNeuralGraph(options: GenerateOptions = {}): NeuralGraphData {
  const {
    nodeCount = 280,
    specialNodeRatio = 0.18,
    upwardBias = 1.15,
    spread = 1.0,
    seed = 47,
    brainShape = false,
    compact = false,
  } = options;

  const isBrain = brainShape || compact;

  let randomState = seed;
  const random = () => {
    randomState = (randomState * 16807) % 2147483647;
    return (randomState - 1) / 2147483646;
  };

  const nodes: NeuralNode[] = [];
  const connections: NeuralConnection[] = [];

  // Root layer (bottom) — reverted to *exact* V4 isBrain (from v4-otima-ajustada snapshot)
  // for contained/brainShape. Simple progressive layered rings with specific brainPuff
  // profile (sin on layerRadius, y jitter in mid) produces longer, surface-following,
  // less dense overlapping filaments. This restores the clean/elegant V4 filament
  // topology the user liked (no thick/tangled "novo de lã fosforescente" from
  // hybrid custom neck/head profile or prior volumetric). Placement, layer counts=8,
  // connection behavior, and resulting graph density now match V4 exactly.
  // Silhouette reverts to V4 rounded puff (no sharp neck stalk), but filaments
  // (the "linhas") take priority per request. Ribbon build + shader + cam/zoom/width
  // kept current (V4-style simple ribbon extrusion confirmed for V4 look; current
  // shader tuned for positive calming teal pulse, no dark spots/over-bright).
  const rootCount = Math.max(4, Math.floor(nodeCount * 0.07));

  if (isBrain) {
    // === EXACT V4 isBrain CODE (copy of constants + loop from V4 snapshot) ===
    const rootYBase = -3.6;
    const rootRadiusBase = 2.9;
    for (let i = 0; i < rootCount; i++) {
      const angle = (i / rootCount) * Math.PI * 2 + random() * 0.7;
      const radius = rootRadiusBase + random() * 1.8;
      nodes.push({
        id: nodes.length,
        position: [
          Math.cos(angle) * radius * spread,
          rootYBase + random() * 1.4,
          Math.sin(angle) * radius * 0.85 * spread,
        ],
        size: 0.85 + random() * 0.35,
        isSpecial: false,
        phase: random() * Math.PI * 2,
        layer: 0,
      });
    }

    // Upward growth layers — exact V4 brain constants + brainPuff profile
    const layers = 8;
    const nodesPerLayer = Math.floor((nodeCount - rootCount) / layers);

    const layerYBase = -2.4;
    const layerYHeight = 12.8;
    const layerYJitter = 2.6;
    const layerRadiusBase = 5.4;
    const layerRadiusGrowth = 4.2;

    for (let layer = 1; layer <= layers; layer++) {
      const layerProgress = layer / layers;
      let y = layerYBase + layerProgress * layerYHeight + (random() - 0.5) * layerYJitter;
      let layerRadius = layerRadiusBase + layerProgress * layerRadiusGrowth;

      // For brain shape: puffier in the middle (more brain-like, less cone)
      const brainPuff = Math.sin(layerProgress * Math.PI); // peaks in center layers
      layerRadius *= (1.0 + brainPuff * 0.55);
      // Slight vertical compression toward center for rounded feel
      if (layerProgress > 0.25 && layerProgress < 0.75) {
        y += (random() - 0.5) * 1.8;
      }

      for (let i = 0; i < nodesPerLayer; i++) {
        const angle = (i / nodesPerLayer) * Math.PI * 2.8 + layer * 1.9 + random() * 2.1;
        const radiusVariation = 0.55 + random() * 0.95 + layerProgress * 0.35;

        const x = Math.cos(angle) * layerRadius * radiusVariation * spread;
        const z = Math.sin(angle) * layerRadius * radiusVariation * 0.8 * spread;

        const isSpecial = random() < specialNodeRatio && layer > 1;

        nodes.push({
          id: nodes.length,
          position: [x, y, z],
          size: 0.25 + random() * 0.1, // very small uniform nodes so the filaments (the neural network) are the star, no big balls
          isSpecial,
          phase: random() * Math.PI * 2,
          layer,
        });
      }
    }
  } else {
    // Original non-brain (V1 style upward growth) - unchanged
    const rootYBase = -7.2;
    const rootRadiusBase = 1.6;
    for (let i = 0; i < rootCount; i++) {
      const angle = (i / rootCount) * Math.PI * 2 + random() * 0.7;
      const radius = rootRadiusBase + random() * 1.3;
      nodes.push({
        id: nodes.length,
        position: [
          Math.cos(angle) * radius * spread,
          rootYBase + random() * 1.1,
          Math.sin(angle) * radius * 0.85 * spread,
        ],
        size: 0.85 + random() * 0.35,
        isSpecial: false,
        phase: random() * Math.PI * 2,
        layer: 0,
      });
    }

    const layers = 8;
    const nodesPerLayer = Math.floor((nodeCount - rootCount) / layers);

    for (let layer = 1; layer <= layers; layer++) {
      const layerProgress = layer / layers;
      const y = -5.5 + layerProgress * 24 + (random() - 0.5) * 1.3;
      const layerRadius = 3.2 + layerProgress * 8.5;

      for (let i = 0; i < nodesPerLayer; i++) {
        const angle = (i / nodesPerLayer) * Math.PI * 2.8 + layer * 1.9 + random() * 2.1;
        const radiusVariation = 0.55 + random() * 0.95 + layerProgress * 0.35;

        const x = Math.cos(angle) * layerRadius * radiusVariation * spread;
        const z = Math.sin(angle) * layerRadius * radiusVariation * 0.8 * spread;

        const isSpecial = random() < specialNodeRatio && layer > 1;

        nodes.push({
          id: nodes.length,
          position: [x, y, z],
          size: 0.25 + random() * 0.1,
          isSpecial,
          phase: random() * Math.PI * 2,
          layer,
        });
      }
    }
  }

  // Create organic hierarchical connections
  const nodeIndexById = new Map(nodes.map((n, i) => [n.id, i]));

  for (let i = rootCount; i < nodes.length; i++) {
    const current = nodes[i];
    const currentLayer = current.layer;

    // Connect to parents in lower layers
    const parents = nodes
      .slice(0, i)
      .filter(n => n.layer < currentLayer)
      .map(n => ({
        node: n,
        dist: Math.hypot(
          current.position[0] - n.position[0],
          current.position[1] - n.position[1],
          current.position[2] - n.position[2]
        ),
      }))
      .sort((a, b) => a.dist - b.dist);

    const parentConnections = Math.min(3 + Math.floor(random() * 2), parents.length);
    for (let k = 0; k < parentConnections; k++) {
      const parent = parents[k];
      const strength = 0.58 + (1 - k * 0.14) * 0.38;
      connections.push({
        from: parent.node.id,
        to: current.id,
        strength,
        curvature: 0.35 + random() * 0.95,
      });
    }

    // Lateral connections for density
    const lateralCandidates = nodes
      .slice(Math.max(0, i - 16), i)
      .filter(n => Math.abs(n.layer - currentLayer) <= 2)
      .map(n => ({
        node: n,
        dist: Math.hypot(
          current.position[0] - n.position[0],
          current.position[1] - n.position[1],
          current.position[2] - n.position[2]
        ),
      }))
      .filter(c => c.dist > 1.4 && c.dist < 8.5)
      .sort((a, b) => a.dist - b.dist);

    const lateralCount = Math.floor(1 + random() * 2);
    for (let k = 0; k < Math.min(lateralCount, lateralCandidates.length); k++) {
      connections.push({
        from: current.id,
        to: lateralCandidates[k].node.id,
        strength: 0.32 + random() * 0.28,
        curvature: 0.65 + random() * 1.15,
      });
    }
  }

  return { nodes, connections };
}
