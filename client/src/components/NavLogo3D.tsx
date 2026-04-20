import { useRef, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture, Float } from '@react-three/drei';
import * as THREE from 'three';

function LogoPlane() {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture('/logo.png');

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating rotation
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <Float speed={3} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <planeGeometry args={[2.2, 2.2]} />
        <meshStandardMaterial 
          map={texture}
          transparent={true}
          roughness={0.2}
          metalness={0.5}
          emissive="#ffffff" // White emissive glow
          emissiveMap={texture}
          emissiveIntensity={2} // Boosted visibility for premium feel
          side={THREE.DoubleSide}
        />
      </mesh>
    </Float>
  );
}

export function NavLogo3D() {
  return (
    <group scale={1.5}>
      <ambientLight intensity={1.5} />
      <pointLight position={[5, 5, 5]} intensity={10} color="#ffffff" />
      <pointLight position={[0, 0, 2]} intensity={8} color="#ffffff" />

      <Suspense fallback={null}>
        <LogoPlane />
      </Suspense>
    </group>
  );
}
