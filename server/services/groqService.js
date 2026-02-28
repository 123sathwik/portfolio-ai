import axios from "axios";

/**
 * Groq AI Service
 * 
 * Interacts with Groq API for high-speed LLM generations.
 */
export const callGroqAI = async (messages) => {
    try {
        const response = await axios.post(
            "https://api.groq.com/openai/v1/chat/completions",
            {
                model: "llama-3.3-70b-versatile",
                messages: messages,
                temperature: 0.7
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        return response.data.choices[0].message.content;

    } catch (error) {
        console.error("Groq API Error:", error.response?.data || error.message);
        throw new Error("Groq AI request failed");
    }
};
