import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { assignComplaint, createComplaint, deleteComplaint, getComplaintById, getComplaints, getOfficersGrouped, updateComplaintStatus } from "../controllers/complaint.controller.js";
import { verifyJwt } from "../middlewares/user.middleware.js";


const router = Router();

router.route('/createComplaint').post(verifyJwt , upload.single('image') , createComplaint);
router.route('/getAllComplaints').get(verifyJwt , getComplaints);
router.route('/assignComplaint/:complaintId/:officerId').post(verifyJwt , assignComplaint);
router.route('/updateStatus/:complaintId/:status').put(verifyJwt , updateComplaintStatus);
router.route('/getAllOfficers').get(verifyJwt , getOfficersGrouped);
router.route('/deleteComplaint/:id').delete(verifyJwt , deleteComplaint);
router.route('/getComplaintById/:id').get(verifyJwt , getComplaintById);


export default router;