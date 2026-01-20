import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "wouter";
import {
  Globe,
  Shield,
  Cloud,
  Network,
  Smartphone,
  Target,
  ArrowRight,
  Check,
  Code,
  Lock,
  Search,
  FileWarning,
  Server,
  Layers
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSection, GlassCard } from "@/components/AnimatedSection";

const services = [
  {
    id: "web",
    icon: Globe,
    title: "Web Application Pentesting",
    tagline: "Secure Your Digital Frontline",
    description: "Comprehensive security assessment of your web applications using manual testing techniques and custom tools to uncover vulnerabilities that automated scanners miss.",
    features: [
      "OWASP Top 10 vulnerability assessment",
      "Business logic flaw detection",
      "Authentication & session management testing",
      "Input validation & injection testing",
      "API endpoint security review",
      "Source code review (optional)",
    ],
    methodology: ["Reconnaissance", "Mapping", "Discovery", "Exploitation", "Reporting"],
    gradient: "from-blue-500/20 to-blue-500/20",
  },
  {
    id: "api",
    icon: Code,
    title: "API Security Testing",
    tagline: "Protect Your Digital Backbone",
    description: "Deep analysis of REST, GraphQL, and SOAP APIs to identify authentication flaws, data exposure risks, and injection vulnerabilities.",
    features: [
      "Authentication & authorization testing",
      "Rate limiting & throttling analysis",
      "Data exposure assessment",
      "Injection vulnerability testing",
      "API versioning security review",
      "Documentation & schema analysis",
    ],
    methodology: ["Discovery", "Authentication", "Authorization", "Injection", "Logic"],
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    id: "cloud",
    icon: Cloud,
    title: "Cloud Security Assessment",
    tagline: "Secure Your Cloud Infrastructure",
    description: "Comprehensive security assessment of AWS, Azure, and GCP environments to identify misconfigurations and security gaps.",
    features: [
      "IAM policy review & privilege escalation testing",
      "Storage bucket security assessment",
      "Network security group analysis",
      "Secrets management review",
      "Container & Kubernetes security",
      "Serverless function security",
    ],
    methodology: ["Inventory", "Configuration", "Access", "Data", "Monitoring"],
    gradient: "from-amber-500/20 to-blue-500/20",
  },
  {
    id: "network",
    icon: Network,
    title: "Network Penetration Testing",
    tagline: "Defend Your Perimeter",
    description: "Internal and external network penetration testing to identify vulnerabilities in your network infrastructure and security controls.",
    features: [
      "External perimeter testing",
      "Internal network assessment",
      "Wireless security testing",
      "Firewall & IDS/IPS bypass testing",
      "Active Directory security review",
      "Lateral movement simulation",
    ],
    methodology: ["Scanning", "Enumeration", "Exploitation", "Pivoting", "Persistence"],
    gradient: "from-orange-500/20 to-red-500/20",
  },
  {
    id: "mobile",
    icon: Smartphone,
    title: "Mobile Application Pentesting",
    tagline: "Secure Mobile-First Experiences",
    description: "In-depth security assessment of iOS and Android applications, including static and dynamic analysis.",
    features: [
      "Static & dynamic analysis",
      "Binary protection assessment",
      "Data storage security review",
      "Network communication analysis",
      "Authentication mechanism testing",
      "Third-party library assessment",
    ],
    methodology: ["Static Analysis", "Dynamic Testing", "Network", "Storage", "Crypto"],
    gradient: "from-indigo-500/20 to-violet-500/20",
  },
  {
    id: "red-team",
    icon: Target,
    title: "Red Team Operations",
    tagline: "Test Your Complete Defense",
    description: "Full-scope adversarial simulation that tests your people, processes, and technology against real-world attack scenarios.",
    features: [
      "Social engineering campaigns",
      "Physical security assessment",
      "Advanced persistent threat simulation",
      "Detection & response testing",
      "Purple team exercises",
      "Executive tabletop exercises",
    ],
    methodology: ["Reconnaissance", "Weaponization", "Delivery", "Exploitation", "Actions"],
    gradient: "from-red-500/20 to-rose-500/20",
  },
];

export default function Services() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  return (
    <div className="bg-background min-h-screen">
      <section ref={heroRef} className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-transparent to-transparent" />
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-blue-500/10 rounded-full blur-[128px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_70%)]" />
        </div>

        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="relative z-10 max-w-4xl mx-auto px-6 text-center"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-blue-400 font-medium mb-6 tracking-widest uppercase text-sm"
          >
            Our Services
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-8"
          >
            Comprehensive<br />
            <span className="bg-gradient-to-r from-blue-400 to-amber-400 bg-clip-text text-transparent">
              Security Solutions
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl text-white/60 max-w-2xl mx-auto"
          >
            From web applications to red team operations, we provide end-to-end security assessment services.
          </motion.p>
        </motion.div>
      </section>

      {services.map((service, index) => (
        <section
          key={service.id}
          id={service.id}
          className="py-32 relative overflow-hidden"
        >
          <div className="absolute inset-0">
            <div className={`absolute ${index % 2 === 0 ? 'left-0' : 'right-0'} top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br ${service.gradient} rounded-full blur-[150px] opacity-30`} />
          </div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className={`grid lg:grid-cols-2 gap-16 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              <AnimatedSection className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center`}>
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-white/40 font-mono text-sm">0{index + 1}</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  {service.title}
                </h2>
                <p className="text-blue-400 font-medium mb-6">{service.tagline}</p>
                <p className="text-lg text-white/60 mb-8 leading-relaxed">
                  {service.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                      <span className="text-white/70 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link href="/contact">
                  <Button
                    className="bg-blue-500 text-black font-semibold"
                    data-testid={`button-service-${service.id}`}
                  >
                    Request Assessment
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </AnimatedSection>

              <AnimatedSection delay={0.2} className={index % 2 === 1 ? 'lg:order-1' : ''}>
                <GlassCard className="p-8" hover={false}>
                  <h4 className="text-sm font-semibold text-white/40 uppercase tracking-wider mb-6">
                    Methodology
                  </h4>
                  <div className="space-y-4">
                    {service.methodology.map((step, stepIndex) => (
                      <motion.div
                        key={step}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: stepIndex * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-4"
                      >
                        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-blue-400 font-mono text-sm">
                          {stepIndex + 1}
                        </div>
                        <div className="flex-1 h-px bg-gradient-to-r from-white/20 to-transparent" />
                        <span className="text-white/70 font-medium">{step}</span>
                      </motion.div>
                    ))}
                  </div>
                </GlassCard>
              </AnimatedSection>
            </div>
          </div>
        </section>
      ))}

      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/50 mb-12 max-w-2xl mx-auto">
              Contact our team to discuss your security needs and receive a customized assessment proposal.
            </p>
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-blue-500 text-black font-semibold"
                data-testid="button-services-cta"
              >
                Schedule Consultation
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
