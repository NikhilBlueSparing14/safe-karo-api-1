import express from 'express';
const router = express.Router();
import {countPartnersByPeriod} from '../../controller/chartController/adminChartController.js';

// Define the route to count partners by period
router.get('/:period', countPartnersByPeriod);

export default router;
