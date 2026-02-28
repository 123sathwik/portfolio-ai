import { Link } from "react-router-dom";
import { Zap, Home } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-8 border border-white/10">
                <Zap size={32} className="text-primary/50" />
            </div>
            <h1 className="text-4xl font-black mb-4 tracking-tight">404 - Page Not Found</h1>
            <p className="text-white/40 max-w-sm mb-12 font-medium">The link you followed may be broken or the page may have been removed.</p>

            <Link
                to="/"
                className="flex items-center gap-3 px-8 py-3 rounded-full bg-primary text-black font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform"
            >
                <Home size={16} />
                Back to Home
            </Link>
        </div>
    );
}
