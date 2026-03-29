import express from "express"
const router = express.Router();

import authController from "../controller/auth/auth.controller.js"
router.post('/sign-up', authController.signUp)
router.post('/sign-in', authController.signIn)
router.get('/sign-out', authController.signOut)

export default router;