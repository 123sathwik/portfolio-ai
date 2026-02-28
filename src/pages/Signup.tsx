import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { Zap, Mail, Lock, AlertCircle, UserPlus } from "lucide-react";
import { motion } from "framer-motion";

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            return setError("Passwords do not match.");
        }
        setLoading(true);
        setError("");
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigate("/dashboard");
        } catch (err: any) {
            setError(err.message || "Failed to create account.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white flex flex-col justify-center items-center px-6 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/10 blur-[120px] rounded-full opacity-50 pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="text-center mb-10">
                    <Link to="/" className="inline-flex items-center gap-3 mb-8 group">
                        <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center border border-primary/20 group-hover:scale-110 transition-transform">
                            <Zap size={24} className="text-primary" />
                        </div>
                        <span className="text-2xl font-bold tracking-tight uppercase tracking-widest text-xs">AI Studio</span>
                    </Link>
                    <h1 className="text-3xl font-black mb-2 tracking-tight">Create Account</h1>
                    <p className="text-white/50 font-medium">Join thousands of developers building with AI.</p>
                </div>

                <div className="glass-card p-8 border border-white/5 shadow-2xl relative">
                    <div className="absolute inset-0 bg-white/[0.02] rounded-3xl pointer-events-none" />

                    <form onSubmit={handleSignup} className="space-y-6 relative z-10">
                        {error && (
                            <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                                <AlertCircle size={18} />
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-white/70 ml-1 uppercase tracking-widest">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-primary transition-colors" size={20} />
                                <input
                                    type="email"
                                    placeholder="name@company.com"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-white/70 ml-1 uppercase tracking-widest">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-primary transition-colors" size={20} />
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-white/70 ml-1 uppercase tracking-widest">Confirm Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-primary transition-colors" size={20} />
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-primary flex items-center justify-center gap-3 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                        >
                            {loading ? "Creating account..." : "Start Building"}
                            <UserPlus className="group-hover:translate-x-1 transition-transform" size={20} />
                        </button>
                    </form>
                </div>

                <p className="text-center mt-8 text-white/40 text-sm font-medium">
                    Already have an account?{" "}
                    <Link to="/login" className="text-primary font-bold hover:text-primary/80 transition-colors">Log in here</Link>
                </p>
            </motion.div>
        </div>
    );
}

export default Signup;
