import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User,
    BookOpen,
    Briefcase,
    Code,
    Github,
    Linkedin,
    Mail,
    ImageIcon,
    Sparkles,
    Layers,
    Palette,
    Trash2,
    Plus,
    CheckCircle2,
    ExternalLink,
    Download,
    Copy,
    X
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { useAuth } from '../../context/AuthContext';
import FormInput from '../../components/ui/FormInput';
import DeploymentProgress from '../../components/DeploymentProgress';
import Slider from '../../components/ui/Slider';
import ColorPicker from '../../components/ui/ColorPicker';
import { fetchUserRepos } from '../../services/githubService';
import { generateBio, generateProjectDescription, generateHeadline } from '../../services/aiService';

interface Project {
    id: number;
    title: string;
    description: string;
}

const Generator: React.FC = () => {
    const { user } = useAuth();
    const {
        portfolioData,
        updatePortfolioData,
        isDeploying,
        setIsDeploying,
        deploymentStep,
        setDeploymentStep,
        liveUrl,
        setLiveUrl
    } = usePortfolio();

    const [formData, setFormData] = useState({
        name: portfolioData.name || '',
        bio: portfolioData.bio || '',
        education: portfolioData.education || '',
        skills: portfolioData.skills || '',
        email: portfolioData.email || '',
        linkedin: portfolioData.linkedin || '',
        github: portfolioData.github || '',
        theme: portfolioData.theme || 'modern-dark',
        animationIntensity: 50,
        accentColor: portfolioData.colors.primary || '#6366f1'
    });

    const [projects, setProjects] = useState<Project[]>(
        portfolioData.projects.length > 0
            ? portfolioData.projects.map((p, i) => ({ id: i, title: p.title, description: p.description }))
            : [{ id: 1, title: '', description: '' }]
    );

    const [isFetchingGithub, setIsFetchingGithub] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const deploymentSteps = [
        'Finalizing AI Content Optimization',
        'Generating Custom React Template',
        'Optimizing Production Build Assets',
        'Direct Cloud Deployment'
    ];

    const handleBuildPortfolio = async () => {
        setIsDeploying(true);
        setDeploymentStep(0);

        try {
            // Update context before sending
            const finalData = {
                ...formData,
                projects: projects.map(p => ({ title: p.title, description: p.description, techStack: [], githubLink: '', liveLink: '' })),
                animationLevel: (formData.animationIntensity < 33 ? 'LOW' : formData.animationIntensity < 66 ? 'MEDIUM' : 'HIGH') as 'LOW' | 'MEDIUM' | 'HIGH'
            };

            updatePortfolioData(finalData);

            // Simulate step transitions for UX smoothness
            const stepInterval = setInterval(() => {
                setDeploymentStep((prev: number) => (prev < 3 ? prev + 1 : prev));
            }, 2500);

            const response = await fetch('http://localhost:5000/api/portfolio/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: user?.uid || 'anonymous',
                    formData: finalData,
                    selectedTemplate: formData.theme,
                    theme: { primary: formData.accentColor, accent: '#22c55e', background: '#0a0a0c' },
                    animationLevel: finalData.animationLevel
                })
            });

            clearInterval(stepInterval);
            const data = await response.json();

            if (data.success) {
                setDeploymentStep(3);
                await new Promise(r => setTimeout(r, 1000));
                setLiveUrl(data.liveUrl);
                setIsDeploying(false);
                setShowSuccess(true);
            } else {
                throw new Error(data.error || 'Deployment failed');
            }
        } catch (error) {
            console.error('Build failed:', error);
            alert('Failed to build portfolio. Please check console for details.');
            setIsDeploying(false);
        }
    };

    const handleFetchGithub = async () => {
        if (!formData.github) return;

        setIsFetchingGithub(true);
        try {
            // Extract username from URL if necessary
            const username = formData.github.includes('github.com/')
                ? formData.github.split('github.com/')[1].split('/')[0]
                : formData.github;

            const repos = await fetchUserRepos(username);
            const topRepos = repos.slice(0, 3).map(repo => ({
                id: Math.random(),
                title: repo.name,
                description: repo.description || `A ${repo.language || 'software'} project built with passion.`
            }));

            setProjects(topRepos);
        } catch (error) {
            alert('Could not fetch projects. Please check the username.');
        } finally {
            setIsFetchingGithub(false);
        }
    };

    const [isGenerating, setIsGenerating] = useState<Record<string, boolean>>({});

    const handleAiGenerate = async (type: 'bio' | 'headline' | 'project', id?: number) => {
        const key = id ? `${type}-${id}` : type;
        setIsGenerating(prev => ({ ...prev, [key]: true }));

        try {
            let result: { content: string };
            if (type === 'bio') {
                result = await generateBio(formData.skills, formData.education);
                setFormData(prev => ({ ...prev, bio: result.content }));
            } else if (type === 'headline') {
                result = await generateHeadline(formData.bio);
                setFormData(prev => ({ ...prev, name: result.content })); // Using name field as headline for now or add headline field
            } else if (type === 'project' && id !== undefined) {
                const proj = projects.find(p => p.id === id);
                if (proj) {
                    result = await generateProjectDescription(proj.title, proj.description);
                    setProjects(prev => prev.map(p => p.id === id ? { ...p, description: result.content } : p));
                }
            }
        } catch (error) {
            console.error('AI Generation failed', error);
        } finally {
            setIsGenerating(prev => ({ ...prev, [key]: false }));
        }
    };

    const handleAddProject = () => {
        setProjects([...projects, { id: Date.now(), title: '', description: '' }]);
    };

    const handleRemoveProject = (id: number) => {
        if (projects.length > 1) {
            setProjects(projects.filter(p => p.id !== id));
        }
    };

    const [activeStep, setActiveStep] = useState(1);
    const steps = [
        { id: 1, label: 'Identity', icon: <User size={18} /> },
        { id: 2, label: 'Professional', icon: <Briefcase size={18} /> },
        { id: 3, label: 'Customization', icon: <Palette size={18} /> }
    ];

    return (
        <div className="max-w-4xl mx-auto pb-20">
            {/* Header */}
            <div className="mb-12">
                <h1 className="text-4xl font-black tracking-tight mb-4 flex items-center gap-3">
                    <Sparkles className="text-primary" />
                    AI Portfolio Generator
                </h1>
                <p className="text-muted text-lg max-w-2xl">
                    Complete the fields below and let Berry AI craft a world-class portfolio unique to your career narrative.
                </p>
            </div>

            {/* Steps Indicator */}
            <div className="flex gap-4 mb-10 overflow-x-auto pb-2">
                {steps.map((step) => (
                    <button
                        key={step.id}
                        onClick={() => setActiveStep(step.id)}
                        className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-bold text-sm transition-all whitespace-nowrap border ${activeStep === step.id
                            ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20'
                            : 'glass border-white/5 text-muted hover:text-foreground'
                            }`}
                    >
                        {step.icon}
                        {step.label}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Main Form Area */}
                <div className="lg:col-span-2 space-y-8">
                    <motion.div
                        key={activeStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-8"
                    >
                        {activeStep === 1 && (
                            <div className="space-y-6">
                                <div className="glass p-8 rounded-[32px] space-y-6">
                                    <h3 className="text-xl font-black flex items-center gap-2 mb-2">
                                        <User size={20} className="text-primary" />
                                        Identity & Socials
                                    </h3>

                                    <div className="flex flex-col sm:flex-row gap-6 items-start">
                                        <div className="w-32 h-32 rounded-3xl glass border-dashed border-2 border-white/10 flex flex-col items-center justify-center gap-2 group cursor-pointer hover:border-primary/50 transition-all">
                                            <ImageIcon className="text-muted group-hover:text-primary transition-colors" />
                                            <span className="text-[10px] font-black uppercase text-muted">Upload Photo</span>
                                        </div>
                                        <div className="flex-1 w-full space-y-6">
                                            <div className="relative">
                                                <FormInput
                                                    label="Full Name / Headline"
                                                    placeholder="e.g. Alex Rivera | Full Stack Architect"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                />
                                                <button
                                                    onClick={() => handleAiGenerate('headline')}
                                                    disabled={isGenerating['headline']}
                                                    className="absolute right-2 top-[30px] p-2 bg-primary/10 text-primary hover:bg-primary/20 rounded-xl transition-all"
                                                    title="Generate Headline"
                                                >
                                                    <Sparkles size={14} className={isGenerating['headline'] ? 'animate-spin' : ''} />
                                                </button>
                                            </div>

                                            <div className="relative">
                                                <FormInput
                                                    label="Short Bio"
                                                    placeholder="Creative Director & AI Research Lead..."
                                                    multiline
                                                    value={formData.bio}
                                                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                                />
                                                <button
                                                    onClick={() => handleAiGenerate('bio')}
                                                    disabled={isGenerating['bio']}
                                                    className="absolute right-2 top-[30px] p-2 bg-primary/10 text-primary hover:bg-primary/20 rounded-xl transition-all"
                                                    title="Generate Bio"
                                                >
                                                    <Sparkles size={14} className={isGenerating['bio'] ? 'animate-spin' : ''} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <FormInput
                                            label="Email"
                                            icon={<Mail size={18} />}
                                            placeholder="alex@berry.ai"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                        <FormInput
                                            label="LinkedIn"
                                            icon={<Linkedin size={18} />}
                                            placeholder="linkedin.com/in/alex"
                                            value={formData.linkedin}
                                            onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                                        />
                                        <div className="relative">
                                            <FormInput
                                                label="GitHub"
                                                icon={<Github size={18} />}
                                                placeholder="github.com/alexrivera"
                                                value={formData.github}
                                                onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                                            />
                                            <button
                                                onClick={handleFetchGithub}
                                                disabled={isFetchingGithub || !formData.github}
                                                className="absolute right-2 top-[30px] px-3 py-1.5 bg-primary/10 text-primary hover:bg-primary/20 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all disabled:opacity-50"
                                            >
                                                {isFetchingGithub ? 'Fetching...' : 'Fetch Projects'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeStep === 2 && (
                            <div className="space-y-8">
                                <div className="glass p-8 rounded-[32px] space-y-6">
                                    <h3 className="text-xl font-black flex items-center gap-2 mb-2">
                                        <BookOpen size={20} className="text-primary" />
                                        Background & Skills
                                    </h3>
                                    <FormInput
                                        label="Education"
                                        placeholder="e.g. MS in Computer Science, Stanford University"
                                        value={formData.education}
                                        onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                                    />
                                    <FormInput
                                        label="Skills (Comma separated)"
                                        icon={<Code size={18} />}
                                        placeholder="React, TypeScript, LLMs, UI/UX..."
                                        value={formData.skills}
                                        onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between px-2">
                                        <h3 className="text-xl font-black flex items-center gap-2">
                                            <Briefcase size={20} className="text-primary" />
                                            Experience & Projects
                                        </h3>
                                        <button
                                            onClick={handleAddProject}
                                            className="text-xs font-black uppercase text-primary bg-primary/10 px-3 py-2 rounded-xl flex items-center gap-2 hover:bg-primary/20 transition-all"
                                        >
                                            <Plus size={14} /> Add Project
                                        </button>
                                    </div>

                                    {projects.map((project, idx) => (
                                        <motion.div
                                            key={project.id}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="glass p-6 rounded-3xl relative"
                                        >
                                            <button
                                                onClick={() => handleRemoveProject(project.id)}
                                                className="absolute top-4 right-4 p-2 text-muted hover:text-red-400 transition-colors"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                            <div className="grid grid-cols-1 gap-4 pt-4">
                                                <FormInput
                                                    label="Project Title"
                                                    placeholder="e.g. AI Portfolio Engine"
                                                    value={project.title}
                                                    onChange={(e) => {
                                                        const newProjects = [...projects];
                                                        newProjects[idx].title = e.target.value;
                                                        setProjects(newProjects);
                                                    }}
                                                />
                                                <div className="relative">
                                                    <FormInput
                                                        label="Description"
                                                        placeholder="A next-gen platform for..."
                                                        multiline
                                                        value={project.description}
                                                        onChange={(e) => {
                                                            const newProjects = [...projects];
                                                            newProjects[idx].description = e.target.value;
                                                            setProjects(newProjects);
                                                        }}
                                                    />
                                                    <button
                                                        onClick={() => handleAiGenerate('project', project.id)}
                                                        disabled={isGenerating[`project-${project.id}`]}
                                                        className="absolute right-2 top-[30px] p-2 bg-primary/10 text-primary hover:bg-primary/20 rounded-xl transition-all"
                                                        title="Enhance Description"
                                                    >
                                                        <Sparkles size={14} className={isGenerating[`project-${project.id}`] ? 'animate-spin' : ''} />
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeStep === 3 && (
                            <div className="space-y-8">
                                <div className="glass p-8 rounded-[32px] space-y-10">
                                    <h3 className="text-xl font-black flex items-center gap-2 mb-2">
                                        <Palette size={20} className="text-primary" />
                                        Design & Aesthetics
                                    </h3>

                                    <div className="space-y-4">
                                        <label className="text-xs font-bold uppercase tracking-widest text-muted ml-1">Theme Selection</label>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                            {['Modern', 'Minimal', 'Futuristic', 'Executive', 'Creative'].map(t => (
                                                <button
                                                    key={t}
                                                    onClick={() => setFormData({ ...formData, theme: t.toLowerCase() })}
                                                    className={`px-4 py-6 rounded-2xl border transition-all text-center group ${formData.theme === t.toLowerCase()
                                                        ? 'bg-primary/10 border-primary text-primary'
                                                        : 'glass border-white/5 text-muted hover:text-foreground'
                                                        }`}
                                                >
                                                    <div className="w-8 h-8 rounded-lg bg-foreground/5 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                                                    <span className="font-bold text-xs uppercase tracking-wider">{t}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <Slider
                                        label="Animation Intensity"
                                        min={0}
                                        max={100}
                                        value={formData.animationIntensity}
                                        onChange={(v) => setFormData({ ...formData, animationIntensity: v })}
                                    />

                                    <ColorPicker
                                        label="Primary Accent Color"
                                        value={formData.accentColor}
                                        onChange={(v) => setFormData({ ...formData, accentColor: v })}
                                    />
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>

                {/* Sidebar Controls */}
                <div className="lg:col-span-1">
                    <div className="sticky top-10 space-y-6">
                        <div className="glass p-8 rounded-[32px] border-primary/20">
                            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                                <Sparkles className="text-primary" />
                            </div>
                            <h4 className="font-black text-xl mb-3 leading-tight">Ready to Generate?</h4>
                            <p className="text-muted text-sm mb-8 leading-relaxed">
                                Our neural engine will process your details to create a high-performance, SEO-optimized portfolio.
                            </p>

                            <div className="space-y-3">
                                <button
                                    onClick={handleBuildPortfolio}
                                    disabled={isDeploying}
                                    className="w-full py-4 bg-primary text-white rounded-2xl font-black text-lg shadow-lg shadow-primary/20 glow transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
                                >
                                    Build Portfolio
                                </button>
                                <button className="w-full py-4 glass glass-hover rounded-2xl font-bold text-sm text-muted">
                                    Save Progress
                                </button>
                            </div>
                        </div>

                        <div className="glass p-6 rounded-[32px] flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                                <Layers className="text-accent" size={20} />
                            </div>
                            <div>
                                <p className="text-xs font-black uppercase tracking-widest text-muted">Generation Plan</p>
                                <p className="font-bold text-sm">Professional AI V2.1</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals & Overlays */}
            <AnimatePresence>
                {/* Deployment Progress Modal */}
                <DeploymentProgress
                    isOpen={isDeploying}
                    currentStep={deploymentStep}
                    steps={deploymentSteps}
                    title="Building Your Presence"
                />

                {/* Success Modal */}
                {showSuccess && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="fixed inset-0 z-[110] flex items-center justify-center bg-black/90 backdrop-blur-2xl p-6"
                    >
                        <div className="max-w-xl w-full bg-white/5 border border-white/10 rounded-[3rem] p-12 text-center relative overflow-hidden group">
                            {/* Decorative background sparks */}
                            <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/20 blur-[100px] rounded-full group-hover:bg-primary/30 transition-all duration-700" />
                            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-accent/20 blur-[100px] rounded-full group-hover:bg-accent/30 transition-all duration-700" />

                            <button
                                onClick={() => setShowSuccess(false)}
                                className="absolute top-8 right-8 p-3 text-muted hover:text-white transition-colors glass rounded-2xl"
                            >
                                <X size={20} />
                            </button>

                            <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto text-primary mb-8 border border-primary/30 shadow-2xl shadow-primary/20">
                                <CheckCircle2 size={40} />
                            </div>

                            <div className="space-y-4 mb-10">
                                <h1 className="text-5xl font-black tracking-tighter italic lg:text-6xl">IT'S LIVE.</h1>
                                <p className="text-slate-400 text-lg font-medium">Your portfolio is officially professional, responsive, and hosted.</p>
                            </div>

                            <div className="p-6 bg-black/40 border border-white/5 rounded-[2rem] flex items-center justify-between gap-4 mb-8">
                                <p className="truncate text-sm font-mono text-primary flex-1 text-left">{liveUrl}</p>
                                <div className="flex gap-2 shrink-0">
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(liveUrl);
                                            // Optional: add toast or visual feedback
                                        }}
                                        className="p-4 hover:bg-white/10 rounded-2xl transition-all border border-white/5"
                                        title="Copy URL"
                                    >
                                        <Copy size={20} />
                                    </button>
                                    <a
                                        href={liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-4 bg-primary rounded-2xl hover:scale-105 transition-all shadow-lg shadow-primary/20"
                                    >
                                        <ExternalLink size={20} />
                                    </a>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <button className="py-5 rounded-[1.5rem] border border-white/10 font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white/5 transition-all">
                                    <Download size={18} />
                                    Resume PDF
                                </button>
                                <button className="py-5 rounded-[1.5rem] bg-white text-black font-black text-xs uppercase tracking-widest hover:scale-[1.02] transition-all">
                                    Go to Dashboard
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Generator;