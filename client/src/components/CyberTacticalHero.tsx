import { Suspense, useMemo } from 'react';
import { CyberGlobeContent } from './CyberGlobe';
import { SecuritySimulation } from './SecuritySimulation';
import { motion } from 'framer-motion';
import { ThreeCanvas } from './ThreeCanvas';

export function TacticalHUD() {
  const codeLines = useMemo(() => [
    "INIT_SENTINEL_CORE...",
    "ACCESS_GRANTED: ADMIN_01",
    "SCANNING_PERIMETER...",
    "THREAT_LEVEL: MINIMAL",
    "ENCRYPTING_DATA_STREAMS...",
    "UPLOADING_LOGS_TO_HUB...",
    "SENTINEL_ACTIVE",
    "NEURAL_MAP_LOADED",
    "NODE_ID: 0x82F1A",
    "GEO_SYNC_COMPLETE"
  ], []);

  return (
    <div className="absolute inset-0 flex items-center justify-between pointer-events-none px-6 md:px-12 opacity-10 md:opacity-20 z-10 overflow-hidden">
      <div className="flex flex-col gap-2 font-mono text-[8px] md:text-[10px] text-primary lowercase tracking-wider">
        {codeLines.slice(0, 5).map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ repeat: Infinity, duration: 4, delay: i * 0.8, repeatType: "reverse" }}
          >
            {`> ${line}`}
          </motion.div>
        ))}
      </div>
      <div className="flex flex-col gap-2 font-mono text-[8px] md:text-[10px] text-primary lowercase tracking-wider text-right">
        {codeLines.slice(5).map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ repeat: Infinity, duration: 4, delay: i * 0.8, repeatType: "reverse" }}
          >
            {`${line} <`}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function CyberTacticalHero() {
  return (
    <group>
      {/* Background Simulation Layer - Floating Nodes */}
      <group>
        <Suspense fallback={null}>
          <SecuritySimulation nodeCount={40} vibe="organic" primaryColor="#ffffff" />
        </Suspense>
      </group>

      {/* Primary Globe Layer */}
      <CyberGlobeContent globeRadius={6} />
    </group>
  );
}

export function CyberBackgroundSuite({ opacity = 0.6, showHUD = true }: { opacity?: number, showHUD?: boolean }) {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#050505]">
      {/* High-Fidelity Image Layer (The "Attractive" Backdrop) */}
      <div 
        className="absolute inset-0 z-[1] opacity-20 md:opacity-30 mix-blend-screen transition-opacity duration-1000"
        style={{
          backgroundImage: `url('/assets/cybersecurity_war_room_background.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'hue-rotate(-10deg) brightness(0.8)'
        }}
      />

      {/* 3D Context */}
      <div className="absolute inset-0 z-[2]" style={{ opacity }}>
        <ThreeCanvas camera={{ position: [0, 0, 10], fov: 35 }} controls={false}>
          <CyberTacticalHero />
        </ThreeCanvas>
      </div>

      {/* HTML HUD Context */}
      {showHUD && <TacticalHUD />}

      {/* Cinematic Depth Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] z-[15]" />
      
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(5,5,5,0.7)_100%)] z-[16]" />
    </div>
  );
}
