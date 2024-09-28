import { useEffect, useState, Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import MemoryGame from "@/components/memory-game";
import { LandingContent } from "@/components/landing-page";
import * as THREE from "three";

function Torus() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.5;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <mesh ref={meshRef}>
      <torusGeometry args={[1, 0.4, 16, 100]} />
      <meshPhongMaterial color="cyan" wireframe />
    </mesh>
  );
}

function ParticleField() {
  const particlesRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  const particlesGeometry = new THREE.BufferGeometry();
  const particleCount = 5000;

  const positions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 10;
  }

  particlesGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3)
  );

  return (
    <points ref={particlesRef}>
      <bufferGeometry attach="geometry" {...particlesGeometry} />
      <pointsMaterial attach="material" size={0.01} color="white" />
    </points>
  );
}

function ThreeAnimation() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <OrbitControls autoRotate autoRotateSpeed={0.5} />
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
      <Torus />
      <ParticleField />
    </Canvas>
  );
}

function App() {
  const [showGame, setShowGame] = useState(false);
  const [hasPlayedGame, setHasPlayedGame] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowGame(true), 8000); // Show game after 8 seconds
    const gamePlayedStatus = localStorage.getItem("hasPlayedMemoryGame");
    setHasPlayedGame(gamePlayedStatus === "true");
    return () => clearTimeout(timer);
  }, []);

  const handleGameWon = () => {
    setGameWon(true);
    setHasPlayedGame(true);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black text-white overflow-hidden relative">
      {!showGame ? (
        <div className="w-full h-screen">
          <Suspense fallback={<div>Loading...</div>}>
            <ThreeAnimation />
          </Suspense>
        </div>
      ) : (
        <>
          {!hasPlayedGame && !gameWon ? (
            <MemoryGame onGameWon={handleGameWon} />
          ) : (
            <LandingContent />
          )}
        </>
      )}
      <div className="absolute inset-0 bg-black opacity-50 pointer-events-none"></div>
    </main>
  );
}

export default App;
