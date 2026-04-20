import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "wouter";
import { Calendar, Clock, User, ArrowRight, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSection, GlassCard } from "@/components/AnimatedSection";

const featuredPost = {
  id: 1,
  title: "The Evolution of API Security: From OWASP Top 10 to Real-World Attack Patterns",
  excerpt: "An in-depth analysis of how API attack vectors have evolved and what organizations need to know to protect their digital backbone.",
  author: "Alex Chen",
  date: "January 15, 2024",
  readTime: "12 min read",
  category: "Research",
  image: null,
};

const blogPosts = [
  {
    id: 2,
    title: "Zero-Day Vulnerabilities in Enterprise Cloud Deployments",
    excerpt: "Our research team's findings on common misconfigurations that lead to critical vulnerabilities in AWS and Azure environments.",
    author: "Sarah Mitchell",
    date: "January 10, 2024",
    readTime: "8 min read",
    category: "Cloud Security",
  },
  {
    id: 3,
    title: "Red Team Chronicles: Lessons from 100 Engagements",
    excerpt: "Key insights and patterns we've observed across hundreds of red team operations with Fortune 500 companies.",
    author: "Marcus Thompson",
    date: "January 5, 2024",
    readTime: "15 min read",
    category: "Red Team",
  },
  {
    id: 4,
    title: "Mobile App Security: Beyond the Basics",
    excerpt: "Advanced techniques for identifying and exploiting vulnerabilities in iOS and Android applications.",
    author: "Elena Rodriguez",
    date: "December 28, 2023",
    readTime: "10 min read",
    category: "Mobile Security",
  },
  {
    id: 5,
    title: "The Rise of AI-Powered Attacks: What Security Teams Need to Know",
    excerpt: "How adversaries are leveraging artificial intelligence and what defensive strategies are emerging.",
    author: "Alex Chen",
    date: "December 20, 2023",
    readTime: "9 min read",
    category: "Threat Intelligence",
  },
  {
    id: 6,
    title: "Securing the Software Supply Chain",
    excerpt: "Best practices for protecting against supply chain attacks and dependency vulnerabilities.",
    author: "Sarah Mitchell",
    date: "December 15, 2023",
    readTime: "11 min read",
    category: "AppSec",
  },
  {
    id: 7,
    title: "Network Segmentation: Lessons from Lateral Movement",
    excerpt: "How proper network segmentation can prevent attackers from moving laterally through your environment.",
    author: "Marcus Thompson",
    date: "December 10, 2023",
    readTime: "7 min read",
    category: "Network Security",
  },
];

const categories = [
  "All",
  "Research",
  "Cloud Security",
  "Red Team",
  "Mobile Security",
  "AppSec",
  "Network Security",
  "Threat Intelligence",
];

export default function Blog() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  return (
    <div className="bg-transparent min-h-screen">
      <section ref={heroRef} className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-rose-500/10 via-transparent to-transparent" />
          <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-rose-500/10 rounded-full blur-[128px]" />
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
            className="text-rose-400 font-medium mb-6 tracking-widest uppercase text-sm"
          >
            Blog & Research
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-8"
          >
            Security<br />
            <span className="bg-gradient-to-r from-blue-400 to-rose-400 bg-clip-text text-transparent">
              Insights
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl text-white/60 max-w-2xl mx-auto"
          >
            Research, analysis, and insights from our team of elite security researchers.
          </motion.p>
        </motion.div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <GlassCard className="p-8 md:p-12" hover={false}>
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-1/2">
                  <div className="aspect-video bg-gradient-to-br from-rose-500/20 to-blue-500/20 rounded-xl flex items-center justify-center">
                    <div className="text-6xl font-bold text-white/20">Featured</div>
                  </div>
                </div>
                <div className="lg:w-1/2 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-rose-500/20 text-rose-400 text-xs font-medium rounded-full">
                      {featuredPost.category}
                    </span>
                    <span className="text-white/40 text-sm">Featured</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">{featuredPost.title}</h2>
                  <p className="text-white/60 mb-6 leading-relaxed">{featuredPost.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-white/40 mb-6">
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {featuredPost.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {featuredPost.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {featuredPost.readTime}
                    </span>
                  </div>
                  <Button
                    className="bg-blue-500 text-black font-semibold w-fit"
                    data-testid="button-read-featured"
                  >
                    Read Article
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>
            </GlassCard>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="mb-12">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={category === "All" ? "default" : "ghost"}
                  className={`rounded-full ${category === "All"
                      ? "bg-blue-500 text-black"
                      : "bg-white/5 text-white/60"
                    }`}
                  data-testid={`button-category-${category.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post, index) => (
              <AnimatedSection key={post.id} delay={index * 0.1}>
                <GlassCard className="h-full flex flex-col">
                  <div className="aspect-video bg-gradient-to-br from-white/5 to-white/10 rounded-t-2xl" />
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-0.5 bg-white/10 text-white/60 text-xs font-medium rounded">
                        {post.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold mb-3 text-white">
                      {post.title}
                    </h3>
                    <p className="text-white/50 text-sm mb-4 flex-1 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-white/40">
                      <span>{post.author}</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </GlassCard>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              className="border-white/20 bg-white/5 text-white"
              data-testid="button-load-more"
            >
              Load More Articles
            </Button>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Stay Updated
            </h2>
            <p className="text-xl text-white/50 mb-8 max-w-2xl mx-auto">
              Subscribe to receive the latest security research and insights directly to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-blue-500 transition-colors"
                data-testid="input-newsletter-email"
              />
              <Button
                className="bg-blue-500 text-black font-semibold px-6"
                data-testid="button-subscribe"
              >
                Subscribe
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
