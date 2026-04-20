import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

export function CyberShield() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = time * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group ref={group}>
        {/* Core Shield */}
        <mesh>
          <cylinderGeometry args={[2, 2, 0.2, 6]} />
          <MeshTransmissionMaterial
            backside
            thickness={2}
            color="#ffffff"
            chromaticAberration={0.05}
            anisotropy={0.1}
            clearcoat={1}
          />
        </mesh>
        
        {/* Wireframe Outline */}
        <mesh>
          <cylinderGeometry args={[2.05, 2.05, 0.22, 6]} />
          <meshBasicMaterial color="#ffffff" wireframe opacity={0.1} transparent />
        </mesh>
        
        {/* Floating Rings */}
        {[1, 2].map((i) => (
          <mesh key={i} rotation={[Math.PI / 2, 0, 0]} position={[0, (i - 1.5) * 0.5, 0]}>
            <torusGeometry args={[2.5 + i * 0.2, 0.01, 16, 100]} />
            <meshBasicMaterial color="#cccccc" transparent opacity={0.15} />
          </mesh>
        ))}

      </group>
    </Float>
  );
}
