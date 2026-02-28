import { motion } from "framer-motion";
import { Sparkles, Loader2, CheckCircle, ChevronRight, Layout } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Generate() {
    const [step, setStep] = useState(0);
    const steps = [
        "Analyzing your profile data...",
        "Extrapolating key achievements...",
        "Selecting optimal AI theme...",
        "Synthesizing GitHub contributions...",
        "Finalizing SEO optimizations...",
        "Deploying to edge nodes..."
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
        }, 2000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/10 blur-[120px] rounded-full opacity-50 pointer-events-none" />

            <div className="max-w-xl w-full text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-12"
                >
                    <div className="w-24 h-24 bg-primary/20 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-primary/20 shadow-2xl shadow-primary/20 animate-pulse">
                        <Sparkles size={40} className="text-primary" />
                    </div>
                    <h1 className="text-4xl font-black mb-4 tracking-tight">Generating Your <span className="text-primary">Portfolio</span></h1>
                    <p className="text-white/40 font-medium">Sit back while our AI works its magic. This usually takes about 30 seconds.</p>
                </motion.div>

                <div className="glass-card p-10 border border-white/5 space-y-6 text-left relative overflow-hidden">
                    <div className="absolute bottom-0 left-0 h-1 bg-primary transition-all duration-1000" style={{ width: `${(step + 1) * (100 / steps.length)}%` }} />

                    {steps.map((s, i) => (
                        <div key={s} className="flex items-center gap-4 transition-all duration-500" style={{ opacity: i <= step ? 1 : 0.2, filter: i < step ? 'grayscale(0.5)' : 'none' }}>
                            {i < step ? (
                                <CheckCircle size={20} className="text-green-500" />
                            ) : i === step ? (
                                <Loader2 size={20} className="text-primary animate-spin" />
                            ) : (
                                <div className="w-5 h-5 rounded-full border border-white/20" />
                            )}
                            <span className={`text-sm font-bold tracking-tight ${i === step ? 'text-white' : 'text-white/40'}`}>{s}</span>
                        </div>
                    ))}
                </div>

                {step === steps.length - 1 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-12"
                    >
                        <Link to="/dashboard" className="btn-primary inline-flex items-center gap-3">
                            Go to Dashboard
                            <Layout size={20} />
                        </Link>
                    </motion.div>
                )}
            </div>
        </div>
    );
}

export default Generate;
