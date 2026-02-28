import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { motion } from "framer-motion";
import {
    Github,
    Linkedin,
    Mail,
    Zap,
    Award,
    Code2,
    Share2,
    Check,
    Sparkles,
    ArrowRight,
    Globe,
    Cpu,
    User,
    Layout
} from "lucide-react";

function PortfolioView() {
    const { uid } = useParams();
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (!uid) return;
            try {
                // Single fetch from ai_portfolios for better performance
                const aiDoc = await getDoc(doc(db, "ai_portfolios", uid));

                if (aiDoc.exists()) {
                    const aiData = aiDoc.data();
                    setData({
                        name: aiData.name,
                        role: aiData.role,
                        improvedAbout: aiData.aiContent.improvedAbout,
                        improvedSkills: aiData.aiContent.improvedSkills,
                        improvedProjects: aiData.aiContent.improvedProjects,
                        headline: aiData.aiContent.headline,
                        suggestions: aiData.aiContent.suggestions,
                        summaryScore: aiData.aiContent.summaryScore
                    });
                }
            } catch (err) {
                console.error("Error fetching portfolio:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [uid]);

    const handleShare = () => {
        const url = window.location.origin + "/u/" + uid;
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center gap-4">
                <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                <p className="text-white/40 font-bold animate-pulse">Synchronizing AI Data...</p>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 border border-primary/20">
                    <Zap size={40} className="text-primary opacity-50" />
                </div>
                <h1 className="text-4xl font-black mb-4 tracking-tight">Portfolio Not Found</h1>
                <p className="text-white/40 max-w-sm mb-8 font-medium">This portfolio might still be generating or the link is incorrect.</p>
                <Link to="/" className="btn-primary">Return Home</Link>
            </div>
        );
    }

    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }
        })
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-primary selection:text-white pb-32 overflow-x-hidden">
            {/* Dynamic Aura Background */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/5 blur-[140px] rounded-full" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-600/5 blur-[140px] rounded-full" />
            </div>

            {/* Static Header */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-2xl border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20 group-hover:bg-primary group-hover:text-black transition-all">
                            <Zap size={20} className="text-primary group-hover:text-inherit" />
                        </div>
                        <span className="font-bold tracking-tight text-white/90 group-hover:text-white transition-colors uppercase text-xs tracking-[0.2em]">{data.name}</span>
                    </Link>

                    <button
                        onClick={handleShare}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-primary hover:text-black hover:border-primary transition-all font-black text-[10px] uppercase tracking-widest"
                    >
                        {copied ? <Check size={14} /> : <Share2 size={14} />}
                        {copied ? "Copied Link" : "Share Portfolio"}
                    </button>
                </div>
            </nav>

            <main className="max-w-5xl mx-auto px-6 pt-48 relative z-10 space-y-32">
                {/* HERO SECTION */}
                <motion.section
                    custom={0}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                    className="text-center"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black text-primary mb-10 uppercase tracking-[0.3em]">
                        <Sparkles size={12} />
                        AI Refined Identity
                    </div>
                    <h1 className="text-6xl md:text-9xl font-black mb-6 tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40 uppercase">
                        {data.name}
                    </h1>
                    <h2 className="text-xl md:text-2xl font-bold text-white/40 mb-12 tracking-[0.2em] uppercase">
                        {data.headline}
                    </h2>
                    <div className="flex flex-wrap justify-center gap-6">
                        <button className="btn-primary group px-10 py-5 text-sm">
                            View Work
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button className="px-10 py-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all font-black text-xs uppercase tracking-widest">
                            Get in Touch
                        </button>
                    </div>
                </motion.section>

                {/* ABOUT SECTION */}
                <motion.section
                    custom={1}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                    className="grid grid-cols-1 md:grid-cols-12 gap-8"
                >
                    <div className="md:col-span-12 glass-card p-12 md:p-16 relative overflow-hidden group border-primary/10">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full group-hover:bg-primary/10 transition-all duration-1000" />

                        <header className="flex items-center gap-4 mb-12 text-primary/60 font-black uppercase text-xs tracking-[0.3em]">
                            <Layout size={18} />
                            The Narrative
                        </header>

                        <div className="max-w-3xl">
                            <p className="text-2xl md:text-4xl text-white/80 leading-[1.3] font-medium tracking-tight">
                                {data.improvedAbout}
                            </p>
                        </div>

                        <footer className="mt-16 pt-12 border-t border-white/5 flex flex-wrap gap-12">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-primary/40 mb-2">Specialization</p>
                                <p className="font-bold text-white/80">{data.role}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-primary/40 mb-2">Philosophy</p>
                                <p className="font-bold text-white/80">User-Centric Architecture</p>
                            </div>
                        </footer>
                    </div>
                </motion.section>

                {/* SKILLS GRID */}
                <motion.section
                    custom={2}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                    className="space-y-12"
                >
                    <h3 className="flex items-center gap-4 text-xs font-black uppercase tracking-[0.4em] text-white/20">
                        <TagIcon />
                        Technical Arsenal
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {data.improvedSkills.split(',').map((skill: string, i: number) => (
                            <div
                                key={i}
                                className="glass-card px-6 py-6 border border-white/5 hover:border-primary/40 hover:bg-white/5 transition-all text-center group cursor-default"
                            >
                                <p className="text-sm font-bold text-white/40 group-hover:text-white transition-colors">{skill.trim()}</p>
                            </div>
                        ))}
                    </div>
                </motion.section>

                {/* PROJECTS CARDS */}
                <motion.section
                    custom={3}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                    className="space-y-12"
                >
                    <header className="flex justify-between items-end">
                        <h3 className="flex items-center gap-4 text-xs font-black uppercase tracking-[0.4em] text-white/20">
                            <Code2 size={18} />
                            Featured Work
                        </h3>
                    </header>

                    <div className="grid grid-cols-1 gap-8">
                        <div className="glass-card p-12 md:p-16 bg-gradient-to-br from-white/[0.03] to-transparent group border-white/10 hover:border-primary/20 transition-all duration-700">
                            <div className="max-w-4xl">
                                <p className="text-xl md:text-2xl text-white/60 leading-relaxed font-medium whitespace-pre-wrap mb-10 group-hover:text-white/80 transition-colors">
                                    {data.improvedProjects}
                                </p>
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all">
                                        <Github size={20} />
                                    </div>
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/40 hover:text-white transition-all">
                                        <Globe size={20} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* AI SUGGESTIONS BOX */}
                <motion.section
                    custom={4}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                    className="p-12 md:p-16 rounded-[48px] bg-primary/5 border border-primary/20 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-8">
                        <div className="px-5 py-2 bg-primary/10 rounded-2xl text-[10px] font-black text-primary uppercase tracking-widest border border-primary/20">
                            Portfolio Quality: {data.summaryScore}%
                        </div>
                    </div>

                    <h3 className="flex items-center gap-3 text-xl font-black tracking-tight uppercase text-primary/80 mb-12">
                        <Sparkles size={24} className="text-primary" />
                        Strategic Recommendations
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                        {data.suggestions.map((suggestion: string, i: number) => (
                            <div key={i} className="flex gap-6 p-8 rounded-3xl bg-black/40 border border-white/5 group hover:border-primary/20 transition-all hover:-translate-y-1">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex-shrink-0 flex items-center justify-center text-primary text-xs font-black">
                                    0{i + 1}
                                </div>
                                <p className="text-sm font-bold text-white/40 group-hover:text-white/80 leading-relaxed transition-colors">
                                    {suggestion}
                                </p>
                            </div>
                        ))}
                    </div>
                </motion.section>
            </main>

            {/* FOOTER */}
            <footer className="text-center py-40 border-t border-white/5 mt-40">
                <div className="max-w-7xl mx-auto px-6">
                    <Zap size={32} className="mx-auto text-primary mb-12 opacity-50" />
                    <p className="text-white/20 text-[10px] font-black uppercase tracking-[1em] mb-12">
                        AI Studio • 2026
                    </p>
                    <div className="flex justify-center gap-12 font-black text-[10px] uppercase tracking-widest text-white/10">
                        <a href="#" className="hover:text-primary transition-colors">GitHub</a>
                        <a href="#" className="hover:text-primary transition-colors">Twitter</a>
                        <a href="#" className="hover:text-primary transition-colors">Privacy</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

// Internal SVG Icon
const TagIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
        <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2z"></path>
        <path d="M7 7h.01"></path>
    </svg>
);

export default PortfolioView;
