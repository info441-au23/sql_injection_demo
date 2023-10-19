import { getDb } from '../../models/db.js';
import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
    const { search } = req.query;
    const db = await getDb();
    try {
        // don't do this, very unsafe
        const spies = await db.all(`select * from people where first_name = "${search}"`);
        res.json({success: true, spies});
    } catch(error) {
        res.json({success: false, error: error.message});
    }
});

export default router;
