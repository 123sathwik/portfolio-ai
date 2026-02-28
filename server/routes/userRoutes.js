import express from 'express';
import { getUserProfile, updateUserProfile } from '../controllers/userController.js';

const router = express.Router();

router.get('/:userId/profile', getUserProfile);
router.post('/:userId/profile', updateUserProfile);

export default router;
