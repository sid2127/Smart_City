import express, { Router } from 'express'
import { login, logout, SignUp } from '../controllers/user.controller.js';
import { verifyJwt } from '../middlewares/user.middleware.js';

const router = Router();

router.route("/signup").post(SignUp);
router.route("/login").post(login);
router.route("/logout").post(verifyJwt , logout);


export default router;