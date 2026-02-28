import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Zap, LogOut, Layout, User, Settings, FolderKanban, Plus } from "lucide-react";
import { motion } from "framer-motion";

function Dashboard() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate("/login");
        } catch (err) {
            console.error("Failed to logout", err);
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white flex">
            {/* Sidebar */}
            <aside className="w-72 bg-black/50 border-r border-white/5 flex flex-col p-6 fixed h-full z-20 backdrop-blur-xl">
                <div className="flex items-center gap-3 mb-12">
                    <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center border border-primary/20 shadow-lg shadow-primary/10">
                        <Zap size={20} className="text-primary" />
                    </div>
                    <span className="text-lg font-bold tracking-tight text-white">AI Studio</span>
                </div>

                <nav className="flex-1 space-y-2">
                    <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 text-primary border border-primary/20 font-bold transition-all">
                        <Layout size={20} />
                        Dashboard
                    </Link>
                    <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-white/50 hover:text-white transition-all font-medium group text-left">
                        <FolderKanban size={20} className="group-hover:text-primary transition-colors" />
                        My Portfolios
                    </a>
                    <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-white/50 hover:text-white transition-all font-medium group text-left">
                        <Settings size={20} className="group-hover:text-primary transition-colors" />
                        Settings
                    </a>
                </nav>

                <div className="mt-auto pt-6 border-t border-white/5">
                    <div className="flex items-center gap-3 px-4 py-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-blue-600/20 border border-white/10 flex items-center justify-center">
                            <User size={20} className="text-primary" />
                        </div>
                        <div className="overflow-hidden text-left">
                            <p className="text-sm font-bold truncate text-white">{user?.email?.split('@')[0]}</p>
                            <p className="text-[10px] text-white/40 font-medium truncate">{user?.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 text-white/40 hover:text-red-400 transition-all font-bold group text-left"
                    >
                        <LogOut size={20} className="group-hover:translate-x-1 transition-transform" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-72 p-12 relative overflow-hidden">
                {/* Background Highlight */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full opacity-30 pointer-events-none" />

                <header className="flex justify-between items-center mb-12 relative z-10 text-left">
                    <div>
                        <h1 className="text-4xl font-black mb-2 tracking-tight text-white">Welcome Back!</h1>
                        <p className="text-white/50 font-medium tracking-tight">Build and manage your AI-powered developer portfolios.</p>
                    </div>
                    <Link to="/create-portfolio" className="btn-primary flex items-center gap-3">
                        <Plus size={20} />
                        Create New Portfolio
                    </Link>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 relative z-10 text-left">
                    {/* Empty State / Dashboard Cards */}
                    <Link to="/create-portfolio" className="glass-card p-10 flex flex-col items-center justify-center text-center border-dashed border-2 border-white/10 group cursor-pointer hover:border-primary/30 transition-all min-h-[300px]">
                        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-primary/10 group-hover:scale-110 transition-all">
                            <Plus size={32} className="text-white/30 group-hover:text-primary" />
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-white">Build New Template</h3>
                        <p className="text-white/40 text-sm font-medium text-center">Start from scratch or use an existing GitHub repo.</p>
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass-card p-8 group relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full" />
                        <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-6 border border-primary/20 shadow-inner">
                            <FolderKanban size={24} className="text-primary" />
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-white">Total Portfolios</h3>
                        <div className="flex items-end gap-2">
                            <span className="text-4xl font-black text-white">0</span>
                            <span className="text-sm font-bold text-white/30 pb-1">/ Unlimited</span>
                        </div>
                        <div className="mt-8 h-2 w-full bg-white/5 rounded-full overflow-hidden text-left">
                            <div className="h-full w-0 bg-primary group-hover:w-1/4 transition-all duration-1000" />
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}

export default Dashboard;
