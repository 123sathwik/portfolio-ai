import express from 'express';
import { getPortfolioAnalysis } from '../controllers/analysisController.js';

const router = express.Router();

router.post('/analyze', getPortfolioAnalysis);

export default router;
