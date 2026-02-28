import { db } from '../config/firebaseAdmin.js';
import { analyzePortfolio } from '../services/portfolioAnalyzer.js';

/**
 * Analysis Controller
 * 
 * Handles requests for portfolio scoring and coach reports.
 */

export const getPortfolioAnalysis = async (req, res) => {
    const { userId, portfolioData } = req.body;

    if (!portfolioData) {
        return res.status(400).json({ error: 'Missing portfolio data' });
    }

    try {
        const analysis = await analyzePortfolio(portfolioData);

        // Save to Firestore if userId is provided
        if (userId) {
            const analysisRef = db.collection('users').doc(userId).collection('analysis').doc();
            await analysisRef.set({
                id: analysisRef.id,
                score: analysis.overallScore,
                categoryScores: analysis.categoryScores,
                strengths: analysis.strengths,
                weaknesses: analysis.weaknesses,
                suggestions: analysis.improvementSuggestions,
                suggestedRoles: analysis.suggestedRoles,
                actionPlan: analysis.roadmap,
                analyzedAt: analysis.analyzedAt
            });
        }

        res.status(200).json({
            success: true,
            analysis
        });

    } catch (error) {
        console.error('❌ Portfolio Analysis failed:', error);
        res.status(500).json({
            success: false,
            error: 'Analysis failed'
        });
    }
};
