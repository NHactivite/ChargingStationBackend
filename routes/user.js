import express from 'express'
import { getMyProfile, login, logout, register } from '../controllers/user.js';
import { isAuthenticated } from '../middleWare/auth.js';

const router = express.Router();

router.post("/new",register)
router.post("/login",login)
router.get("/logout",logout)
router.get("/me",isAuthenticated,getMyProfile)
export default router;