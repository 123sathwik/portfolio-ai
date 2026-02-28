import fs from 'fs/promises';
import path from 'path';

/**
 * Template Injector Utility
 * 
 * Injects user data into React/Tailwind template files.
 */

export const injectDataIntoTemplate = async (templateName, userData, themeConfig) => {
    console.log(`🎨 Injecting data into ${templateName} template...`);

    // Path to the template file (assuming they are in the /templates folder we created earlier)
    const templateDir = path.resolve('../templates');
    const templatePath = path.join(templateDir, `${templateName}.template.tsx`);

    try {
        let content = await fs.readFile(templatePath, 'utf-8');

        // Update the render logic to be more robust
        const renderData = {
            ...userData,
            skillsHtml: (userData.skills || '').split(',').map(skill =>
                `<span class="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm">${skill.trim()}</span>`
            ).join('\n            '),
            projectsHtml: (userData.projects || []).map(project => `
            <div class="project-card">
              <h3>${project.title}</h3>
              <p>${project.description}</p>
            </div>`).join('\n')
        };

        // Replace all placeholders using a simple regex loop or more advanced engine
        const placeholders = [
            'name', 'headline', 'bio', 'education', 'email', 'github', 'linkedin', 'profileImage'
        ];

        placeholders.forEach(p => {
            const regex = new RegExp(`{{${p}}}`, 'g');
            content = content.replace(regex, userData[p] || '');
        });

        content = content.replace(/{{skills}}/g, renderData.skillsHtml);
        content = content.replace(/{{projects}}/g, renderData.projectsHtml);
        content = content.replace(/{{primaryColor}}/g, themeConfig.primaryColor || '#6366f1');
        content = content.replace(/{{accentColor}}/g, themeConfig.accentColor || '#22c55e');
        content = content.replace(/{{backgroundColor}}/g, themeConfig.backgroundColor || '#0a0a0c');


        // Create a temporary project directory for the build
        const projectId = `portfolio_${Date.now()}`;
        const outputPath = path.resolve(`./temp/${projectId}`);
        await fs.mkdir(outputPath, { recursive: true });

        // Write the finalized component
        await fs.writeFile(path.join(outputPath, 'Portfolio.tsx'), content);

        return {
            projectId,
            projectPath: outputPath
        };
    } catch (error) {
        console.error('❌ Template injection failed:', error);
        throw error;
    }
};
