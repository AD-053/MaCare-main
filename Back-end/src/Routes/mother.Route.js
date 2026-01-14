import { Router } from "express";
import { jwtVerification } from "../Middleware/Authentication.Middleware.js";
import { 
  getMotherProfile, 
  getMaternalRecord, 
  addSelfVisit, 
  registerChild,
  deleteChild, 
  getVaccineSchedule,
  getMotherDashboard,
  getMotherAppointments,
  getMotherMessages,
  markMessageRead,
  createMaternalRecord,
  deleteMaternalRecord,
  getAllDoctorAdvice,
  getAllHealthUpdates,
  markAdviceAsRead,
  getMyCheckups
} from "../Controllers/mother.controller.js";

const router = Router();

// Mother routes
router.route('/dashboard').get(jwtVerification, getMotherDashboard);
router.route('/profile').get(jwtVerification, getMotherProfile);
router.route('/maternal-record').get(jwtVerification, getMaternalRecord);
router.route('/maternal-record').post(jwtVerification, createMaternalRecord);
router.route('/maternal-record').delete(jwtVerification, deleteMaternalRecord);
router.route('/visit').post(jwtVerification, addSelfVisit);
router.route('/child/register').post(jwtVerification, registerChild);
router.route('/child/:childId').delete(jwtVerification, deleteChild);
router.route('/child/:childId/vaccines').get(jwtVerification, getVaccineSchedule);
router.route('/appointments').get(jwtVerification, getMotherAppointments);
router.route('/messages').get(jwtVerification, getMotherMessages);
router.route('/messages/:messageId/read').patch(jwtVerification, markMessageRead);

// New routes for doctor advice and health updates
router.route('/doctor-advice').get(jwtVerification, getAllDoctorAdvice);
router.route('/doctor-advice/:adviceId/read').patch(jwtVerification, markAdviceAsRead);
router.route('/health-updates').get(jwtVerification, getAllHealthUpdates);
router.route('/checkups').get(jwtVerification, getMyCheckups);

export default router;