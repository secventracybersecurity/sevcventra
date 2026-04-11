import { Canvas } from '@react-three/fiber';
import { Suspense, useState } from 'react';
import { Preload, OrbitControls, PerformanceMonitor } from '@react-three/drei';

interface ThreeSceneProps {
  children: React.ReactNode;
  className?: string;
  camera?: any;
  controls?: boolean;
}

export function ThreeCanvas({ children, className = "", camera = { position: [0, 0, 5], fov: 45 }, controls = false }: ThreeSceneProps) {
  const [dpr, setDpr] = useState(1);

  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={camera}
        gl={{ antialias: false, stencil: false, alpha: true, powerPreference: "high-performance" }}
        dpr={dpr}
      >
        <PerformanceMonitor onDecline={() => setDpr(0.8)} onIncline={() => setDpr(1.2)}>
          <Suspense fallback={null}>
            {children}
            {controls && <OrbitControls enableZoom={false} enablePan={false} />}
            <Preload all />
          </Suspense>
        </PerformanceMonitor>
      </Canvas>
    </div>
  );
}
