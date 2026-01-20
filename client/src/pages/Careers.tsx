import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "wouter";
import {
  MapPin,
  Clock,
  DollarSign,
  ChevronDown,
  Users,
  Zap,
  Shield,
  Globe,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSection, GlassCard } from "@/components/AnimatedSection";

const benefits = [
  {
    icon: DollarSign,
    title: "Competitive Compensation",
    description: "Top-of-market salaries, equity, and performance bonuses",
  },
  {
    icon: Globe,
    title: "Remote-First Culture",
    description: "Work from anywhere with flexible schedules",
  },
  {
    icon: Zap,
    title: "Learning Budget",
    description: "$5,000 annual budget for conferences and certifications",
  },
  {
    icon: Shield,
    title: "Health & Wellness",
    description: "Comprehensive health, dental, and vision coverage",
  },
];

const openPositions = [
  {
    id: 1,
    title: "Senior Penetration Tester",
    department: "Security Operations",
    location: "Remote (US/EU)",
    type: "Full-time",
    description: "Lead complex security assessments for Fortune 500 clients. Requires 5+ years of penetration testing experience.",
    requirements: [
      "5+ years of penetration testing experience",
      "OSCP, OSCE, or equivalent certifications",
      "Experience with web, mobile, and network testing",
      "Strong written and verbal communication skills",
      "Ability to work independently and lead small teams",
    ],
  },
  {
    id: 2,
    title: "Red Team Operator",
    department: "Adversarial Simulation",
    location: "Remote (Global)",
    type: "Full-time",
    description: "Conduct full-scope red team operations simulating advanced threat actors. Requires offensive security background.",
    requirements: [
      "3+ years of red team or offensive security experience",
      "Experience with C2 frameworks and custom tooling",
      "Knowledge of evasion techniques and OPSEC",
      "Background in social engineering and physical security",
      "Active security clearance preferred",
    ],
  },
  {
    id: 3,
    title: "Cloud Security Researcher",
    department: "Research & Development",
    location: "Remote (US/EU)",
    type: "Full-time",
    description: "Research and develop novel attack techniques for cloud environments. Contribute to internal tools and methodologies.",
    requirements: [
      "Deep expertise in AWS, Azure, or GCP security",
      "Experience with container and Kubernetes security",
      "Published research or CVEs preferred",
      "Programming skills in Python, Go, or similar",
      "Passion for offensive security research",
    ],
  },
  {
    id: 4,
    title: "Security Engineer - Tooling",
    department: "Engineering",
    location: "Remote (Global)",
    type: "Full-time",
    description: "Build and maintain internal security tools and automation platforms. Support our assessment teams with custom solutions.",
    requirements: [
      "3+ years of software engineering experience",
      "Proficiency in Python, Go, or Rust",
      "Understanding of security concepts and tools",
      "Experience with CI/CD and cloud infrastructure",
      "Interest in offensive security tooling",
    ],
  },
];

function JobCard({ job }: { job: typeof openPositions[0] }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <GlassCard className="overflow-hidden" hover={false}>
      <div
        className="p-6 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
        data-testid={`button-job-${job.id}`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
            <div className="flex flex-wrap items-center gap-4 text-sm text-white/50">
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {job.department}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {job.location}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {job.type}
              </span>
            </div>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-6 h-6 text-white/40" />
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={false}
        animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-6 border-t border-white/5 pt-6">
          <p className="text-white/60 mb-6">{job.description}</p>
          
          <h4 className="text-sm font-semibold text-white/40 uppercase tracking-wider mb-4">
            Requirements
          </h4>
          <ul className="space-y-2 mb-6">
            {job.requirements.map((req, index) => (
              <li key={index} className="flex items-start gap-3 text-white/60">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                {req}
              </li>
            ))}
          </ul>

          <Link href="/contact">
            <Button
              className="bg-blue-500 text-black font-semibold"
              data-testid={`button-apply-${job.id}`}
            >
              Apply Now
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </motion.div>
    </GlassCard>
  );
}

export default function Careers() {
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
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 via-transparent to-transparent" />
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[128px]" />
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
            className="text-indigo-400 font-medium mb-6 tracking-widest uppercase text-sm"
          >
            Join Our Team
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-8"
          >
            Build the Future of<br />
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Cybersecurity
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl text-white/60 max-w-2xl mx-auto"
          >
            Join a team of elite security researchers making the digital world safer.
          </motion.p>
        </motion.div>
      </section>

      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Join Secventra?</h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              We invest in our people as much as we invest in our craft.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <AnimatedSection key={benefit.title} delay={index * 0.1}>
                <GlassCard className="p-6 text-center h-full">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-white/50 text-sm">{benefit.description}</p>
                </GlassCard>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/5 to-transparent" />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <AnimatedSection className="text-center mb-16">
            <p className="text-blue-400 font-medium mb-4 tracking-widest uppercase text-sm">
              Open Positions
            </p>
            <h2 className="text-3xl md:text-4xl font-bold">Current Openings</h2>
          </AnimatedSection>

          <div className="space-y-4">
            {openPositions.map((job, index) => (
              <AnimatedSection key={job.id} delay={index * 0.1}>
                <JobCard job={job} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 relative">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Don't See Your Role?
            </h2>
            <p className="text-xl text-white/50 mb-12 max-w-2xl mx-auto">
              We're always looking for exceptional talent. Send us your resume and tell us how you can contribute.
            </p>
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-blue-500 text-black font-semibold"
                data-testid="button-careers-contact"
              >
                Get in Touch
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
