import { motion } from 'framer-motion';
import { Rocket, Github, FileSearch, Palette, ChevronRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Features = [
    {
        title: "AI Portfolio Generator",
        description: "Generate stunning developer portfolios from your GitHub projects in seconds.",
        icon: Rocket,
    },
    {
        title: "GitHub Auto Import",
        description: "Seamlessly import your top repositories and contributions with one click.",
        icon: Github,
    },
    {
        title: "Resume Analyzer",
        description: "AI-driven analysis to extract key skills and experiences directly from your resume.",
        icon: FileSearch,
    },
    {
        title: "Theme Customization",
        description: "Dynamic AI-powered themes that match your personal brand perfectly.",
        icon: Palette,
    }
];

function Home() {
    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-primary selection:text-white">
            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                            <Zap size={24} className="text-white" />
                        </div>
                        <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 uppercase tracking-widest text-xs">
                            AI Studio
                        </span>
                    </div>

                    <div className="hidden md:flex items-center gap-10 text-sm font-medium text-white/60">
                        <a href="#features" className="hover:text-primary transition-colors">Features</a>
                        <a href="#about" className="hover:text-primary transition-colors">About</a>
                        <a href="#pricing" className="hover:text-primary transition-colors">Pricing</a>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link to="/login" className="px-6 py-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-sm font-bold transition-all">
                            Login
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-44 pb-32 px-6 overflow-hidden">
                {/* Animated Background Gradients */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-primary/20 blur-[150px] rounded-full opacity-30 pointer-events-none animate-pulse" />
                <div className="absolute -bottom-48 -left-24 w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full opacity-20 pointer-events-none" />

                <div className="max-w-6xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-bold mb-8 text-primary shadow-sm shadow-primary/10">
                            <Zap size={16} fill="currentColor" />
                            Revolutionizing Portfolio Building
                        </div>

                        <h1 className="text-6xl md:text-8xl font-black mb-10 tracking-tight leading-[1.1] bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
                            Portfolio <span className="text-primary">AI Studio</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-white/60 mb-14 max-w-3xl mx-auto leading-relaxed">
                            Generate Stunning AI Portfolios Instantly.
                            Built for top-tier developers who want their work to stand out.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
                            <Link to="/signup" className="btn-primary group flex items-center gap-3">
                                Create Portfolio
                                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <button className="px-10 py-4 rounded-full font-bold bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all backdrop-blur-sm">
                                Watch Demo
                            </button>
                        </div>

                        {/* Mockup Preview */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4, duration: 1 }}
                            className="mt-20 relative px-4"
                        >
                            <div className="relative mx-auto max-w-5xl aspect-video rounded-3xl border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur-2xl">
                                <div className="w-full h-full rounded-2xl bg-gradient-to-br from-[#0c0c0e] to-black overflow-hidden relative">
                                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                                    <div className="p-8 flex flex-col gap-6">
                                        <div className="flex justify-between items-center">
                                            <div className="flex gap-2">
                                                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                                <div className="w-3 h-3 rounded-full bg-green-500/50" />
                                            </div>
                                        </div>
                                        <div className="h-4 w-1/3 bg-white/10 rounded-full" />
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="h-32 bg-white/5 rounded-2xl border border-white/5" />
                                            <div className="h-32 bg-white/5 rounded-2xl border border-white/5" />
                                            <div className="h-32 bg-white/5 rounded-2xl border border-white/5" />
                                        </div>
                                        <div className="h-40 bg-primary/10 rounded-2xl border border-primary/20" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-32 px-6 relative">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-24">
                        <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">The Future of Showcasing Work</h2>
                        <p className="text-white/50 text-xl max-w-2xl mx-auto font-medium">
                            We've combined advanced AI with premium design patterns to help you land your dream role.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {Features.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="glass-card flex flex-col items-start group relative overflow-hidden"
                            >
                                <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 blur-2xl group-hover:bg-primary/10 transition-colors" />

                                <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center mb-8 shadow-inner shadow-white/5">
                                    <feature.icon className="text-primary" size={28} />
                                </div>

                                <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">
                                    {feature.title}
                                </h3>

                                <p className="text-white/50 text-sm leading-relaxed font-medium">
                                    {feature.description}
                                </p>

                                <div className="mt-8 flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 text-white cursor-pointer">
                                    Learn More
                                    <ChevronRight size={14} />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-20 px-6 border-t border-white/10 relative overflow-hidden">
                <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-full max-w-4xl h-48 bg-primary/20 blur-[100px] rounded-full opacity-20" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-16">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center border border-primary/20">
                                <Zap size={20} className="text-primary" />
                            </div>
                            <span className="text-xl font-bold tracking-tight">Portfolio AI Studio</span>
                        </div>

                        <div className="flex flex-wrap justify-center gap-10 text-sm font-semibold text-white/40">
                            <a href="#" className="hover:text-white transition-colors">Twitter</a>
                            <a href="#" className="hover:text-white transition-colors">GitHub</a>
                            <a href="#" className="hover:text-white transition-colors">Discord</a>
                            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-12 border-t border-white/5">
                        <p className="text-white/30 text-xs font-medium uppercase tracking-widest">
                            &copy; 2026 Portfolio AI Studio. All rights reserved.
                        </p>
                        <div className="flex gap-8 text-xs font-semibold text-white/30 uppercase tracking-widest">
                            <a href="#" className="hover:text-white">Privacy</a>
                            <a href="#" className="hover:text-white">Terms</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Home;
