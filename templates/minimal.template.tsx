import React from 'react';
import { motion } from 'framer-motion';

/**
 * Minimal Portfolio Template
 * Variables: {{name}}, {{bio}}, {{skills}}, {{projects}}, {{education}}, {{accentColor}}
 */

const MinimalTemplate = () => {
    return (
        <div className="min-h-screen bg-white text-zinc-900 font-serif selection:bg-{{accentColor}}/20">
            <div className="max-w-3xl mx-auto px-6 py-24">
                <header className="mb-24">
                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-4xl font-medium mb-8"
                    >
                        {{ name }}
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-zinc-600 leading-relaxed mb-12"
                    >
                        {{ bio }}
                    </motion.div>
                    <div className="h-px w-12 bg-zinc-200" />
                </header>

                <section className="mb-24">
                    <h2 className="text-sm uppercase tracking-widest text-zinc-400 mb-8 font-sans font-bold">Skills</h2>
                    <div className="text-zinc-700 leading-loose">
                        {{ skills }}
                    </div>
                </section>

                <section className="mb-24">
                    <h2 className="text-sm uppercase tracking-widest text-zinc-400 mb-8 font-sans font-bold">Projects</h2>
                    <div className="space-y-16">
                        {{ projects }}
                    </div>
                </section>

                <section className="mb-24">
                    <h2 className="text-sm uppercase tracking-widest text-zinc-400 mb-8 font-sans font-bold">Education</h2>
                    <p className="text-zinc-700 leading-relaxed">{{ education }}</p>
                </section>

                <footer className="pt-24 border-t border-zinc-100 text-sm text-zinc-400 font-sans">
                    <p>{{ name }} &mdash; {new Date().getFullYear()}</p>
                </footer>
            </div>
        </div>
    );
};

export default MinimalTemplate;
