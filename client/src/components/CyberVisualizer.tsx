import { motion } from "framer-motion";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Box, Sphere, Dodecahedron, Octahedron, MeshDistortMaterial, Float } from "@react-three/drei";
import * as THREE from "three";
import { ThreeCanvas } from "./ThreeCanvas";

export function CyberVisualizer({ variant = "liquid", color = "#ffffff" }: { variant?: "liquid" | "radar" | "shards" | "pulse"; color?: string }) {
  // Map old variants to new elite 3D assets
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden min-h-[300px]">
       <ThreeCanvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color={color} />
          
          {variant === "liquid" && <ShieldCore3D color={color} />}
          {variant === "radar" && <HoloLock3D color={color} />}
          {variant === "shards" && <DataNexus3D color={color} />}
          {variant === "pulse" && <NeuralHub3D color={color} />}
       </ThreeCanvas>

       {/* Overlay tactical indicators */}
       <div className="absolute inset-0 pointer-events-none border border-white/5 rounded-3xl" />
       <div className="absolute bottom-4 left-4 font-mono text-[8px] tracking-[0.3em] uppercase opacity-40 text-white">
          ASSET_TYPE: {variant.toUpperCase()} // SIG_LOCK: ACTIVE
       </div>
    </div>
  );
}

function ShieldCore3D({ color }: { color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const outerRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (meshRef.current) meshRef.current.rotation.y = t * 0.5;
    if (outerRef.current) outerRef.current.rotation.y = -t * 0.3;
  });

  return (
    <group>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <Dodecahedron ref={meshRef} args={[1.2, 0]}>
          <meshPhongMaterial color={color} emissive={color} emissiveIntensity={0.5} transparent opacity={0.6} wireframe />
        </Dodecahedron>
      </Float>
      <Octahedron ref={outerRef} args={[1.8, 0]}>
        <meshBasicMaterial color={color} transparent opacity={0.1} wireframe />
      </Octahedron>
    </group>
  );
}

function HoloLock3D({ color }: { color: string }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) groupRef.current.rotation.y = state.clock.elapsedTime * 0.4;
  });

  return (
    <Float speed={3} rotationIntensity={1} floatIntensity={1}>
      <group ref={groupRef}>
        {/* Shackle */}
        <mesh position={[0, 0.5, 0]}>
          <torusGeometry args={[0.6, 0.1, 16, 32, Math.PI]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
        </mesh>
        {/* Body */}
        <Box args={[1.2, 0.8, 0.4]} position={[0, -0.2, 0]}>
          <meshPhongMaterial color="#111" transparent opacity={0.9} />
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(1.2, 0.8, 0.4)]} />
            <lineBasicMaterial color={color} />
          </lineSegments>
        </Box>
        {/* Keyhole Glow */}
        <Sphere args={[0.1, 16, 16]} position={[0, -0.2, 0.25]}>
           <meshBasicMaterial color={color} />
        </Sphere>
      </group>
    </Float>
  );
}

function DataNexus3D({ color }: { color: string }) {
  const points = useMemo(() => {
    const p = [];
    for (let i = 0; i < 50; i++) {
        p.push(new THREE.Vector3((Math.random() - 0.5) * 3, (Math.random() - 0.5) * 3, (Math.random() - 0.5) * 3));
    }
    return p;
  }, []);

  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (groupRef.current) groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
  });

  return (
    <group ref={groupRef}>
      {points.map((pos, i) => (
        <Float key={i} speed={Math.random() * 5} floatIntensity={2}>
           <mesh position={pos}>
              <Octahedron args={[0.1, 0]}>
                 <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} />
              </Octahedron>
           </mesh>
        </Float>
      ))}
      <Sphere args={[0.5, 32, 32]}>
        <MeshDistortMaterial speed={2} distort={0.4} color={color} opacity={0.2} transparent />
      </Sphere>
    </group>
  );
}

function NeuralHub3D({ color }: { color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
        meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
        meshRef.current.rotation.z = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <group>
      <Sphere ref={meshRef} args={[1.5, 3, 2]}>
        <meshBasicMaterial color={color} wireframe />
      </Sphere>
      <points>
        <sphereGeometry args={[1.5, 16, 16]} />
        <pointsMaterial color={color} size={0.05} />
      </points>
      <mesh>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={5} />
      </mesh>
    </group>
  );
}
