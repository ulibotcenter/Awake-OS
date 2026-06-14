import * as THREE from 'three';

export interface HeadNode {
  position: [number, number, number];
  isContour: boolean;
  isSpecial: boolean;
  phase: number;
}

export interface HeadConnection {
  from: number;
  to: number;
  strength: number;
  useTube: boolean;
}

export interface HeadGraphData {
  nodes: HeadNode[];
  connections: HeadConnection[];
  bounds: { minX: number; maxX: number; minY: number; maxY: number };
  specialIndices: number[];
}

export function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/** Feminine profile contour — face pointing +X, up = +Y */
const PROFILE_ANCHORS: [number, number][] = [
  [-0.55, -2.35], // neck base
  [-0.42, -1.85], // neck mid
  [-0.28, -1.35], // throat
  [-0.12, -0.95], // jaw hinge
  [0.08, -0.55],  // chin
  [0.42, -0.28],  // lower lip
  [0.62, 0.02],   // upper lip
  [0.78, 0.18],   // nose tip
  [0.52, 0.42],   // nose bridge
  [0.18, 0.72],   // brow
  [-0.08, 1.05],  // forehead
  [-0.22, 1.42],  // crown front
  [-0.38, 1.72],  // crown top
  [-0.52, 1.55],  // crown back
  [-0.58, 1.12],  // occiput upper
  [-0.55, 0.62],  // occiput mid
  [-0.48, 0.08],  // nape
  [-0.42, -0.52], // nape lower
  [-0.48, -1.12], // neck back upper
  [-0.55, -1.72], // neck back mid
  [-0.55, -2.35], // close
];

function buildContour(): THREE.Vector2[] {
  const pts: THREE.Vector2[] = [];
  const n = PROFILE_ANCHORS.length - 1;
  for (let i = 0; i < n; i++) {
    const a = PROFILE_ANCHORS[i];
    const b = PROFILE_ANCHORS[i + 1];
    const segs = i < 4 || i > 14 ? 4 : 5;
    for (let j = 0; j < segs; j++) {
      const t = j / segs;
      const cx = (a[0] + b[0]) / 2;
      const cy = (a[1] + b[1]) / 2;
      const mx = cx + (i % 2 === 0 ? 0.04 : -0.03);
      const my = cy + (i < 8 ? 0.06 : -0.04);
      const u = 1 - t;
      const x = u * u * a[0] + 2 * u * t * mx + t * t * b[0];
      const y = u * u * a[1] + 2 * u * t * my + t * t * b[1];
      pts.push(new THREE.Vector2(x, y));
    }
  }
  return pts;
}

const CONTOUR = buildContour();

export function isInsideHead(x: number, y: number): boolean {
  let inside = false;
  const n = CONTOUR.length;
  for (let i = 0, j = n - 1; i < n; j = i++) {
    const xi = CONTOUR[i].x;
    const yi = CONTOUR[i].y;
    const xj = CONTOUR[j].x;
    const yj = CONTOUR[j].y;
    if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
      inside = !inside;
    }
  }
  return inside;
}

export function distanceToContour(x: number, y: number): number {
  let min = Infinity;
  for (let i = 0; i < CONTOUR.length; i++) {
    const a = CONTOUR[i];
    const b = CONTOUR[(i + 1) % CONTOUR.length];
    const abx = b.x - a.x;
    const aby = b.y - a.y;
    const t = Math.max(0, Math.min(1, ((x - a.x) * abx + (y - a.y) * aby) / (abx * abx + aby * aby + 1e-6)));
    const px = a.x + t * abx;
    const py = a.y + t * aby;
    const d = Math.hypot(x - px, y - py);
    if (d < min) min = d;
  }
  return min;
}

function dist2D(a: HeadNode, b: HeadNode): number {
  const dx = a.position[0] - b.position[0];
  const dy = a.position[1] - b.position[1];
  return Math.hypot(dx, dy);
}

export function generateHeadGraph(): HeadGraphData {
  const rand = seededRandom(2026);
  const nodes: HeadNode[] = [];
  const contourCount = 22;
  const contourStep = CONTOUR.length / contourCount;

  for (let i = 0; i < contourCount; i++) {
    const p = CONTOUR[Math.floor(i * contourStep) % CONTOUR.length];
    const z = (rand() - 0.5) * 0.12;
    nodes.push({
      position: [p.x, p.y, z],
      isContour: true,
      isSpecial: false,
      phase: rand() * Math.PI * 2,
    });
  }

  const interiorTarget = 38;
  let attempts = 0;
  while (nodes.length < contourCount + interiorTarget && attempts < 800) {
    attempts++;
    const x = -0.35 + rand() * 1.15;
    const y = -0.6 + rand() * 2.2;
    if (!isInsideHead(x, y)) continue;
    if (distanceToContour(x, y) < 0.06) continue;
    const craniumBias = y > 0.2 ? 0.72 : 0.35;
    if (rand() > craniumBias) continue;

    const z = (rand() - 0.5) * 0.16;
    nodes.push({
      position: [x, y, z],
      isContour: false,
      isSpecial: false,
      phase: rand() * Math.PI * 2,
    });
  }

  const specialCandidates = nodes
    .map((n, i) => ({ i, y: n.position[1], x: n.position[0] }))
    .filter((n) => n.y > -0.2 && n.x > -0.1)
    .sort((a, b) => b.y - a.y);
  const specialIndices: number[] = [];
  for (let s = 0; s < 4 && s < specialCandidates.length; s++) {
    const idx = specialCandidates[Math.floor(s * 2.5 + rand()) % specialCandidates.length].i;
    if (!specialIndices.includes(idx)) {
      nodes[idx].isSpecial = true;
      specialIndices.push(idx);
    }
  }

  const connections: HeadConnection[] = [];
  const maxDist = 0.55;
  const edgeSet = new Set<string>();

  for (let i = 0; i < nodes.length; i++) {
    const neighbors: { j: number; d: number; score: number }[] = [];
    for (let j = 0; j < nodes.length; j++) {
      if (i === j) continue;
      const d = dist2D(nodes[i], nodes[j]);
      if (d > maxDist) continue;
      const midX = (nodes[i].position[0] + nodes[j].position[0]) / 2;
      const midY = (nodes[i].position[1] + nodes[j].position[1]) / 2;
      if (!isInsideHead(midX, midY) && distanceToContour(midX, midY) > 0.04) continue;
      let score = 1 / (d + 0.08);
      if (nodes[i].isContour && nodes[j].isContour) score *= 1.35;
      if (nodes[i].isContour || nodes[j].isContour) score *= 1.1;
      neighbors.push({ j, d, score });
    }
    neighbors.sort((a, b) => b.score - a.score);
    const k = nodes[i].isContour ? 3 : 2;
    for (let n = 0; n < Math.min(k, neighbors.length); n++) {
      const j = neighbors[n].j;
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (edgeSet.has(key)) continue;
      edgeSet.add(key);
      const strength = 0.35 + rand() * 0.65;
      connections.push({ from: i, to: j, strength, useTube: false });
    }
  }

  const sorted = [...connections].sort((a, b) => b.strength - a.strength);
  const tubeCount = Math.min(14, sorted.length);
  for (let t = 0; t < tubeCount; t++) {
    sorted[t].useTube = true;
  }

  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (const n of nodes) {
    minX = Math.min(minX, n.position[0]);
    maxX = Math.max(maxX, n.position[0]);
    minY = Math.min(minY, n.position[1]);
    maxY = Math.max(maxY, n.position[1]);
  }

  return {
    nodes,
    connections: connections.slice(0, 100),
    bounds: { minX, maxX, minY, maxY },
    specialIndices,
  };
}