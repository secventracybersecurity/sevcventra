import { useRef, useMemo, useEffect, useState, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

// Utility: Convert Lat/Lon to 3D Vector
const getCoordinatesFromLatLng = (lat: number, lng: number, radius: number) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  
  return new THREE.Vector3(x, y, z);
};

// Component: A single attack arc
function AttackArc({ startLat, startLng, endLat, endLng, globeRadius, color }: {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  globeRadius: number;
  color: string;
}) {
  const lineRef = useRef<THREE.Line>(null);
  const particleRef = useRef<THREE.Mesh>(null);
  const progress = useRef({ value: 0 });

  const { curve, points } = useMemo(() => {
    const start = getCoordinatesFromLatLng(startLat, startLng, globeRadius);
    const end = getCoordinatesFromLatLng(endLat, endLng, globeRadius);
    
    // Calculate the midpoint and elevate it to create an arc
    const midPoint = start.clone().lerp(end, 0.5);
    const distance = start.distanceTo(end);
    midPoint.normalize().multiplyScalar(globeRadius + distance * 0.4); // Elevation

    const bezierCurve = new THREE.QuadraticBezierCurve3(start, midPoint, end);
    const curvePoints = bezierCurve.getPoints(50);
    
    return { curve: bezierCurve, points: curvePoints };
  }, [startLat, startLng, endLat, endLng, globeRadius]);

  const lineGeometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [points]);

  useEffect(() => {
    gsap.to(progress.current, {
      value: 1,
      duration: 1.5 + Math.random(),
      ease: "power2.inOut",
    });
  }, []);

  useFrame(() => {
    if (lineRef.current && particleRef.current) {
      // Animate the line drawing
      const drawCount = Math.floor(progress.current.value * points.length);
      lineRef.current.geometry.setDrawRange(0, drawCount);

      // Move the glowing particle along the curve
      if (progress.current.value < 1) {
        const currentPos = curve.getPoint(progress.current.value);
        particleRef.current.position.copy(currentPos);
      } else {
        particleRef.current.visible = false;
      }
    }
  });

  return (
    <group>
      {/* The Arc Trail */}
      <primitive 
        object={new THREE.Line(lineGeometry, new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.4 }))} 
        ref={lineRef}
      />
      
      {/* The Attack Payload (Particle) */}
      <mesh ref={particleRef}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.8} />
      </mesh>
    </group>
  );
}

// Internal content that loads the texture
function GlobeWithTexture({ globeRadius }: { globeRadius: number }) {
  const [attacks, setAttacks] = useState<{ id: number; startLat: number; startLng: number; endLat: number; endLng: number; color: string }[]>([]);
  const groupRef = useRef<THREE.Group>(null);
  
  // Load the tactical continent map
  const earthTexture = useTexture('/earth-dark.png');

  useEffect(() => {
    const generateAttack = () => {
      const colors = ['#ffffff', '#cccccc', '#888888', '#aaaaaa', '#eeeeee'];
      const newAttack = {
        id: Date.now(),
        // Randomized global threats
        startLat: (Math.random() - 0.5) * 160,
        startLng: (Math.random() - 0.5) * 320,
        endLat: (Math.random() - 0.5) * 160,
        endLng: (Math.random() - 0.5) * 320,
        color: colors[Math.floor(Math.random() * colors.length)]
      };
      
      setAttacks((prev) => {
        const updated = [...prev, newAttack];
        return updated.length > 15 ? updated.slice(updated.length - 15) : updated;
      });
    };

    const interval = setInterval(generateAttack, 1200);
    return () => clearInterval(interval);
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.0015;
    }
  });

  return (
    <group ref={groupRef} rotation={[0.4, 0, 0]}>
      {/* Ambient and Point Lighting */}
      <ambientLight intensity={0.8} />
      <pointLight position={[10, 10, 10]} intensity={3} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={1.5} color="#cccccc" />

      {/* 1. Tactical Texture Layer (Continents) */}
      <Sphere args={[globeRadius, 32, 32]}>
        <meshStandardMaterial 
          map={earthTexture}
          color="#ffffff"
          transparent={true} 
          opacity={0.7}
          roughness={0.3}
          metalness={0.9}
          emissive="#cccccc"
          emissiveIntensity={0.2}
        />
      </Sphere>

      {/* 2. Abstract Ocean/Core Layer */}
      <Sphere args={[globeRadius - 0.01, 32, 32]}>
        <meshBasicMaterial color="#050510" transparent opacity={0.6} />
      </Sphere>

      {/* 3. Outer Wireframe HUD */}
      <Sphere args={[globeRadius + 0.05, 32, 32]}>
        <meshBasicMaterial 
          color="#ffffff" 
          wireframe={true} 
          transparent 
          opacity={0.08} 
        />
      </Sphere>


      {/* Render Active Attacks */}
      {attacks.map((attack) => (
        <AttackArc 
          key={attack.id} 
          {...attack}
          globeRadius={globeRadius} 
        />
      ))}
    </group>
  );
}

// Main Component Logic
export function CyberGlobeContent({ globeRadius = 3 }) {
  return (
    <Suspense fallback={null}>
      <GlobeWithTexture globeRadius={globeRadius} />
    </Suspense>
  );
}
