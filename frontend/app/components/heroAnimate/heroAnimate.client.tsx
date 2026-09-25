import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshReflectorMaterial, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

// -------------------------------------------------------------
// 1. PROCEDURAL 3D CAR MODEL & WHEEL ANIMATION
// -------------------------------------------------------------
function StylizedCar() {
  const wheelsRef = useRef([]);

  // Spin wheels continuously to simulate driving speed
  useFrame((_, delta) => {
    wheelsRef.current.forEach((wheel) => {
      if (wheel) wheel.rotation.x += delta * 12;
    });
  });

  return (
    <group position={[0, 0.5, 0]}>
      {/* Car Main Chassis / Body */}
      <mesh position={[0, 0.6, 0]} castShadow>
        <boxGeometry args={[2.2, 0.7, 4.2]} />
        <meshStandardMaterial color="#0a0a0f" roughness={0.1} metalness={0.9} />
      </mesh>

      {/* Car Cabin Roof */}
      <mesh position={[0, 1.25, -0.2]} castShadow>
        <boxGeometry args={[1.7, 0.6, 2.2]} />
        <meshStandardMaterial color="#111" roughness={0.2} metalness={0.8} transparent opacity={0.85} />
      </mesh>

      {/* Headlights (Neon Glow) */}
      <mesh position={[-0.8, 0.65, 2.11]}>
        <boxGeometry args={[0.4, 0.12, 0.05]} />
        <meshBasicMaterial color="#00f3ff" />
      </mesh>
      <mesh position={[0.8, 0.65, 2.11]}>
        <boxGeometry args={[0.4, 0.12, 0.05]} />
        <meshBasicMaterial color="#00f3ff" />
      </mesh>
      <spotLight position={[0, 0.7, 2.2]} angle={0.6} penumbra={0.8} intensity={8} color="#00f3ff" distance={10} />

      {/* Taillights */}
      <mesh position={[0, 0.7, -2.11]}>
        <boxGeometry args={[1.9, 0.1, 0.05]} />
        <meshBasicMaterial color="#ff0055" />
      </mesh>
      <pointLight position={[0, 0.7, -2.2]} intensity={5} color="#ff0055" distance={5} />

      {/* Wheels */}
      {[
        [-1.15, 0.35, 1.3],  // Front Left
        [1.15, 0.35, 1.3],   // Front Right
        [-1.15, 0.35, -1.3], // Rear Left
        [1.15, 0.35, -1.3],  // Rear Right
      ].map(([x, y, z], idx) => (
        <group key={idx} position={[x, y, z]} ref={(el) => (wheelsRef.current[idx] = el)}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.4, 0.4, 0.3, 24]} />
            <meshStandardMaterial color="#1f2430" roughness={0.5} />
          </mesh>
          {/* Wheel Rim Highlight */}
          <mesh rotation={[0, 0, Math.PI / 2]} position={[x > 0 ? 0.16 : -0.16, 0, 0]}>
            <ringGeometry args={[0.2, 0.35, 8]} />
            <meshBasicMaterial color="#00f3ff" side={THREE.DoubleSide} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// -------------------------------------------------------------
// 2. INFINITE MOVING ROAD GRID
// -------------------------------------------------------------
function MovingRoad() {
  const gridTextureRef = useRef();

  useFrame((_, delta) => {
    if (gridTextureRef.current) {
      gridTextureRef.current.offset.y -= delta * 1.5; // Controls road speed
    }
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[50, 100]} />
      <MeshReflectorMaterial
        blur={[300, 100]}
        resolution={1024}
        mirror={0.6}
        mixBlur={0.8}
        mixStrength={2.5}
        roughness={0.3}
        depthScale={1.2}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.4}
        color="#080810"
        metalness={0.8}
      />
    </mesh>
  );
}

// -------------------------------------------------------------
// 3. MAIN HERO COMPONENT
// -------------------------------------------------------------
export default function HeroAnimate() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div className="w-full h-screen bg-[#030308]" />; // SSR Fallback
  }
  return (
    <div className="relative w-full h-screen bg-[#030308] text-white overflow-hidden select-none">
      {/* 3D CANVAS BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <Canvas shadows>
          <PerspectiveCamera makeDefault position={[3, 2, 6]} fov={50} />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 2 - 0.05}
            minPolarAngle={Math.PI / 4}
            autoRotate
            autoRotateSpeed={0.5}
          />

          {/* Lighting Environment */}
          <ambientLight intensity={0.2} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} color="#4d7cff" castShadow />
          <pointLight position={[-10, -10, -10]} intensity={1} color="#ff0055" />

          {/* Scene Elements */}
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
            <StylizedCar />
          </Float>
          <MovingRoad />

          {/* Post-Processing Effects for Sci-Fi Glow */}
          <EffectComposer>
            <Bloom intensity={1.2} luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} />
            <Vignette eskil={false} offset={0.1} darkness={1.1} />
          </EffectComposer>
        </Canvas>
      </div>

      {/* OVERLAY CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto h-full flex flex-col justify-between px-6 py-12 pointer-events-none">
        {/* Navigation Bar */}
        <header className="flex justify-between items-center pointer-events-auto">
          <div className="flex items-center gap-2 text-2xl font-black tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-indigo-500 uppercase">
            <Sparkles className="w-6 h-6 text-cyan-400" />
            GamAutos
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
            <a href="#inventory" className="hover:text-cyan-400 transition-colors">Inventory</a>
            <a href="#dealers" className="hover:text-cyan-400 transition-colors">Dealers</a>
            <a href="#reviews" className="hover:text-cyan-400 transition-colors">Reviews</a>
          </nav>
          <button className="px-5 py-2.5 rounded-full border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 transition-all font-medium text-sm">
            Sign In
          </button>
        </header>

        {/* Hero Headline & Call to Action */}
        <div className="max-w-2xl my-auto pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-cyan-400 uppercase bg-cyan-950/50 border border-cyan-500/30 rounded-full">
              Next Generation Automotive Marketplace
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-none mb-6">
              Drive The <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-500">
                Future Today.
              </span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl mb-8 leading-relaxed max-w-lg">
              Explore premium vehicles, verified dealers, and seamless digital transactions on GamAutos.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 font-semibold text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 transition-all">
                Browse Cars
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="px-8 py-4 rounded-xl border border-gray-800 bg-gray-900/40 backdrop-blur-md font-semibold text-gray-300 hover:bg-gray-800/60 hover:text-white transition-all">
                View Dealers
              </button>
            </div>
          </motion.div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-gray-800/60 pointer-events-auto">
          {[
            { label: 'Available Cars', val: '2,500+' },
            { label: 'Verified Dealers', val: '180+' },
            { label: 'Customer Rating', val: '4.9 ★' },
            { label: 'Instant Approval', val: '99%' },
          ].map((stat, idx) => (
            <div key={idx}>
              <p className="text-2xl md:text-3xl font-bold text-white">{stat.val}</p>
              <p className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
