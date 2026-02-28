import { db } from '../config/firebaseAdmin.js';
import { enhancePortfolioData } from '../services/aiEnhancerService.js';
import { injectDataIntoTemplate } from '../utils/templateInjector.js';
import { buildPortfolio } from '../services/buildService.js';
import { deployPortfolio } from '../services/deploymentService.js';
import { generateResumePDF } from '../services/resumeGenerator.js';

/**
 * Portfolio Controller
 * 
 * Coordinates the entire generation, build, and deployment flow.
 */

export const generatePortfolio = async (req, res) => {
    const { userId, formData, selectedTemplate, theme, animationLevel } = req.body;

    if (!userId || !formData) {
        return res.status(400).json({ error: 'Missing required data' });
    }

    try {
        // 1. AI Enhancement
        console.log('Stage 1: Enhancing Content');
        const enhancedData = await enhancePortfolioData(formData);

        // 2. Template Injection
        console.log('Stage 2: Generating Template');
        const { projectId, projectPath } = await injectDataIntoTemplate(
            selectedTemplate || 'modern',
            enhancedData,
            theme || { accentColor: '#6366f1' }
        );

        // 3. Build Process
        console.log('Stage 3: Building Portfolio');
        const buildOutput = await buildPortfolio(projectPath);

        // 4. Deployment
        console.log('Stage 4: Deploying Portfolio');
        const deployment = await deployPortfolio(buildOutput);
        const liveUrl = deployment.liveUrl;

        // 5. Resume Generation (Parallel)
        const resumePath = await generateResumePDF(enhancedData);

        // 6. Persistence
        console.log('Stage 5: Saving to Firestore');
        const portfolioRef = db.collection('users').doc(userId).collection('portfolios').doc();

        const portfolioMetadata = {
            id: portfolioRef.id,
            template: selectedTemplate || 'modern-dark',
            theme: theme || { primary: '#6366f1', accent: '#22c55e', background: '#0a0a0c' },
            animationLevel: animationLevel || 'MEDIUM',
            liveUrl: liveUrl || '',
            enhancedData,
            createdAt: new Date().toISOString()
        };

        await portfolioRef.set(portfolioMetadata);

        res.status(200).json({
            success: true,
            liveUrl
        });

    } catch (error) {
        console.error('❌ Portfolio Generation Flow failed:', error);
        res.status(500).json({
            success: false,
            error: 'Generation failed at a critical stage',
            message: error.message
        });
    }
};
