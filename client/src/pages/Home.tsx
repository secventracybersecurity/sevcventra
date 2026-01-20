import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "wouter";
import { 
  Shield, 
  Globe, 
  Cloud, 
  Network, 
  Smartphone, 
  Target,
  ArrowRight,
  ChevronDown,
  Lock,
  Eye,
  Zap,
  Plus,
  Minus,
  Quote
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AnimatedSection, AnimatedText, GlassCard } from "@/components/AnimatedSection";

const services = [
  {
    icon: Globe,
    title: "Web App Pentesting",
    description: "Comprehensive security assessment of your web applications to identify vulnerabilities before attackers do.",
  },
  {
    icon: Shield,
    title: "API Security",
    description: "Deep analysis of API endpoints, authentication flows, and data exposure risks.",
  },
  {
    icon: Cloud,
    title: "Cloud Security",
    description: "AWS, Azure, and GCP security assessments to protect your cloud infrastructure.",
  },
  {
    icon: Network,
    title: "Network Pentesting",
    description: "Internal and external network penetration testing to secure your perimeter.",
  },
  {
    icon: Smartphone,
    title: "Mobile Pentesting",
    description: "iOS and Android application security testing for mobile-first enterprises.",
  },
  {
    icon: Target,
    title: "Red Teaming",
    description: "Adversarial simulation exercises that test your entire security posture.",
  },
];

const stats = [
  { value: "15+", label: "Years Experience" },
  { value: "500+", label: "Enterprises Protected" },
  { value: "10K+", label: "Vulnerabilities Found" },
  { value: "99.9%", label: "Client Retention" },
];

const trustKeywords = [
  "Data Protection",
  "Network Security",
  "Threat Detection", 
  "Encryption",
  "Compliance",
  "Risk Assessment",
  "Incident Response",
  "Security Audit",
];

const faqs = [
  {
    question: "What is Penetration Testing?",
    answer: "Penetration testing is a simulated cyber attack against your systems to identify exploitable vulnerabilities. Our expert team uses the same techniques as real attackers to find security gaps before malicious actors can exploit them."
  },
  {
    question: "How long does an assessment take?",
    answer: "Typical assessments range from 5-15 days depending on scope. We offer expedited timelines for urgent needs and provide preliminary findings within the first few days for critical issues."
  },
  {
    question: "What industries do you serve?",
    answer: "We work with Fortune 500 enterprises across finance, healthcare, technology, retail, and government sectors. Our methodologies are tailored to meet industry-specific compliance requirements like PCI-DSS, HIPAA, and SOC 2."
  },
  {
    question: "Do you provide remediation support?",
    answer: "Yes. Beyond identifying vulnerabilities, we provide detailed remediation guidance, developer workshops, and free retesting after fixes are implemented to ensure issues are properly resolved."
  },
];

const testimonials = [
  {
    quote: "Secventra found critical vulnerabilities that three other firms missed. Their thoroughness is absolutely unmatched in the industry.",
    author: "Sarah Chen",
    role: "CISO",
    company: "Fortune 500 Tech Company"
  },
  {
    quote: "The quality of their reports and the expertise of their team exceeded all our expectations. A true partner in security.",
    author: "Michael Rodriguez",
    role: "VP of Engineering", 
    company: "Leading Fintech Startup"
  },
  {
    quote: "They don't just find vulnerabilities—they help us understand and fix them. Outstanding professionalism throughout.",
    author: "Dr. Emily Watson",
    role: "Security Director",
    company: "Global Healthcare Provider"
  },
];

function MarqueeBand() {
  return (
    <div className="relative overflow-hidden py-6 bg-gradient-to-r from-blue-500/10 via-blue-500/5 to-blue-500/10 border-y border-white/5">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...trustKeywords, ...trustKeywords, ...trustKeywords].map((keyword, index) => (
          <span key={index} className="mx-8 text-white/40 font-medium tracking-wider uppercase text-sm flex items-center gap-3">
            <Shield className="w-4 h-4 text-blue-400/60" />
            {keyword}
          </span>
        ))}
      </div>
    </div>
  );
}

function FAQItem({ question, answer, isOpen, onClick }: { 
  question: string; 
  answer: string; 
  isOpen: boolean; 
  onClick: () => void;
}) {
  return (
    <div className="border-b border-white/10 last:border-0">
      <button
        onClick={onClick}
        className="w-full py-6 flex items-center justify-between text-left"
        data-testid={`faq-${question.slice(0, 20).replace(/\s+/g, '-').toLowerCase()}`}
      >
        <span className="text-lg font-medium text-white/90 pr-4">
          {question}
        </span>
        <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
          {isOpen ? (
            <Minus className="w-5 h-5 text-blue-400" />
          ) : (
            <Plus className="w-5 h-5 text-blue-400" />
          )}
        </div>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <p className="pb-6 text-white/50 leading-relaxed pr-12">
          {answer}
        </p>
      </motion.div>
    </div>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const [openFAQ, setOpenFAQ] = useState<number>(0);

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -50]);

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-transparent to-transparent" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[128px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,hsl(222,47%,4%)_70%)]" />
        </div>

        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="relative z-10 max-w-6xl mx-auto px-6 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-8"
            >
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-blue-400 font-medium text-sm">Trusted by Fortune 500 Enterprises</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-[0.9]"
            >
              <span className="block text-white">Cyber Protection</span>
              <span className="block bg-gradient-to-r from-blue-400 via-blue-300 to-amber-400 bg-clip-text text-transparent">
                You Can Trust
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto mb-12 leading-relaxed"
            >
              World-class penetration testing and offensive security for enterprises that demand excellence.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-blue-500 text-white font-semibold"
                  data-testid="button-hero-contact"
                >
                  Start Your Assessment
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/services">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/20 bg-white/5 backdrop-blur-sm text-white"
                  data-testid="button-hero-services"
                >
                  Explore Services
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-white/40"
            >
              <ChevronDown className="w-8 h-8" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Marquee Trust Band */}
      <MarqueeBand />

      {/* Stats Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-amber-500/5" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <AnimatedSection key={stat.label} delay={index * 0.15}>
                <div className="text-center">
                  <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-amber-400 bg-clip-text text-transparent mb-3">
                    {stat.value}
                  </div>
                  <div className="text-white/50 text-sm uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 relative">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[150px]" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <AnimatedSection className="text-center mb-20">
            <p className="text-blue-400 font-medium mb-4 tracking-widest uppercase text-sm">
              Our Services
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Advanced Threat<br />Detection & Protection
            </h2>
            <p className="text-xl text-white/50 max-w-2xl mx-auto">
              From application security to red team operations, we cover every attack surface.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <AnimatedSection key={service.title} delay={index * 0.1}>
                <GlassCard className="p-8 h-full">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-amber-500/10 flex items-center justify-center mb-6">
                    <service.icon className="w-8 h-8 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white">
                    {service.title}
                  </h3>
                  <p className="text-white/50 leading-relaxed">
                    {service.description}
                  </p>
                </GlassCard>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="text-center mt-12" delay={0.6}>
            <Link href="/services">
              <Button
                variant="outline"
                size="lg"
                className="border-white/20 bg-white/5 text-white"
                data-testid="button-view-all-services"
              >
                View All Services
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-32 relative">
        <div className="absolute inset-0">
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[150px]" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <p className="text-blue-400 font-medium mb-4 tracking-widest uppercase text-sm">
                Why Secventra
              </p>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Driving Growth with<br />Our Expertise
              </h2>
              <p className="text-xl text-white/50 mb-8 leading-relaxed">
                Our team of elite security researchers brings decades of combined experience in finding and exploiting vulnerabilities that others miss.
              </p>
              <div className="space-y-6">
                {[
                  { icon: Lock, title: "Your Digital Shield", description: "Comprehensive protection for all digital assets" },
                  { icon: Eye, title: "Experts in Security", description: "Industry-leading specialists on your side" },
                  { icon: Zap, title: "Rapid Response", description: "24/7 monitoring and incident response" },
                ].map((item, index) => (
                  <AnimatedText key={item.title} delay={index * 0.1}>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-amber-500/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1 text-white">{item.title}</h4>
                        <p className="text-white/50">{item.description}</p>
                      </div>
                    </div>
                  </AnimatedText>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <GlassCard className="p-1 overflow-hidden" hover={false}>
                <div className="aspect-square rounded-xl bg-gradient-to-br from-gray-900 to-background flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px]" />
                  <div className="relative text-center p-8">
                    <Shield className="w-24 h-24 text-blue-400 mx-auto mb-6" />
                    <p className="text-2xl font-bold mb-2 text-white">Enterprise Grade</p>
                    <p className="text-white/50">Security Solutions</p>
                  </div>
                </div>
              </GlassCard>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <AnimatedSection className="text-center mb-16">
            <p className="text-blue-400 font-medium mb-4 tracking-widest uppercase text-sm">
              Client Testimonials
            </p>
            <h2 className="text-4xl md:text-5xl font-bold">
              Unmatched Service,<br />Unbreakable Protection
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <GlassCard className="p-8 h-full flex flex-col relative">
                  <Quote className="w-10 h-10 text-blue-400/20 mb-4" />
                  <p className="text-white/70 leading-relaxed flex-1 mb-6 text-lg">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-4">
                    <Avatar className="w-12 h-12 bg-gradient-to-br from-blue-500/30 to-amber-500/20">
                      <AvatarFallback className="bg-transparent text-lg font-bold text-white">
                        {testimonial.author[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-white">{testimonial.author}</div>
                      <div className="text-white/40 text-sm">{testimonial.role}, {testimonial.company}</div>
                    </div>
                  </div>
                </GlassCard>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 relative">
        <div className="max-w-4xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <p className="text-blue-400 font-medium mb-4 tracking-widest uppercase text-sm">
              How Do We Operate?
            </p>
            <h2 className="text-4xl md:text-5xl font-bold">
              Frequently Asked<br />Questions
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <GlassCard className="p-8" hover={false}>
              {faqs.map((faq, index) => (
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openFAQ === index}
                  onClick={() => setOpenFAQ(openFAQ === index ? -1 : index)}
                />
              ))}
            </GlassCard>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <AnimatedSection>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Ready to Secure<br />Your Digital Assets?
            </h2>
            <p className="text-xl text-white/50 mb-12 max-w-2xl mx-auto">
              Join the world's most security-conscious enterprises. Let our experts identify your vulnerabilities before attackers do.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-blue-500 text-white font-semibold"
                  data-testid="button-cta-contact"
                >
                  Schedule a Consultation
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/case-studies">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/20 bg-white/5 text-white"
                  data-testid="button-cta-case-studies"
                >
                  View Case Studies
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
