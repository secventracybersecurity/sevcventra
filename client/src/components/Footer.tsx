import { Link } from "wouter";
import { Shield, Linkedin, Twitter, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

const footerLinks = {
  services: [
    { label: "Web App Pentesting", href: "/services#web" },
    { label: "API Security", href: "/services#api" },
    { label: "Cloud Security", href: "/services#cloud" },
    { label: "Network Pentesting", href: "/services#network" },
    { label: "Mobile Pentesting", href: "/services#mobile" },
    { label: "Red Teaming", href: "/services#red-team" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Why Choose Us", href: "/why-us" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Careers", href: "/careers" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-background border-t border-white/5">
      {/* Mobile compact footer */}
      <div className="md:hidden px-4 py-8">
        <div className="flex items-center justify-between mb-4">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer" data-testid="link-footer-logo-mobile">
              <Shield className="w-6 h-6 text-blue-400" />
              <span className="text-lg font-bold">Secventra</span>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full bg-white/5" asChild>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" data-testid="link-linkedin-mobile">
                <Linkedin className="w-4 h-4 text-white/50" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full bg-white/5" asChild>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" data-testid="link-twitter-mobile">
                <Twitter className="w-4 h-4 text-white/50" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full bg-white/5" asChild>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" data-testid="link-github-mobile">
                <Github className="w-4 h-4 text-white/50" />
              </a>
            </Button>
          </div>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/40 mb-3">
          {footerLinks.company.slice(0, 4).map((link) => (
            <Link key={link.href} href={link.href}>
              <span className="cursor-pointer">{link.label}</span>
            </Link>
          ))}
        </div>
        <div className="flex flex-wrap gap-x-3 text-xs text-white/30">
          {footerLinks.legal.map((link) => (
            <Link key={link.href} href={link.href}>
              <span className="cursor-pointer">{link.label}</span>
            </Link>
          ))}
        </div>
        <div className="mt-4 pt-3 border-t border-white/5 text-center">
          <p className="text-white/30 text-xs">© {new Date().getFullYear()} Secventra. All rights reserved.</p>
        </div>
      </div>

      {/* Desktop full footer */}
      <div className="hidden md:block max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div className="lg:col-span-1">
            <Link href="/">
              <div className="flex items-center gap-3 mb-6 cursor-pointer" data-testid="link-footer-logo">
                <div className="relative">
                  <Shield className="w-8 h-8 text-blue-400" />
                  <div className="absolute inset-0 bg-blue-400/30 blur-lg" />
                </div>
                <span className="text-xl font-bold tracking-tight">Secventra</span>
              </div>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Securing Tomorrow, Today. Elite penetration testing and offensive
              security services for enterprise clients worldwide.
            </p>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-white/5 border border-white/10 text-white/50"
                asChild
              >
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="link-linkedin"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-white/5 border border-white/10 text-white/50"
                asChild
              >
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="link-twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-white/5 border border-white/10 text-white/50"
                asChild
              >
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="link-github"
                >
                  <Github className="w-5 h-5" />
                </a>
              </Button>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-6 uppercase tracking-wider">
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span
                      className="text-white/50 text-sm cursor-pointer"
                      data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-6 uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span
                      className="text-white/50 text-sm cursor-pointer"
                      data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-6 uppercase tracking-wider">
              Legal
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span
                      className="text-white/50 text-sm cursor-pointer"
                      data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Secventra. All rights reserved.
          </p>
          <p className="text-white/40 text-sm">
            Built with security in mind.
          </p>
        </div>
      </div>
    </footer>
  );
}
