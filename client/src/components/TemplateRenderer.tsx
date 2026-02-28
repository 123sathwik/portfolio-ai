import React, { Suspense, useMemo } from 'react';
import { PortfolioData } from '../context/PortfolioContext';

interface TemplateRendererProps {
    data: PortfolioData;
}

const TemplateRenderer: React.FC<TemplateRendererProps> = ({ data }) => {
    // Use useMemo to avoid re-rendering the lazy component every time
    const TemplateComponent = useMemo(() => {
        // Dynamic import based on selected theme
        // Note: Template components must be exported as default
        return React.lazy(() => import(`../templates/${data.theme}/App.tsx`));
    }, [data.theme]);

    return (
        <div className="w-full h-full overflow-auto">
            <Suspense fallback={
                <div className="w-full h-full flex items-center justify-center bg-black/20 backdrop-blur-sm">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-muted font-medium animate-pulse">Loading Template...</p>
                    </div>
                </div>
            }>
                <TemplateComponent
                    data={data}
                    themeConfig={{
                        primaryColor: data.colors.primary,
                        accentColor: data.colors.accent,
                        backgroundColor: data.colors.background
                    }}
                    animationIntensity={data.animationLevel}
                />
            </Suspense>
        </div>
    );
};

export default TemplateRenderer;
