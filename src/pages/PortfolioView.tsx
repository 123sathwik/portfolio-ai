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
    User
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
                const rawDoc = await getDoc(doc(db, "portfolios", uid));
                const aiDoc = await getDoc(doc(db, "ai_portfolios", uid));

                if (rawDoc.exists() && aiDoc.exists()) {
                    setData({
                        ...rawDoc.data(),
                        ai: aiDoc.data().aiContent
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
                <p className="text-white/40 font-bold animate-pulse">Loading AI Portfolio...</p>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 text-center">
                <div className="w-20 h-20 bg-red-500/10 rounded-2xl flex items-center justify-center mb-6 border border-red-500/20">
                    <Zap size={40} className="text-red-500 opacity-50" />
                </div>
                <h1 className="text-4xl font-black mb-4 tracking-tight">Portfolio Not Found</h1>
                <p className="text-white/40 max-w-sm mb-8">The requested portfolio doesn't exist or hasn't been generated yet.</p>
                <Link to="/" className="btn-primary">Return Home</Link>
            </div>
        );
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-primary selection:text-white pb-20">
            {/* Dynamic Background */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center border border-primary/20">
                            <Zap size={20} className="text-primary" />
                        </div>
                        <span className="font-bold tracking-tight text-white hidden sm:block">{data.name}</span>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex gap-4 items-center pr-6 border-r border-white/10 hidden md:flex">
                            {data.github && <a href={data.github} target="_blank" className="text-white/40 hover:text-white transition-all hover:scale-110"><Github size={18} /></a>}
                            {data.linkedin && <a href={data.linkedin} target="_blank" className="text-white/40 hover:text-white transition-all hover:scale-110"><Linkedin size={18} /></a>}
                        </div>
                        <button
                            onClick={handleShare}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all font-bold text-sm"
                        >
                            {copied ? <Check size={16} className="text-green-500" /> : <Share2 size={16} />}
                            {copied ? "Copied!" : "Share"}
                        </button>
                    </div>
                </div>
            </nav>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-5xl mx-auto px-6 pt-40 relative z-10"
            >
                {/* Hero Section */}
                <section className="text-center mb-32">
                    <motion.div variants={itemVariants}>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black text-primary mb-8 uppercase tracking-[0.2em]">
                            <Sparkles size={12} />
                            AI Enhanced Profile
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
                            {data.name}
                        </h1>
                        <h2 className="text-2xl md:text-3xl font-bold text-primary/80 mb-10 tracking-tight">
                            {data.ai.headline || data.role}
                        </h2>
                        <div className="flex flex-wrap justify-center gap-4">
                            <a href={`mailto:${data.email}`} className="btn-primary flex items-center gap-3 px-8">
                                <Mail size={18} />
                                Get in Touch
                            </a>
                            <button className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all font-bold group">
                                Download Resume
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform text-primary" />
                            </button>
                        </div>
                    </motion.div>
                </section>

                {/* Bento Grid Content */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-20">
                    {/* About Section */}
                    <motion.div variants={itemVariants} className="md:col-span-8 glass-card p-10 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full group-hover:bg-primary/10 transition-all" />
                        <h3 className="flex items-center gap-3 text-xl font-black mb-8 tracking-tight uppercase text-white/40">
                            <User size={18} className="text-primary" />
                            Philosophy
                        </h3>
                        <p className="text-xl md:text-2xl text-white/80 leading-relaxed font-medium">
                            {data.ai.improvedAbout}
                        </p>
                    </motion.div>

                    {/* Stats/Brief info */}
                    <motion.div variants={itemVariants} className="md:col-span-4 glass-card p-10 flex flex-col justify-between border-primary/10">
                        <h3 className="text-white/40 font-black uppercase tracking-widest text-xs mb-8">Focus Areas</h3>
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary"><Globe size={20} /></div>
                                <div>
                                    <p className="text-sm font-bold">Web Architect</p>
                                    <p className="text-xs text-white/40">Modern Ecosystems</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500"><Cpu size={20} /></div>
                                <div>
                                    <p className="text-sm font-bold">Problem Solver</p>
                                    <p className="text-xs text-white/40">Algorithm & Logic</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Skills Section */}
                    <motion.div variants={itemVariants} className="md:col-span-12 glass-card p-10">
                        <h3 className="flex items-center gap-3 text-xl font-black mb-10 tracking-tight uppercase text-white/40">
                            <Code2 size={20} className="text-primary" />
                            Tech Stack
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {data.ai.improvedSkills.split(',').map((skill: string, i: number) => (
                                <motion.span
                                    key={skill}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="px-6 py-3 rounded-2xl bg-white/5 border border-white/5 text-sm font-bold text-white/60 hover:border-primary/40 hover:text-white hover:bg-white/[0.08] transition-all cursor-default"
                                >
                                    {skill.trim()}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>

                    {/* Projects Section */}
                    <motion.div variants={itemVariants} className="md:col-span-12 glass-card p-10 bg-gradient-to-br from-white/[0.02] to-transparent">
                        <h3 className="flex items-center gap-3 text-xl font-black mb-10 tracking-tight uppercase text-white/40">
                            <Award size={20} className="text-primary" />
                            Major Contributions
                        </h3>
                        <div className="prose prose-invert max-w-none">
                            <p className="text-lg text-white/70 leading-relaxed whitespace-pre-wrap font-medium border-l-2 border-primary/20 pl-8 py-2">
                                {data.ai.improvedProjects}
                            </p>
                        </div>
                    </motion.div>

                    {/* AI Suggestions Section */}
                    <motion.div variants={itemVariants} className="md:col-span-12 p-10 rounded-[32px] bg-primary/5 border border-primary/10">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="flex items-center gap-3 text-xl font-black tracking-tight uppercase text-primary/60">
                                <Sparkles size={20} className="text-primary" />
                                Growth Insights
                            </h3>
                            <div className="px-3 py-1 bg-primary/10 rounded-lg text-[10px] font-bold text-primary uppercase tracking-wider">
                                System Score: {data.ai.summaryScore}/100
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {data.ai.suggestions.map((suggestion: string, i: number) => (
                                <div key={i} className="flex gap-4 p-5 rounded-2xl bg-black/40 border border-white/5 group hover:border-primary/20 transition-all">
                                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex-shrink-0 flex items-center justify-center text-primary text-xs font-bold">
                                        {i + 1}
                                    </div>
                                    <p className="text-sm font-medium text-white/50 group-hover:text-white/80 transition-colors">
                                        {suggestion}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Footer */}
                <footer className="text-center pt-20">
                    <p className="text-white/20 text-xs font-black uppercase tracking-[0.5em] mb-6">
                        Architected by AI Studio
                    </p>
                    <div className="flex justify-center gap-6 text-white/20">
                        <Github size={20} />
                        <Globe size={20} />
                        <Mail size={20} />
                    </div>
                </footer>
            </motion.div>
        </div>
    );
}

export default PortfolioView;
