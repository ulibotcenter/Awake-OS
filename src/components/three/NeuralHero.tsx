'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

/**
 * NeuralHero
 * 
 * This will become the living, organic neural network experience.
 * For now, this is a clean placeholder so the entire page is designed together.
 */
export default function NeuralHero() {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />

        {/* Temporary visual reference while we build the real network */}
        <mesh>
          <icosahedronGeometry args={[1.2]} />
          <meshBasicMaterial color="#d4af37" wireframe />
        </mesh>

        <OrbitControls enablePan={false} enableZoom={false} />
      </Canvas>
    </div>
  );
}
