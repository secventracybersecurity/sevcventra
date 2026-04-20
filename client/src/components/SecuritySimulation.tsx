import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Float, Sphere, Line } from "@react-three/drei";

interface SecuritySimulationProps {
  primaryColor?: string;
  nodeCount?: number;
  vibe?: "organic" | "grid";
}

function Pulse({ start, end, color }: { start: THREE.Vector3; end: THREE.Vector3; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const speed = useMemo(() => 0.2 + Math.random() * 0.5, []);
  const delay = useMemo(() => Math.random() * 5, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = ((clock.getElapsedTime() + delay) * speed) % 1;
    meshRef.current.position.lerpVectors(start, end, t);
    meshRef.current.scale.setScalar(Math.sin(t * Math.PI) * 0.5);
  });

  return (
    <Sphere ref={meshRef} args={[0.05, 16, 16]}>
      <meshBasicMaterial color={color} transparent opacity={0.8} />
    </Sphere>
  );
}

export function SecuritySimulation({ primaryColor = "#ffffff", nodeCount = 20, vibe = "organic" }: SecuritySimulationProps) {
  const nodes = useMemo(() => {
    return Array.from({ length: nodeCount }, (_, i) => {
      if (vibe === "grid") {
        const x = (i % 5) - 2;
        const y = (Math.floor(i / 5) % 4) - 1.5;
        const z = (Math.floor(i / 20)) - 0.5;
        return new THREE.Vector3(x * 2, y * 2, z * 2);
      }
      return new THREE.Vector3(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 4
      );
    });
  }, [nodeCount, vibe]);

  const connections = useMemo(() => {
    const lines = [];
    const maxDist = vibe === "grid" ? 2.5 : 4;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].distanceTo(nodes[j]) < maxDist) {
          lines.push([nodes[i], nodes[j]]);
        }
      }
    }
    return lines;
  }, [nodes, vibe]);

  const groupRef = useRef<THREE.Group>(null);
  useFrame(({ mouse, viewport }) => {
    if (!groupRef.current) return;
    const x = (mouse.x * viewport.width) / 20;
    const y = (mouse.y * viewport.height) / 20;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, x, 0.05);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -y, 0.05);
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        {nodes.map((pos, i) => (
          <Sphere key={i} position={pos} args={[0.08, 16, 16]}>
            <meshBasicMaterial color={primaryColor} transparent opacity={0.4} />
          </Sphere>
        ))}
        {connections.map(([start, end], i) => (
          <group key={i}>
            <Line points={[start, end]} color="#ffffff" opacity={0.05} transparent lineWidth={1} />
            <Pulse start={start} end={end} color={primaryColor} />
          </group>
        ))}
      </Float>
    </group>
  );
}
