import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Torus, Icosahedron } from '@react-three/drei';
import * as THREE from 'three';

export function FooterCore3D() {
  const outerRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (outerRef.current) {
      outerRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      outerRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = state.clock.elapsedTime * -0.2;
      innerRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group scale={1.5}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={2} color="#ffffff" />
      <directionalLight position={[-5, -5, -5]} intensity={1} color="#cccccc" />
      
      {/* Outer abstract ring */}
      <group ref={outerRef}>
        <Torus args={[3, 0.02, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
          <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
        </Torus>
        <Torus args={[3.2, 0.01, 16, 100]} rotation={[0, Math.PI / 2, 0]}>
          <meshBasicMaterial color="#cccccc" transparent opacity={0.2} />
        </Torus>
      </group>


      {/* Inner geometric core */}
      <Icosahedron ref={innerRef} args={[1.5, 1]}>
        <meshStandardMaterial 
          color="#050505"
          wireframe={true}
          transparent={true}
          opacity={0.15}
        />
      </Icosahedron>
    </group>
  );
}
