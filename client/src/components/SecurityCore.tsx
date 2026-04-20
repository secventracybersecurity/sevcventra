import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

export function SecurityCore() {
  const mesh = useRef<THREE.Mesh>(null);
  const pointsRef = useRef<THREE.Points>(null);

  // Generate random points on sphere surface
  const particlesCount = 2000;
  const positions = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / particlesCount);
      const theta = Math.sqrt(particlesCount * Math.PI) * phi;
      pos[i * 3] = 1.5 * Math.cos(theta) * Math.sin(phi);
      pos[i * 3 + 1] = 1.5 * Math.sin(theta) * Math.sin(phi);
      pos[i * 3 + 2] = 1.5 * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (mesh.current) {
      mesh.current.rotation.y = time * 0.1;
      mesh.current.rotation.x = time * 0.05;
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.y = -time * 0.05;
    }
  });

  return (
    <group>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <Sphere ref={mesh} args={[1, 64, 64]}>
          <MeshDistortMaterial
            color="#ffffff"
            speed={2}
            distort={0.4}
            radius={1}
            wireframe
            opacity={0.3}
            transparent
          />
        </Sphere>
      </Float>

      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particlesCount}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.015}
          color="#cccccc"
          transparent
          opacity={0.6}
          sizeAttenuation
        />
      </points>
      
      {/* Outer shell for depth */}
      <Sphere args={[1.6, 32, 32]}>
        <meshBasicMaterial color="#ffffff" wireframe opacity={0.05} transparent />
      </Sphere>

      <pointLight position={[10, 10, 10]} intensity={2} color="#ffffff" />

      <pointLight position={[-10, -10, -10]} intensity={1} color="#ffffff" />
      <ambientLight intensity={0.2} />
    </group>
  );
}
