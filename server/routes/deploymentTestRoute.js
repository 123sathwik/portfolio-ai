import express from "express";

const router = express.Router();

/**
 * Test route for Vercel Deployment API.
 */
router.get("/test-deploy", (req, res) => {
    res.json({
        success: true,
        message: "Vercel Deployment API integration is ready.",
        mockResult: {
            liveUrl: "https://mock-portfolio-deploy.vercel.app"
        }
    });
});

export default router;
