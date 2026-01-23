import express from 'express';

const router = express.Router();

router.get('/register' , (req, res) => {
    res.send('Register Endpoint');
});

router.get('/login', (req, res) => {
  res.send('Login Endpoint');
});

router.get('/logout', (req, res) => {
  res.send('Logout Endpoint');
});
  
export default router;