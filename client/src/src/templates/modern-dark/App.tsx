import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ExternalLink, BookOpen, User, Briefcase, Code } from 'lucide-react';

/**
 * Modern Dark Template
 * 
 * Features:
 * - High contrast futuristic UI
 * - Framer Motion scroll animations
 * - Dynamic theme injection
 * - Animation intensity control
 */

const ModernDark = ({ data, themeConfig, animationIntensity = 'MEDIUM' }) => {
    const { name, headline, bio, skills, projects, education, email, github, linkedin, profileImage } = data;

    const colors = {
        primary: themeConfig?.primaryColor || '#6366f1',
        accent: themeConfig?.accentColor || '#22c55e',
        bg: themeConfig?.backgroundColor || '#0a0a0c'
    };

    const anim = {
        LOW: { duration: 0.8, y: 10 },
        MEDIUM: { duration: 0.5, y: 20 },
        HIGH: { duration: 0.3, y: 30 }
    }[animationIntensity];

    return (
        <div
            className="min-h-screen text-slate-100 font-sans selection:bg-indigo-500/30"
            style={{ backgroundColor: colors.bg }}
        >
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center px-6 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[128px]" style={{ backgroundColor: `${colors.primary}20` }} />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-[128px]" style={{ backgroundColor: `${colors.accent}15` }} />
                </div>

                <div className="max-w-6xl mx-auto w-full z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -anim.y }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: anim.duration }}
                    >
                        <h2 className="text-sm font-black uppercase tracking-[0.3em] mb-4" style={{ color: colors.primary }}>
                            Welcome to my portfolio
                        </h2>
                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6">
                            {name}
                        </h1>
                        <p className="text-2xl md:text-3xl text-slate-400 max-w-2xl mb-10 leading-relaxed font-light">
                            {headline}
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <a
                                href="#projects"
                                className="px-8 py-4 rounded-2xl font-bold bg-white text-black hover:scale-105 transition-transform"
                            >
                                View My Work
                            </a>
                            <a
                                href={`mailto:${email}`}
                                className="px-8 py-4 rounded-2xl font-bold border border-white/10 hover:bg-white/5 transition-colors"
                            >
                                Contact Me
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="py-32 px-6">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: anim.y }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-20"
                    >
                        <h2 className="text-4xl font-black mb-4">Featured Solutions</h2>
                        <div className="h-1 w-20 rounded-full" style={{ backgroundColor: colors.primary }} />
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {projects?.map((project, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: anim.y }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="group relative p-1 rounded-[2rem] overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent -z-10" />
                                <div className="bg-[#121214] p-8 h-full rounded-[1.9rem] border border-white/5 group-hover:border-white/20 transition-all">
                                    <div className="h-48 bg-slate-800 rounded-2xl mb-6 overflow-hidden">
                                        {project.image && <img src={project.image} alt={project.title} className="w-full h-full object-cover" />}
                                    </div>
                                    <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                                    <p className="text-slate-400 mb-6 line-clamp-3">{project.description}</p>
                                    <div className="flex flex-wrap gap-2 mb-8">
                                        {project.techStack?.map((tech, ti) => (
                                            <span key={ti} className="text-[10px] uppercase font-black px-2 py-1 bg-white/5 rounded-md text-slate-500">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex gap-4">
                                        <a href={project.liveLink} className="p-3 bg-white/5 rounded-xl hover:bg-white/10 text-slate-300">
                                            <ExternalLink size={20} />
                                        </a>
                                        <a href={project.githubLink} className="p-3 bg-white/5 rounded-xl hover:bg-white/10 text-slate-300">
                                            <Github size={20} />
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Skills & About */}
            <section className="py-32 px-6 bg-white/[0.01]">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
                    <motion.div
                        initial={{ opacity: 0, x: -anim.y }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-black mb-8">About Me</h2>
                        <p className="text-xl text-slate-400 leading-relaxed mb-10">
                            {bio}
                        </p>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                                <h4 className="font-black text-slate-500 uppercase text-xs tracking-widest mb-2">Location</h4>
                                <p className="font-bold">Remote / Global</p>
                            </div>
                            <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                                <h4 className="font-black text-slate-500 uppercase text-xs tracking-widest mb-2">Experience</h4>
                                <p className="font-bold">Expert Level</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: anim.y }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-black mb-8">Core Skills</h2>
                        <div className="flex flex-wrap gap-3">
                            {skills?.split(',').map((skill, i) => (
                                <span
                                    key={i}
                                    className="px-6 py-3 bg-white/5 rounded-2xl border border-white/5 font-bold hover:border-white/20 transition-all cursor-default"
                                    style={{ color: i % 2 === 0 ? colors.primary : colors.accent }}
                                >
                                    {skill.trim()}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-20 px-6 border-t border-white/5 text-center">
                <div className="flex justify-center gap-6 mb-10">
                    <a href={github} className="text-slate-500 hover:text-white transition-colors"><Github size={24} /></a>
                    <a href={linkedin} className="text-slate-500 hover:text-white transition-colors"><Linkedin size={24} /></a>
                    <a href={`mailto:${email}`} className="text-slate-500 hover:text-white transition-colors"><Mail size={24} /></a>
                </div>
                <p className="text-slate-500 text-sm font-medium tracking-widest uppercase">
                    &copy; {new Date().getFullYear()} {name}. Built by AI Portfolio Studio.
                </p>
            </footer>
        </div>
    );
};

export default ModernDark;
