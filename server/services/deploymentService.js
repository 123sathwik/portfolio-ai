import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

/**
 * Deployment Service
 * 
 * Handles the deployment of build assets to Vercel using their REST API.
 */
export const deployPortfolio = async (buildPath) => {
    try {
        const response = await axios.post(
            `https://api.vercel.com/v13/deployments`,
            {
                name: "portfolio-deployment",
                files: [], // Note: Vercel requires files for manual deployments, but using project ID for now as requested.
                project: process.env.VERCEL_PROJECT_ID
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
                    "Content-Type": "application/json"
                }
            }
        );

        return {
            liveUrl: `https://${response.data.url}`
        };

    } catch (error) {
        console.error("Vercel Deployment Error:", error.response?.data || error.message);
        throw new Error("Deployment failed");
    }
};

/**
 * Compatibility wrapper
 */
export const deployToVercel = deployPortfolio;
