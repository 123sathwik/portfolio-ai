import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 relative overflow-hidden">
            {/* Background Orbs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10 animate-pulse-slow" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <div className="glass p-8 md:p-10 rounded-[32px] relative overflow-hidden">
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-black mb-2 tracking-tight">Welcome Back</h1>
                        <p className="text-muted text-sm tracking-wide uppercase font-bold opacity-70">
                            Access your AI Workspace
                        </p>
                    </div>

                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-muted ml-1">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted group-focus-within:text-primary transition-colors" />
                                <input
                                    type="email"
                                    placeholder="name@company.com"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-primary/50 focus:bg-white/[0.07] transition-all text-sm"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-xs font-bold uppercase tracking-widest text-muted">Password</label>
                                <a href="#" className="text-[10px] font-black uppercase tracking-tighter text-primary hover:text-accent transition-colors">Forgot?</a>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted group-focus-within:text-primary transition-colors" />
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-primary/50 focus:bg-white/[0.07] transition-all text-sm"
                                />
                            </div>
                        </div>

                        <button className="w-full py-4 bg-primary text-white rounded-2xl font-black text-lg hover:shadow-[0_0_25px_rgba(99,102,241,0.4)] transition-all glow flex items-center justify-center gap-2 group">
                            Sign In
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-white/5">
                        <button className="w-full py-4 glass rounded-2xl font-bold text-sm flex items-center justify-center gap-3 glass-hover mb-6">
                            <Github className="w-5 h-5" />
                            Continue with GitHub
                        </button>

                        <p className="text-center text-sm text-muted">
                            Don't have an account?{' '}
                            <Link to="/register" className="text-primary font-black hover:text-accent transition-colors underline underline-offset-4">
                                Create Account
                            </Link>
                        </p>
                    </div>
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-center mt-8 text-[10px] uppercase font-black tracking-[0.2em] text-muted opacity-50"
                >
                    Secured by Berry Cloud Infrastructure
                </motion.p>
            </motion.div>
        </div>
    );
};

export default Login;
