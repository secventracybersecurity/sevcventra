import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  uniform float time;
  uniform float opacity;
  attribute float size;
  attribute float speed;
  varying float vOpacity;
  void main() {
    vec3 pos = position;
    // Move particles downward to create a digital rain / matrix effect
    pos.y = mod(pos.y - time * speed * 0.5 + 5.0, 10.0) - 5.0;
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = size * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
    
    // Fade out based on distance and Y position
    vOpacity = opacity * (1.0 - abs(pos.y) / 5.0);
  }
`;

const fragmentShader = `
  varying float vOpacity;
  void main() {
    float r = distance(gl_PointCoord, vec2(0.5, 0.5));
    if (r > 0.5) discard;
    
    // Cyber white glow
    vec3 color = vec3(1.0, 1.0, 1.0); 
    float strength = 1.0 - (r * 2.0);
    gl_FragColor = vec4(color, strength * vOpacity);
  }
`;

export function CyberBackground3D() {
  const pointsRef = useRef<THREE.Points>(null);
  
  const count = 1000; // Dense but optimized
  const { positions, sizes, speeds } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    const sp = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15; // X
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10; // Y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10; // Z
      sz[i] = Math.random() * 0.05 + 0.02;
      sp[i] = Math.random() * 0.2 + 0.1;
    }
    return { positions: pos, sizes: sz, speeds: sp };
  }, []);

  const uniforms = useMemo(() => ({
    time: { value: 0 },
    opacity: { value: 0.4 }
  }), []);

  useFrame((state) => {
    if (uniforms.time) {
      uniforms.time.value = state.clock.elapsedTime;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-size" count={count} array={sizes} itemSize={1} />
        <bufferAttribute attach="attributes-speed" count={count} array={speeds} itemSize={1} />
      </bufferGeometry>
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
