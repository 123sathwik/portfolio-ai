import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import {
    User,
    Briefcase,
    FileText,
    Code,
    Layers,
    GraduationCap,
    Github,
    Linkedin,
    Mail,
    ChevronRight,
    Sparkles,
    AlertCircle
} from "lucide-react";

function CreatePortfolio() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        role: "",
        about: "",
        skills: "",
        projects: "",
        education: "",
        github: "",
        linkedin: "",
        email: user?.email || "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return setError("You must be logged in to create a portfolio.");

        setLoading(true);
        setError("");

        try {
            // 1. Save raw data to 'portfolios'
            await setDoc(doc(db, "portfolios", user.uid), {
                ...formData,
                uid: user.uid,
                createdAt: serverTimestamp(),
            });

            // 2. Call AI API
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error('AI Generation failed');
            const aiContent = await response.json();

            // 3. Save AI response to 'ai_portfolios'
            await setDoc(doc(db, "ai_portfolios", user.uid), {
                uid: user.uid,
                name: formData.name, // Include name for single-fetch view
                role: formData.role, // Include role for single-fetch view
                aiContent,
                generatedAt: serverTimestamp(),
            });

            // 4. Redirect to public portfolio
            navigate(`/u/${user.uid}`);
        } catch (err: any) {
            console.error("Error creating portfolio:", err);
            setError("Failed to generate AI portfolio. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white py-20 px-6 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/5 blur-[120px] rounded-full opacity-50 pointer-events-none" />

            <div className="max-w-4xl mx-auto relative z-10">
                <header className="mb-12 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-bold mb-6 text-primary shadow-sm shadow-primary/10">
                            <Sparkles size={16} />
                            AI-Powered Portfolio Builder
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">Tell us about <span className="text-primary">Yourself</span></h1>
                        <p className="text-white/50 text-lg font-medium max-w-2xl mx-auto">
                            Our AI will use this information to craft a professional, high-converting developer portfolio for you.
                        </p>
                    </motion.div>
                </header>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {error && (
                        <div className="flex items-center gap-3 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium animate-shake">
                            <AlertCircle size={20} />
                            {error}
                        </div>
                    )}

                    {/* Core Info Section */}
                    <div className="glass-card p-10 border border-white/5 space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Full Name</label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors" size={20} />
                                    <input
                                        name="name"
                                        type="text"
                                        required
                                        placeholder="John Doe"
                                        className="form-input pl-12"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Current Role / Title</label>
                                <div className="relative group">
                                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors" size={20} />
                                    <input
                                        name="role"
                                        type="text"
                                        required
                                        placeholder="Senior Full Stack Engineer"
                                        className="form-input pl-12"
                                        value={formData.role}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">About Me / Bio</label>
                            <div className="relative group">
                                <FileText className="absolute left-4 top-6 text-white/20 group-focus-within:text-primary transition-colors" size={20} />
                                <textarea
                                    name="about"
                                    required
                                    rows={4}
                                    placeholder="Tell us about your journey, passion, and what drives you..."
                                    className="form-input pl-12 pt-5 resize-none"
                                    value={formData.about}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Skills & Projects Section */}
                    <div className="glass-card p-10 border border-white/5 space-y-8">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Skills (Comma separated)</label>
                            <div className="relative group">
                                <Code className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors" size={20} />
                                <input
                                    name="skills"
                                    type="text"
                                    required
                                    placeholder="React, TypeScript, Node.js, AWS, Tailwind CSS..."
                                    className="form-input pl-12"
                                    value={formData.skills}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Key Projects & Descriptions</label>
                            <div className="relative group">
                                <Layers className="absolute left-4 top-6 text-white/20 group-focus-within:text-primary transition-colors" size={20} />
                                <textarea
                                    name="projects"
                                    required
                                    rows={4}
                                    placeholder="Describe your best work. Our AI will highlight the impact and technologies used."
                                    className="form-input pl-12 pt-5 resize-none"
                                    value={formData.projects}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Education Background</label>
                            <div className="relative group">
                                <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors" size={20} />
                                <input
                                    name="education"
                                    type="text"
                                    required
                                    placeholder="B.S. in Computer Science, Stanford University"
                                    className="form-input pl-12"
                                    value={formData.education}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Social Presence Section */}
                    <div className="glass-card p-10 border border-white/5 space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">GitHub Profile URL</label>
                                <div className="relative group">
                                    <Github className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors" size={20} />
                                    <input
                                        name="github"
                                        type="url"
                                        placeholder="https://github.com/username"
                                        className="form-input pl-12"
                                        value={formData.github}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">LinkedIn Profile URL</label>
                                <div className="relative group">
                                    <Linkedin className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors" size={20} />
                                    <input
                                        name="linkedin"
                                        type="url"
                                        placeholder="https://linkedin.com/in/username"
                                        className="form-input pl-12"
                                        value={formData.linkedin}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Contact Email</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors" size={20} />
                                    <input
                                        name="email"
                                        type="email"
                                        required
                                        placeholder="hello@example.com"
                                        className="form-input pl-12"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center pt-8">
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary w-full md:w-auto px-20 py-5 flex items-center justify-center gap-3 transition-all disabled:opacity-50 disabled:cursor-not-allowed group shadow-2xl shadow-primary/20"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    Generate AI Portfolio
                                    <ChevronRight className="group-hover:translate-x-1 transition-transform" size={20} />
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreatePortfolio;
