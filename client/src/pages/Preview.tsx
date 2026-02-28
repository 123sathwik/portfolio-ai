import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Monitor,
    Smartphone,
    Tablet,
    Rocket,
    ChevronLeft,
    CheckCircle2,
    ExternalLink,
    Download,
    Copy
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import TemplateRenderer from '../components/TemplateRenderer';
import FormInput from '../components/ui/FormInput';
import ColorPicker from '../components/ui/ColorPicker';
import Slider from '../components/ui/Slider';
import DeploymentProgress from '../components/DeploymentProgress';

const Preview: React.FC = () => {
    const { portfolioData, updatePortfolioData, isDeploying, setIsDeploying, deploymentStep, setDeploymentStep } = usePortfolio();
    const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
    const [activeTab, setActiveTab] = useState<'content' | 'design'>('content');
    const [showSuccess, setShowSuccess] = useState(false);
    const [liveUrl, setLiveUrl] = useState('');

    const previewWidths = {
        desktop: '100%',
        tablet: '768px',
        mobile: '375px'
    };

    const deploymentSteps = [
        'Enhancing Content with AI',
        'Generating Custom Template',
        'Building Production Assets',
        'Deploying to Cloud'
    ];

    const handleDeploy = async () => {
        setIsDeploying(true);
        setDeploymentStep(0);

        // Simulate deployment process
        for (let i = 0; i < deploymentSteps.length; i++) {
            setDeploymentStep(i);
            await new Promise(r => setTimeout(r, 1500));
        }

        setLiveUrl(`https://portfolio-${Math.random().toString(36).substring(7)}.vercel.app`);
        setIsDeploying(false);
        setShowSuccess(true);
    };

    return (
        <div className="h-screen flex flex-col bg-[#050505] text-white">
            {/* Top Navbar */}
            <nav className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-black/50 backdrop-blur-xl z-50">
                <div className="flex items-center gap-4">
                    <button className="p-2 hover:bg-white/5 rounded-xl transition-colors text-muted">
                        <ChevronLeft size={20} />
                    </button>
                    <div className="h-4 w-px bg-white/10 mx-2" />
                    <h1 className="font-bold text-sm tracking-widest uppercase">Live Preview</h1>
                </div>

                <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl">
                    <button
                        onClick={() => setPreviewMode('desktop')}
                        className={`p-2 rounded-lg transition-all ${previewMode === 'desktop' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-muted hover:text-white'}`}
                    >
                        <Monitor size={18} />
                    </button>
                    <button
                        onClick={() => setPreviewMode('tablet')}
                        className={`p-2 rounded-lg transition-all ${previewMode === 'tablet' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-muted hover:text-white'}`}
                    >
                        <Tablet size={18} />
                    </button>
                    <button
                        onClick={() => setPreviewMode('mobile')}
                        className={`p-2 rounded-lg transition-all ${previewMode === 'mobile' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-muted hover:text-white'}`}
                    >
                        <Smartphone size={18} />
                    </button>
                </div>

                <button
                    onClick={handleDeploy}
                    disabled={isDeploying}
                    className="bg-primary hover:bg-primary-hover px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100"
                >
                    <Rocket size={18} />
                    Deploy
                </button>
            </nav>

            <div className="flex-1 flex overflow-hidden">
                {/* Sidebar Editor */}
                <aside className="w-[400px] border-r border-white/10 bg-[#0a0a0c] flex flex-col overflow-hidden">
                    <div className="flex p-4 gap-2 border-b border-white/5">
                        <button
                            onClick={() => setActiveTab('content')}
                            className={`flex-1 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'content' ? 'bg-white/10 text-white' : 'text-muted hover:text-white'}`}
                        >
                            Content
                        </button>
                        <button
                            onClick={() => setActiveTab('design')}
                            className={`flex-1 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'design' ? 'bg-white/10 text-white' : 'text-muted hover:text-white'}`}
                        >
                            Design
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide">
                        {activeTab === 'content' ? (
                            <>
                                <div className="space-y-6">
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Identity</h3>
                                    <FormInput
                                        label="Full Name"
                                        value={portfolioData.name}
                                        onChange={(e) => updatePortfolioData({ name: e.target.value })}
                                    />
                                    <FormInput
                                        label="Headline"
                                        value={portfolioData.headline}
                                        onChange={(e) => updatePortfolioData({ headline: e.target.value })}
                                    />
                                    <FormInput
                                        label="Bio"
                                        multiline
                                        value={portfolioData.bio}
                                        onChange={(e) => updatePortfolioData({ bio: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-6">
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Experience</h3>
                                    <FormInput
                                        label="Education"
                                        value={portfolioData.education}
                                        onChange={(e) => updatePortfolioData({ education: e.target.value })}
                                    />
                                    <FormInput
                                        label="Skills (Comma separated)"
                                        value={portfolioData.skills}
                                        onChange={(e) => updatePortfolioData({ skills: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-6">
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Socials</h3>
                                    <FormInput
                                        label="Email"
                                        value={portfolioData.email}
                                        onChange={(e) => updatePortfolioData({ email: e.target.value })}
                                    />
                                    <FormInput
                                        label="GitHub URL"
                                        value={portfolioData.github}
                                        onChange={(e) => updatePortfolioData({ github: e.target.value })}
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="space-y-6">
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Theme Selection</h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        {['modern-dark', 'glassmorphism'].map(t => (
                                            <button
                                                key={t}
                                                onClick={() => updatePortfolioData({ theme: t })}
                                                className={`p-4 rounded-2xl border transition-all text-xs font-bold capitalize ${portfolioData.theme === t ? 'bg-primary/20 border-primary text-primary shadow-lg shadow-primary/10' : 'bg-white/5 border-white/10 text-muted hover:border-white/30'}`}
                                            >
                                                {t.replace('-', ' ')}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Visual Identity</h3>
                                    <ColorPicker
                                        label="Primary Color"
                                        value={portfolioData.colors.primary}
                                        onChange={(v) => updatePortfolioData({ colors: { ...portfolioData.colors, primary: v } })}
                                    />
                                    <ColorPicker
                                        label="Accent Color"
                                        value={portfolioData.colors.accent}
                                        onChange={(v) => updatePortfolioData({ colors: { ...portfolioData.colors, accent: v } })}
                                    />
                                </div>

                                <div className="space-y-6">
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Animation</h3>
                                    <Slider
                                        label="Motion Intensity"
                                        min={0}
                                        max={100}
                                        value={portfolioData.animationLevel === 'LOW' ? 20 : portfolioData.animationLevel === 'MEDIUM' ? 50 : 90}
                                        onChange={(v) => {
                                            const level = v < 33 ? 'LOW' : v < 66 ? 'MEDIUM' : 'HIGH';
                                            updatePortfolioData({ animationLevel: level });
                                        }}
                                    />
                                </div>
                            </>
                        )}
                    </div>
                </aside>

                {/* Live Preview Area */}
                <main className="flex-1 bg-black p-8 overflow-hidden flex flex-col items-center">
                    <div
                        className="flex-1 rounded-[2.5rem] overflow-hidden shadow-2xl bg-white/[0.02] border border-white/5 transition-all duration-500 ease-out"
                        style={{ width: previewWidths[previewMode] }}
                    >
                        <TemplateRenderer data={portfolioData} />
                    </div>
                </main>
            </div>

            {/* Deployment Progress Modal */}
            <DeploymentProgress
                isOpen={isDeploying}
                currentStep={deploymentStep}
                steps={deploymentSteps}
            />

            {/* Success Modal */}
            <AnimatePresence>
                {showSuccess && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="fixed inset-0 z-[110] flex items-center justify-center bg-black/90 backdrop-blur-2xl p-6"
                    >
                        <div className="max-w-xl w-full bg-white/5 border border-white/10 rounded-[3rem] p-12 text-center space-y-8">
                            <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto text-primary">
                                <CheckCircle2 size={40} />
                            </div>

                            <div className="space-y-4">
                                <h2 className="text-5xl font-black tracking-tight italic">Success!</h2>
                                <p className="text-slate-400 text-lg">Your portfolio is officially live on the internet.</p>
                            </div>

                            <div className="p-6 bg-black/40 border border-white/5 rounded-3xl flex items-center justify-between gap-4">
                                <p className="truncate text-sm font-mono text-primary">{liveUrl}</p>
                                <div className="flex gap-2 shrink-0">
                                    <button className="p-3 hover:bg-white/10 rounded-xl transition-colors"><Copy size={18} /></button>
                                    <a href={liveUrl} target="_blank" className="p-3 bg-primary rounded-xl hover:scale-105 transition-all"><ExternalLink size={18} /></a>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <button className="py-4 rounded-2xl border border-white/10 font-bold flex items-center justify-center gap-2 hover:bg-white/5">
                                    <Download size={18} />
                                    Resume PDF
                                </button>
                                <button className="py-4 rounded-2xl bg-white text-black font-bold">
                                    Dashboard
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Preview;
