import { motion, AnimatePresence } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Shield, Activity, Lock, Globe, Server, AlertTriangle, Terminal as TerminalIcon, Cpu, Zap, Wifi } from "lucide-react";
import { useEffect, useState, useRef } from "react";

// Realistic mock IPs and payloads for the terminal
const mockIps = ["192.168.1.105", "10.0.0.52", "45.33.22.11", "104.28.14.99", "185.199.108.153"];
const mockPayloads = [
  "DROP TABLE users;",
  "<script>alert(1)</script>",
  "' OR 1=1 --",
  "GET /.env HTTP/1.1",
  "POST /api/v1/auth/bypass",
  "../../../../etc/passwd",
  "Connection: Keep-Alive\r\n\r\n"
];

function TerminalFeed() {
  const [logs, setLogs] = useState<{ id: string; time: string; text: string; threat: boolean }[]>([]);
  const [cursorVisible, setCursorVisible] = useState(true);
  
  useEffect(() => {
    const interval = setInterval(() => {
      const isThreat = Math.random() > 0.7;
      const ip = mockIps[Math.floor(Math.random() * mockIps.length)];
      const payload = mockPayloads[Math.floor(Math.random() * mockPayloads.length)];
      const port = Math.floor(Math.random() * 60000) + 1024;
      const timestamp = new Date().toISOString().split('T')[1].slice(0, -1);
      
      const newLog = {
        id: Math.random().toString(36).substring(7),
        time: timestamp,
        text: isThreat ? `[BLOCKED] WAF Rule 942100: Payload "${payload}" from ${ip}:${port}` : `[ALLOW] TCP Handshake from ${ip}:${port} (AS13335)`,
        threat: isThreat
      };

      setLogs(prev => [newLog, ...prev].slice(0, 5));
    }, 1500);

    // Cursor blink
    const cursorInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 530);

    return () => {
      clearInterval(interval);
      clearInterval(cursorInterval);
    };
  }, []);

  return (
    <div className="font-mono text-[9px] sm:text-xs tracking-tight flex flex-col gap-1.5 overflow-hidden h-full pt-2">
      <AnimatePresence initial={false}>
        {logs.map((log) => (
          <motion.div
            key={log.id}
            initial={{ opacity: 0, x: -15, filter: "blur(4px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={`flex gap-2 ${log.threat ? 'text-red-400/90' : 'text-emerald-400/60'}`}
          >
            <span className="opacity-40 flex-shrink-0">[{log.time}]</span>
            <span className="truncate">{log.text}</span>
          </motion.div>
        ))}
      </AnimatePresence>
      {/* Blinking cursor */}
      <div className="flex items-center gap-1 mt-1">
        <span className="text-white/20">$</span>
        <span className={`w-[6px] h-[12px] bg-white/40 ${cursorVisible ? 'opacity-100' : 'opacity-0'} transition-opacity`} />
      </div>
    </div>
  );
}

// Generate realistic chart data
const generateChartData = () => {
  const data = [];
  let baseTraffic = 15000;
  for (let i = 0; i < 40; i++) {
    baseTraffic += (Math.random() - 0.5) * 2000;
    data.push({
      time: i,
      clean: Math.floor(baseTraffic),
      malicious: Math.floor(baseTraffic * (0.05 + Math.random() * 0.05)),
    });
  }
  return data;
};

export function TelemetryBento() {
  const [chartData, setChartData] = useState(generateChartData());
  const [activeAlerts, setActiveAlerts] = useState(3);
  const [latency, setLatency] = useState(12);

  useEffect(() => {
    const tick = setInterval(() => {
      setChartData((prev) => {
        const newData = [...prev.slice(1)];
        const last = newData[newData.length - 1];
        let nextClean = last.clean + (Math.random() - 0.5) * 1500;
        if (nextClean < 5000) nextClean = 5000;
        
        // Randomly spike malicious traffic to simulate attacks
        const isSpike = Math.random() > 0.9;
        const nextMalicious = isSpike ? nextClean * 0.4 : nextClean * (0.02 + Math.random() * 0.04);
        
        if (isSpike) setActiveAlerts(prev => Math.min(prev + 1, 9));
        
        newData.push({
          time: last.time + 1,
          clean: Math.floor(nextClean),
          malicious: Math.floor(nextMalicious),
        });
        return newData;
      });

      setLatency((prev) => Math.max(8, prev + Math.floor((Math.random() - 0.5) * 6)));
      
      if (Math.random() > 0.7) {
        setActiveAlerts(prev => Math.max(0, prev - 1));
      }
    }, 1000);
    return () => clearInterval(tick);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 w-full max-w-[1240px] mx-auto font-sans relative px-4">
      
      {/* 1. Primary Network Ingestion Graph (Large) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="md:col-span-8 rounded-[20px] bg-[#0a0a0a]/80 backdrop-blur-2xl border border-white/[0.06] p-6 flex flex-col relative overflow-hidden group shadow-[0_8px_30px_rgb(0,0,0,0.5)] glow-border"
      >
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none hidden sm:block">
          <Activity className="w-48 h-48 text-white blur-[80px]" />
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-0 mb-6 sm:mb-8 relative z-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)] animate-pulse" />
              <h3 className="text-white/30 text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase">Global Traffic Ingestion</h3>
            </div>
            <div className="text-[clamp(1.5rem,5vw,2.5rem)] font-bold text-white tracking-tighter tabular-nums flex items-end gap-3 leading-none">
              {(chartData[chartData.length - 1].clean / 1000).toFixed(1)}k <span className="text-[14px] sm:text-base text-white/30 font-normal mb-0.5 sm:mb-1 tracking-normal">req/s</span>
            </div>
          </div>
          <div className="w-full sm:w-auto bg-white/[0.03] backdrop-blur-md border border-white/5 rounded-xl p-2 px-3 flex gap-4 justify-between sm:justify-start">
             <div className="flex flex-col">
                <span className="text-[9px] text-white/30 uppercase">P99 Latency</span>
                <span className="text-xs sm:text-sm font-mono text-white tabular-nums tracking-tighter">{latency}ms</span>
             </div>
             <div className="w-px h-full bg-white/10" />
             <div className="flex flex-col">
                <span className="text-[9px] text-white/30 uppercase">Bandwidth</span>
                <span className="text-xs sm:text-sm font-mono text-white tabular-nums tracking-tighter">42.8Gbps</span>
             </div>
          </div>
        </div>

        <div className="flex-grow w-full h-[180px] sm:h-[220px] relative z-10 mt-auto">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorClean" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity={0.15}/>
                  <stop offset="100%" stopColor="#ffffff" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorMalicious" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity={0.25}/>
                  <stop offset="100%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <YAxis hide domain={['dataMin', 'dataMax']} />
              <Tooltip 
                cursor={{ stroke: 'rgba(255,255,255,0.05)', strokeWidth: 1, strokeDasharray: '4 4' }}
                contentStyle={{ backgroundColor: '#0A0A0A', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', fontSize: '11px' }}
                itemStyle={{ fontSize: '11px', fontFamily: 'monospace' }}
                labelStyle={{ display: 'none' }}
              />
              <Area type="monotone" dataKey="clean" stroke="#ffffff" strokeWidth={1.5} fillOpacity={1} fill="url(#colorClean)" />
              <Area type="monotone" dataKey="malicious" stroke="#ef4444" strokeWidth={1} fillOpacity={1} fill="url(#colorMalicious)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* 2. Live Threat Terminal (Sidebar) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="md:col-span-4 rounded-[20px] bg-[#0a0a0a]/80 backdrop-blur-2xl border border-white/[0.06] p-5 sm:p-6 flex flex-col shadow-[0_8px_30px_rgb(0,0,0,0.5)] h-[250px] sm:h-auto"
      >
        <div className="flex justify-between items-center pb-4 border-b border-white/5 mb-4">
          <div className="flex items-center gap-2">
            <TerminalIcon className="w-4 h-4 text-white/40" />
            <span className="text-white/50 text-[10px] sm:text-xs font-semibold tracking-wider uppercase">WAF Log Stream</span>
          </div>
          <div className="flex items-center gap-1.5 bg-red-500/10 px-2 py-0.5 rounded text-[10px] text-red-400 font-mono border border-red-500/20">
            <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
            LIVE
          </div>
        </div>
        <div className="flex-grow bg-[#050505] rounded-xl border border-white/5 p-3 sm:p-4 overflow-hidden">
          <TerminalFeed />
        </div>
      </motion.div>

      {/* 3. Threat Mitigation Protocol */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="md:col-span-4 rounded-[20px] bg-[#0a0a0a]/80 backdrop-blur-2xl border border-white/[0.06] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.5)] relative overflow-hidden"
      >
        <div className="absolute -right-4 -bottom-4 opacity-5">
          <Shield className="w-40 h-40 text-white" />
        </div>
        <h3 className="text-white/30 text-[11px] font-semibold tracking-[0.2em] uppercase mb-6 flex items-center gap-2">
          <Lock className="w-3.5 h-3.5" /> Mitigation Core
        </h3>
        <div className="text-4xl sm:text-5xl font-semibold text-white tracking-tighter tabular-nums mb-2">
          99.99<span className="text-xl sm:text-2xl text-white/30">%</span>
        </div>
        <div className="text-xs sm:text-sm text-white/50 mb-6">Zero-Day Interception Rate</div>
        
        <div className="space-y-3">
          {[
            { label: "DDoS L7", val: "Active", color: "text-emerald-400" },
            { label: "Bot Management", val: "Enforcing", color: "text-emerald-400" },
            { label: "API Abuse", val: "Detecting", color: "text-blue-400" }
          ].map(sys => (
            <div key={sys.label} className="flex justify-between items-center text-[10px] sm:text-xs border-b border-white/5 pb-2 last:border-0 last:pb-0">
              <span className="text-white/40">{sys.label}</span>
              <span className={`font-mono ${sys.color} flex items-center gap-1.5`}>
                <span className="w-1 h-1 rounded-full bg-current animate-pulse" />
                {sys.val}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 4. Infrastructure Topology */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="md:col-span-8 rounded-[20px] bg-[#0a0a0a]/80 backdrop-blur-2xl border border-white/[0.06] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.5)] flex flex-col md:flex-row items-center gap-8 relative overflow-hidden"
      >
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
        
        <div className="flex-1 relative z-10 w-full">
          <h3 className="text-white/30 text-[11px] font-semibold tracking-[0.2em] uppercase mb-4 flex items-center gap-2">
            <Cpu className="w-3.5 h-3.5" /> Edge Architecture
          </h3>
          <div className="text-white text-lg font-medium tracking-tight leading-tight mb-2">
            Distributed Defense Network
          </div>
          <p className="text-white/40 text-[13px] sm:text-sm leading-relaxed max-w-sm mb-6">
            Traffic is intelligently routed through 300+ PoPs allowing continuous analysis without latency degradation.
          </p>
          
          <div className="flex gap-4">
            <div className="bg-white/[0.03] border border-white/5 rounded-lg px-3 py-2 flex items-center gap-3 flex-1 sm:flex-none group hover:border-white/10 transition-colors">
               <Server className="w-4 h-4 text-white/40 group-hover:text-white/70 transition-colors" />
               <div>
                 <div className="text-[10px] text-white/30 uppercase">Nodes Live</div>
                 <div className="text-sm font-semibold text-white">312</div>
               </div>
            </div>
            <div className="bg-white/[0.03] border border-white/5 rounded-lg px-3 py-2 flex items-center gap-3 flex-1 sm:flex-none group hover:border-white/10 transition-colors">
               <Zap className="w-4 h-4 text-white/40 group-hover:text-white/70 transition-colors" />
               <div>
                 <div className="text-[10px] text-white/30 uppercase">Uptime</div>
                 <div className="text-sm font-semibold text-white">99.999%</div>
               </div>
            </div>
          </div>
        </div>

        {/* Abstract Visualization */}
        <div className="w-full md:w-1/2 h-[140px] sm:h-[160px] relative z-10 flex items-center justify-center">
          <div className="w-full h-full relative border border-white/[0.06] rounded-xl bg-[#050505] overflow-hidden flex items-center justify-center">
            {/* Animated connection lines radiating out */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute w-full h-full"
            >
              <div className="absolute w-[80%] h-px bg-white/[0.06] rotate-45 top-1/2 left-[10%]" />
              <div className="absolute w-[80%] h-px bg-white/[0.06] -rotate-45 top-1/2 left-[10%]" />
              <div className="absolute w-[80%] h-px bg-white/[0.04] rotate-[22.5deg] top-1/2 left-[10%]" />
              <div className="absolute w-[80%] h-px bg-white/[0.04] -rotate-[22.5deg] top-1/2 left-[10%]" />
            </motion.div>

            {/* Pulsing nodes */}
            <div className="absolute flex gap-12 sm:gap-16">
               {[0, 1, 2].map((i) => (
                 <motion.div
                   key={i}
                   animate={{
                     scale: [1, 1.5, 1],
                     opacity: [0.3, 0.8, 0.3],
                   }}
                   transition={{
                     duration: 2,
                     repeat: Infinity,
                     delay: i * 0.5,
                   }}
                   className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                 />
               ))}
            </div>

            {/* Central shield */}
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 15px rgba(255,255,255,0.05)",
                  "0 0 30px rgba(255,255,255,0.1)",
                  "0 0 15px rgba(255,255,255,0.05)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-10 h-10 sm:w-12 sm:h-12 bg-white/[0.06] backdrop-blur-md border border-white/15 rounded-xl flex items-center justify-center relative z-20"
            >
              <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white/70" />
            </motion.div>

            <div className="absolute bottom-2 left-3 flex items-center gap-2">
               <Wifi className="w-3 h-3 text-white/20" />
               <span className="text-[10px] text-white/20 font-mono tracking-wider uppercase">CORE-ALIGN</span>
            </div>
          </div>
        </div>
      </motion.div>

    </div>
  );
}
