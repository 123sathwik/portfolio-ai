/**
 * Portfolio Analyzer Service
 * 
 * Conducts a deep analysis of portfolio data using structured scoring patterns.
 * Provides strengths, weaknesses, role matching, and career roadmaps.
 */

export const analyzePortfolio = async (data) => {
    console.log('🧐 Analyzing portfolio for recruiter readiness...');

    // Simulate AI deep analysis time
    await new Promise(resolve => setTimeout(resolve, 2500));

    const { name, bio, skills, projects, education, github, linkedin } = data;
    const skillsList = skills ? skills.split(',').map(s => s.trim().toLowerCase()) : [];

    // 1. Scoring Logic
    let techScore = 0;
    let completenessScore = 0;
    let projectScore = projects?.length * 20 || 0;
    if (projectScore > 100) projectScore = 100;

    // Completeness check
    if (name) completenessScore += 15;
    if (bio) completenessScore += 20;
    if (skills) completenessScore += 15;
    if (education) completenessScore += 15;
    if (github) completenessScore += 15;
    if (linkedin) completenessScore += 20;

    // Tech depth based on skills
    const highValueSkills = ['react', 'node.js', 'typescript', 'python', 'aws', 'docker', 'graphql'];
    const matchedSkills = skillsList.filter(s => highValueSkills.includes(s));
    techScore = (matchedSkills.length / highValueSkills.length) * 100;

    const designScore = 85; // Default for our high-quality templates
    const overallScore = Math.round((techScore + completenessScore + projectScore + designScore) / 4);

    // 2. Strengths & Weaknesses
    const strengths = [];
    const weaknesses = [];
    if (projects?.length >= 3) strengths.push('Strong project showcase with diverse implementations');
    if (techScore > 70) strengths.push('Expertise in high-demand modern tech stack');
    if (completenessScore === 100) strengths.push('Highly professional and complete profile');

    if (projects?.length < 2) weaknesses.push('Limited project count; target at least 3 high-impact pieces');
    if (!github) weaknesses.push('Missing GitHub presence - critical for technical validation');
    if (skillsList.length < 5) weaknesses.push('Identify and list more specialized niche skills');

    // 3. Career Role Matching
    const roles = [];
    if (skillsList.includes('react') || skillsList.includes('css')) roles.push('Frontend Developer');
    if (skillsList.includes('node.js') || skillsList.includes('python')) roles.push('Backend Developer');
    if (roles.length >= 2) roles.push('Full Stack Developer');
    if (skillsList.includes('python') || bio.toLowerCase().includes('ai')) roles.push('AI/ML Engineer');

    // 4. Action Plan Generator
    const actionPlan = {
        shortTerm: [
            'Optimize LinkedIn profile for discovered roles',
            github ? 'Contribute to one open-source project' : 'Link GitHub and add READMEs to projects'
        ],
        mediumTerm: [
            'Build a full-stack application integrating an External API',
            'Learn advanced state management (Redux/Zustand)'
        ],
        longTerm: [
            'Prepare for technical interviews focused on system design',
            'Achieve a cloud certification (AWS/Azure)'
        ]
    };

    return {
        overallScore,
        categoryScores: {
            technical: Math.round(techScore),
            completeness: Math.round(completenessScore),
            projects: Math.round(projectScore),
            design: designScore
        },
        strengths,
        weaknesses,
        improvementSuggestions: [
            'Add live demo links for all projects',
            'Incorporate specific metrics (e.g., "Improved performance by 40%")'
        ],
        suggestedRoles: roles,
        roadmap: actionPlan,
        analyzedAt: new Date().toISOString()
    };
};
