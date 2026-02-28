import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Zap, Award, Code2 } from "lucide-react";

function PublicPortfolio() {
    const { uid } = useParams();
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

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

    if (loading) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!data) {
        return (
            <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6">
                <h1 className="text-4xl font-black mb-4">Portfolio Not Found</h1>
                <Link to="/" className="text-primary font-bold hover:underline">Return Home</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-primary selection:text-white">
            {/* Navbar (Public) */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Zap size={20} className="text-primary" />
                        <span className="font-bold tracking-tight">{data.name}</span>
                    </div>
                    <div className="flex gap-4">
                        {data.github && <a href={data.github} target="_blank" className="text-white/40 hover:text-white transition-colors"><Github size={18} /></a>}
                        {data.linkedin && <a href={data.linkedin} target="_blank" className="text-white/40 hover:text-white transition-colors"><Linkedin size={18} /></a>}
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6 relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-primary/10 blur-[120px] rounded-full opacity-30" />

                <div className="max-w-4xl mx-auto relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary mb-6 uppercase tracking-widest">
                            {data.ai.headline || data.role}
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
                            {data.name}
                        </h1>
                        <p className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed mb-10">
                            {data.ai.improvedAbout}
                        </p>
                        <div className="flex justify-center gap-4">
                            <a href={`mailto:${data.email}`} className="btn-primary flex items-center gap-2">
                                <Mail size={18} />
                                Hire Me
                            </a>
                            <Link to="/" className="px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all font-bold text-sm">
                                Build Your Own
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Skills Section */}
            <section className="py-20 px-6 bg-white/[0.02]">
                <div className="max-w-4xl mx-auto">
                    <h2 className="flex items-center gap-3 text-2xl font-black mb-12 tracking-tight">
                        <Code2 className="text-primary" />
                        Expertise
                    </h2>
                    <div className="flex flex-wrap gap-3">
                        {data.ai.improvedSkills.split(',').map((skill: string) => (
                            <span key={skill} className="px-5 py-2.5 rounded-2xl bg-white/5 border border-white/5 text-sm font-bold text-white/70 hover:border-primary/30 hover:text-white transition-all">
                                {skill.trim()}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="flex items-center gap-3 text-2xl font-black mb-12 tracking-tight">
                        <Award className="text-primary" />
                        Featured Projects
                    </h2>
                    <div className="grid grid-cols-1 gap-8">
                        <div className="glass-card p-10 border border-white/5">
                            <p className="text-white/60 leading-relaxed whitespace-pre-wrap">
                                {data.ai.improvedProjects}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-20 border-t border-white/5 text-center">
                <div className="max-w-7xl mx-auto px-6">
                    <p className="text-white/20 text-sm font-medium uppercase tracking-[0.2em] mb-4">
                        Built with Portfolio AI Studio
                    </p>
                    <Zap size={24} className="mx-auto text-primary/40" />
                </div>
            </footer>
        </div>
    );
}

export default PublicPortfolio;
