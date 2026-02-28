import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ChevronRight, Zap, Rocket, Github, FileSearch, Palette } from "lucide-react";
import { motion } from "framer-motion";

export default function Landing() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-primary selection:text-white">
            <Navbar />

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
                            <button
                                onClick={() => window.scrollTo({ top: 800, behavior: "smooth" })}
                                className="px-10 py-4 rounded-full font-bold bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all backdrop-blur-sm"
                            >
                                Watch Demo
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Placeholder for scroll-to-demo target */}
            <section id="demo" className="py-20 h-[800px]"></section>
        </div>
    );
}
