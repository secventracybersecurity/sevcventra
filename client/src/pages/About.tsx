import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "wouter";
import { Shield, Target, Users, Award, Globe, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSection, GlassCard } from "@/components/AnimatedSection";

const values = [
  {
    icon: Target,
    title: "Precision",
    description: "Every assessment is meticulously executed with attention to detail that others miss.",
  },
  {
    icon: Shield,
    title: "Integrity",
    description: "We operate with the highest ethical standards, protecting your data as if it were our own.",
  },
  {
    icon: Users,
    title: "Partnership",
    description: "We work alongside your team, not just for you, fostering knowledge transfer and growth.",
  },
  {
    icon: Zap,
    title: "Innovation",
    description: "We continuously evolve our techniques to stay ahead of emerging threats.",
  },
];

const milestones = [
  { year: "2018", title: "Founded", description: "Started with a vision to redefine cybersecurity" },
  { year: "2019", title: "First Fortune 500 Client", description: "Secured our first enterprise engagement" },
  { year: "2020", title: "Team Expansion", description: "Grew to 25+ elite security researchers" },
  { year: "2021", title: "Global Reach", description: "Expanded operations to 15+ countries" },
  { year: "2022", title: "Industry Recognition", description: "Named top penetration testing firm" },
  { year: "2023", title: "500+ Enterprises", description: "Milestone of protecting 500+ organizations" },
];

const leadership = [
  {
    name: "Alex Chen",
    role: "CEO & Founder",
    bio: "Former NSA security researcher with 15+ years of experience",
  },
  {
    name: "Sarah Mitchell",
    role: "CTO",
    bio: "Led security at Fortune 100 tech companies",
  },
  {
    name: "Marcus Thompson",
    role: "Head of Red Team",
    bio: "Renowned offensive security expert and speaker",
  },
  {
    name: "Elena Rodriguez",
    role: "VP of Operations",
    bio: "Scaled security practices at global enterprises",
  },
];

export default function About() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  return (
    <div className="bg-background min-h-screen">
      <section ref={heroRef} className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 via-transparent to-transparent" />
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[128px]" />
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
            className="text-amber-400 font-medium mb-6 tracking-widest uppercase text-sm"
          >
            About Secventra
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-8"
          >
            Securing Tomorrow,<br />
            <span className="bg-gradient-to-r from-blue-400 to-amber-400 bg-clip-text text-transparent">
              Today.
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed"
          >
            We are a team of elite security researchers dedicated to protecting the world's most valuable digital assets through offensive security excellence.
          </motion.p>
        </motion.div>
      </section>

      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <p className="text-blue-400 font-medium mb-4 tracking-widest uppercase text-sm">
                Our Mission
              </p>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                To Make the Digital World Safer
              </h2>
              <p className="text-lg text-white/60 mb-6 leading-relaxed">
                In an era where cyber threats evolve daily, we believe that the best defense is understanding the attacker's perspective. Our mission is to identify and help remediate vulnerabilities before malicious actors can exploit them.
              </p>
              <p className="text-lg text-white/60 leading-relaxed">
                We combine deep technical expertise with a genuine commitment to our clients' success, delivering actionable insights that strengthen security postures across industries.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <GlassCard className="p-8" hover={false}>
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { value: "500+", label: "Enterprises Protected" },
                    { value: "50+", label: "Security Experts" },
                    { value: "15+", label: "Countries Served" },
                    { value: "10K+", label: "Vulnerabilities Found" },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-amber-400 bg-clip-text text-transparent mb-2">
                        {stat.value}
                      </div>
                      <div className="text-white/50 text-sm">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <AnimatedSection className="text-center mb-20">
            <p className="text-blue-400 font-medium mb-4 tracking-widest uppercase text-sm">
              Our Values
            </p>
            <h2 className="text-4xl md:text-5xl font-bold">
              What Drives Us
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <AnimatedSection key={value.title} delay={index * 0.1}>
                <GlassCard className="p-8 h-full text-center">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-amber-500/20 flex items-center justify-center mx-auto mb-6">
                    <value.icon className="w-7 h-7 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-white/50">{value.description}</p>
                </GlassCard>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-20">
            <p className="text-blue-400 font-medium mb-4 tracking-widest uppercase text-sm">
              Our Journey
            </p>
            <h2 className="text-4xl md:text-5xl font-bold">
              Building Excellence
            </h2>
          </AnimatedSection>

          <div className="relative">
            <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 via-blue-500/20 to-transparent hidden md:block" />
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <AnimatedSection key={milestone.year} delay={index * 0.1}>
                  <div className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                    <div className={`flex-1 ${index % 2 === 1 ? 'md:text-left' : 'md:text-right'}`}>
                      <div className="text-blue-400 font-mono text-sm mb-2">{milestone.year}</div>
                      <h3 className="text-2xl font-bold mb-2">{milestone.title}</h3>
                      <p className="text-white/50">{milestone.description}</p>
                    </div>
                    <div className="w-4 h-4 rounded-full bg-blue-500 relative z-10 ring-4 ring-black hidden md:block" />
                    <div className="flex-1" />
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[150px]" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <AnimatedSection className="text-center mb-20">
            <p className="text-blue-400 font-medium mb-4 tracking-widest uppercase text-sm">
              Leadership
            </p>
            <h2 className="text-4xl md:text-5xl font-bold">
              Meet Our Team
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadership.map((person, index) => (
              <AnimatedSection key={person.name} delay={index * 0.1}>
                <GlassCard className="p-6 text-center h-full">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500/30 to-amber-500/30 flex items-center justify-center mx-auto mb-4">
                    <Users className="w-10 h-10 text-white/50" />
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{person.name}</h3>
                  <p className="text-blue-400 text-sm mb-3">{person.role}</p>
                  <p className="text-white/50 text-sm">{person.bio}</p>
                </GlassCard>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Join Our Mission
            </h2>
            <p className="text-xl text-white/50 mb-12 max-w-2xl mx-auto">
              Whether you're looking to protect your organization or join our team of elite researchers, we'd love to connect.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-blue-500 text-black font-semibold"
                  data-testid="button-about-contact"
                >
                  Get in Touch
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/careers">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/20 bg-white/5 text-white"
                  data-testid="button-about-careers"
                >
                  View Careers
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
