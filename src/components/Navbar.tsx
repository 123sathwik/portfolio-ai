import { useNavigate, Link } from "react-router-dom";
import { Zap } from "lucide-react";

export default function Navbar() {
    const navigate = useNavigate();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl border-b border-white/10 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                        <Zap size={24} className="text-white" />
                    </div>
                    <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 uppercase tracking-widest text-xs">
                        AI Studio
                    </span>
                </Link>

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate("/login")}
                        className="px-6 py-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-sm font-bold transition-all text-white"
                    >
                        Login
                    </button>
                    <button
                        onClick={() => navigate("/create")}
                        className="btn-primary"
                    >
                        Get Started
                    </button>
                </div>
            </div>
        </nav>
    );
}
