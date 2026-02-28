import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Loader2, Rocket, Sparkles, Terminal, Globe } from 'lucide-react';

interface DeploymentProgressProps {
    isOpen: boolean;
    currentStep: number;
    steps?: string[];
    title?: string;
    subtitle?: string;
}

const defaultSteps = [
    'Enhancing Content with AI',
    'Generating Custom Template',
    'Building Production Assets',
    'Deploying to Vercel'
];

const DeploymentProgress: React.FC<DeploymentProgressProps> = ({
    isOpen,
    currentStep,
    steps = defaultSteps,
    title = "Deploying Portfolio",
    subtitle = "Stay active, your masterpiece is going live..."
}) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-xl"
                >
                    <div className="max-w-md w-full p-8 text-center space-y-10">
                        {/* Animated Visual Header */}
                        <div className="relative inline-block">
                            <div className="w-28 h-28 border-4 border-white/5 rounded-full" />
                            <motion.div
                                className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent blur-[1px]"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                            />
                            <motion.div
                                className="absolute inset-0 flex items-center justify-center text-primary"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                {currentStep === 0 && <Sparkles size={32} className="animate-pulse" />}
                                {currentStep === 1 && <Terminal size={32} />}
                                {currentStep === 2 && <Rocket size={32} />}
                                {currentStep === 3 && <Globe size={32} />}
                            </motion.div>
                        </div>

                        <div className="space-y-3">
                            <h2 className="text-3xl font-black tracking-tight">{title}</h2>
                            <p className="text-muted text-sm font-medium">{subtitle}</p>
                        </div>

                        {/* Progress Steps */}
                        <div className="space-y-5 text-left bg-white/5 p-6 rounded-[2.5rem] border border-white/5 shadow-2xl">
                            {steps.map((step, i) => (
                                <div key={step} className="flex items-center gap-4 group">
                                    <div className="relative flex items-center justify-center">
                                        {currentStep > i ? (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className="text-primary"
                                            >
                                                <CheckCircle2 size={22} fill="currentColor" fillOpacity={0.1} />
                                            </motion.div>
                                        ) : currentStep === i ? (
                                            <div className="relative">
                                                <Loader2 className="animate-spin text-primary" size={22} />
                                                <motion.div
                                                    className="absolute inset-0 bg-primary/20 rounded-full blur-md"
                                                    animate={{ scale: [1, 1.5, 1] }}
                                                    transition={{ duration: 2, repeat: Infinity }}
                                                />
                                            </div>
                                        ) : (
                                            <div className="w-5 h-5 border-2 border-white/10 rounded-full ml-0.5" />
                                        )}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className={`text-sm font-bold tracking-tight transition-colors ${currentStep === i ? 'text-white' : currentStep > i ? 'text-muted/80 line-through' : 'text-muted'}`}>
                                            {step}
                                        </span>
                                        {currentStep === i && (
                                            <motion.span
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                className="text-[10px] font-black uppercase tracking-widest text-primary/60 mt-0.5"
                                            >
                                                In Progress...
                                            </motion.span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Status Bar */}
                        <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-primary shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                                initial={{ width: '0%' }}
                                animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                                transition={{ duration: 0.5 }}
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default DeploymentProgress;
