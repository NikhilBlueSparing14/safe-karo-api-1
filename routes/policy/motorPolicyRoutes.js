import express from 'express';
import logActivity from "../../middlewares/logActivity.js";
import {
  createMotorPolicy,
  getMotorPolicies,
  getMotorPolicyByPartnerId,
  updateMotorPolicy,
  deleteMotorPolicy,
  validatePolicyNumber,
  validateVehicleNumber,
  getMotorPolicyWithPaymentDetails,
  getMotorPolicyByPolicyId
} from '../../controller/policyController/motorPolicyController.js';
const router = express.Router();

router.post('/', logActivity, createMotorPolicy);
router.get('/', logActivity, getMotorPolicies);
router.get('/policyId/:policyId',logActivity,getMotorPolicyByPolicyId)
router.get('/partner/:partnerId', logActivity, getMotorPolicyByPartnerId);
router.put('/:id', logActivity, updateMotorPolicy);
router.delete('/:id', logActivity, deleteMotorPolicy);
router.get('/validate-policy-number', logActivity, validatePolicyNumber);
router.get('/validate-vehicle-number', logActivity, validateVehicleNumber);
router.get('/payment-details/:policyId', logActivity, getMotorPolicyWithPaymentDetails);

export default router;
