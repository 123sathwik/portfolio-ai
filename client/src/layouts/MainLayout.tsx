import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Layout, User, PlusCircle, Monitor, Menu } from 'lucide-react';

const MainLayout: React.FC = () => {
    const location = useLocation();
    const isPublic = ['/', '/login'].includes(location.pathname);

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            {/* Navbar */}
            <nav className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                            <Layout className="w-6 h-6 text-primary" />
                        </div>
                        <span className="text-xl font-bold tracking-tight">Berry AI</span>
                    </Link>

                    <div className="hidden md:flex items-center gap-8">
                        <Link to="/" className="text-sm font-medium text-muted hover:text-foreground transition-colors">Home</Link>
                        {!isPublic && (
                            <>
                                <Link to="/dashboard" className="text-sm font-medium text-muted hover:text-foreground transition-colors flex items-center gap-2">
                                    <Monitor className="w-4 h-4" /> Dashboard
                                </Link>
                                <Link to="/generator" className="text-sm font-medium text-muted hover:text-foreground transition-colors flex items-center gap-2">
                                    <PlusCircle className="w-4 h-4" /> Generator
                                </Link>
                            </>
                        )}
                    </div>

                    <div className="flex items-center gap-4">
                        {isPublic ? (
                            <Link to="/login" className="px-5 py-2 bg-primary text-white rounded-lg font-medium hover:opacity-90 transition-opacity">
                                Sign In
                            </Link>
                        ) : (
                            <div className="flex items-center gap-3">
                                <span className="text-sm font-medium text-muted hidden sm:block">Demo User</span>
                                <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center">
                                    <User className="w-6 h-6 text-muted" />
                                </div>
                            </div>
                        )}
                        <button className="md:hidden p-2 text-muted">
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-grow">
                <Outlet />
            </main>

            {/* Footer (Simplified) */}
            <footer className="border-t border-border py-12 bg-black/20">
                <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <Layout className="w-5 h-5 text-primary" />
                        <span className="font-bold">Berry AI</span>
                    </div>
                    <p className="text-muted text-sm">© 2026 Berry AI Studio. Built with React + Vite.</p>
                    <div className="flex gap-6 text-muted text-sm">
                        <a href="#" className="hover:text-primary transition-colors">Privacy</a>
                        <a href="#" className="hover:text-primary transition-colors">Terms</a>
                        <a href="#" className="hover:text-primary transition-colors">Contact</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default MainLayout;
