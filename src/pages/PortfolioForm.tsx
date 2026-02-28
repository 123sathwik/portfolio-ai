import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

export default function PortfolioForm() {
    const navigate = useNavigate();

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        navigate("/dashboard");
    }

    return (
        <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center px-6 relative overflow-hidden">
            <Navbar />
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full opacity-30 pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-xl relative z-10"
            >
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-black mb-4 tracking-tight">Create Portfolio</h1>
                    <p className="text-white/40 font-medium tracking-tight">Tell us about your work and let the AI do the magic.</p>
                </div>

                <form onSubmit={handleSubmit} className="glass-card p-12 space-y-8 border border-white/5">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Full Name</label>
                            <input
                                placeholder="Ex. John Doe"
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white placeholder:text-white/10 focus:outline-none focus:border-primary/50 transition-all font-medium"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Email Address</label>
                            <input
                                type="email"
                                placeholder="john@example.com"
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white placeholder:text-white/10 focus:outline-none focus:border-primary/50 transition-all font-medium"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full btn-primary py-5 text-sm font-black flex items-center justify-center gap-3 group"
                    >
                        <Sparkles size={20} />
                        Generate Portfolio
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </form>
            </motion.div>
        </div>
    );
}
