import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Instances, Instance, Float } from '@react-three/drei';

export function DataBits() {
  const count = 40;
  const instances = useMemo(() => {
    const data = [];
    for (let i = 0; i < count; i++) {
      data.push({
        position: [
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 10,
        ],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
        scale: 0.1 + Math.random() * 0.2,
      });
    }
    return data;
  }, []);

  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.y = time * 0.05;
    }
  });

  return (
    <group ref={ref}>
      <Instances range={count}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.1} wireframe />
        {instances.map((data, i) => (
          <Instance
            key={i}
            position={data.position as any}
            rotation={data.rotation as any}
            scale={data.scale}
          />
        ))}
      </Instances>
    </group>
  );
}
