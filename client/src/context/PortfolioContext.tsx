import React, { createContext, useContext, useState } from 'react';

export interface Project {
    title: string;
    description: string;
    techStack: string[];
    githubLink: string;
    liveLink: string;
    image?: string;
}

export interface PortfolioData {
    name: string;
    headline: string;
    bio: string;
    skills: string;
    projects: Project[];
    education: string;
    email: string;
    github: string;
    linkedin: string;
    profileImage?: string;
    theme: string;
    colors: {
        primary: string;
        accent: string;
        background: string;
    };
    animationLevel: 'LOW' | 'MEDIUM' | 'HIGH';
    liveUrl?: string;
}

interface PortfolioContextType {
    portfolioData: PortfolioData;
    updatePortfolioData: (newData: Partial<PortfolioData>) => void;
    isDeploying: boolean;
    setIsDeploying: (value: boolean) => void;
    deploymentStep: number;
    setDeploymentStep: React.Dispatch<React.SetStateAction<number>>;
    liveUrl: string;
    setLiveUrl: (url: string) => void;
}

const defaultData: PortfolioData = {
    name: 'John Doe',
    headline: 'Full Stack Developer & AI Enthusiast',
    bio: 'I build scalable web applications and explore the frontiers of artificial intelligence.',
    skills: 'React, TypeScript, Node.js, Python, AWS, Docker',
    projects: [
        {
            title: 'AI Image Generator',
            description: 'A tool that generates high-quality images from text descriptions using stable diffusion.',
            techStack: ['React', 'Python', 'PyTorch'],
            githubLink: '#',
            liveLink: '#'
        }
    ],
    education: 'B.S. in Computer Science, Stanford University',
    email: 'john@example.com',
    github: 'https://github.com/johndoe',
    linkedin: 'https://linkedin.com/in/johndoe',
    theme: 'modern-dark',
    colors: {
        primary: '#6366f1',
        accent: '#22c55e',
        background: '#0a0a0c'
    },
    animationLevel: 'MEDIUM'
};

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [portfolioData, setPortfolioData] = useState<PortfolioData>(defaultData);
    const [isDeploying, setIsDeploying] = useState(false);
    const [deploymentStep, setDeploymentStep] = useState(0);
    const [liveUrl, setLiveUrl] = useState('');

    const updatePortfolioData = (newData: Partial<PortfolioData>) => {
        setPortfolioData(prev => ({ ...prev, ...newData }));
    };

    return (
        <PortfolioContext.Provider value={{
            portfolioData,
            updatePortfolioData,
            isDeploying,
            setIsDeploying,
            deploymentStep,
            setDeploymentStep,
            liveUrl,
            setLiveUrl
        }}>
            {children}
        </PortfolioContext.Provider>
    );
};

export const usePortfolio = () => {
    const context = useContext(PortfolioContext);
    if (!context) {
        throw new Error('usePortfolio must be used within a PortfolioProvider');
    }
    return context;
};
