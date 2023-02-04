import { signupuser } from '../controller/user-controller.js';
import express from 'express';
const router=express.Router();
router.post('/signup',signupuser);
export default router;