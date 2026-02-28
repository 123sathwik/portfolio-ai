import { motion } from 'framer-motion';
import { Rocket, Github, FileText, Palette, ChevronRight, Zap } from 'lucide-react';

const Features = [
    {
        title: "AI Portfolio Generator",
        description: "Generate stunning developer portfolios from your GitHub projects in seconds.",
        icon: Rocket,
    },
    {
        title: "GitHub Auto Import",
        description: "Seamlessly import your top repositories and contributions with one click.",
        icon: Github,
    },
    {
        title: "Resume to Portfolio",
        description: "Turn your PDF resume into a fully interactive, hosted web experience.",
        icon: FileText,
    },
    {
        title: "Theme Generator",
        description: "Dynamic AI-powered themes that match your personal brand perfectly.",
        icon: Palette,
    }
];

function App() {
    return (
        <div className="min-h-screen bg-[#050505] text-white">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/20 blur-[120px] rounded-full opacity-50 pointer-events-none" />

                <div className="max-w-6xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium mb-8 text-primary">
                            <Zap size={16} />
                            AI-Powered Portfolio Builder
                        </span>
                        <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tight leading-tight">
                            Portfolio <span className="text-primary italic">AI Studio</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-white/60 mb-12 max-w-3xl mx-auto leading-relaxed">
                            Generate a high-performance, developer-focused portfolio in seconds.
                            Built for speed, styled by AI, and ready for deployment.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <button className="btn-primary flex items-center gap-3 group">
                                Get Started
                                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button className="px-8 py-4 rounded-full font-bold bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                                View Templates
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 px-6 relative">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">Built for Modern Developers</h2>
                        <p className="text-white/60 text-lg max-w-2xl mx-auto">
                            Everything you need to showcase your talent without the manual effort of building from scratch.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {Features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="glass-card flex flex-col items-center text-center group"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                                    <feature.icon className="text-primary" size={32} />
                                </div>
                                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                                <p className="text-white/50 text-sm leading-relaxed">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Social Footer */}
            <footer className="py-12 px-6 border-t border-white/10 text-center">
                <p className="text-white/40 text-sm italic">
                    &copy; 2026 Portfolio AI Studio. Generated with ⚡
                </p>
            </footer>
        </div>
    );
}

export default App;
