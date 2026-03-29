import express from "express";
const router = express.Router();

import userController from "../controller/utils/user.controller.js";
router.get('/users', userController.getUsers)


export default router