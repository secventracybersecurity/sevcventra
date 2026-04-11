import { useRef, useMemo, useCallback } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
const PARTICLE_COUNT = isMobile ? 300 : 800; // Significantly reduced for performance
const CONNECTION_DISTANCE = isMobile ? 1.5 : 2.0;
const MOUSE_INFLUENCE_RADIUS = 3;
const MOUSE_REPULSION_FORCE = 0.15;
const RETURN_FORCE = 0.02;
const DAMPING = 0.92;
const FIELD_SIZE = 25;

interface ParticleData {
  positions: Float32Array;
  velocities: Float32Array;
  originalPositions: Float32Array;
  scales: Float32Array;
}

export function ParticleField() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const { mouse, viewport } = useThree();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const mousePos = useRef(new THREE.Vector3());
  const prevMousePos = useRef(new THREE.Vector3());

  const data = useMemo<ParticleData>(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = new Float32Array(PARTICLE_COUNT * 3);
    const originalPositions = new Float32Array(PARTICLE_COUNT * 3);
    const scales = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const x = (Math.random() - 0.5) * FIELD_SIZE;
      const y = (Math.random() - 0.5) * FIELD_SIZE;
      const z = (Math.random() - 0.5) * 15;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;

      velocities[i * 3] = 0;
      velocities[i * 3 + 1] = 0;
      velocities[i * 3 + 2] = 0;

      scales[i] = 0.3 + Math.random() * 0.7;
    }

    return { positions, velocities, originalPositions, scales };
  }, []);

  // Connection lines geometry
  const linePositions = useMemo(() => new Float32Array(PARTICLE_COUNT * 6), []);
  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    geo.setDrawRange(0, 0);
    return geo;
  }, [linePositions]);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();

    // Update mouse position in world space
    mousePos.current.set(
      (mouse.x * viewport.width) / 2,
      (mouse.y * viewport.height) / 2,
      0
    );

    let lineVertexIndex = 0;
    const maxLines = Math.min(PARTICLE_COUNT * 2, isMobile ? 100 : 300); // Reduced lines

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const ix = i * 3;
      const iy = ix + 1;
      const iz = ix + 2;

      // Mouse repulsion
      const dx = data.positions[ix] - mousePos.current.x;
      const dy = data.positions[iy] - mousePos.current.y;
      const dz = data.positions[iz] - mousePos.current.z;
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

      if (dist < MOUSE_INFLUENCE_RADIUS && dist > 0.01) {
        const force = (1 - dist / MOUSE_INFLUENCE_RADIUS) * MOUSE_REPULSION_FORCE;
        data.velocities[ix] += (dx / dist) * force;
        data.velocities[iy] += (dy / dist) * force;
        data.velocities[iz] += (dz / dist) * force * 0.3;
      }

      // Return to original position (spring force)
      data.velocities[ix] += (data.originalPositions[ix] - data.positions[ix]) * RETURN_FORCE;
      data.velocities[iy] += (data.originalPositions[iy] - data.positions[iy]) * RETURN_FORCE;
      data.velocities[iz] += (data.originalPositions[iz] - data.positions[iz]) * RETURN_FORCE;

      // Gentle organic drift
      data.velocities[ix] += Math.sin(time * 0.3 + i * 0.01) * 0.001;
      data.velocities[iy] += Math.cos(time * 0.2 + i * 0.015) * 0.001;

      // Apply damping and update positions
      data.velocities[ix] *= DAMPING;
      data.velocities[iy] *= DAMPING;
      data.velocities[iz] *= DAMPING;

      data.positions[ix] += data.velocities[ix];
      data.positions[iy] += data.velocities[iy];
      data.positions[iz] += data.velocities[iz];

      // Update instanced mesh
      const depthFactor = 1 - Math.abs(data.positions[iz]) / 10;
      const scale = data.scales[i] * Math.max(0.2, depthFactor) * 0.04;

      dummy.position.set(data.positions[ix], data.positions[iy], data.positions[iz]);
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);

      // Connection lines (only check nearby particles, limited count)
      if (lineVertexIndex < maxLines * 6 && i % 3 === 0) {
        for (let j = i + 1; j < Math.min(i + 20, PARTICLE_COUNT); j++) {
          if (lineVertexIndex >= maxLines * 6) break;
          const jx = j * 3;
          const cdx = data.positions[ix] - data.positions[jx];
          const cdy = data.positions[iy] - data.positions[jx + 1];
          const cdz = data.positions[iz] - data.positions[jx + 2];
          const cdist = Math.sqrt(cdx * cdx + cdy * cdy + cdz * cdz);

          if (cdist < CONNECTION_DISTANCE) {
            linePositions[lineVertexIndex++] = data.positions[ix];
            linePositions[lineVertexIndex++] = data.positions[iy];
            linePositions[lineVertexIndex++] = data.positions[iz];
            linePositions[lineVertexIndex++] = data.positions[jx];
            linePositions[lineVertexIndex++] = data.positions[jx + 1];
            linePositions[lineVertexIndex++] = data.positions[jx + 2];
          }
        }
      }
    }

    meshRef.current.instanceMatrix.needsUpdate = true;

    // Update line geometry
    if (linesRef.current) {
      lineGeometry.attributes.position.needsUpdate = true;
      lineGeometry.setDrawRange(0, lineVertexIndex / 3);
    }

    prevMousePos.current.copy(mousePos.current);
  });

  return (
    <group>
      {/* Particle instances */}
      <instancedMesh ref={meshRef} args={[undefined, undefined, PARTICLE_COUNT]}>
        <sphereGeometry args={[1, 6, 6]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
        />
      </instancedMesh>

      {/* Connection lines */}
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.06}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
}
