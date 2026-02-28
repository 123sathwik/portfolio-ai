import { db } from '../config/firebaseAdmin.js';

/**
 * User Controller
 * 
 * Manages user profile data in Firestore.
 */

export const getUserProfile = async (req, res) => {
    const { userId } = req.params;

    try {
        const profileRef = db.collection('users').doc(userId).collection('profile').doc('data');
        const doc = await profileRef.get();

        if (!doc.exists) {
            return res.status(404).json({ error: 'Profile not found' });
        }

        res.status(200).json({ success: true, profile: doc.data() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateUserProfile = async (req, res) => {
    const { userId } = req.params;
    const profileData = req.body;

    try {
        const profileRef = db.collection('users').doc(userId).collection('profile').doc('data');
        await profileRef.set({
            ...profileData,
            updatedAt: new Date().toISOString()
        }, { merge: true });

        res.status(200).json({ success: true, message: 'Profile updated' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
