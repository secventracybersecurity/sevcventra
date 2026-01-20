import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MapPin, Mail, Phone, Clock, Send, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSection, GlassCard } from "@/components/AnimatedSection";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { insertContactSchema, type InsertContact } from "@shared/schema";

const contactFormSchema = insertContactSchema.extend({
  name: insertContactSchema.shape.name.min(2, "Name must be at least 2 characters"),
  email: insertContactSchema.shape.email.email("Please enter a valid email address"),
  message: insertContactSchema.shape.message.min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = InsertContact;

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "hello@secventra.com",
    description: "We'll respond within 24 hours",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+1 (555) 123-4567",
    description: "Mon-Fri, 9am-6pm EST",
  },
  {
    icon: MapPin,
    title: "Headquarters",
    value: "San Francisco, CA",
    description: "Global remote team",
  },
  {
    icon: Clock,
    title: "Response Time",
    value: "< 24 hours",
    description: "For all inquiries",
  },
];

export default function Contact() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      service: "",
      message: "",
    },
  });

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormValues) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message Sent",
        description: "Thank you for reaching out. We'll be in touch soon.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    contactMutation.mutate(data);
  };

  return (
    <div className="bg-black min-h-screen">
      <section ref={heroRef} className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-teal-500/10 via-transparent to-transparent" />
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-teal-500/10 rounded-full blur-[128px]" />
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
            className="text-teal-400 font-medium mb-6 tracking-widest uppercase text-sm"
            data-testid="text-contact-subtitle"
          >
            Contact Us
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-8"
            data-testid="text-contact-title"
          >
            Let's Secure<br />
            <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
              Your Future
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl text-white/60 max-w-2xl mx-auto"
            data-testid="text-contact-description"
          >
            Ready to strengthen your security posture? Get in touch with our team.
          </motion.p>
        </motion.div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <AnimatedSection>
                <h2 className="text-3xl font-bold mb-6" data-testid="text-get-in-touch">Get in Touch</h2>
                <p className="text-white/60 mb-12 leading-relaxed">
                  Whether you're looking for a security assessment, have questions about our services, or want to discuss a partnership, we'd love to hear from you.
                </p>
              </AnimatedSection>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {contactInfo.map((item, index) => (
                  <AnimatedSection key={item.title} delay={index * 0.1}>
                    <GlassCard className="p-6" data-testid={`card-contact-${item.title.toLowerCase()}`}>
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-teal-500/20 flex items-center justify-center mb-4">
                        <item.icon className="w-6 h-6 text-cyan-400" />
                      </div>
                      <h3 className="font-semibold mb-1">{item.title}</h3>
                      <p className="text-cyan-400 mb-1" data-testid={`text-${item.title.toLowerCase()}-value`}>{item.value}</p>
                      <p className="text-white/40 text-sm">{item.description}</p>
                    </GlassCard>
                  </AnimatedSection>
                ))}
              </div>
            </div>

            <AnimatedSection delay={0.2}>
              <GlassCard className="p-8" hover={false}>
                {contactMutation.isSuccess ? (
                  <div className="text-center py-12" data-testid="container-success-message">
                    <div className="w-16 h-16 rounded-full bg-cyan-500/20 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-8 h-8 text-cyan-400" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4" data-testid="text-success-title">Message Sent!</h3>
                    <p className="text-white/60" data-testid="text-success-description">
                      Thank you for reaching out. Our team will review your inquiry and get back to you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="form-contact">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white/60">Full Name *</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="John Smith"
                                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-cyan-500"
                                  data-testid="input-name"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white/60">Email Address *</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="email"
                                  placeholder="john@company.com"
                                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-cyan-500"
                                  data-testid="input-email"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white/60">Company</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Your Company Name"
                                className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-cyan-500"
                                data-testid="input-company"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="service"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white/60">Service of Interest</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger 
                                  className="bg-white/5 border-white/10 text-white focus:border-cyan-500"
                                  data-testid="select-service"
                                >
                                  <SelectValue placeholder="Select a service" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-gray-900 border-white/10">
                                <SelectItem value="web-pentest">Web Application Pentesting</SelectItem>
                                <SelectItem value="api-security">API Security Testing</SelectItem>
                                <SelectItem value="cloud-security">Cloud Security Assessment</SelectItem>
                                <SelectItem value="network-pentest">Network Penetration Testing</SelectItem>
                                <SelectItem value="mobile-pentest">Mobile Application Pentesting</SelectItem>
                                <SelectItem value="red-team">Red Team Operations</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white/60">Message *</FormLabel>
                            <FormControl>
                              <Textarea
                                {...field}
                                rows={5}
                                placeholder="Tell us about your security needs..."
                                className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-cyan-500 resize-none"
                                data-testid="textarea-message"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        disabled={contactMutation.isPending}
                        className="w-full bg-cyan-500 text-black font-semibold py-6 text-lg"
                        data-testid="button-submit"
                      >
                        {contactMutation.isPending ? (
                          <span className="flex items-center gap-2">
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Sending...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            Send Message
                            <Send className="w-5 h-5" />
                          </span>
                        )}
                      </Button>

                      <p className="text-white/40 text-sm text-center">
                        By submitting, you agree to our privacy policy and terms of service.
                      </p>
                    </form>
                  </Form>
                )}
              </GlassCard>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <GlassCard className="p-1 overflow-hidden" hover={false}>
              <div className="aspect-[21/9] rounded-xl bg-gradient-to-br from-gray-900 to-black flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,229,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,229,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px]" />
                <div className="relative text-center" data-testid="container-map">
                  <MapPin className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
                  <p className="text-2xl font-bold mb-2" data-testid="text-location">San Francisco, CA</p>
                  <p className="text-white/50">Global Operations • Remote Team</p>
                </div>
              </div>
            </GlassCard>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
