import { celebrate, Segments } from 'celebrate';
import { Router } from 'express';
import SchedulingController from '../controllers/scheduling.controller';
import {
  createSchedulingSchema,
  deleteSchedulingSchema,
} from '../validations/scheduling.validations';

const schedulingRoutes: Router = Router();
const schedulingController: SchedulingController = new SchedulingController();

schedulingRoutes.get('/', schedulingController.list);
schedulingRoutes.post(
  '/',
  celebrate({ [Segments.BODY]: createSchedulingSchema }),
  schedulingController.create,
);
schedulingRoutes.delete(
  '/:id',
  celebrate({ [Segments.PARAMS]: deleteSchedulingSchema }),
  schedulingController.delete,
);

export default schedulingRoutes;
