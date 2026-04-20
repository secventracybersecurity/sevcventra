import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Shield, CheckCircle, Loader2, ArrowRight, ArrowLeft, Sparkles } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    company: z.string().min(2, "Company name is required"),
    message: z.string().min(10, "Please provide some details about your needs"),
});

type FormValues = z.infer<typeof formSchema>;

interface LeadModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    title?: string;
    description?: string;
}

export function LeadModal({
    isOpen,
    onOpenChange,
    title = "Request Security Assessment",
    description = "Complete the details below to initialize the process."
}: LeadModalProps) {
    const [step, setStep] = useState(1);
    const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isAiTyping, setIsAiTyping] = useState(false);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            company: "",
            message: "",
        },
        mode: "onChange",
    });

    const handleAiGenerate = async () => {
        if (isAiTyping) return;
        setIsAiTyping(true);
        
        const aiMessage = "We are looking to conduct a comprehensive security assessment of our primary infrastructure. This includes evaluating our public-facing web applications, cloud environment, and internal network for any potential vulnerabilities. Our goal is to identify and remediate risks before they can be exploited. Please let us know the next steps to properly scope this engagement.";
        
        form.setValue("message", "");
        let currentText = "";
        
        for (let i = 0; i < aiMessage.length; i++) {
            currentText += aiMessage[i];
            form.setValue("message", currentText, { shouldValidate: true });
            await new Promise(resolve => setTimeout(resolve, 10 + Math.random() * 20));
        }
        
        setIsAiTyping(false);
    };

    const handleNext = async () => {
        let fieldsToValidate: (keyof FormValues)[] = [];
        if (step === 1) fieldsToValidate = ["name", "email"];
        if (step === 2) fieldsToValidate = ["company"];
        
        const isValid = await form.trigger(fieldsToValidate);
        if (isValid) {
            setDirection(1);
            setStep((s) => s + 1);
        }
    };

    const handleBack = () => {
        setDirection(-1);
        setStep((s) => s - 1);
    };

    async function onSubmit(values: FormValues) {
        setIsSubmitting(true);
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            });
            
            if (!response.ok) {
                throw new Error("Failed to submit");
            }
            
            setIsSuccess(true);
            setTimeout(() => {
                onOpenChange(false);
                setTimeout(() => {
                    setIsSuccess(false);
                    setStep(1);
                    form.reset();
                }, 500);
            }, 3000); // give enough time for the success animation
        } catch (error) {
            console.error("Form submitted error:", error);
            // Optionally display error toast here
        } finally {
            setIsSubmitting(false);
        }
    }

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 50 : -50,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            x: direction < 0 ? 50 : -50,
            opacity: 0,
        }),
    };

    const progressPercentage = (step / 3) * 100;

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[480px] bg-black border border-white/10 shadow-2xl rounded-[24px] text-white p-0 overflow-hidden">
                {!isSuccess && (
                    <div className="h-1 w-full bg-white/5">
                        <motion.div 
                            className="h-full bg-primary" 
                            initial={{ width: 0 }}
                            animate={{ width: `${progressPercentage}%` }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                        />
                    </div>
                )}
                
                <div className="p-8">
                <AnimatePresence mode="wait" custom={direction} initial={false}>
                    {!isSuccess ? (
                        <motion.div
                            key="form-content"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <DialogHeader className="mb-6 text-center sm:text-left">
                                <DialogTitle className="text-[24px] sm:text-[28px] font-bold tracking-tight mb-2 text-white">{title}</DialogTitle>
                                <DialogDescription className="text-[15px] sm:text-[17px] text-white/50 font-normal leading-tight">
                                    {description}
                                </DialogDescription>
                            </DialogHeader>

                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                    <div className="relative min-h-[220px] sm:min-h-[200px]">
                                        <AnimatePresence mode="wait" custom={direction}>
                                            {step === 1 && (
                                                <motion.div
                                                    key="step1"
                                                    custom={direction}
                                                    variants={variants}
                                                    initial="enter"
                                                    animate="center"
                                                    exit="exit"
                                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                                    className="space-y-4 absolute inset-0 w-full"
                                                >
                                                    <FormField
                                                        control={form.control}
                                                        name="name"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel className="text-[12px] font-semibold text-white/40 uppercase tracking-wider">Full Name</FormLabel>
                                                                <FormControl>
                                                                    <Input placeholder="John Doe" {...field} className="bg-white/5 border border-white/10 h-12 rounded-[12px] text-[17px] transition-all focus:ring-2 focus:ring-white/20 text-white" />
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
                                                                <FormLabel className="text-[12px] font-semibold text-white/40 uppercase tracking-wider">Work Email</FormLabel>
                                                                <FormControl>
                                                                    <Input placeholder="name@company.com" {...field} className="bg-white/5 border border-white/10 h-12 rounded-[12px] text-[17px] transition-all focus:ring-2 focus:ring-white/20 text-white" />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </motion.div>
                                            )}

                                            {step === 2 && (
                                                <motion.div
                                                    key="step2"
                                                    custom={direction}
                                                    variants={variants}
                                                    initial="enter"
                                                    animate="center"
                                                    exit="exit"
                                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                                    className="space-y-4 absolute inset-0 w-full"
                                                >
                                                    <FormField
                                                        control={form.control}
                                                        name="company"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel className="text-[12px] font-semibold text-white/40 uppercase tracking-wider">Organization Name</FormLabel>
                                                                <FormControl>
                                                                    <Input placeholder="Acme Inc." {...field} className="bg-white/5 border border-white/10 h-12 rounded-[12px] text-[17px] transition-all focus:ring-2 focus:ring-white/20 text-white" />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </motion.div>
                                            )}

                                            {step === 3 && (
                                                <motion.div
                                                    key="step3"
                                                    custom={direction}
                                                    variants={variants}
                                                    initial="enter"
                                                    animate="center"
                                                    exit="exit"
                                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                                    className="space-y-4 absolute inset-0 w-full"
                                                >
                                                    <FormField
                                                        control={form.control}
                                                        name="message"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <div className="flex items-center justify-between mb-1">
                                                                    <FormLabel className="text-[12px] font-semibold text-white/40 uppercase tracking-wider mb-0">How can we help?</FormLabel>
                                                                    <button 
                                                                        type="button" 
                                                                        onClick={handleAiGenerate}
                                                                        disabled={isAiTyping}
                                                                        className="flex items-center gap-1.5 text-[11px] font-bold text-white hover:text-white/80 transition-colors uppercase tracking-wider disabled:opacity-50"
                                                                    >
                                                                        <Sparkles className="w-3.5 h-3.5" />
                                                                        {isAiTyping ? "Writing..." : "Auto-write with AI"}
                                                                    </button>
                                                                </div>
                                                                <FormControl>
                                                                    <Textarea
                                                                        placeholder="Briefly describe your security requirements or infrastructure..."
                                                                        className="bg-white/5 border border-white/10 rounded-[12px] text-[17px] min-h-[140px] resize-none transition-all focus:ring-2 focus:ring-white/20 text-white disabled:opacity-70"
                                                                        disabled={isAiTyping}
                                                                        {...field}
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    <div className="flex items-center justify-between pt-6 mt-4 border-t border-white/10">
                                        {step > 1 ? (
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                onClick={handleBack}
                                                className="text-white/50 hover:text-white px-0"
                                            >
                                                <ArrowLeft className="w-4 h-4 mr-2" /> Back
                                            </Button>
                                        ) : (
                                            <div /> // Spacer
                                        )}

                                        {step < 3 ? (
                                            <Button
                                                type="button"
                                                onClick={handleNext}
                                                className="bg-white hover:bg-white/90 text-black rounded-[12px] px-6 h-11 transition-all"
                                            >
                                                Continue <ArrowRight className="w-4 h-4 ml-2" />
                                            </Button>
                                        ) : (
                                            <Button
                                                type="submit"
                                                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-[12px] px-8 h-11 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                                                disabled={isSubmitting || isAiTyping}
                                            >
                                                {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <Shield className="h-5 w-5 mr-2" />}
                                                {isSubmitting ? "Processing..." : "Submit Request"}
                                            </Button>
                                        )}
                                    </div>
                                </form>
                            </Form>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, type: "spring" }}
                            className="py-12 flex flex-col items-center text-center"
                        >
                            <motion.div 
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
                                className="w-24 h-24 rounded-full bg-green-500/10 flex items-center justify-center mb-8 relative"
                            >
                                <motion.div
                                   initial={{ pathLength: 0, opacity: 0 }}
                                   animate={{ pathLength: 1, opacity: 1 }}
                                   transition={{ duration: 0.6, delay: 0.3 }}
                                >
                                    <CheckCircle className="w-12 h-12 text-green-500" strokeWidth={2.5} />
                                </motion.div>
                            </motion.div>
                            
                            <motion.h3 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="text-[32px] font-bold tracking-tight mb-3"
                            >
                                Protocol Initiated.
                            </motion.h3>
                            
                            <motion.p 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="text-[17px] text-gray-500 dark:text-gray-400 max-w-[320px] leading-relaxed"
                            >
                                Your request is secure. Our elite analysts will initiate contact within 24 hours.
                            </motion.p>
                        </motion.div>
                    )}
                </AnimatePresence>
                </div>
            </DialogContent>
        </Dialog>
    );
}
