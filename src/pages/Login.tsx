import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Zap, ChevronRight, Mail, Lock } from "lucide-react";
import { motion } from "framer-motion";

export default function Login() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center px-6 relative overflow-hidden">
            <Navbar />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/10 blur-[120px] rounded-full opacity-50 pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center border border-primary/20">
                            <Zap size={24} className="text-primary" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-black mb-2 tracking-tight">Login Page ✅</h1>
                    <p className="text-white/50 font-medium">Continue to build your AI portfolio.</p>
                </div>

                <div className="glass-card p-10 border border-white/5 shadow-2xl space-y-8">
                    <button
                        onClick={() => navigate("/create")}
                        className="w-full btn-primary flex items-center justify-center gap-3 group px-8 py-4 text-sm font-black"
                    >
                        Continue to Builder
                        <ChevronRight className="group-hover:translate-x-1 transition-transform" size={20} />
                    </button>

                    <div className="pt-4 text-center">
                        <p className="text-white/20 text-[10px] font-black uppercase tracking-widest">
                            Secure Access Enabled
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
