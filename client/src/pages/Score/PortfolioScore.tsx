import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Trophy,
    Target,
    ChevronRight,
    ArrowUpRight,
    CheckCircle2,
    AlertCircle,
    Lightbulb,
    Briefcase,
    TrendingUp,
    Calendar,
    Share2
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import ScoreGauge from '../components/ScoreGauge';

interface AnalysisData {
    overallScore: number;
    categoryScores: {
        technical: number;
        completeness: number;
        projects: number;
        design: number;
    };
    strengths: string[];
    weaknesses: string[];
    improvementSuggestions: string[];
    suggestedRoles: string[];
    roadmap: {
        shortTerm: string[];
        mediumTerm: string[];
        longTerm: string[];
    };
}

const PortfolioScore: React.FC = () => {
    const { portfolioData } = usePortfolio();
    const [analysis, setAnalysis] = useState<AnalysisData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnalysis = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/analysis/analyze', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ portfolioData })
                });
                const data = await response.json();
                if (data.success) {
                    setAnalysis(data.analysis);
                }
            } catch (error) {
                console.error('Failed to fetch analysis:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAnalysis();
    }, [portfolioData]);

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="flex flex-col items-center gap-6">
                    <div className="w-20 h-20 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <div className="text-center">
                        <h2 className="text-3xl font-black uppercase tracking-tighter mb-2 italic">AI Recruitment Analysis</h2>
                        <p className="text-muted animate-pulse">Evaluating your potential...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!analysis) return null;

    return (
        <div className="min-h-screen bg-[#050505] text-white p-8">
            <div className="max-w-7xl mx-auto space-y-12">
                {/* Header section */}
                <header className="flex flex-col md:flex-row justify-between items-end gap-8">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black uppercase tracking-widest">
                            <Trophy size={14} /> AI Score Report
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter italic">
                            Recruiter <span className="text-primary">Readiness</span>
                        </h1>
                    </div>

                    <div className="flex gap-4">
                        <button className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all font-bold flex items-center gap-2 text-sm">
                            <Share2 size={18} /> Share Results
                        </button>
                        <button className="px-8 py-3 rounded-2xl bg-primary hover:bg-primary-hover font-bold transition-all hover:scale-105 active:scale-95 text-sm">
                            Generate CV
                        </button>
                    </div>
                </header>

                {/* Main Score Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Overall Score Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="lg:col-span-1 p-10 rounded-[3rem] bg-gradient-to-br from-primary/20 to-transparent border border-white/5 flex flex-col items-center justify-center text-center space-y-6"
                    >
                        <ScoreGauge score={analysis.overallScore} label="Overall Rank" />
                        <div className="space-y-1">
                            <p className="text-sm font-bold text-slate-400">Status: <span className="text-primary font-black uppercase tracking-tighter italic text-lg">Hirable</span></p>
                            <p className="text-xs text-muted font-medium">Top 8% in your category</p>
                        </div>
                    </motion.div>

                    {/* Category Scores */}
                    <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4">
                        {Object.entries(analysis.categoryScores).map(([key, value], i) => (
                            <motion.div
                                key={key}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className="p-8 rounded-[2.5rem] bg-white/5 border border-white/5 flex flex-col items-center justify-center gap-4"
                            >
                                <div className="text-3xl font-black italic">{value}</div>
                                <div className="text-[10px] uppercase font-black text-muted tracking-widest text-center">{key}</div>
                            </motion.div>
                        ))}

                        {/* Career Roles Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="md:col-span-4 p-8 rounded-[2.5rem] bg-white/5 border border-white/5"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <Briefcase className="text-primary" size={24} />
                                <h3 className="text-xl font-black">Role Compatibility</h3>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {analysis.suggestedRoles.map((role, i) => (
                                    <span key={i} className="px-5 py-2.5 bg-primary/20 rounded-2xl border border-primary/30 text-primary font-bold text-sm">
                                        {role}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* SWOT Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="p-10 rounded-[3rem] bg-emerald-500/5 border border-emerald-500/10 space-y-6"
                    >
                        <div className="flex items-center gap-3 text-emerald-400">
                            <CheckCircle2 size={24} />
                            <h3 className="text-2xl font-black uppercase tracking-tighter italic">Key Strengths</h3>
                        </div>
                        <ul className="space-y-4">
                            {analysis.strengths.map((s, i) => (
                                <li key={i} className="flex gap-3 text-slate-300">
                                    <span className="text-emerald-500 font-bold">•</span> {s}
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="p-10 rounded-[3rem] bg-rose-500/5 border border-rose-500/10 space-y-6"
                    >
                        <div className="flex items-center gap-3 text-rose-400">
                            <AlertCircle size={24} />
                            <h3 className="text-2xl font-black uppercase tracking-tighter italic">Critical Gaps</h3>
                        </div>
                        <ul className="space-y-4">
                            {analysis.weaknesses.map((w, i) => (
                                <li key={i} className="flex gap-3 text-slate-300">
                                    <span className="text-rose-500 font-bold">•</span> {w}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>

                {/* Action Roadmap */}
                <section className="space-y-8 py-12">
                    <div className="flex items-center gap-4">
                        <Target className="text-primary" size={32} />
                        <h2 className="text-4xl font-black uppercase tracking-tighter italic">90-Day Growth Roadmap</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                        <div className="absolute top-1/2 left-0 right-0 h-px bg-white/5 -z-10 hidden md:block" />

                        {[
                            { phase: 'Short Term', items: analysis.roadmap.shortTerm, color: 'from-blue-500' },
                            { phase: 'Medium Term', items: analysis.roadmap.mediumTerm, color: 'from-purple-500' },
                            { phase: 'Long Term', items: analysis.roadmap.longTerm, color: 'from-primary' }
                        ].map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.2 }}
                                viewport={{ once: true }}
                                className="p-8 rounded-[3rem] bg-white/5 border border-white/5 space-y-6 group hover:border-white/20 transition-all"
                            >
                                <div className={`h-2 w-12 rounded-full bg-gradient-to-r ${step.color} to-transparent`} />
                                <h4 className="text-xs font-black uppercase tracking-widest text-muted">{step.phase}</h4>
                                <ul className="space-y-4">
                                    {step.items.map((item, ii) => (
                                        <li key={ii} className="flex gap-3 text-sm text-slate-400 group-hover:text-slate-200 transition-colors">
                                            <div className="shrink-0 mt-1"><CheckCircle2 size={16} className="text-white/20" /></div>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default PortfolioScore;
