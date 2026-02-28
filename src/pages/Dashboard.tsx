import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { CheckCircle2, Zap } from "lucide-react";

export default function Dashboard() {
    return (
        <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center px-6 relative overflow-hidden">
            <Navbar />
            <div className="absolute inset-0 bg-primary/5 blur-[150px] rounded-full opacity-20 pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl text-center relative z-10"
            >
                <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-10 border border-primary/20 shadow-lg shadow-primary/10">
                    <CheckCircle2 size={40} className="text-primary" />
                </div>

                <h1 className="text-5xl font-black mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
                    Dashboard ✅
                </h1>
                <p className="text-xl text-white/40 mb-12 font-medium leading-relaxed max-w-lg mx-auto">
                    AI Portfolio Generated Successfully! Your professional profile is now live and ready to be shared.
                </p>

                <div className="flex gap-4 justify-center">
                    <button className="btn-primary px-10 py-4 text-xs font-black uppercase tracking-widest">
                        View Live Site
                    </button>
                    <button className="px-10 py-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-xs font-black uppercase tracking-widest">
                        Edit Data
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
