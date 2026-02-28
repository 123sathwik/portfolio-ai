import React from 'react';
import { motion } from 'framer-motion';
import {
    Zap,
    Shield,
    Cpu,
    Globe,
    ArrowRight,
    Github,
    Twitter,
    Linkedin
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Landing: React.FC = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    const features = [
        {
            icon: <Cpu className="w-6 h-6 text-primary" />,
            title: "AI-Powered Generation",
            description: "Our advanced neural networks analyze your career to build the perfect narrative."
        },
        {
            icon: <Zap className="w-6 h-6 text-accent" />,
            title: "Instant Deployment",
            description: "Go from prompt to live portfolio in under 60 seconds with our optimized pipeline."
        },
        {
            icon: <Shield className="w-6 h-6 text-primary" />,
            title: "Enterprise Security",
            description: "Your data is encrypted and protected with industry-leading security protocols."
        },
        {
            icon: <Globe className="w-6 h-6 text-accent" />,
            title: "Global CDN",
            description: "Blazing fast load times across the globe with our edge computing network."
        }
    ];

    const steps = [
        { title: "Connect", description: "Link your GitHub or LinkedIn profile." },
        { title: "Generate", description: "Our AI crafts your professional story." },
        { title: "Customize", description: "Fine-tune design with our intuitive editor." },
        { title: "Launch", description: "Deploy to your custom domain instantly." }
    ];

    return (
        <div className="flex flex-col w-full">
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-4 py-20">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[128px] animate-pulse-slow" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[128px] animate-pulse-slow font-delay-2000" />
                </div>

                <motion.div
                    className="relative z-10 max-w-5xl mx-auto text-center"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">v2.0 is now live</span>
                    </motion.div>

                    <motion.h1 variants={itemVariants} className="text-5xl md:text-8xl font-black tracking-tight mb-8 leading-[1.1]">
                        Build Your <span className="text-gradient">Digital Legacy</span> <br />
                        with Compute AI
                    </motion.h1>

                    <motion.p variants={itemVariants} className="text-lg md:text-xl text-muted/80 mb-12 max-w-2xl mx-auto leading-relaxed">
                        The world's most innovative AI portfolio engine. Transform your skills into
                        a stunning visual journey that commands attention.
                    </motion.p>

                    <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link
                            to="/generator"
                            className="group px-8 py-4 bg-primary text-white rounded-2xl font-bold text-lg hover:shadow-[0_0_30px_rgba(99,102,241,0.4)] transition-all glow flex items-center gap-2"
                        >
                            Start Building Free
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <button className="px-8 py-4 glass rounded-2xl font-bold text-lg glass-hover text-foreground/90">
                            Watch Demo
                        </button>
                    </motion.div>
                </motion.div>
            </section>

            {/* Features Section */}
            <section className="py-24 px-4 bg-black/20">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">Engineered for Excellence</h2>
                        <p className="text-muted text-lg max-w-2xl mx-auto">Next-gen features powered by cutting edge artificial intelligence.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ y: -5 }}
                                className="glass p-8 rounded-3xl group"
                            >
                                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6 border border-white/5 group-hover:border-primary/20 transition-colors">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                                <p className="text-muted text-sm leading-relaxed">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-24 px-4 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        <div className="lg:w-1/2">
                            <h2 className="text-3xl md:text-5xl font-bold mb-8">From Prompt to <br /><span className="text-gradient">Production Ready</span></h2>
                            <div className="space-y-8">
                                {steps.map((step, idx) => (
                                    <div key={idx} className="flex gap-6">
                                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-primary">
                                            {idx + 1}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg mb-1">{step.title}</h4>
                                            <p className="text-muted text-sm">{step.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="lg:w-1/2 relative">
                            <div className="glass aspect-video rounded-3xl p-4 overflow-hidden relative">
                                <div className="w-full h-full bg-black/40 rounded-2xl border border-white/5 flex items-center justify-center">
                                    <div className="text-center p-8 animate-fade-in">
                                        <Cpu className="w-16 h-16 text-primary mx-auto mb-6 opacity-40" />
                                        <div className="h-2 w-48 bg-white/5 rounded-full mx-auto mb-3 overflow-hidden">
                                            <div className="h-full bg-primary w-2/3 animate-pulse"></div>
                                        </div>
                                        <p className="text-xs text-muted tracking-widest uppercase">Analyzing Profile...</p>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute -top-6 -right-6 w-32 h-32 bg-accent/20 rounded-full blur-[64px]" />
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-4">
                <div className="max-w-5xl mx-auto">
                    <div className="glass p-12 md:p-20 rounded-[40px] text-center relative overflow-hidden">
                        <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/20 rounded-full blur-[96px]" />
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-6xl font-black mb-8">Ready to Elevate <br />Your Career?</h2>
                            <p className="text-muted text-lg mb-12 max-w-xl mx-auto">Join 10,000+ developers building with Berry AI today.</p>
                            <Link
                                to="/generator"
                                className="px-12 py-5 bg-foreground text-background rounded-3xl font-black text-xl hover:scale-105 transition-transform inline-block"
                            >
                                Join the Waitlist
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-20 px-4 border-t border-border bg-black/40">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-10 h-10 bg-primary rounded-xl" />
                            <span className="text-2xl font-black tracking-tight">Berry AI</span>
                        </div>
                        <p className="text-muted max-w-sm mb-8 leading-relaxed">
                            The world's leading AI-native portfolio builder for the next generation of creative minds.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 glass rounded-xl flex items-center justify-center hover:text-primary transition-colors"><Twitter className="w-5 h-5" /></a>
                            <a href="#" className="w-10 h-10 glass rounded-xl flex items-center justify-center hover:text-primary transition-colors"><Github className="w-5 h-5" /></a>
                            <a href="#" className="w-10 h-10 glass rounded-xl flex items-center justify-center hover:text-primary transition-colors"><Linkedin className="w-5 h-5" /></a>
                        </div>
                    </div>
                    <div>
                        <h5 className="font-bold mb-6">Product</h5>
                        <ul className="space-y-4 text-muted text-sm">
                            <li><a href="#" className="hover:text-foreground">Features</a></li>
                            <li><a href="#" className="hover:text-foreground">Pricing</a></li>
                            <li><a href="#" className="hover:text-foreground">Showcase</a></li>
                            <li><a href="#" className="hover:text-foreground">Updates</a></li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="font-bold mb-6">Company</h5>
                        <ul className="space-y-4 text-muted text-sm">
                            <li><a href="#" className="hover:text-foreground">About</a></li>
                            <li><a href="#" className="hover:text-foreground">Blog</a></li>
                            <li><a href="#" className="hover:text-foreground">Culture</a></li>
                            <li><a href="#" className="hover:text-foreground">Careers</a></li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-muted-foreground text-xs uppercase tracking-widest font-bold">© 2026 Berry AI Studio. Crafted with Passion.</p>
                    <div className="flex gap-8 text-muted-foreground text-xs font-bold uppercase tracking-widest">
                        <a href="#" className="hover:text-foreground">Privacy Policy</a>
                        <a href="#" className="hover:text-foreground">Terms of Service</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
