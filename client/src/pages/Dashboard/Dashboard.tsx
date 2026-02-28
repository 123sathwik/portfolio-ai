import React from 'react';
import { motion } from 'framer-motion';
import {
    Plus,
    History,
    TrendingUp,
    Star,
    Zap,
    Layout,
    ArrowUpRight
} from 'lucide-react';

const Dashboard: React.FC = () => {
    const stats = [
        { label: 'Portfolios', value: '12', icon: <Layout className="text-primary" />, trend: '+3' },
        { label: 'Total Views', value: '2.4k', icon: <TrendingUp className="text-accent" />, trend: '+12%' },
        { label: 'Generation Credits', value: '45', icon: <Zap className="text-yellow-400" />, trend: '∞' },
        { label: 'Average Score', value: '98', icon: <Star className="text-emerald-400" />, trend: '+2' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-10"
        >
            {/* Welcome Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black tracking-tight mb-2">Workspace Overview</h1>
                    <p className="text-muted text-sm">Welcome back, Alex. Your AI is ready to build.</p>
                </div>
                <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all glow group">
                    <Plus size={20} className="group-hover:rotate-90 transition-transform" />
                    New Portfolio
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{ y: -4 }}
                        className="glass p-6 rounded-3xl group border-white/5 hover:border-primary/20 transition-all"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform">
                                {stat.icon}
                            </div>
                            <span className="text-xs font-black text-emerald-400 px-2 py-1 bg-emerald-400/10 rounded-lg">
                                {stat.trend}
                            </span>
                        </div>
                        <p className="text-muted text-xs uppercase tracking-widest font-bold mb-1">{stat.label}</p>
                        <h3 className="text-3xl font-black tracking-tighter">{stat.value}</h3>
                    </motion.div>
                ))}
            </div>

            {/* Middle Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activity */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between px-2">
                        <h2 className="text-xl font-black flex items-center gap-2">
                            <History size={20} className="text-primary" />
                            Recent Builds
                        </h2>
                        <button className="text-xs font-bold text-primary hover:underline">View All</button>
                    </div>
                    <div className="glass rounded-[32px] overflow-hidden">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="flex items-center justify-between p-6 border-b border-white/5 last:border-none hover:bg-white/[0.02] transition-colors group">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-white/5" />
                                    <div>
                                        <h4 className="font-bold text-sm mb-0.5">Creative Director Portfolio</h4>
                                        <p className="text-[10px] text-muted uppercase tracking-widest font-black">Generated 2 days ago • v1.4</p>
                                    </div>
                                </div>
                                <ArrowUpRight size={18} className="text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* AI Suggestions Card */}
                <div className="space-y-6 text-center">
                    <h2 className="text-xl font-black px-2 text-left">AI Co-pilot</h2>
                    <div className="glass p-8 rounded-[32px] relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-accent/20 rounded-full blur-[48px] -z-10 group-hover:scale-150 transition-transform duration-700" />
                        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-primary/20">
                            <Zap className="text-primary animate-pulse" />
                        </div>
                        <h4 className="font-black text-lg mb-2">Boost Your Reach</h4>
                        <p className="text-muted text-sm mb-8">Your profile score is 88%. Adding a case study on "Neural Design" could boost visibility by 40%.</p>
                        <button className="w-full py-4 glass glass-hover rounded-2xl font-bold text-sm text-primary">
                            Generate Suggestion
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Dashboard;