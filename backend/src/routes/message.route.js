import express from 'express';

const router = express.Router();

router.get('/send', (req, res) => {
    res.send('Messages send endpoint');
}); 

export default router;  