import express from "express";
import { callGroqAI } from "../services/groqService.js";

const router = express.Router();

/**
 * Test route for Groq AI integration.
 */
router.get("/test-groq", async (req, res) => {
    try {
        const result = await callGroqAI([
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: "Say hello in one sentence." }
        ]);

        res.json({ success: true, result });

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

export default router;
