import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, MeshTransmissionMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

export function RefractiveAvatar() {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (mesh.current) {
      mesh.current.rotation.y = time * 0.2;
      mesh.current.rotation.x = time * 0.1;
    }
  });

  return (
    <Float speed={5} rotationIntensity={1} floatIntensity={1}>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[1, 15]} />
        <meshPhysicalMaterial
          transmission={1}
          thickness={1}
          roughness={0}
          ior={1.5}
          color="#ffffff"
        />
      </mesh>

      
      {/* Outer Glow Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.5, 0.01, 16, 100]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.2} />
      </mesh>
    </Float>
  );
}
