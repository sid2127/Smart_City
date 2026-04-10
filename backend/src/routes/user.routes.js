import express, { Router } from 'express'
import { createOfficer, getUserDetails, login, logout, SignUp } from '../controllers/user.controller.js';
import { verifyJwt } from '../middlewares/user.middleware.js';

const router = Router();

router.route("/signup").post(SignUp);
router.route("/login").post(login);
router.route("/logout").post(verifyJwt , logout);
router.route("/createOfficer").post(verifyJwt , createOfficer);
router.route("/getUserDetails").get(verifyJwt , getUserDetails);

export default router;