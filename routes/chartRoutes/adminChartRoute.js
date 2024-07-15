import express from 'express';
const router = express.Router();
import {getPartnersCount} from '../../controller/chartController/adminChartController.js';

// Define the route to count partners by period
router.get('/:period', getPartnersCount);

export default router;
