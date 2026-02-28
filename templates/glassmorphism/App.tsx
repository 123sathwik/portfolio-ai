import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ExternalLink, Sparkles } from 'lucide-react';

const Glassmorphism = ({ data, themeConfig, animationIntensity = 'MEDIUM' }) => {
    const { name, headline, bio, skills, projects, education, email, github, linkedin } = data;

    const colors = {
        primary: themeConfig?.primaryColor || '#ec4899',
        accent: themeConfig?.accentColor || '#3b82f6',
        bg: themeConfig?.backgroundColor || '#0f172a'
    };

    return (
        <div
            className="min-h-screen text-white font-sans overflow-x-hidden"
            style={{ backgroundColor: colors.bg }}
        >
            {/* Background Orbs */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-pink-500/20 rounded-full blur-[150px] animate-pulse" />
                <div className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px] animate-pulse" />
            </div>

            <div className="max-w-5xl mx-auto px-6 py-20 relative z-10">
                {/* Glass Header */}
                <motion.header
                    initial={{ backdropFilter: 'blur(0px)', opacity: 0 }}
                    animate={{ backdropFilter: 'blur(12px)', opacity: 1 }}
                    className="p-12 rounded-[3rem] bg-white/5 border border-white/10 shadow-2xl mb-20"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring' }}
                    >
                        <h1 className="text-7xl font-black mb-4 bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent">
                            {name}
                        </h1>
                        <p className="text-2xl font-medium text-blue-300 mb-8">{headline}</p>
                        <div className="flex gap-4">
                            <a href={github} className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"><Github /></a>
                            <a href={linkedin} className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"><Linkedin /></a>
                            <a href={`mailto:${email}`} className="p-4 rounded-2xl bg-white/10 border border-white/20 hover:scale-105 transition-all flex items-center gap-2 font-bold px-8">
                                Hire Me <Sparkles size={18} />
                            </a>
                        </div>
                    </motion.div>
                </motion.header>

                {/* About & Skills Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="md:col-span-2 p-10 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-md"
                    >
                        <h2 className="text-3xl font-bold mb-6">Strategic Vision</h2>
                        <p className="text-lg text-slate-300 leading-relaxed">{bio}</p>
                    </motion.div>

                    <div className="grid grid-cols-1 gap-8">
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="p-8 rounded-[2rem] bg-gradient-to-br from-pink-500/20 to-blue-500/20 border border-white/10 backdrop-blur-md flex flex-col items-center justify-center text-center"
                        >
                            <h3 className="text-4xl font-black mb-1">100%</h3>
                            <p className="text-xs uppercase tracking-widest font-bold opacity-50">Commit Rate</p>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="p-8 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-md"
                        >
                            <h3 className="text-xl font-bold mb-4">Stack</h3>
                            <div className="flex flex-wrap gap-2">
                                {skills?.split(',').map((s, i) => (
                                    <span key={i} className="text-[10px] bg-white/10 px-2 py-1 rounded-md">{s.trim()}</span>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Projects */}
                <h2 className="text-4xl font-black mb-12 text-center">Engineered Experiences</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {projects?.map((project, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            className="group rounded-[3rem] overflow-hidden bg-white/5 border border-white/10 backdrop-blur-sm"
                        >
                            <div className="h-64 bg-gradient-to-tr from-white/10 to-transparent relative overflow-hidden">
                                {project.image && <img src={project.image} alt="" className="w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-opacity" />}
                                <div className="absolute inset-x-8 bottom-8">
                                    <h3 className="text-3xl font-bold">{project.title}</h3>
                                </div>
                            </div>
                            <div className="p-8">
                                <p className="text-slate-400 mb-6 leading-relaxed">{project.description}</p>
                                <div className="flex gap-4">
                                    <a href={project.liveLink} className="flex-1 py-4 text-center rounded-2xl bg-white text-black font-bold">Live Demo</a>
                                    <a href={project.githubLink} className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"><Github /></a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Glassmorphism;
