import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Terminal,
    Settings,
    LogOut,
    Menu,
    X,
    Bell,
    Search,
    User,
    ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DashboardLayout: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { icon: <LayoutDashboard size={20} />, label: 'Overview', path: '/dashboard' },
        { icon: <Terminal size={20} />, label: 'AI Generator', path: '/generator' },
        { icon: <Settings size={20} />, label: 'Settings', path: '/settings' },
    ];

    const handleLogout = () => {
        // Placeholder for actual logout logic
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-background text-foreground flex overflow-hidden">
            {/* Sidebar */}
            <AnimatePresence mode="wait">
                {isSidebarOpen && (
                    <motion.aside
                        initial={{ x: -280 }}
                        animate={{ x: 0 }}
                        exit={{ x: -280 }}
                        className="fixed inset-y-0 left-0 z-50 w-64 glass border-r border-white/5 bg-black/20 backdrop-blur-2xl lg:relative"
                    >
                        <div className="flex flex-col h-full">
                            <div className="p-6 flex items-center justify-between">
                                <Link to="/" className="flex items-center gap-2 group">
                                    <div className="w-8 h-8 bg-primary rounded-lg group-hover:rotate-12 transition-transform" />
                                    <span className="text-xl font-black tracking-tighter">Berry AI</span>
                                </Link>
                                <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-muted">
                                    <X size={20} />
                                </button>
                            </div>

                            <nav className="flex-1 px-4 space-y-2 mt-4">
                                {menuItems.map((item) => (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all group ${location.pathname === item.path
                                                ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                                : 'text-muted hover:bg-white/5 hover:text-foreground'
                                            }`}
                                    >
                                        {item.icon}
                                        {item.label}
                                        {location.pathname === item.path && (
                                            <motion.div layoutId="active" className="ml-auto"><ChevronRight size={14} /></motion.div>
                                        )}
                                    </Link>
                                ))}
                            </nav>

                            <div className="p-4 border-t border-white/5">
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-3 w-full px-4 py-3 rounded-xl font-bold text-sm text-red-400 hover:bg-red-400/10 transition-all"
                                >
                                    <LogOut size={20} />
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Top Navbar */}
                <header className="h-20 glass border-b border-white/5 flex items-center justify-between px-6 z-40 bg-black/10">
                    <div className="flex items-center gap-4">
                        {!isSidebarOpen && (
                            <button
                                onClick={() => setIsSidebarOpen(true)}
                                className="p-2 glass rounded-xl text-muted hover:text-foreground transition-colors"
                            >
                                <Menu size={20} />
                            </button>
                        )}
                        <div className="hidden md:flex items-center bg-white/5 border border-white/10 rounded-xl px-4 py-2 w-80 group focus-within:border-primary/50 transition-all">
                            <Search size={18} className="text-muted group-focus-within:text-primary transition-colors" />
                            <input
                                type="text"
                                placeholder="Search commands..."
                                className="bg-transparent border-none outline-none ml-2 text-sm w-full"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="p-2 text-muted hover:text-foreground relative">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-[#0a0a0c]" />
                        </button>
                        <div className="h-8 w-px bg-white/5 mx-2" />
                        <div className="flex items-center gap-3 pl-2">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold">Alex Rivera</p>
                                <p className="text-[10px] text-muted font-black uppercase tracking-widest">Pro Member</p>
                            </div>
                            <div className="w-10 h-10 rounded-xl border border-primary/20 bg-primary/10 flex items-center justify-center p-1 overflow-hidden">
                                <div className="w-full h-full rounded-lg bg-primary/20 flex items-center justify-center">
                                    <User size={20} className="text-primary" />
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-6 md:p-10 relative">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[128px] -z-10 pointer-events-none" />
                    <div className="max-w-6xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
