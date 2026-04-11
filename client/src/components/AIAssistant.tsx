import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, Float, Environment, ContactShadows, Text } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Cpu, Bot, ChevronRight, Zap } from "lucide-react";

// The 3D Orb Component
function AIAvatarCore({ isHovered, isChatOpen }: { isHovered: boolean; isChatOpen: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * (isChatOpen ? 0.5 : 0.2);
      meshRef.current.rotation.y = state.clock.elapsedTime * (isChatOpen ? 0.3 : 0.1);
      
      // Pulse effect
      const scale = isChatOpen 
         ? 1 + Math.sin(state.clock.elapsedTime * 4) * 0.05 
         : isHovered 
            ? 1.1 + Math.sin(state.clock.elapsedTime * 2) * 0.02
            : 1;
            
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <Float speed={isChatOpen ? 4 : 2} rotationIntensity={isChatOpen ? 2 : 1} floatIntensity={isChatOpen ? 2 : 1}>
      <Sphere ref={meshRef} args={[1, 32, 32]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color={isChatOpen ? "#ffffff" : "#cccccc"}
          envMapIntensity={2}
          clearcoat={1}
          clearcoatRoughness={0.1}
          metalness={0.1}
          roughness={0.2}
          distort={isChatOpen ? 0.5 : (isHovered ? 0.4 : 0.2)}
          speed={isChatOpen ? 6 : (isHovered ? 4 : 2)}
          emissive={isChatOpen ? "#ffffff" : "#cccccc"}
          emissiveIntensity={0.5}
        />
      </Sphere>
      
      {/* Inner glowing core */}
      <Sphere args={[0.5, 16, 16]}>
        <meshBasicMaterial color="#ffffff" transparent opacity={isChatOpen ? 0.8 : 0.4} />
      </Sphere>
    </Float>
  );
}

// The Chat Interface
function AIChatInterface({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState([
    { role: "agent", text: "Sentinel AI initialized. How can I assist with your security posture today?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const quickActions = [
    "Scan my perimeter",
    "Audit AWS Cloud",
    "I'm actively breached"
  ];

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    
    setMessages(prev => [...prev, { role: "user", text }]);
    setInput("");
    setIsTyping(true);

    // Auto-scroll
    setTimeout(() => {
      if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, 100);

    // Mock AI Response
    setTimeout(() => {
      let response = "I'm analyzing your request. Our human engineers will follow up shortly to conduct a full architectural review.";
      if (text.toLowerCase().includes("breach")) {
        response = "CRITICAL: Activating Emergency IR Protocol. Please call +1 (800) SEC-URE immediately or provide your domain for rapid triage.";
      } else if (text.toLowerCase().includes("aws") || text.toLowerCase().includes("cloud")) {
        response = "Cloud environments are a major attack vector. I recommend scheduling a Cloud Security Assessment. Would you like me to book that?";
      }

      setMessages(prev => [...prev, { role: "agent", text: response }]);
      setIsTyping(false);
      
      setTimeout(() => {
         if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }, 100);
    }, 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.3, type: "spring", damping: 25, stiffness: 200 }}
      className="absolute bottom-20 sm:bottom-24 right-0 w-[340px] sm:w-[400px] h-[500px] max-h-[70vh] bg-[#0A0A0A]/80 backdrop-blur-3xl border border-white/10 rounded-[24px] shadow-[0_30px_60px_rgba(0,0,0,0.8),0_0_30px_rgba(255,255,255,0.2)] flex flex-col overflow-hidden z-50 origin-bottom-right"
    >
      {/* Header */}
      <div className="p-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
           <div className="relative">
              <Bot className="w-6 h-6 text-[#ffffff]" />
              <div className="absolute top-0 right-0 w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,1)]" />
           </div>
           <div>
             <h3 className="text-sm font-bold text-white tracking-tight">Sentinel AI</h3>
             <p className="text-[10px] text-white/50 font-mono tracking-wider">SECaaS AUTONOMOUS AGENT</p>
           </div>
        </div>
        <button 
          onClick={onClose}
          className="p-2 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
        {messages.map((msg, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] rounded-[16px] p-3 text-[14px] leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-primary text-primary-foreground shadow-[0_0_20px_rgba(255,255,255,0.3)] rounded-br-[4px]' 
                : 'bg-white/10 border border-white/5 text-white/90 rounded-bl-[4px]'
            }`}>
              {msg.text}
            </div>
          </motion.div>
        ))}
        {isTyping && (
           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
              <div className="bg-white/10 border border-white/5 rounded-[16px] rounded-bl-[4px] p-4 flex gap-1.5 items-center">
                 <div className="w-1.5 h-1.5 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: "0ms" }} />
                 <div className="w-1.5 h-1.5 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: "150ms" }} />
                 <div className="w-1.5 h-1.5 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
           </motion.div>
        )}
      </div>

      {/* Quick Actions */}
      {messages.length === 1 && !isTyping && (
         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-4 pb-2 flex flex-wrap gap-2">
            {quickActions.map((action, i) => (
               <button 
                  key={i}
                  onClick={() => handleSend(action)}
                  className="text-[11px] px-3 py-1.5 rounded-full border border-white/10 hover:border-primary/50 hover:bg-primary/10 text-white/70 hover:text-white transition-colors whitespace-nowrap flex items-center gap-1"
               >
                  <Zap className="w-3 h-3 text-accent" /> {action}
               </button>
            ))}
         </motion.div>
      )}

      {/* Input Area */}
      <div className="p-4 border-t border-white/10 bg-black/50">
        <div className="relative flex items-center">
           <input
             type="text"
             value={input}
             onChange={(e) => setInput(e.target.value)}
             onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
             placeholder="Type your security query..."
             className="w-full bg-white/5 border border-white/10 rounded-full pl-4 pr-12 py-3 text-[14px] text-white placeholder-white/30 focus:outline-none focus:border-primary/50 transition-colors"
           />
           <button 
             onClick={() => handleSend(input)}
             disabled={!input.trim() || isTyping}
             className="absolute right-2 p-2 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-50 disabled:hover:bg-primary transition-colors shadow-[0_0_15px_rgba(255,255,255,0.5)]"           >
             <Send className="w-4 h-4" />
           </button>
        </div>
      </div>
    </motion.div>
  );
}

export function AIAssistant() {
  const [isHovered, setIsHovered] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 sm:bottom-10 sm:right-10 z-[100] flex flex-col items-end">
      <AnimatePresence>
        {isChatOpen && <AIChatInterface onClose={() => setIsChatOpen(false)} />}
      </AnimatePresence>

      <motion.button
        className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full focus:outline-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsChatOpen(!isChatOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Glow behind the orb */}
        <div className={`absolute inset-0 rounded-full blur-[20px] transition-all duration-500 ${isChatOpen ? 'bg-accent/40 scale-150' : (isHovered ? 'bg-primary/50 scale-125' : 'bg-primary/20 scale-100')}`} />
        
        <div className="absolute inset-0 z-10 w-full h-full">
           <Canvas camera={{ position: [0, 0, 4], fov: 45 }} dpr={1}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
              <AIAvatarCore isHovered={isHovered} isChatOpen={isChatOpen} />
              <Environment preset="city" />
           </Canvas>
        </div>

        {/* Overlay Icon */}
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
           {isChatOpen ? (
              <X className="w-6 h-6 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
           ) : (
              <Cpu className={`w-6 h-6 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-transform duration-300 ${isHovered ? 'rotate-180 scale-110' : ''}`} />
           )}
        </div>
      </motion.button>
    </div>
  );
}
