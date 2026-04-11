import express, { Router } from 'express'
import { createOfficer, getAllOfficers, getOfficersByComplaint, getUserDetails, login, logout, removeOfficer, SignUp } from '../controllers/user.controller.js';
import { verifyJwt } from '../middlewares/user.middleware.js';

const router = Router();

router.route("/signup").post(SignUp);
router.route("/login").post(login);
router.route("/logout").post(verifyJwt , logout);
router.route("/createOfficer").post(verifyJwt , createOfficer);
router.route("/getUserDetails").get(verifyJwt , getUserDetails);
router.route('/getOfficersByComplaint/:id').get(verifyJwt , getOfficersByComplaint);
router.route('/getAllOfficers').get(verifyJwt , getAllOfficers);
router.route('/removeOfficer/:id').delete(verifyJwt , removeOfficer);

export default router;