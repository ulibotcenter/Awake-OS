import * as THREE from 'three';
import type { NeuralGraphData } from './NeuralGraph';

export interface BuildOptions {
  filamentSegments?: number;
  filamentWidthMultiplier?: number;
}

export interface NeuralBuffers {
  nodes: {
    geometry: THREE.InstancedBufferGeometry;
    count: number;
  };
  filaments: {
    geometry: THREE.BufferGeometry;
    segmentCount: number;
  };
}

function sampleConnectionPoint(
  from: THREE.Vector3,
  to: THREE.Vector3,
  curvature: number,
  t: number,
  connectionIndex: number
): THREE.Vector3 {
  const pos = new THREE.Vector3().lerpVectors(from, to, t);

  const midT = Math.sin(t * Math.PI);
  const curveAmount = curvature * midT * 1.12;

  const phase = connectionIndex * 0.618;
  const perpX = Math.sin(phase + t * 2.4) * curveAmount * 0.6;
  const perpZ = Math.cos(phase * 1.65 + t * 1.85) * curveAmount * 0.6;
  const upBias = Math.sin(t * Math.PI) * curvature * 0.2;

  pos.x += perpX;
  pos.z += perpZ;
  pos.y += upBias;

  return pos;
}

export function buildNeuralBuffers(
  graph: NeuralGraphData,
  options: BuildOptions = {}
): NeuralBuffers {
  const {
    filamentSegments = 8,
    filamentWidthMultiplier = 1.0,
  } = options;

  const { nodes, connections } = graph;
  const nodeCount = nodes.length;

  // Nodes - Instanced
  const baseSphere = new THREE.SphereGeometry(1, 7, 5);
  const nodeGeometry = new THREE.InstancedBufferGeometry();
  nodeGeometry.copy(baseSphere as any);
  nodeGeometry.instanceCount = nodeCount;

  const aPhase = new Float32Array(nodeCount);
  const aScale = new Float32Array(nodeCount);
  const aSpecial = new Float32Array(nodeCount);
  const aLayer = new Float32Array(nodeCount);

  for (let i = 0; i < nodeCount; i++) {
    const node = nodes[i];
    aPhase[i] = node.phase;
    aScale[i] = node.size;
    aSpecial[i] = node.isSpecial ? 1 : 0;
    aLayer[i] = node.layer;
  }

  nodeGeometry.setAttribute('aPhase', new THREE.InstancedBufferAttribute(aPhase, 1));
  nodeGeometry.setAttribute('aScale', new THREE.InstancedBufferAttribute(aScale, 1));
  nodeGeometry.setAttribute('aSpecial', new THREE.InstancedBufferAttribute(aSpecial, 1));
  nodeGeometry.setAttribute('aLayer', new THREE.InstancedBufferAttribute(aLayer, 1));

  // Filaments - Merged ribbons
  const pointsPerConnection = filamentSegments + 1;
  const vertsPerSegment = 4;
  const indicesPerSegment = 6;

  const totalSegments = connections.length * filamentSegments;
  const totalVerts = totalSegments * vertsPerSegment;

  const positions = new Float32Array(totalVerts * 3);
  const uvs = new Float32Array(totalVerts * 2);
  const strengths = new Float32Array(totalVerts);
  const indices = new Uint32Array(totalSegments * indicesPerSegment);

  let vertIndex = 0;
  let indexIndex = 0;
  let segmentGlobalIndex = 0;

  const nodeIndexById = new Map(nodes.map((n, i) => [n.id, i]));

  for (let c = 0; c < connections.length; c++) {
    const conn = connections[c];
    const fromNode = nodes[nodeIndexById.get(conn.from)!];
    const toNode = nodes[nodeIndexById.get(conn.to)!];

    if (!fromNode || !toNode) continue;

    const from = new THREE.Vector3(...fromNode.position);
    const to = new THREE.Vector3(...toNode.position);

    const isStrong = fromNode.isSpecial || toNode.isSpecial;
    const baseWidth = (isStrong ? 0.046 : 0.016) * filamentWidthMultiplier * conn.strength;

    const curvePoints: THREE.Vector3[] = [];
    for (let s = 0; s < pointsPerConnection; s++) {
      const t = s / filamentSegments;
      curvePoints.push(sampleConnectionPoint(from, to, conn.curvature, t, c));
    }

    for (let s = 0; s < filamentSegments; s++) {
      const p0 = curvePoints[s];
      const p1 = curvePoints[s + 1];

      const dir = p1.clone().sub(p0).normalize();
      const up = new THREE.Vector3(0, 1, 0);
      let side = new THREE.Vector3().crossVectors(dir, up).normalize();
      if (side.lengthSq() < 0.01) side.set(1, 0, 0);

      const halfWidth = baseWidth * 0.5;

      const v0 = p0.clone().add(side.clone().multiplyScalar(halfWidth));
      const v1 = p0.clone().add(side.clone().multiplyScalar(-halfWidth));
      const v2 = p1.clone().add(side.clone().multiplyScalar(halfWidth));
      const v3 = p1.clone().add(side.clone().multiplyScalar(-halfWidth));

      const uStart = s / filamentSegments;
      const uEnd = (s + 1) / filamentSegments;
      const strength = isStrong ? 1.0 : conn.strength;

      const writeVert = (v: THREE.Vector3, u: number, str: number) => {
        const base = vertIndex * 3;
        positions[base] = v.x; positions[base + 1] = v.y; positions[base + 2] = v.z;
        uvs[vertIndex * 2] = u; uvs[vertIndex * 2 + 1] = 0.5;
        strengths[vertIndex] = str;
        vertIndex++;
      };

      writeVert(v0, uStart, strength);
      writeVert(v1, uStart, strength);
      writeVert(v2, uEnd, strength);
      writeVert(v3, uEnd, strength);

      const baseVert = segmentGlobalIndex * 4;
      indices[indexIndex++] = baseVert;
      indices[indexIndex++] = baseVert + 1;
      indices[indexIndex++] = baseVert + 2;
      indices[indexIndex++] = baseVert + 1;
      indices[indexIndex++] = baseVert + 3;
      indices[indexIndex++] = baseVert + 2;

      segmentGlobalIndex++;
    }
  }

  const filamentGeometry = new THREE.BufferGeometry();
  filamentGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  filamentGeometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
  filamentGeometry.setAttribute('aStrength', new THREE.BufferAttribute(strengths, 1));
  filamentGeometry.setIndex(new THREE.BufferAttribute(indices, 1));
  filamentGeometry.computeBoundingSphere();

  return {
    nodes: { geometry: nodeGeometry, count: nodeCount },
    filaments: { geometry: filamentGeometry, segmentCount: totalSegments },
  };
}
