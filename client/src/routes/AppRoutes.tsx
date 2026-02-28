import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from '../pages/Landing';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard/Dashboard';
import Generator from '../pages/Generator/Generator';
import Preview from '../pages/Preview';
import PortfolioScore from '../pages/Score/PortfolioScore';
import DashboardLayout from '../layouts/DashboardLayout';
import { PortfolioProvider } from '../context/PortfolioContext';
import { AuthProvider } from '../context/AuthContext';
import ProtectedRoute from './ProtectedRoute';

const AppRoutes: React.FC = () => {
    return (
        <AuthProvider>
            <PortfolioProvider>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<Login />} />

                    {/* Protected Routes */}
                    <Route element={<ProtectedRoute />}>
                        <Route element={<DashboardLayout />}>
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/generator" element={<Generator />} />
                            <Route path="/preview" element={<Preview />} />
                            <Route path="/score" element={<PortfolioScore />} />
                        </Route>
                    </Route>

                    {/* Catch-all route */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </PortfolioProvider>
        </AuthProvider>
    );
};

export default AppRoutes;
