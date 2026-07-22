'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import type { NeuralMood } from '@/lib/neural-api';

const CYAN = new THREE.Color('#5EC8B8');
const CYAN_BRIGHT = new THREE.Color('#88EEFF');
const ORANGE = new THREE.Color('#FF6B35');

interface ParticleData {
  velocity: THREE.Vector3;
  numConnections: number;
  isAccent: boolean;
  phase: number;
}

const MOOD_CFG: Record<
  NeuralMood,
  { speed: number; pulseTarget: number; opacity: number; rot: number; accentBias: number }
> = {
  boot: { speed: 0.9, pulseTarget: 1.05, opacity: 0.78, rot: 0.028, accentBias: 0.2 },
  calm: { speed: 0.75, pulseTarget: 1, opacity: 0.82, rot: 0.02, accentBias: 0.15 },
  overload: { speed: 1.55, pulseTarget: 1.35, opacity: 0.92, rot: 0.055, accentBias: 0.45 },
  stable: { speed: 0.85, pulseTarget: 1.08, opacity: 0.85, rot: 0.022, accentBias: 0.22 },
  focus: { speed: 1.05, pulseTarget: 1.15, opacity: 0.88, rot: 0.032, accentBias: 0.3 },
  install: { speed: 1.2, pulseTarget: 1.28, opacity: 0.95, rot: 0.04, accentBias: 0.4 },
};

function SphericalNeuralNetworkScene({
  contained,
  interactive,
  mood,
  registerGlobal,
}: {
  contained: boolean;
  interactive: boolean;
  mood: NeuralMood;
  registerGlobal: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null!);
  const particlesRef = useRef<THREE.BufferGeometry>(null!);
  const linesGeometryRef = useRef<THREE.BufferGeometry>(null!);
  const pulseRef = useRef(1);
  const moodRef = useRef<NeuralMood>(mood);
  const lastMoveRef = useRef(Date.now());

  const maxParticleCount = contained ? 400 : 560;
  const particleCount = contained ? 220 : 320;
  const radius = contained ? 2.6 : 4.8;
  const radiusHalf = radius / 2;
  const maxConnections = 16;
  const minDistance = contained ? 0.68 : 1.2;
  const minDistanceSq = minDistance * minDistance;

  const segments = maxParticleCount * maxParticleCount;
  const linePositions = useMemo(() => new Float32Array(segments * 3), [segments]);
  const lineColors = useMemo(() => new Float32Array(segments * 3), [segments]);
  const particlePositions = useMemo(
    () => new Float32Array(maxParticleCount * 3),
    [maxParticleCount],
  );

  const { particlesData, accentIndices } = useMemo(() => {
    const data: ParticleData[] = [];
    const accents: number[] = [];

    for (let i = 0; i < maxParticleCount; i++) {
      const velocity = new THREE.Vector3(
        -1 + Math.random() * 2,
        -1 + Math.random() * 2,
        -1 + Math.random() * 2,
      )
        .normalize()
        .divideScalar(contained ? 85 : 52);

      const isAccent = Math.random() < 0.09;
      if (isAccent && i < particleCount) accents.push(i);

      data.push({
        velocity,
        numConnections: 0,
        isAccent,
        phase: Math.random() * Math.PI * 2,
      });
    }

    for (let i = 0; i < maxParticleCount; i++) {
      const x = Math.random() * radius * 2 - radius;
      const y = Math.random() * radius * 2 - radius;
      const z = Math.random() * radius * 2 - radius;
      const pos = new THREE.Vector3(x, y, z).setLength(radius);
      particlePositions[i * 3] = pos.x;
      particlePositions[i * 3 + 1] = pos.y;
      particlePositions[i * 3 + 2] = pos.z;
    }

    return { particlesData: data, accentIndices: accents };
  }, [contained, maxParticleCount, particleCount, particlePositions, radius]);

  const scratch = useMemo(() => new THREE.Vector3(), []);
  const accentLineColor = useMemo(() => ORANGE.clone().lerp(CYAN_BRIGHT, 0.35), []);

  useEffect(() => {
    moodRef.current = mood;
  }, [mood]);

  useEffect(() => {
    if (particlesRef.current) {
      particlesRef.current.setDrawRange(0, particleCount);
    }
  }, [particleCount]);

  useEffect(() => {
    const resetIdle = () => {
      lastMoveRef.current = Date.now();
    };
    window.addEventListener('pointermove', resetIdle, { passive: true });
    window.addEventListener('pointerdown', resetIdle, { passive: true });
    return () => {
      window.removeEventListener('pointermove', resetIdle);
      window.removeEventListener('pointerdown', resetIdle);
    };
  }, []);

  useEffect(() => {
    if (!registerGlobal) return;
    const api = {
      triggerCalmingWave: (strength = 1) => {
        pulseRef.current = Math.min(1.9, pulseRef.current + strength * 0.35);
      },
      setMood: (next: NeuralMood) => {
        moodRef.current = next;
      },
      getRenderData: () => {
        const specials = accentIndices.slice(0, 4).map((idx) => {
          const base = idx * 3;
          return [
            particlePositions[base],
            particlePositions[base + 1],
            particlePositions[base + 2],
            0.9 + pulseRef.current * 0.1,
          ] as [number, number, number, number];
        });
        while (specials.length < 4) {
          specials.push([0, 0, 0, 0.9 + pulseRef.current * 0.1]);
        }
        return {
          signals: Array.from(
            { length: 6 },
            () => [0, 0, 0, pulseRef.current * 0.2] as [number, number, number, number],
          ),
          specialNodes: specials,
        };
      },
    };
    (window as Window & { __awakeNeuralSim?: typeof api }).__awakeNeuralSim = api;
    return () => {
      delete (window as Window & { __awakeNeuralSim?: typeof api }).__awakeNeuralSim;
    };
  }, [accentIndices, particlePositions, registerGlobal]);

  useFrame((_, delta) => {
    const cfg = MOOD_CFG[moodRef.current] ?? MOOD_CFG.calm;
    pulseRef.current = THREE.MathUtils.lerp(pulseRef.current, cfg.pulseTarget, 0.012);

    if (!particlesRef.current || !linesGeometryRef.current) return;

    let vertexpos = 0;
    let colorpos = 0;
    let numConnected = 0;

    for (let i = 0; i < particleCount; i++) {
      particlesData[i].numConnections = 0;
    }

    for (let i = 0; i < particleCount; i++) {
      const particleData = particlesData[i];
      const i3 = i * 3;

      scratch
        .set(particlePositions[i3], particlePositions[i3 + 1], particlePositions[i3 + 2])
        .addScaledVector(particleData.velocity, cfg.speed)
        .setLength(radius);

      particlePositions[i3] = scratch.x;
      particlePositions[i3 + 1] = scratch.y;
      particlePositions[i3 + 2] = scratch.z;

      if (particlePositions[i3 + 1] < -radiusHalf || particlePositions[i3 + 1] > radiusHalf) {
        particleData.velocity.y *= -1;
      }
      if (particlePositions[i3] < -radiusHalf || particlePositions[i3] > radiusHalf) {
        particleData.velocity.x *= -1;
      }
      if (particlePositions[i3 + 2] < -radiusHalf || particlePositions[i3 + 2] > radiusHalf) {
        particleData.velocity.z *= -1;
      }

      if (particleData.numConnections >= maxConnections) continue;

      for (let j = i + 1; j < particleCount; j++) {
        const particleDataB = particlesData[j];
        if (particleDataB.numConnections >= maxConnections) continue;

        const j3 = j * 3;
        const dx = particlePositions[i3] - particlePositions[j3];
        const dy = particlePositions[i3 + 1] - particlePositions[j3 + 1];
        const dz = particlePositions[i3 + 2] - particlePositions[j3 + 2];
        const distSq = dx * dx + dy * dy + dz * dz;

        if (distSq < minDistanceSq) {
          particleData.numConnections++;
          particleDataB.numConnections++;

          const dist = Math.sqrt(distSq);
          const alpha = 1.0 - dist / minDistance;
          const accent = particleData.isAccent || particleDataB.isAccent;
          const pulse = 0.55 + alpha * 0.45 * pulseRef.current;
          const accentMix = accent ? Math.min(1, 0.55 + cfg.accentBias) : 0;
          const cr =
            accentMix > 0
              ? accentLineColor.r * accentMix + (CYAN.r + (CYAN_BRIGHT.r - CYAN.r) * alpha) * (1 - accentMix)
              : CYAN.r + (CYAN_BRIGHT.r - CYAN.r) * alpha;
          const cg =
            accentMix > 0
              ? accentLineColor.g * accentMix + (CYAN.g + (CYAN_BRIGHT.g - CYAN.g) * alpha) * (1 - accentMix)
              : CYAN.g + (CYAN_BRIGHT.g - CYAN.g) * alpha;
          const cb =
            accentMix > 0
              ? accentLineColor.b * accentMix + (CYAN.b + (CYAN_BRIGHT.b - CYAN.b) * alpha) * (1 - accentMix)
              : CYAN.b + (CYAN_BRIGHT.b - CYAN.b) * alpha;

          linePositions[vertexpos++] = particlePositions[i3];
          linePositions[vertexpos++] = particlePositions[i3 + 1];
          linePositions[vertexpos++] = particlePositions[i3 + 2];
          linePositions[vertexpos++] = particlePositions[j3];
          linePositions[vertexpos++] = particlePositions[j3 + 1];
          linePositions[vertexpos++] = particlePositions[j3 + 2];

          lineColors[colorpos++] = cr * pulse;
          lineColors[colorpos++] = cg * pulse;
          lineColors[colorpos++] = cb * pulse;
          lineColors[colorpos++] = cr * pulse;
          lineColors[colorpos++] = cg * pulse;
          lineColors[colorpos++] = cb * pulse;

          numConnected++;
        }
      }
    }

    linesGeometryRef.current.setDrawRange(0, numConnected * 2);
    linesGeometryRef.current.attributes.position.needsUpdate = true;
    linesGeometryRef.current.attributes.color.needsUpdate = true;
    particlesRef.current.attributes.position.needsUpdate = true;

    if (groupRef.current) {
      const idleSec = (Date.now() - lastMoveRef.current) / 1000;
      const rotSpeed = (idleSec > 1.5 ? cfg.rot * 1.6 : cfg.rot) * (interactive ? 1 : 0.85);
      groupRef.current.rotation.y += delta * rotSpeed;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        Math.sin(Date.now() * 0.00025) * 0.08,
        0.02,
      );
    }
  });

  const cfg = MOOD_CFG[mood] ?? MOOD_CFG.calm;

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry ref={particlesRef}>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
            count={maxParticleCount}
          />
        </bufferGeometry>
        <pointsMaterial
          color={CYAN_BRIGHT}
          size={contained ? 0.055 : 0.065}
          blending={THREE.AdditiveBlending}
          transparent
          sizeAttenuation
          depthWrite={false}
          opacity={cfg.opacity}
        />
      </points>

      <lineSegments>
        <bufferGeometry ref={linesGeometryRef}>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
            count={linePositions.length / 3}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[lineColors, 3]}
            count={lineColors.length / 3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          blending={THREE.AdditiveBlending}
          transparent
          opacity={cfg.opacity * 0.95}
          depthWrite={false}
        />
      </lineSegments>

      <ambientLight intensity={0.12} />
      <pointLight position={[3, 2, 5]} intensity={0.28} color="#88EEFF" distance={14} />
      <pointLight position={[-2, -1, 4]} intensity={0.1} color="#FF6B35" distance={12} />
    </group>
  );
}

interface NeuralUniverseProps {
  className?: string;
  contained?: boolean;
  interactive?: boolean;
  mood?: NeuralMood;
  enableZoom?: boolean;
  /** Register window.__awakeNeuralSim — only one instance should be true */
  registerGlobal?: boolean;
}

export default function NeuralUniverse({
  className,
  contained = false,
  interactive = true,
  mood = 'calm',
  enableZoom,
  registerGlobal = true,
}: NeuralUniverseProps) {
  const zoom = enableZoom ?? contained;

  const handleInteraction = () => {
    if (!registerGlobal) return;
    const sim = (
      window as Window & { __awakeNeuralSim?: { triggerCalmingWave?: (s: number) => void } }
    ).__awakeNeuralSim;
    if (sim?.triggerCalmingWave) sim.triggerCalmingWave(0.55);
  };

  const camPos = contained ? [0, 0.2, 8.0] : [0, 0.6, 12.5];
  const camFov = contained ? 46 : 40;

  return (
    <div
      className={`relative w-full h-full ${className ?? ''}`}
      onClick={interactive ? handleInteraction : undefined}
      onTouchStart={interactive ? handleInteraction : undefined}
    >
      <Canvas
        camera={{ position: camPos as [number, number, number], fov: camFov }}
        style={{ background: 'transparent' }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={contained ? [1, 1.85] : [1, 1.5]}
      >
        <SphericalNeuralNetworkScene
          contained={contained}
          interactive={interactive}
          mood={mood}
          registerGlobal={registerGlobal}
        />
        {interactive && (
          <OrbitControls
            enablePan={false}
            enableZoom={zoom}
            enableRotate
            enableDamping
            dampingFactor={0.1}
            minDistance={contained ? 3.0 : 6}
            maxDistance={contained ? 95 : 22}
            rotateSpeed={contained ? 0.3 : 0.22}
            zoomSpeed={contained ? 0.38 : 0.35}
            target={[0, 0, 0]}
          />
        )}
      </Canvas>
    </div>
  );
}
