import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export function ThreeBackground() {
  const pointsRef = useRef<THREE.Points>(null);
  const dustRef = useRef<THREE.Points>(null);
  const { mouse } = useThree();
  
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const count = isMobile ? 200 : 500;
  const dustCount = isMobile ? 100 : 250;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 60;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 60;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 60;
    }
    return pos;
  }, []);

  const dustPositions = useMemo(() => {
    const pos = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Parallax effect based on mouse position
    const targetX = mouse.x * 2;
    const targetY = mouse.y * 2;

    if (pointsRef.current) {
      pointsRef.current.rotation.y = time * 0.05 + targetX * 0.1;
      pointsRef.current.rotation.x = time * 0.02 + targetY * 0.1;
    }
    
    if (dustRef.current) {
      // Slower, deeper parallax for the close-up dust
      dustRef.current.rotation.y = -time * 0.03 + targetX * 0.2;
      dustRef.current.rotation.x = targetY * 0.2;
      dustRef.current.position.y = Math.sin(time * 0.5) * 0.2;
    }
  });

  return (
    <group>
      {/* Deep Background Data Points */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          color="#ffffff"
          transparent
          opacity={0.3}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Close-up Atmospheric Particulate */}
      <points ref={dustRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={dustCount}
            array={dustPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.02}
          color="#888888"
          transparent
          opacity={0.4}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
