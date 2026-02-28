export default async function handler(req, res) {
    // Allow CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { name, role, about, skills, projects, education } = req.body;

    if (!process.env.GROQ_API_KEY) {
        return res.status(500).json({ error: 'Groq API key not configured' });
    }

    try {
        const prompt = `
      You are an expert portfolio writer.
      Improve and rewrite the following developer portfolio details.
      Make it professional, modern, concise, and impressive.

      Name: ${name}
      Role: ${role}
      About: ${about}
      Skills: ${skills}
      Projects: ${projects}
      Education: ${education}

      Return response in EXACLTY this JSON format:
      {
        "improvedAbout": "...",
        "improvedProjects": "...",
        "improvedSkills": "...",
        "headline": "...",
        "summaryScore": 85,
        "suggestions": ["...", "..."]
      }
    `;

        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages: [{ role: 'user', content: prompt }],
                response_format: { type: 'json_object' }
            }),
        });

        const data = await response.json();
        const aiContent = JSON.parse(data.choices[0].message.content);

        return res.status(200).json(aiContent);
    } catch (error) {
        console.error('Groq AI Error:', error);
        return res.status(500).json({ error: 'Failed to generate AI content' });
    }
}
