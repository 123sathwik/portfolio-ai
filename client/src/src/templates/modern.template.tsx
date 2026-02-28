import React from 'react';
import { motion } from 'framer-motion';

/**
 * Modern Portfolio Template
 * Variables: {{name}}, {{bio}}, {{skills}}, {{projects}}, {{education}}, {{accentColor}}
 */

const ModernTemplate = () => {
    return (
        <div className="min-h-screen bg-[#0a0a0c] text-slate-100 font-sans selection:bg-{{accentColor}}/30">
            {/* Hero Section */}
            <section className="relative px-6 pt-32 pb-20 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-full -z-10">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-{{accentColor}}/10 rounded-full blur-[128px]" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[128px]" />
                </div>

                <div className="max-w-4xl mx-auto text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-black mb-8 tracking-tight"
                    >
                        {{ name }}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
                    >
                        {{ bio }}
                    </motion.p>
                </div>
            </section>

            {/* Skills Section */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold mb-10 flex items-center gap-4">
                        Expertise
                        <div className="h-px flex-1 bg-slate-800" />
                    </h2>
                    <div className="flex flex-wrap gap-3">
                        {{ skills }}
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section className="py-20 px-6 bg-white/[0.02]">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold mb-10">Featured Work</h2>
                    <div className="grid grid-cols-1 gap-8">
                        {{ projects }}
                    </div>
                </div>
            </section>

            {/* Education Section */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold mb-10">Foundation</h2>
                    <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                        <h3 className="text-xl font-bold mb-2">Education</h3>
                        <p className="text-slate-400">{{ education }}</p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-20 px-6 border-t border-slate-800 text-center text-slate-500 text-sm">
                <p>&copy; {new Date().getFullYear()} {{ name }}. Built with Berry AI.</p>
            </footer>
        </div>
    );
};

export default ModernTemplate;
