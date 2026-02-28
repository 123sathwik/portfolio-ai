import { useNavigate } from "react-router-dom";
import { Zap, ChevronRight, Rocket, Github, FileSearch, Palette } from 'lucide-react';
import { motion } from 'framer-motion';

function Landing() {
    const navigate = useNavigate();

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

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate("/login")}
                            className="px-6 py-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-sm font-bold transition-all"
                        >
                            Login
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-44 pb-32 px-6 overflow-hidden text-center">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-primary/20 blur-[150px] rounded-full opacity-30 pointer-events-none animate-pulse" />

                <div className="max-w-6xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-6xl md:text-8xl font-black mb-10 tracking-tight leading-[1.1] bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
                            Portfolio <span className="text-primary">AI Studio</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-white/60 mb-14 max-w-3xl mx-auto leading-relaxed">
                            Generate Stunning AI Portfolios Instantly.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
                            <button
                                onClick={() => navigate("/create")}
                                className="btn-primary group flex items-center gap-3 px-10 py-4"
                            >
                                Create Portfolio
                                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}

export default Landing;
