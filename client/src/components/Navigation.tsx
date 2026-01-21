import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Shield, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/why-us", label: "Why Us" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/careers", label: "Careers" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Navigation() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top and close mobile menu on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-md border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <Link href="/">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-3 cursor-pointer"
                data-testid="link-logo"
              >
                <div className="relative">
                  <Shield className="w-8 h-8 text-blue-400" />
                  <div className="absolute inset-0 bg-blue-400/30 blur-lg" />
                </div>
                <span className="text-xl font-bold tracking-tight">
                  Secventra
                </span>
              </motion.div>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <Button
                    variant="ghost"
                    className={`text-sm font-medium ${
                      location === link.href
                        ? "text-blue-400"
                        : "text-white/70"
                    }`}
                    data-testid={`link-nav-${link.label.toLowerCase().replace(" ", "-")}`}
                  >
                    {link.label}
                  </Button>
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <Link href="/contact">
                <Button
                  className="hidden sm:flex bg-blue-500 text-black font-semibold"
                  data-testid="button-get-started"
                >
                  Get Started
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden text-white/70"
                data-testid="button-mobile-menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-background/95 backdrop-blur-xl"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <div className="absolute top-20 left-6 w-32 h-32 bg-blue-500/20 rounded-full blur-[80px]" />
            <div className="absolute bottom-40 right-10 w-40 h-40 bg-amber-500/10 rounded-full blur-[100px]" />
            <motion.nav
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="relative pt-24 px-6 h-full overflow-y-auto"
            >
              <div className="flex flex-col gap-1">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -30, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ 
                      delay: 0.05 + index * 0.04,
                      type: "spring",
                      stiffness: 300,
                      damping: 25
                    }}
                  >
                    <Link href={link.href}>
                      <motion.div
                        whileTap={{ scale: 0.98, x: 5 }}
                        className={`flex items-center justify-between py-4 px-4 rounded-xl transition-colors ${
                          location === link.href
                            ? "bg-blue-500/20 border border-blue-500/30"
                            : "active:bg-white/5"
                        }`}
                        data-testid={`link-mobile-${link.label.toLowerCase().replace(" ", "-")}`}
                        aria-current={location === link.href ? "page" : undefined}
                      >
                        <span
                          className={`text-xl font-semibold ${
                            location === link.href
                              ? "text-blue-400"
                              : "text-white/80"
                          }`}
                        >
                          {link.label}
                        </span>
                        <ChevronRight 
                          className={`w-5 h-5 ${
                            location === link.href
                              ? "text-blue-400"
                              : "text-white/40"
                          }`}
                        />
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-8 px-4"
              >
                <Link href="/contact">
                  <Button
                    className="w-full bg-blue-500 text-black font-semibold h-14 text-lg"
                    data-testid="button-mobile-get-started"
                  >
                    Get Started Today
                  </Button>
                </Link>
                <p className="text-center text-sm text-white/40 mt-4">
                  Enterprise Security Solutions
                </p>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
